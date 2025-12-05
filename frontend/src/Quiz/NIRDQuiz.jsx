import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Home, Zap, Clock, Smile, Frown } from 'lucide-react';

// --- Données du Quiz (10 Questions sur la Résistance Numérique) ---
const quizData = [
  {
    id: 1,
    question: "Qu'est-ce qu'un Logiciel Libre (Open Source) ?",
    options: [
      {
        front: "Logiciel Propriétaire",
        back: "Nécessite une licence payante et son code source est secret, vous êtes dépendant de l'entreprise.",
        isCorrect: false,
      },
      {
        front: "Logiciel Libre",
        back: "Logiciel dont le code source est accessible, modifiable et partageable. Favorise l'autonomie.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 2,
    question: "Quel est l'objectif principal du 'Village Numérique Résistant' pour les écoles ?",
    options: [
      {
        front: "Publicité et Ventes",
        back: "Maximiser l'engagement des élèves pour la publicité ciblée et la vente de données.",
        isCorrect: false,
      },
      {
        front: "Souveraineté et Contrôle",
        back: "Promouvoir l'autonomie et la maîtrise des outils numériques face aux Big Tech.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 3,
    question: "Qu'est-ce que le 'shadow profiling' ?",
    options: [
      {
        front: "Cryptage Avancé",
        back: "Une technique de cryptage avancée pour sécuriser les données sensibles contre les attaques.",
        isCorrect: false,
      },
      {
        front: "Collecte Cachée",
        back: "La collecte de données sur des individus qui n'utilisent pas directement la plateforme (ex: par des trackers tiers).",
        isCorrect: true,
      },
    ],
  },
  {
    id: 4,
    question: "Quelle est une alternative décentralisée aux plateformes sociales centralisées ?",
    options: [
      {
        front: "Facebook / Instagram",
        back: "Ces plateformes sont gérées par une seule entité (Meta), concentrant les données et le pouvoir.",
        isCorrect: false,
      },
      {
        front: "Mastodon / Peertube",
        back: "Des réseaux basés sur des serveurs indépendants (le Fediverse) offrant plus de contrôle et d'éthique.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 5,
    question: "Quel est le risque principal lié à l'utilisation massive du Cloud propriétaire (GAFAM) dans l'éducation ?",
    options: [
      {
        front: "Faible Vitesse Internet",
        back: "Ce n'est pas le risque principal; le Cloud peut être rapide mais la question est celle du contrôle.",
        isCorrect: false,
      },
      {
        front: "Perte de Contrôle des Données",
        back: "L'établissement perd le contrôle sur les données pédagogiques et personnelles des élèves, soumises aux lois étrangères.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 6,
    question: "Qu'est-ce qu'un navigateur 'respectueux de la vie privée' ?",
    options: [
      {
        front: "Google Chrome",
        back: "Développé par Google, il est lié à l'écosystème de suivi publicitaire de l'entreprise.",
        isCorrect: false,
      },
      {
        front: "Firefox / Brave",
        back: "Ces navigateurs bloquent les traqueurs, les publicités par défaut et mettent l'accent sur la confidentialité.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 7,
    question: "Pourquoi est-il important d'enseigner la 'littératie numérique' dans les écoles ?",
    options: [
      {
        front: "Consommation passive",
        back: "Pour former les élèves à être de meilleurs consommateurs des technologies Big Tech.",
        isCorrect: false,
      },
      {
        front: "Esprit critique et création",
        back: "Pour que les élèves comprennent comment les technologies fonctionnent, fassent des choix conscients et soient capables de créer.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 8,
    question: "Quelle est la durée de changement de question requise par le défi ?",
    options: [
      {
        front: "Toutes les 30 secondes",
        back: "C'est trop rapide pour que les participants aient le temps de lire et de réfléchir.",
        isCorrect: false,
      },
      {
        front: "Toutes les 3 minutes",
        back: "C'est la durée spécifiée dans les consignes du défi Nuit d'infos 2025.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 9,
    question: "Comment une école peut-elle gérer ses communications internes de manière 'résistante' ?",
    options: [
      {
        front: "Via WhatsApp / Teams",
        back: "Ces outils sont souvent des services cloud américains qui posent des problèmes de confidentialité et de souveraineté.",
        isCorrect: false,
      },
      {
        front: "Via Mattermost / Signal / E-mail local",
        back: "Utiliser des outils auto-hébergés ou des messageries éthiques qui respectent la confidentialité des échanges.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 10,
    question: "Qu'est-ce qu'une licence Creative Commons (CC) ?",
    options: [
      {
        front: "Copyright Strict",
        back: "Une licence qui interdit toute reproduction, modification ou partage sans autorisation écrite.",
        isCorrect: false,
      },
      {
        front: "Partage Libre et Conditions",
        back: "Un contrat légal qui permet le partage et l'utilisation libre d'œuvres créatives, sous certaines conditions (ex: mention de l'auteur).",
        isCorrect: true,
      },
    ],
  },
];

// Constantes
// ******************************************************************
// ATTENTION: La durée réelle requise est de 3 minutes (180000 ms).
// Nous utilisons 10 secondes (10000 ms) pour la démonstration du changement automatique.
const QUESTION_DURATION = 10000; // À CHANGER à 180000 (3 minutes) pour le défi réel.
// ******************************************************************

const ResistantDigitalVillageQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  // État de flip pour chaque option, [false, false] pour les deux cartes
  const [isOptionFlipped, setIsOptionFlipped] = useState([false, false]); 
  const [score, setScore] = useState(0);

  // Fonction pour passer à la question suivante
  const nextQuestion = useCallback(() => {
    // Si ce n'est pas la dernière question
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      // Réinitialiser l'état de la réponse pour la nouvelle question
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
      setIsOptionFlipped([false, false]);
    } else {
      // Fin du quiz
      setCurrentQuestionIndex(quizData.length); // Indice spécial pour l'écran de fin
    }
  }, [currentQuestionIndex]);

  // Chronomètre pour le changement de question automatique
  useEffect(() => {
    if (currentQuestionIndex < quizData.length) {
      const timer = setInterval(() => {
        // Log pour montrer que le timer fonctionne
        console.log(`Changement automatique de question déclenché.`);
        nextQuestion();
      }, QUESTION_DURATION);

      // Nettoyage de l'intervalle lors du démontage ou du changement d'index
      return () => clearInterval(timer); 
    }
  }, [currentQuestionIndex, nextQuestion]);

  // Gestion du clic sur une option de réponse (Flip Card Logic)
  const handleAnswerClick = (index) => {
    // Si la question est déjà répondue
    if (isAnswered) {
      // Le clic sert uniquement à flipper/unflip la carte pour voir l'explication
      const newFlipState = [...isOptionFlipped];
      newFlipState[index] = !newFlipState[index];
      setIsOptionFlipped(newFlipState);
      return;
    }

    // SI LA QUESTION N'EST PAS ENCORE RÉPONDUE : C'EST L'ACTION DE RÉPONSE

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = currentQuestion.options[index].isCorrect;

    // 1. Enregistre la réponse et met à jour le score
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // 2. Déclenche le flip pour montrer l'explication (Verso)
    const newFlipState = [false, false];
    newFlipState[index] = true; 
    
    // Si la réponse est fausse, on retourne aussi l'autre carte pour montrer la bonne explication
    if (!isCorrect) {
      const correctIndex = currentQuestion.options.findIndex(opt => opt.isCorrect);
      // S'assure de ne pas retourner la carte déjà cliquée si par malchance elle est aussi la bonne (ce qui ne devrait pas arriver ici)
      if (correctIndex !== index) {
        newFlipState[correctIndex] = true;
      }
    }
    
    setIsOptionFlipped(newFlipState);
  };

  // Composant de l'option (carte pivotante - Implémentation du Flip Card)
  const OptionCard = ({ option, index, isFlipped, isAnswered }) => {
    const isCorrect = option.isCorrect;
    const isSelected = selectedAnswerIndex === index;

    // Classes CSS de rotation 3D basées sur l'état `isFlipped`
    let cardClasses = "relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] shadow-xl rounded-xl overflow-hidden cursor-pointer";

    if (isFlipped) {
      // La carte est retournée
      cardClasses += " [transform:rotateY(180deg)]";
    }

    // Styles des faces
    const frontBg = "bg-blue-600 hover:bg-blue-700 active:bg-blue-800";
    let backBg = "bg-gray-100";

    if (isAnswered) {
      // Styles de feedback après réponse
      if (isCorrect) {
        // La bonne réponse
        backBg = "bg-green-100 border-2 border-green-600 shadow-inner";
      } else if (isSelected) {
        // La mauvaise réponse sélectionnée
        backBg = "bg-red-100 border-2 border-red-600 shadow-inner";
      }
    }

    return (
      <div
        className="perspective-1000 w-full h-80 sm:h-96 md:h-80"
        onClick={() => handleAnswerClick(index)} // Déclenche le flip et la réponse
      >
        {/* Le conteneur de la carte qui tourne */}
        <div className={cardClasses}>
          
          {/* Recto (Image/Texte principal) */}
          {/* La classe backface-hidden empêche le verso d'être visible à travers */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-white ${frontBg} backface-hidden rounded-xl`}>
            <Zap className="w-12 h-12 mb-4 animate-pulse" />
            <p className="text-xl font-bold">{option.front}</p>
            <span className="mt-4 text-sm opacity-80 font-light">(Cliquez pour répondre / voir l'explication)</span>
          </div>

          {/* Verso (Explication/Description) */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-gray-800 ${backBg} [transform:rotateY(180deg)] backface-hidden rounded-xl`}>
            <p className="font-semibold mb-3">
              {isAnswered && (
                <span className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '✅ Réponse Juste:' : '❌ Réponse Fausse:'}
                </span>
              )}
            </p>
            <p className="text-md text-left leading-relaxed">
              {option.back}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Si le quiz est terminé, afficher les résultats
  if (currentQuestionIndex >= quizData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-xl w-full bg-white shadow-2xl rounded-xl p-8 text-center border-t-8 border-green-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Fin du Quiz !</h2>
          <p className="text-xl text-gray-600 mb-6">
            Votre score final est de <span className="text-green-600 font-extrabold">{score} / {quizData.length}</span>.
            Bravo pour votre participation au défi du Village Numérique Résistant !
          </p>
          <button
            onClick={() => window.location.reload()} // Simuler le retour à la page d'accueil
            className="mt-6 flex items-center justify-center w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à la page d'accueil (Simulé)
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;

  // Détermine l'émoji de feedback
  let feedbackEmoji = null;
  if (isAnswered) {
    const isCorrect = currentQuestion.options[selectedAnswerIndex].isCorrect;
    if (isCorrect) {
      feedbackEmoji = <Smile className="w-6 h-6 text-green-500 ml-3 animate-bounce" />;
    } else {
      feedbackEmoji = <Frown className="w-6 h-6 text-red-500 ml-3 animate-shake" />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-8">
      <style jsx global>{`
        /* Configuration du style pour la rotation 3D (Perspective) */
        .perspective-1000 {
          perspective: 1000px;
        }
        /* Cache l'arrière-face de l'élément pendant la rotation */
        .backface-hidden {
          backface-visibility: hidden;
        }
        /* Animation simple pour le feedback négatif (non standard dans Tailwind) */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10">

        {/* En-tête du Quiz */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold text-indigo-700 flex items-center">
            <RefreshCw className="w-6 h-6 mr-2 text-indigo-500" />
            Quiz: Le Village Numérique Résistant
          </h1>
          <div className="text-lg font-semibold text-gray-600">
            Question {questionNumber} / {totalQuestions}
          </div>
        </div>

        {/* Section Question */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            {currentQuestion.question}
            {feedbackEmoji}
          </h2>
          <div className="mt-2 text-sm text-gray-500 flex items-center">
             <Clock className="w-4 h-4 mr-1" />
            Changement automatique dans {QUESTION_DURATION / 1000} secondes (À remplacer par 180s pour le défi).
          </div>
        </div>

        {/* Grille des Options (Cartes Flip) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentQuestion.options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              index={index}
              isFlipped={isOptionFlipped[index]}
              isAnswered={isAnswered}
            />
          ))}
        </div>

        {/* Bouton de Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-lg font-medium text-gray-700">Score actuel : {score}</p>
          <button
            onClick={nextQuestion}
            // Le bouton est actif si la question est répondue OU si c'est la dernière question
            disabled={!isAnswered && currentQuestionIndex < quizData.length - 1} 
            className={`flex items-center py-2 px-4 rounded-lg font-semibold shadow transition duration-300
              ${!isAnswered && currentQuestionIndex < quizData.length - 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
              }
            `}
          >
            {currentQuestionIndex < quizData.length - 1 ? (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Question Suivante
              </>
            ) : (
              <>
                <Home className="w-5 h-5 mr-2" />
                Voir les résultats
              </>
            )}
          </button>
        </div>

        {/* Bouton Retour Accueil */}
        <div className="mt-8 text-center">
           <button
            onClick={() => alert("Fonction de retour à l'accueil simulée. Dans une application réelle, ceci naviguerait vers la route '/'")}
            className="flex items-center justify-center mx-auto py-2 px-6 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition duration-300 shadow-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResistantDigitalVillageQuiz;