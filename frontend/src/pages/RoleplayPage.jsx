import React, { useState } from "react";
import { Shield, Menu, X } from 'lucide-react';
import "./roleplay.css";

export default function RoleplayPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'jeu de rol', href: '/roleplaypage' },
    { label: 'problem/solution', href: '/nird' },
    { label: 'chatbot', href: '#piliers' },
  ];

  const questions = [
    {
      id: 1,
      text: "Windows 10 n'est plus fonctionnel que fait ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Windows 11", "Linux"],
      correctAnswer: 1, // Linux est la bonne réponse
      // Bonne réponse: jeune content + businessman fâché
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      // Mauvaise réponse: jeune triste + businessman content
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Parfait ! Linux est gratuit et libre. Microsoft perd de l'argent !",
      badExplanation: "Dommage... Microsoft gagne encore de l'argent avec Windows 11."
    },
    {
      id: 2,
      text: "Ton école veut utiliser Google Workspace, que proposes-tu ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Accepter Google", "Proposer Nextcloud"],
      correctAnswer: 1, // Nextcloud est la bonne réponse
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Excellent ! Nextcloud protège les données. Google perd des utilisateurs !",
      badExplanation: "Dommage... Google continue de collecter nos données personnelles."
    },
    {
      id: 3,
      text: "Les élèves utilisent TikTok en classe, que fais-tu ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Interdire", "Créer une alternative"],
      correctAnswer: 1, // Créer alternative est mieux
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Génial ! Une alternative créative et libre. TikTok perd sa domination !",
      badExplanation: "Pas terrible... TikTok continue de captiver nos jeunes."
    },
    {
      id: 4,
      text: "50 vieux ordinateurs à jeter, quelle solution ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["À la poubelle", "Atelier réparation"],
      correctAnswer: 1, // Atelier réparation est la bonne réponse
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Parfait ! Réparation = économies + écologie. Les fabricants perdent des ventes !",
      badExplanation: "Dommage... Plus de déchets et les fabricants vendent du neuf."
    },
    {
      id: 5,
      text: "L'école veut acheter des iPad pour tous, ton avis ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Acheter iPad", "Tablettes libres"],
      correctAnswer: 1, // Tablettes libres est mieux
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Excellent ! Tablettes libres = liberté + économies. Apple perd du marché !",
      badExplanation: "Pas idéal... Apple contrôle encore plus l'éducation."
    },
    {
      id: 6,
      text: "WhatsApp obligatoire pour communiquer avec les profs ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Utiliser WhatsApp", "Proposer Signal/Element"],
      correctAnswer: 1, // Signal/Element est la bonne réponse
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Super ! Signal/Element protège la vie privée. Meta perd des données !",
      badExplanation: "Dommage... Meta collecte encore plus de données personnelles."
    },
    {
      id: 7,
      text: "Streaming vidéo en 4K pour tous les cours ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Oui en 4K", "720p suffisant"],
      correctAnswer: 1, // 720p est plus écologique
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Bien vu ! 720p = moins de CO2 et de bande passante. Netflix perd !",
      badExplanation: "Pas terrible... Plus de consommation énergétique inutile."
    },
    {
      id: 8,
      text: "Cloud Amazon pour stocker les devoirs ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["AWS", "Serveur local école"],
      correctAnswer: 1, // Serveur local est mieux
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Parfait ! Serveur local = contrôle des données. Amazon perd !",
      badExplanation: "Dommage... Amazon contrôle encore plus nos données."
    },
    {
      id: 9,
      text: "Nouveau smartphone chaque année pour les profs ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Chaque année", "Garder 4-5 ans"],
      correctAnswer: 1, // Garder longtemps est mieux
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Excellent ! Garder longtemps = moins de déchets. Apple/Samsung perdent !",
      badExplanation: "Pas écologique... Plus de consommation et de déchets électroniques."
    },
    {
      id: 10,
      text: "YouTube bloqué, quelle alternative pour les vidéos éducatives ?",
      leftImage: require('../1x/Fichier 1.png'),
      rightImage: require('../1x/Fichier 7.png'),
      choices: ["Débloquer YouTube", "PeerTube local"],
      correctAnswer: 1, // PeerTube est la solution libre
      goodStudentImage: require('../1x/Fichier 5.png'), // Jeune content
      goodBusinessImage: require('../1x/Fichier 9.png'), // Businessman fâché
      badStudentImage: require('../1x/Fichier 4.png'), // Jeune triste
      badBusinessImage: require('../1x/Fichier 8.png'), // Businessman content
      goodExplanation: "Génial ! PeerTube = plateforme libre et décentralisée. Google perd !",
      badExplanation: "Raté... Google garde le monopole des vidéos éducatives."
    }
  ];

  const handleChoice = (choiceIndex) => {
    const question = questions[currentQuestion];
    const isCorrect = choiceIndex === question.correctAnswer;
    
    setIsCorrectAnswer(isCorrect);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsFinished(false);
    setShowFeedback(false);
  };

  // Page de fin
  if (isFinished) {
    return (
      <div>
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <div className="logo-icon-container">
                <Shield size={24} />
              </div>
              <div className="logo-text-container">
                <span className="logo-text">NIRD</span>
                <span className="logo-subtitle">Village Numérique Résistant</span>
              </div>
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map((item) => (
                <li key={item.label} className="nav-item">
                  <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <ul className="mobile-nav-menu">
                {navItems.map((item) => (
                  <li key={item.label} className="mobile-nav-item">
                    <a 
                      href={item.href} 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        
        <div className="roleplay-container">
          <div className="finish-screen">
            <h1 className="finish-title">🎉 Félicitations !</h1>
            <p className="finish-text">Tu as terminé toutes les questions NIRD !</p>
            <p className="finish-subtitle">Tu es maintenant sensibilisé au Numérique Inclusif, Responsable et Durable</p>
            <button 
              className="restart-btn"
              onClick={restartQuiz}
            >
              🔄 Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page de feedback après réponse
  if (showFeedback) {
    const question = questions[currentQuestion];
    const studentImage = isCorrectAnswer ? question.goodStudentImage : question.badStudentImage;
    const businessImage = isCorrectAnswer ? question.goodBusinessImage : question.badBusinessImage;
    const explanationText = isCorrectAnswer ? question.goodExplanation : question.badExplanation;

    return (
      <div>
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <div className="logo-icon-container">
                <Shield size={24} />
              </div>
              <div className="logo-text-container">
                <span className="logo-text">NIRD</span>
                <span className="logo-subtitle">Village Numérique Résistant</span>
              </div>
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map((item) => (
                <li key={item.label} className="nav-item">
                  <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <ul className="mobile-nav-menu">
                {navItems.map((item) => (
                  <li key={item.label} className="mobile-nav-item">
                    <a 
                      href={item.href} 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        
        <div className="roleplay-container">
        {/* PERSONNAGE GAUCHE - Étudiant */}
        <div className={`character-block ${isCorrectAnswer ? 'goodStudentImage' : 'badStudentImage'}`}>
          <img 
            src={studentImage} 
            alt="Étudiant" 
            className="character-img"
          />
        </div>

        {/* EXPLICATION AU CENTRE */}
        <div className="center-text">
          {explanationText}
        </div>

        {/* PERSONNAGE DROITE - Businessman */}
        <div className={`character-block ${isCorrectAnswer ? 'goodBusinessImage' : 'badBusinessImage'}`}>
          <img 
            src={businessImage} 
            alt="Businessman" 
            className="character-img"
          />
        </div>

        {/* BOUTON SUIVANT EN BAS */}
        <div className="button-row">
          <button 
            className="next-btn-center"
            onClick={handleNextQuestion}
          >
            ➡️ Suivant
          </button>
        </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon-container">
              <Shield size={24} />
            </div>
            <div className="logo-text-container">
              <span className="logo-text">NIRD</span>
              <span className="logo-subtitle">Village Numérique Résistant</span>
            </div>
          </div>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.label} className="nav-item">
                <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-menu">
              {navItems.map((item) => (
                <li key={item.label} className="mobile-nav-item">
                  <a 
                    href={item.href} 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      
      <div className="roleplay-container">

      {/* SECTION PERSONNAGE GAUCHE */}
      <div className="character-block1">
        <img 
          src={question.leftImage} 
          alt="Personnage gauche" 
          className="character-img"
        />
      </div>

      {/* TEXTE AU CENTRE */}
      <div className="center-text">
        {question.text}
      </div>

      {/* SECTION PERSONNAGE DROITE */}
      <div className="character-block">
        <img 
          src={question.rightImage} 
          alt="Personnage droite" 
          className="character-img"
        />
      </div>

      {/* BOUTONS EN BAS */}
      <div className="button-row">
        <button 
          className="choice-btn"
          onClick={() => handleChoice(0)}
        >
          {question.choices[0]}
        </button>
        <button 
          className="choice-btn"
          onClick={() => handleChoice(1)}
        >
          {question.choices[1]}
        </button>
      </div>

      </div>
    </div>
  );
}
