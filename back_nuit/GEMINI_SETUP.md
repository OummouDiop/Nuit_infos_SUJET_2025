# Configuration de l'API Gemini pour le Chatbot NIRD

## 🔑 Obtenir une nouvelle clé API Gemini

### Étapes :

1. **Accédez à Google AI Studio** : https://makersuite.google.com/app/apikey

2. **Créez une nouvelle clé API** :
   - Connectez-vous avec votre compte Google
   - Cliquez sur "Create API Key"
   - Choisissez un projet ou créez-en un nouveau
   - Copiez la clé générée

3. **Configurez la clé dans votre application** :
   
   **Option A : Fichier .env (Recommandé)**
   ```bash
   # Éditez le fichier back_nuit/.env
   GEMINI_API_KEY=votre_nouvelle_cle_api_ici
   ```

   **Option B : Variable d'environnement système**
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="votre_nouvelle_cle_api_ici"
   
   # Windows CMD
   set GEMINI_API_KEY=votre_nouvelle_cle_api_ici
   
   # Linux/Mac
   export GEMINI_API_KEY="votre_nouvelle_cle_api_ici"
   ```

## 🚨 Sécurité

- ❌ **Ne jamais** exposer de clés API dans le code source
- ✅ **Toujours** utiliser des variables d'environnement ou fichiers .env
- 🔄 **Régénérez** les clés si elles sont compromises
- 📝 **Ajoutez** `.env` dans votre `.gitignore`

## 🧪 Test

Après configuration, redémarrez le serveur Django :
```bash
cd back_nuit
python manage.py runserver
```

Le chatbot devrait maintenant fonctionner avec l'IA Gemini !

## 📊 Limites du plan gratuit

- **15 requêtes/minute**
- **1500 requêtes/jour**
- **1 million de tokens/mois**

Pour plus d'usage, considérez un plan payant sur Google AI Studio.