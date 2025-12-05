import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Home, Zap, Clock, Smile, Frown } from 'lucide-react';
import "./ResistantDigitalVillageQuiz.css"; // ⬅️ Fichier CSS externe

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
  // … toutes les autres questions identiques …
];

// Durée (démo = 10s, réel = 180s)
const QUESTION_DURATION = 10000;

const ResistantDigitalVillageQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isOptionFlipped, setIsOptionFlipped] = useState([false, false]);
  const [score, setScore] = useState(0);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
      setIsOptionFlipped([false, false]);
    } else {
      setCurrentQuestionIndex(quizData.length);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestionIndex < quizData.length) {
      const timer = setInterval(() => {
        console.log("Changement automatique de question déclenché.");
        nextQuestion();
      }, QUESTION_DURATION);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, nextQuestion]);

  const handleAnswerClick = (index) => {
    if (isAnswered) {
      const newFlipState = [...isOptionFlipped];
      newFlipState[index] = !newFlipState[index];
      setIsOptionFlipped(newFlipState);
      return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = currentQuestion.options[index].isCorrect;

    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    if (isCorrect) setScore(prev => prev + 1);

    const newFlipState = [false, false];
    newFlipState[index] = true;
    if (!isCorrect) {
      const correctIndex = currentQuestion.options.findIndex(opt => opt.isCorrect);
      newFlipState[correctIndex] = true;
    }
    setIsOptionFlipped(newFlipState);
  };

  const OptionCard = ({ option, index, isFlipped }) => {
    const isCorrect = option.isCorrect;
    const isSelected = selectedAnswerIndex === index;

    return (
      <div className="card-wrapper" onClick={() => handleAnswerClick(index)}>
        <div className={`card ${isFlipped ? "card-flipped" : ""}`}>
         
          {/* Recto */}
          <div className="card-front">
            <Zap className="icon-pulse" />
            <p className="card-front-title">{option.front}</p>
            <span className="card-hint">(Cliquez pour répondre / voir l'explication)</span>
          </div>

          {/* Verso */}
          <div className={`card-back
            ${isAnswered && isCorrect ? "card-correct" : ""}
            ${isAnswered && !isCorrect && isSelected ? "card-wrong" : ""}`}>
           
            {isAnswered && (
              <p className={`answer-status ${isCorrect ? "correct-text" : "wrong-text"}`}>
                {isCorrect ? "✅ Réponse Juste:" : "❌ Réponse Fausse:"}
              </p>
            )}

            <p className="card-back-text">{option.back}</p>
          </div>
        </div>
      </div>
    );
  };

  if (currentQuestionIndex >= quizData.length) {
    return (
      <div className="quiz-end-screen">
        <div className="quiz-end-box">
          <h2>🎉 Fin du Quiz !</h2>
          <p>
            Votre score final : <strong>{score} / {quizData.length}</strong>
          </p>
          <button onClick={() => window.location.reload()} className="btn-main">
            <Home className="btn-icon" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  const feedbackEmoji = isAnswered ? (
    currentQuestion.options[selectedAnswerIndex].isCorrect ? (
      <Smile className="emoji-good" />
    ) : (
      <Frown className="emoji-bad" />
    )
  ) : null;

  return (
    <div className="quiz-container">
      <div className="quiz-box">
       
        {/* En-tête */}
        <div className="quiz-header">
          <h1>
            <RefreshCw className="header-icon" />
            Quiz: Le Village Numérique Résistant
          </h1>
          <span className="question-count">
            Question {questionNumber} / {quizData.length}
          </span>
        </div>

        {/* Question */}
        <div className="quiz-question">
          <h2>{currentQuestion.question} {feedbackEmoji}</h2>
          <div className="timer-info">
            <Clock className="timer-icon" />
            Changement automatique dans {QUESTION_DURATION/1000} secondes.
          </div>
        </div>

        {/* Options */}
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              index={index}
              isFlipped={isOptionFlipped[index]}
            />
          ))}
        </div>

        {/* Bouton */}
        <div className="navigation">
          <p className="score-display">Score actuel : {score}</p>
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className={`btn-next ${!isAnswered ? "btn-disabled" : ""}`}
          >
            {currentQuestionIndex < quizData.length - 1 ? (
              <>
                <Zap className="btn-icon" /> Suivante
              </>
            ) : (
              <>
                <Home className="btn-icon" /> Résultats
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResistantDigitalVillageQuiz;
