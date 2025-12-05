# Chatbot React + Django - Guide d'utilisation

## 🚀 Configuration terminée !

Le chatbot Gemini est maintenant intégré dans votre application React avec un backend Django.

## ✅ Ce qui a été corrigé/créé

### 1. **Correction de l'API Gemini**
- ❌ **Avant** : `gemini-pro` (modèle obsolète)
- ✅ **Maintenant** : `gemini-1.5-flash` (modèle disponible)

### 2. **Interface React créée**
- 📁 `frontend/src/chatbot/Chatbot.jsx` - Composant principal
- 🎨 `frontend/src/chatbot/Chatbot.css` - Styles modernes
- 📦 `frontend/src/chatbot/index.js` - Export du composant

### 3. **Configuration CORS**
- Ajout de `django-cors-headers`
- Configuration pour React (localhost:3000)
- Headers autorisés pour les API

## 🖥️ Interface Chatbot

### Fonctionnalités
- **💬 Chat flottant** : Bouton en bas à droite
- **🎨 Interface moderne** : Design responsive et élégant  
- **⚡ Temps réel** : Envoi instantané des messages
- **📱 Mobile-friendly** : Adaptatif sur tous les écrans
- **🧠 Contexte** : Maintient la conversation
- **🗑️ Nettoyage** : Bouton pour effacer le chat

### Comment utiliser

1. **Démarrer le backend Django** :
   ```bash
   cd back_nuit
   python manage.py runserver
   ```

2. **Démarrer le frontend React** :
   ```bash
   cd frontend
   npm start
   ```

3. **Accéder à l'application** :
   - Frontend React : http://localhost:3000
   - Le chatbot apparaît automatiquement en bas à droite

## 🔧 Intégration dans App.js

Le chatbot est déjà intégré dans `App.js` :

```jsx
import Chatbot from './chatbot/Chatbot';

function App() {
  return (
    <div className="App">
      {/* Votre contenu existant */}
      
      {/* Chatbot flottant */}
      <Chatbot />
    </div>
  );
}
```

## 🎯 Utilisation du composant

### Import simple
```jsx
import { Chatbot } from './chatbot';
// ou
import Chatbot from './chatbot/Chatbot';
```

### Personnalisation
Le composant est entièrement personnalisable via CSS :

```css
/* Changer la couleur du bouton */
.chatbot-toggle {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}

/* Modifier la taille */
.chatbot-container {
  width: 400px;
  height: 650px;
}
```

## 📱 Responsive Design

- **💻 Desktop** : Chat flottant 380px × 600px
- **📱 Tablet** : Adapte la taille à l'écran
- **📞 Mobile** : Plein écran pour une meilleure UX

## 🔌 API Endpoints utilisés

Le composant React communique avec :

- `POST http://127.0.0.1:8000/api/chat/message/`
- `GET http://127.0.0.1:8000/api/chat/history/<session_id>/`

## ⚡ Fonctionnalités avancées

### 1. **Sessions persistantes**
- Chaque utilisateur a un ID de session unique
- L'historique est sauvegardé côté serveur

### 2. **Gestion d'erreurs**
- Messages d'erreur user-friendly
- Retry automatique en cas d'échec

### 3. **UX optimisée**
- Indicateur de frappe (typing indicator)
- Auto-scroll des messages
- Timestamp des messages
- Limite de caractères (1000)

## 🛠️ Développement et personnalisation

### Ajouter des fonctionnalités

1. **Modifier le comportement** : Éditer `Chatbot.jsx`
2. **Changer le style** : Modifier `Chatbot.css`
3. **Étendre l'API** : Ajouter des endpoints dans Django

### Exemples d'extensions

```jsx
// Ajouter un son de notification
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play();
};

// Sauvegarde locale
const saveToLocalStorage = (messages) => {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
};
```

## 🔐 Configuration de production

Pour déployer en production :

1. **Sécuriser CORS** :
   ```python
   CORS_ALLOW_ALL_ORIGINS = False
   CORS_ALLOWED_ORIGINS = [
       "https://votre-domaine.com",
   ]
   ```

2. **Variables d'environnement** :
   ```python
   GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
   ```

3. **HTTPS** : Configurer SSL/TLS

## 🐛 Résolution de problèmes

### Chatbot ne s'affiche pas
- Vérifiez que React fonctionne sur port 3000
- Vérifiez les erreurs dans la console F12

### Erreurs API
- Vérifiez que Django fonctionne sur port 8000
- Contrôlez la clé API Gemini
- Vérifiez CORS dans la console réseau

### Modèle Gemini non trouvé
- Le modèle est maintenant `gemini-1.5-flash`
- Vérifiez que la clé API est valide

## 📞 Support

En cas de problème :

1. Vérifiez les logs Django
2. Inspectez la console React (F12)
3. Testez l'API avec le script `test_chatbot.py`

---

🎉 **Votre chatbot React + Django + Gemini est prêt !**

Le bouton flottant 🤖 apparaîtra en bas à droite de votre application React.