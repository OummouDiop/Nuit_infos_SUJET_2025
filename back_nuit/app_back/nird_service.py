"""
Service Gemini AI pour le chatbot démarches NIRD
"""

import google.generativeai as genai
import os
from django.conf import settings
import random
from dotenv import load_dotenv
from pathlib import Path


class GeminiNIRDService:
    """Service utilisant l'API Gemini pour répondre aux questions sur les démarches NIRD"""
    
    def __init__(self):
        # Charger explicitement le fichier .env
        current_dir = Path(__file__).resolve().parent.parent
        env_path = current_dir / '.env'
        load_dotenv(env_path)
        
        # Configuration de l'API Gemini
        self.api_key = os.getenv('GEMINI_API_KEY')
        print(f"🔍 Clé API chargée: {self.api_key[:20] + '...' if self.api_key else 'Non trouvée'}")
        
        if self.api_key:
            genai.configure(api_key=self.api_key)
            print("✅ API Gemini configurée")
        else:
            print("⚠️ GEMINI_API_KEY non configurée dans l'environnement")
        
        # Modèle à utiliser (modèles disponibles en décembre 2024)
        self.available_models = [
            'gemini-2.5-flash',
            'gemini-1.5-flash-latest',
            'gemini-1.5-flash',
            'gemini-1.5-pro-latest',
            'gemini-1.5-pro',
            'gemini-pro'
        ]
        self.current_model = None
        self.current_model_name = None
        self._initialize_model()
        
        # Prompt système pour orienter les réponses
        self.system_prompt = """Tu es un assistant spécialisé NIRD (Numérique Inclusif, Responsable et Durable).
        Site officiel : https://nird.forge.apps.education.fr/
        
        Réponses de longueur MOYENNE (5-8 lignes).
        Détailler un peu sans être verbeux.
        
        Expertises : éco-conception numérique, accessibilité RGAA, sobriété énergétique, éthique des données, inclusion numérique.
        
        CONSIGNES :
        - Réponses ÉQUILIBRÉES (5-8 lignes)
        - Donner des détails UTILES et exemples concrets
        - Toujours mentionner le site officiel
        - Rester pédagogique et bienveillant
        - Si hors-sujet : rediriger vers les thématiques NIRD
        
        Ressources officielles à mentionner :
        - Site officiel NIRD : https://nird.forge.apps.education.fr/
        - Documentation et guides pratiques disponibles sur le site
        """
    
    def _initialize_model(self):
        """Initialise le modèle Gemini en testant les modèles disponibles"""
        import time
        
        for model_name in self.available_models:
            try:
                test_model = genai.GenerativeModel(model_name)
                # Test simple pour vérifier si le modèle fonctionne
                test_response = test_model.generate_content("Test")
                if test_response:
                    self.current_model = test_model
                    self.current_model_name = model_name
                    print(f"✅ Modèle actif: {model_name}")
                    return
            except Exception as e:
                error_msg = str(e)
                if "429" in error_msg and "retry" in error_msg.lower():
                    # Extraire le délai d'attente si disponible
                    print(f"⏳ Quota dépassé pour {model_name}, test du modèle suivant...")
                else:
                    print(f"❌ Modèle {model_name} indisponible: {e}")
                continue
        
        # Si aucun modèle ne fonctionne
        print("⚠️ Aucun modèle Gemini disponible, utilisation du mode fallback")
        self.current_model = None
        self.current_model_name = "fallback"
    
    def get_nird_response(self, question):
        """
        Génère une réponse à une question sur les démarches NIRD via Gemini UNIQUEMENT
        """
        try:
            # Vérifier si la clé API est configurée
            if not self.api_key:
                print("❌ Clé API Gemini non configurée")
                return self._get_api_key_error_response(question)
            
            # Vérifier et initialiser le modèle si nécessaire
            if not self.current_model:
                self._initialize_model()
            
            if not self.current_model:
                print("⚠️ Aucun modèle Gemini disponible, utilisation du fallback")
                return self._get_intelligent_fallback_response(question)
            
            # Construction du prompt complet
            full_prompt = f"{self.system_prompt}\n\nQuestion de l'utilisateur : {question}\n\nRéponse détaillée mais concise (100-150 mots) :"
            
            print(f"🤖 Envoi de la question à Gemini: {question}")
            
            # Génération de la réponse
            response = self.current_model.generate_content(full_prompt)
            
            if response.text:
                print("✅ Réponse Gemini reçue")
                
                # Obtenir les sources fiables pour cette question
                sources = self._get_reliable_sources(question)
                
                return {
                    'response': response.text,
                    'status': 'success',
                    'source': 'Gemini AI',
                    'sources': sources,  # Sources séparées pour le frontend
                    'metadata': {
                        'model': getattr(self, 'current_model_name', 'gemini-model'),
                        'response_type': 'ai_generated'
                    }
                }
            else:
                print("⚠️ Réponse Gemini vide")
                raise Exception("Réponse Gemini vide")
                
        except Exception as e:
            print(f"❌ Erreur Gemini API: {e}")
            error_msg = str(e)
            
            # Gérer différents types d'erreurs
            if "403" in error_msg and "leaked" in error_msg.lower():
                return self._get_leaked_key_error_response(question)
            elif "429" in error_msg:
                return self._get_quota_error_response(question)
            else:
                return self._get_generic_error_response(question, e)
    
    def _get_reliable_sources(self, question):
        """Retourne 2 sources aléatoires parmi 20 sites officiels pour les démarches NIRD"""
        
        # Base de données de 20 sources officielles et fiables pour le Numérique Inclusif, Responsable et Durable
        all_reliable_sources = [
            {
                "title": "Site officiel NIRD",
                "url": "https://nird.forge.apps.education.fr/",
                "description": "Plateforme officielle NIRD - Numérique Inclusif, Responsable et Durable"
            },
            {
                "title": "ADEME - Numérique responsable",
                "url": "https://www.ademe.fr/",
                "description": "Agence de l'environnement - Guide pour un numérique responsable"
            },
            {
                "title": "RGAA - Accessibilité numérique",
                "url": "https://www.numerique.gouv.fr/publications/rgaa-accessibilite/",
                "description": "Référentiel général d'amélioration de l'accessibilité"
            },
            {
                "title": "Institut du Numérique Responsable",
                "url": "https://www.inr-ngo.org/",
                "description": "Organisation pour un numérique plus responsable et durable"
            },
            {
                "title": "GreenIT.fr",
                "url": "https://www.greenit.fr/",
                "description": "Communauté des acteurs du numérique responsable en France"
            },
            {
                "title": "Collectif Conception Numérique Responsable",
                "url": "https://collectif.greenit.fr/",
                "description": "Collectif pour promouvoir la conception numérique responsable"
            },
            {
                "title": "EcoInfo CNRS",
                "url": "https://ecoinfo.cnrs.fr/",
                "description": "Groupe du CNRS pour un numérique éco-responsable"
            },
            {
                "title": "The Shift Project",
                "url": "https://theshiftproject.org/",
                "description": "Think tank sur la transition énergétique et le numérique"
            },
            {
                "title": "Fing - Fondation Internet Nouvelle Génération",
                "url": "https://www.fing.org/",
                "description": "Prospective et innovation sur les transformations numériques"
            },
            {
                "title": "W3C Web Accessibility Initiative",
                "url": "https://www.w3.org/WAI/",
                "description": "Standards internationaux pour l'accessibilité web"
            },
            {
                "title": "AccessiWeb",
                "url": "https://www.accessiweb.org/",
                "description": "Association française pour l'accessibilité du web"
            },
            {
                "title": "Opquast - Qualité web",
                "url": "https://www.opquast.com/",
                "description": "Référentiel et certification qualité web"
            },
            {
                "title": "Éthique Numérique",
                "url": "https://ethique-numerique.org/",
                "description": "Plateforme pour un numérique éthique et responsable"
            },
            {
                "title": "Solidatech",
                "url": "https://www.solidatech.fr/",
                "description": "Programme de solidarité numérique pour les associations"
            },
            {
                "title": "Emmaüs Connect",
                "url": "https://emmaus-connect.org/",
                "description": "Association luttant contre l'exclusion numérique"
            },
            {
                "title": "Coalition Numérique Responsable",
                "url": "https://www.cnr-coalition.fr/",
                "description": "Coalition pour sensibiliser aux enjeux du numérique responsable"
            },
            {
                "title": "HiNa - Hub Inclusion Numérique",
                "url": "https://www.hina.gouv.fr/",
                "description": "Hub de l'inclusion numérique et de l'accessibilité"
            },
            {
                "title": "Secrétariat d'État au Numérique",
                "url": "https://www.numerique.gouv.fr/",
                "description": "Politiques publiques du numérique en France"
            },
            {
                "title": "Mission Société Numérique",
                "url": "https://societenumerique.gouv.fr/",
                "description": "Mission gouvernementale pour l'inclusion numérique"
            },
            {
                "title": "NIRD Forge Education",
                "url": "https://nird.forge.apps.education.fr/",
                "description": "Plateforme éducative pour le numérique responsable et durable"
            }
        ]
        
        # Sélectionner aléatoirement 2 sources différentes
        selected_sources = random.sample(all_reliable_sources, 2)
        
        return selected_sources

    def _get_intelligent_fallback_response(self, question):
        """Réponse intelligente basée sur des mots-clés quand Gemini n'est pas disponible"""
        question_lower = question.lower()
        
        # Base de connaissances pour les réponses de secours
        nird_knowledge = {
            ('éco-conception', 'écoconception', 'green it', 'développement durable'): """🌱 **Éco-conception numérique**

**Objectif :** Concevoir des services numériques respectueux de l'environnement dès la phase de design.

**Actions concrètes :**
• Optimisation des performances (code léger, requêtes réduites)
• Compression des médias et mise en cache efficace
• Choix d'hébergeurs verts et serveurs proches des utilisateurs
• Design sobre : fonctionnalités essentielles, interfaces épurées

🔗 Guides détaillés : https://nird.forge.apps.education.fr/""",

            ('accessibilité', 'handicap', 'rgaa', 'wcag', 'inclusion'): """♿ **Accessibilité numérique**

**Objectif :** Garantir l'accès aux services numériques pour tous, y compris les personnes handicapées.

**Standards à respecter :**
• **RGAA** (France) et **WCAG 2.1** niveau AA minimum
• Tests avec lecteurs d'écran et utilisateurs handicapés

**Critères essentiels :** Contrastes couleurs 4.5:1, navigation clavier complète, textes alternatifs images, structure HTML sémantique.

🔗 Guide RGAA : https://www.numerique.gouv.fr/publications/rgaa-accessibilite/""",

            ('sobriété', 'énergie', 'consommation', 'empreinte carbone'): """⚡ **Sobriété numérique**

**Enjeu :** Réduire l'impact environnemental du numérique (4% des émissions GES mondiales).

**Stratégies :**
• **Équipements** : Prolonger durée de vie, éviter le sur-équipement
• **Développement** : Code optimisé, compression médias, cache intelligent
• **Usage** : Réduire requêtes, design minimaliste, fonctionnalités essentielles
• **Hébergement** : Serveurs verts, géolocalisation optimisée

🌍 Ressources ADEME et GreenIT pour mesurer votre impact.""",

            ('éthique', 'responsabilité', 'données', 'vie privée', 'rgpd'): """🛡️ **Éthique numérique**

**Principes :** Transparence, protection des données, consentement, non-discrimination, durabilité.

**Applications :** RGPD, conception inclusive, algorithmes transparents, lutte contre les biais.

🔗 https://ethique-numerique.org/""",

            ('inclusion', 'fracture', 'digital', 'exclusion', 'formation'): """🤝 **Inclusion numérique**

**Enjeu :** 13 millions de Français éloignés du numérique (fracture sociale, manque d'équipement/compétences).

**Solutions :** Formation, points d'accès publics, accompagnement, interfaces simples, alternatives non-numériques.

🌐 https://societenumerique.gouv.fr/""",

            ('formation', 'apprendre', 'guide', 'tuto', 'aide'): """🎓 **Formation NIRD**

**Ressources :** Guides éco-conception, outils d'évaluation, bonnes pratiques développement responsable.

**Thèmes :** Éco-conception, accessibilité RGAA, RGPD, sobriété énergétique, inclusion numérique.

📚 Site officiel : https://nird.forge.apps.education.fr/""",
        }
        
        # Rechercher des mots-clés
        for keywords, response in nird_knowledge.items():
            if any(keyword in question_lower for keyword in keywords):
                return {
                    'response': response,
                    'status': 'intelligent_fallback',
                    'source': 'Knowledge Base',
                    'metadata': {'response_type': 'intelligent_fallback', 'matched_topic': keywords[0]}
                }
        
        # Réponse générale si aucun mot-clé trouvé
        return {
            'response': """🌱 **NIRD - Numérique Inclusif, Responsable et Durable**

**Je vous accompagne sur :**
• **Éco-conception** - Développement éco-responsable, optimisation des performances
• **Accessibilité** - Conformité RGAA/WCAG, inclusion des personnes handicapées
• **Sobriété** - Réduction empreinte carbone, hébergement vert
• **Éthique** - Protection données RGPD, transparence algorithmes
• **Inclusion** - Lutte fracture numérique, formation aux outils

**Ressources :** https://nird.forge.apps.education.fr/ | ADEME | GreenIT | INR

💡 Posez-moi votre question spécifique sur le numérique responsable !""",
            'status': 'general_fallback',
            'source': 'Knowledge Base',
            'metadata': {'response_type': 'general_fallback'}
        }
    
    def _get_api_key_error_response(self, question):
        """Réponse quand la clé API n'est pas configurée"""
        sources = self._get_reliable_sources(question)
        return {
            'response': """🔑 **Clé API Gemini non configurée**

Pour utiliser l'IA, configurez votre clé API Gemini :
• Créez une clé sur : https://makersuite.google.com/app/apikey
• Ajoutez `GEMINI_API_KEY=votre_clé` dans vos variables d'environnement

🌱 **En attendant, consultez les ressources NIRD :**
• Site officiel : https://nird.forge.apps.education.fr/
• Documentation complète et guides pratiques disponibles""",
            'status': 'api_key_missing',
            'source': 'Configuration',
            'sources': sources,
            'metadata': {'response_type': 'api_key_error'}
        }
    
    def _get_leaked_key_error_response(self, question):
        """Réponse quand la clé API est signalée comme divulguée"""
        sources = self._get_reliable_sources(question)
        return {
            'response': """🚨 **Clé API Gemini compromise**

Votre clé API a été signalée comme divulguée et désactivée pour sécurité.

**Actions immédiates :**
• Générez une NOUVELLE clé : https://makersuite.google.com/app/apikey
• Supprimez l'ancienne clé de votre compte Google AI
• Configurez `GEMINI_API_KEY=nouvelle_clé` dans vos variables d'environnement
• Ne jamais exposer de clés API dans le code source

🌱 **En attendant, consultez : https://nird.forge.apps.education.fr/**""",
            'status': 'api_key_leaked',
            'source': 'Security',
            'sources': sources,
            'metadata': {'response_type': 'leaked_key_error'}
        }
    
    def _get_quota_error_response(self, question):
        """Réponse quand le quota est dépassé"""
        sources = self._get_reliable_sources(question)
        return {
            'response': """⏳ **Quota Gemini dépassé**

Le quota gratuit de Gemini est atteint.

**Solutions :**
• Attendez la réinitialisation (généralement 24h)
• Passez à un plan payant Google AI Studio
• Vérifiez votre usage : https://ai.google.dev/pricing

🌱 **Ressources NIRD disponibles : https://nird.forge.apps.education.fr/**""",
            'status': 'quota_exceeded',
            'source': 'Quota',
            'sources': sources,
            'metadata': {'response_type': 'quota_error'}
        }
    
    def _get_generic_error_response(self, question, error):
        """Réponse pour les autres erreurs"""
        sources = self._get_reliable_sources(question)
        return {
            'response': f"""❌ **Erreur API Gemini**

{str(error)}

🔧 **Solutions :**
• Vérifiez votre connexion internet
• Réessayez dans quelques minutes
• Consultez le statut : https://status.cloud.google.com/

🌱 **Ressources NIRD : https://nird.forge.apps.education.fr/**""",
            'status': 'error',
            'source': 'Gemini AI (Error)',
            'sources': sources,
            'metadata': {
                'response_type': 'generic_error',
                'error': str(error)
            }
        }

    def _get_fallback_response(self):
        """Réponse de secours basique en cas d'erreur technique"""
        return {
            'response': """🤖 **Service IA temporairement indisponible**

🌱 **NIRD - Consultez directement :**
• Site officiel : https://nird.forge.apps.education.fr/
• ADEME : www.ademe.fr | RGAA : www.numerique.gouv.fr/publications/rgaa-accessibilite/
• GreenIT : www.greenit.fr | INR : www.inr-ngo.org

🔄 Réessayez dans quelques instants""",
            'status': 'fallback',
            'source': 'NIRD Resources',
            'metadata': {'response_type': 'fallback'}
        }


# Instance globale du service
gemini_service = GeminiNIRDService()