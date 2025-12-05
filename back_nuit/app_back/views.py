from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
import json
import uuid
from .models import ChatConversation, ChatMessage
from .nird_service import gemini_service

def get_nird_response(user_message, conversation_history=None):
    """
    Fonction pour obtenir une réponse sur les démarches NIRD via Gemini
    """
    try:
        # Construire le contexte avec l'historique si disponible
        if conversation_history:
            context_messages = []
            for msg in conversation_history:
                context_messages.append(f"{msg.message_type.capitalize()}: {msg.content}")
            
            full_question = f"Contexte de la conversation:\n" + "\n".join(context_messages[-5:]) + f"\n\nNouvelle question: {user_message}"
        else:
            full_question = user_message
        
        # Utiliser le service NIRD Gemini
        result = gemini_service.get_nird_response(full_question)
        
        return result['response']
        
    except Exception as e:
        print(f"Erreur dans get_nird_response: {e}")
        # Utiliser la réponse de fallback intelligente du service
        fallback_result = gemini_service._get_intelligent_fallback_response(user_message)
        return fallback_result['response']

@csrf_exempt
@require_http_methods(["POST"])
def chat_message(request):
    """
    Vue pour envoyer un message au chatbot
    """
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '').strip()
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        if not user_message:
            return JsonResponse({'error': 'Le message ne peut pas être vide'}, status=400)
        
        # Obtenir ou créer la conversation
        conversation, created = ChatConversation.objects.get_or_create(
            session_id=session_id,
            defaults={'user': request.user if request.user.is_authenticated else None}
        )
        
        # Sauvegarder le message de l'utilisateur
        user_chat_message = ChatMessage.objects.create(
            conversation=conversation,
            message_type='user',
            content=user_message
        )
        
        # Obtenir l'historique de la conversation (les 10 derniers messages)
        recent_messages = ChatMessage.objects.filter(
            conversation=conversation
        ).order_by('-timestamp')[:10]
        
        # Obtenir la réponse du service NIRD
        bot_response = get_nird_response(user_message, recent_messages)
        
        # Sauvegarder la réponse du bot
        bot_chat_message = ChatMessage.objects.create(
            conversation=conversation,
            message_type='bot',
            content=bot_response
        )
        
        return JsonResponse({
            'session_id': session_id,
            'user_message': user_message,
            'bot_response': bot_response,
            'timestamp': bot_chat_message.timestamp.isoformat()
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Format JSON invalide'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'Erreur serveur: {str(e)}'}, status=500)

@require_http_methods(["GET"])
def get_conversation_history(request, session_id):
    """
    Vue pour récupérer l'historique d'une conversation
    """
    try:
        conversation = ChatConversation.objects.get(session_id=session_id)
        messages = ChatMessage.objects.filter(conversation=conversation).order_by('timestamp')
        
        history = []
        for message in messages:
            history.append({
                'type': message.message_type,
                'content': message.content,
                'timestamp': message.timestamp.isoformat()
            })
        
        return JsonResponse({
            'session_id': session_id,
            'history': history
        })
        
    except ChatConversation.DoesNotExist:
        return JsonResponse({'error': 'Conversation non trouvée'}, status=404)
    except Exception as e:
        return JsonResponse({'error': f'Erreur serveur: {str(e)}'}, status=500)

def chat_interface(request):
    """
    Vue pour l'interface de chat (template HTML)
    """
    return render(request, 'app_back/chat.html')

@require_http_methods(["GET"])
def test_gemini_models(request):
    """
    Vue de test pour lister les modèles Gemini disponibles
    """
    try:
        # Lister tous les modèles disponibles
        models = genai.list_models()
        available_models = []
        
        for model in models:
            available_models.append({
                'name': model.name,
                'display_name': model.display_name,
                'supported_methods': model.supported_generation_methods
            })
        
        return JsonResponse({
            'status': 'success',
            'available_models': available_models
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'error': str(e)
        })
