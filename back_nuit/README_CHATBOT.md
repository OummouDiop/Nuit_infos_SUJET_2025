# Chatbot Gemini - Documentation

## Description
Ce projet intègre un chatbot alimenté par l'API Gemini de Google dans une application Django. Le chatbot peut maintenir des conversations contextuelles et sauvegarder l'historique des messages.

## Fonctionnalités

### 🤖 Chatbot Intelligent
- **API Gemini Pro** : Utilise le modèle Gemini Pro de Google pour des réponses intelligentes
- **Contexte conversationnel** : Maintient le contexte des 10 derniers messages
- **Sessions persistantes** : Sauvegarde les conversations dans la base de données
- **Interface web** : Interface utilisateur simple et intuitive

### 📊 Modèles de données

#### ChatConversation
- `user` : Utilisateur associé (optionnel pour les utilisateurs anonymes)
- `session_id` : Identifiant unique de session
- `created_at` / `updated_at` : Horodatage de la conversation

#### ChatMessage
- `conversation` : Conversation associée
- `message_type` : Type de message ('user' ou 'bot')
- `content` : Contenu du message
- `timestamp` : Horodatage du message

## Installation et Configuration

### 1. Prérequis
```bash
pip install Django>=5.1.3
pip install google-generativeai>=0.3.2
```

### 2. Configuration de l'API Gemini
La clé API Gemini est configurée dans `settings.py` :
```python
GEMINI_API_KEY = 'AIzaSyCkqDv9s57UcWLE6t4gzUnv2GXxoG1dqaU'
```

### 3. Migrations de base de données
```bash
cd back_nuit
python manage.py migrate
```

### 4. Démarrage du serveur
```bash
python manage.py runserver
```

## Utilisation

### URLs disponibles

#### Interface Web
- **GET** `/chat/` - Interface de chat interactive

#### API REST

##### Envoyer un message
- **POST** `/api/chat/message/`
- **Corps de la requête** :
```json
{
    "message": "Votre message ici",
    "session_id": "session_optionnelle_123"
}
```
- **Réponse** :
```json
{
    "session_id": "session_123",
    "user_message": "Votre message ici",
    "bot_response": "Réponse du chatbot",
    "timestamp": "2025-12-04T20:15:25.123456Z"
}
```

##### Récupérer l'historique
- **GET** `/api/chat/history/<session_id>/`
- **Réponse** :
```json
{
    "session_id": "session_123",
    "history": [
        {
            "type": "user",
            "content": "Message utilisateur",
            "timestamp": "2025-12-04T20:15:25.123456Z"
        },
        {
            "type": "bot",
            "content": "Réponse du bot",
            "timestamp": "2025-12-04T20:15:26.123456Z"
        }
    ]
}
```

## Administration Django

Les modèles sont disponibles dans l'interface d'administration Django à `/admin/` :

- **ChatConversation** : Gestion des conversations
- **ChatMessage** : Gestion des messages individuels

Pour créer un super utilisateur :
```bash
python manage.py createsuperuser
```

## Structure des fichiers

```
back_nuit/
├── manage.py
├── requirements.txt
├── app_back/
│   ├── models.py          # Modèles ChatConversation et ChatMessage
│   ├── views.py           # Vues du chatbot et API REST
│   ├── urls.py            # URLs de l'application
│   ├── admin.py           # Configuration admin Django
│   └── templates/
│       └── app_back/
│           └── chat.html  # Interface web du chatbot
└── back_nuit/
    ├── settings.py        # Configuration Django + API Gemini
    └── urls.py            # URLs principales
```

## Sécurité

⚠️ **Important** : La clé API Gemini est actuellement codée en dur dans `settings.py`. Pour la production :

1. Utilisez des variables d'environnement :
```python
import os
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
```

2. Ajoutez la clé dans un fichier `.env` :
```
GEMINI_API_KEY=votre_cle_api_ici
```

3. Utilisez `python-decodotenv` pour charger les variables :
```bash
pip install python-dotenv
```

## Fonctionnalités avancées

### Gestion des erreurs
- Gestion des erreurs de l'API Gemini
- Validation des données d'entrée
- Messages d'erreur utilisateur-friendly

### Contexte conversationnel
- Les 10 derniers messages sont utilisés comme contexte
- Maintien de la cohérence dans la conversation
- Sessions persistantes entre les rechargements

### Interface utilisateur
- Design responsive
- Messages en temps réel
- Indicateur de chargement
- Envoi par touche Entrée

## Développement

Pour étendre le chatbot :

1. **Personnaliser les prompts** : Modifiez la fonction `get_gemini_response()` dans `views.py`
2. **Ajouter des fonctionnalités** : Étendez les modèles ou créez de nouvelles vues
3. **Améliorer l'interface** : Modifiez le template `chat.html`
4. **Intégration frontend** : Utilisez les APIs REST avec React/Vue.js

## Test

Pour tester le chatbot :

1. Démarrez le serveur : `python manage.py runserver`
2. Visitez : `http://127.0.0.1:8000/chat/`
3. Commencez à chatter avec le bot !

## Support

En cas de problème :
- Vérifiez que la clé API Gemini est valide
- Consultez les logs Django pour les erreurs
- Vérifiez que toutes les dépendances sont installées