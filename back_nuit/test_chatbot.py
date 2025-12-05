#!/usr/bin/env python3
"""
Script de test pour l'API du chatbot Gemini
"""

import requests
import json
import sys

def test_chatbot_api():
    """Test de l'API du chatbot"""
    
    base_url = "http://127.0.0.1:8000"
    
    print("🤖 Test de l'API Chatbot Gemini")
    print("=" * 50)
    
    # Test 1: Envoyer un message
    print("\n1️⃣ Test d'envoi de message...")
    
    message_data = {
        "message": "Bonjour, comment ça va ?",
        "session_id": "test_session_123"
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/chat/message/",
            headers={'Content-Type': 'application/json'},
            data=json.dumps(message_data),
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Message envoyé avec succès !")
            print(f"📝 Message utilisateur: {data['user_message']}")
            print(f"🤖 Réponse du bot: {data['bot_response'][:100]}...")
            print(f"🔗 Session ID: {data['session_id']}")
            
            session_id = data['session_id']
            
        else:
            print(f"❌ Erreur lors de l'envoi du message: {response.status_code}")
            print(f"📝 Réponse: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")
        return False
    
    # Test 2: Envoyer un deuxième message pour tester le contexte
    print("\n2️⃣ Test du contexte conversationnel...")
    
    message_data2 = {
        "message": "Peux-tu me rappeler ce que je viens de te dire ?",
        "session_id": session_id
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/chat/message/",
            headers={'Content-Type': 'application/json'},
            data=json.dumps(message_data2),
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Contexte conversationnel fonctionne !")
            print(f"🤖 Réponse du bot: {data['bot_response'][:100]}...")
            
        else:
            print(f"❌ Erreur lors du test de contexte: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")
    
    # Test 3: Récupérer l'historique
    print("\n3️⃣ Test de récupération de l'historique...")
    
    try:
        response = requests.get(f"{base_url}/api/chat/history/{session_id}/")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Historique récupéré avec succès !")
            print(f"📊 Nombre de messages: {len(data['history'])}")
            
            for i, msg in enumerate(data['history'], 1):
                print(f"   {i}. [{msg['type']}]: {msg['content'][:50]}...")
                
        else:
            print(f"❌ Erreur lors de la récupération de l'historique: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")
    
    # Test 4: Test d'erreur (message vide)
    print("\n4️⃣ Test de validation (message vide)...")
    
    invalid_data = {
        "message": "",
        "session_id": session_id
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/chat/message/",
            headers={'Content-Type': 'application/json'},
            data=json.dumps(invalid_data)
        )
        
        if response.status_code == 400:
            print("✅ Validation des erreurs fonctionne !")
            error_data = response.json()
            print(f"📝 Message d'erreur: {error_data.get('error')}")
            
        else:
            print(f"❌ La validation devrait échouer avec un message vide")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Tests terminés ! Vérifiez les résultats ci-dessus.")
    print(f"🌐 Interface web disponible à: {base_url}/chat/")
    
    return True

if __name__ == "__main__":
    print("Assurez-vous que le serveur Django fonctionne sur http://127.0.0.1:8000")
    input("Appuyez sur Entrée pour commencer les tests...")
    
    success = test_chatbot_api()
    
    if success:
        print("\n✅ Tous les tests de base sont terminés !")
    else:
        print("\n❌ Certains tests ont échoué. Vérifiez la configuration.")
        sys.exit(1)