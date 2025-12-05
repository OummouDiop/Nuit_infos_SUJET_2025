import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Shield, Zap, Leaf, Menu, X, Users, Trophy, Star, CheckCircle, Play, Award, MapPin, Heart, Globe, Download, ChevronRight, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

// --- Composants Modulaires ---
const PillarCard = ({ icon, title, description, color, image, rotationImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (rotationImages && rotationImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % rotationImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rotationImages]);

  return (
    <div className="pillar-card">
      <div className="pillar-image" style={{ 
        backgroundImage: `url(${rotationImages ? rotationImages[currentImageIndex] : image})` 
      }}>
        <div className="pillar-icon-container" style={{ background: color }}>
          {icon}
        </div>
        {rotationImages && rotationImages.length > 1 && (
          <div className="image-indicator">
            {rotationImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pillar-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#en-savoir-plus" className="card-link">
          Découvrir <ChevronRight size={16} />
        </a>
      </div>
    </div>
  );
};

const MediaCard = ({ title, type, duration, link, source, thumbnail, rotationThumbnails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (rotationThumbnails && rotationThumbnails.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % rotationThumbnails.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rotationThumbnails]);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="media-card">
      <div 
        className="media-thumbnail" 
        style={{ 
          backgroundImage: `url(${rotationThumbnails ? rotationThumbnails[currentImageIndex] : thumbnail})` 
        }}
      >
        <div className="media-play">▶</div>
        {rotationThumbnails && rotationThumbnails.length > 1 && (
          <div className="thumbnail-indicator">
            {rotationThumbnails.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="media-content">
        <div className="media-type">{type === 'vidéo' ? '▶️' : '🎧'} {type}</div>
        <h4>{title}</h4>
        <div className="media-meta">
          <span>{duration}</span>
          <span>{source}</span>
        </div>
      </div>
    </a>
  );
};

const CharacterCard = ({ name, role, emoji, image, rotationImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (rotationImages && rotationImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % rotationImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rotationImages]);

  return (
    <div className="character-card">
      <div 
        className="character-image" 
        style={{ 
          backgroundImage: `url(${rotationImages ? rotationImages[currentImageIndex] : image})` 
        }}
      >
        <div className="character-emoji">{emoji}</div>
        {rotationImages && rotationImages.length > 1 && (
          <div className="character-indicator">
            {rotationImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="character-content">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
    </div>
  );
};

const ActionStep = ({ number, title, description, completed, image, rotationImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (rotationImages && rotationImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % rotationImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rotationImages]);

  return (
    <div className="action-step">
      <div 
        className="step-image" 
        style={{ 
          backgroundImage: `url(${rotationImages ? rotationImages[currentImageIndex] : image})` 
        }}
      >
        <span className="step-number">{number}</span>
        {rotationImages && rotationImages.length > 1 && (
          <div className="step-indicator">
            {rotationImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="step-content">
        <div className="step-header">
          <h3>{title}</h3>
          {completed && <CheckCircle className="step-check" />}
        </div>
        <p>{description}</p>
        <div className="step-actions">
          <button className="step-button">Commencer</button>
          <a href="#guide" className="step-link">Voir le guide</a>
        </div>
      </div>
    </div>
  );
};

// Images libres de droit (Unsplash avec rotation)
const IMAGES = {
  // Images de héros
  HEROES: [
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80'
  ],
  
  // Images pour diagnostic
  DIAGNOSTICS: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1600&q=80'
  ],
  
  // Images pour piliers inclusifs
  PILLAR_INCLUSIF_ROTATION: [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80'
  ],
  
  // Images pour piliers responsables
  PILLAR_RESPONSABLE_ROTATION: [
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80'
  ],
  
  // Images pour piliers durables
  PILLAR_DURABLE_ROTATION: [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    'https://images.unsplash.com/photo-1575408264798-b50b252663e6?w=800&q=80',
    'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
  ],
  
  // Images pour enseignants
  TEACHERS: [
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=600&q=80'
  ],
  
  // Images pour étudiants
  STUDENTS: [
    'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
  ],
  
  // Images pour techniciens
  TECHS: [
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80'
  ],
  
  // Images pour vidéos
  VIDEO_THUMBS: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80'
  ],
  
  // Images pour action inventaire
  ACTION_INVENTORIES: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80'
  ],
  
  // Images pour action test
  ACTION_TESTS: [
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  ],
  
  // Images pour action équipe
  ACTION_TEAMS: [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
  ],
  
  // Images pour action reconditionnement
  ACTION_RECONDITIONS: [
    'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    'https://images.unsplash.com/photo-1575408264798-b50b252663e6?w=800&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
  ],
  
  // Images communautés
  COMMUNITIES: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80'
  ],
  
  // Carrousel principal
  HERO_CAROUSEL: [
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80'
  ]
};

// --- Composant Carrousel Hero ---
const HeroCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${image})` }}
          />
        ))}
        
        {/* <div className="carousel-content">
          <div className="hero-badge">
            <Trophy size={16} /> Nuit de l'Info 2025
          </div>
          <h1>
            <span className="hero-title-main">Le Village Numérique Résistant</span>
            <span className="hero-title-sub">David contre Goliath, Astérix contre l'Empire numérique</span>
          </h1>
          <p className="hero-description">
            Face à l'empire numérique des Big Tech qui rend obsolètes vos équipements fonctionnels, 
            l'École peut devenir un <strong>village ingénieux, autonome et créatif</strong>.
          </p>
          <div className="hero-actions">
            <a href="#diagnostic" className="cta-button primary">
              <Zap size={20} /> Quiz
            </a>
          </div>
        </div> */}
        
        <button className="carousel-btn prev" onClick={goToPrevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-btn next" onClick={goToNextSlide}>
          <ChevronRightIcon size={24} />
        </button>
        
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Composant Navigation ---
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'jeu de rol', href: '#defi' },
    { label: 'problem/solution', href: '#diagnostic' },
    { label: 'chatbot', href: '#piliers' },
  ];

  return (
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
  );
};

// --- Composant Diagnostic Interactif ---
const DiagnosticGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prev) => (prev + 1) % IMAGES.DIAGNOSTICS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const questions = [
    {
      question: "Combien d'appareils votre établissement a-t-il remplacé ces 2 dernières années ?",
      answers: [
        { text: "0-2 appareils", impact: 1, emoji: "🌱" },
        { text: "3-5 appareils", impact: 2, emoji: "⚡" },
        { text: "6+ appareils", impact: 3, emoji: "🔥" }
      ]
    },
    {
      question: "Utilisez-vous des logiciels propriétaires payants ?",
      answers: [
        { text: "Non, uniquement des logiciels libres", impact: 1, emoji: "🕊️" },
        { text: "Quelques-uns pour des besoins spécifiques", impact: 2, emoji: "⚖️" },
        { text: "Oui, la plupart sont payants", impact: 3, emoji: "💰" }
      ]
    },
    {
      question: "Que faites-vous des anciens ordinateurs ?",
      answers: [
        { text: "Nous les reconditionnons avec Linux", impact: 1, emoji: "♻️" },
        { text: "Certains réparés, d'autres jetés", impact: 2, emoji: "🔧" },
        { text: "Ils sont stockés ou jetés", impact: 3, emoji: "🗑️" }
      ]
    }
  ];

  const handleAnswer = (impact) => {
    setScore(score + impact);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;
    
    if (percentage < 40) return {
      title: "Débutant Résistant 🌱",
      description: "Vous avez déjà commencé votre transition numérique ! Continuez sur cette voie vertueuse.",
      color: "#10b981",
      images: IMAGES.HEROES
    };
    if (percentage < 70) return {
      title: "Résistant en Marche ⚡",
      description: "Vous êtes sur la bonne voie ! Quelques ajustements vous rendront plus autonome.",
      color: "#3b82f6",
      images: IMAGES.DIAGNOSTICS
    };
    return {
      title: "Géant Dépendant 🏰",
      description: "Les Big Tech dominent votre écosystème. Il est temps de reprendre le contrôle !",
      color: "#ef4444",
      images: IMAGES.COMMUNITIES
    };
  };

  const [resultImageIndex, setResultImageIndex] = useState(0);
  
  useEffect(() => {
    if (showResult) {
      const interval = setInterval(() => {
        setResultImageIndex((prev) => (prev + 1) % getResult().images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showResult]);

  return (
    <div 
      className="diagnostic-game" 
      id="diagnostic" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${IMAGES.DIAGNOSTICS[bgImageIndex]})`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="diagnostic-content">
        <div className="section-header">
          <h2 className="section-title">Diagnostic de votre dépendance numérique</h2>
          <p className="section-subtitle">Découvrez votre niveau d'autonomie en 3 questions</p>
        </div>
        
        {!showResult ? (
          <div className="question-container">
            <div className="question-progress">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3>{questions[currentQuestion].question}</h3>
            
            <div className="answers-grid">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswer(answer.impact)}
                >
                  <span className="answer-emoji">{answer.emoji}</span>
                  <span>{answer.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="result-container">
            <div className="result-card">
              <div 
                className="result-image" 
                style={{ 
                  backgroundImage: `url(${getResult().images[resultImageIndex]})`,
                  transition: 'background-image 1s ease-in-out'
                }}
              >
                <div className="result-badge" style={{ backgroundColor: getResult().color }}>
                  {getResult().title.split(' ')[0]}
                </div>
                <div className="image-indicator">
                  {getResult().images.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`dot ${idx === resultImageIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="result-content">
                <h3>{getResult().title}</h3>
                <p>{getResult().description}</p>
                <div className="score-display">
                  <div className="score-value">{score} points</div>
                  <div className="score-label">Niveau de dépendance</div>
                </div>
                <div className="result-actions">
                  <a href="#agir" className="cta-button primary">
                    <ArrowRight size={20} /> Voir ma feuille de route
                  </a>
                  <button 
                    className="cta-button secondary"
                    onClick={() => {
                      setCurrentQuestion(0);
                      setScore(0);
                      setShowResult(false);
                    }}
                  >
                    Refaire le diagnostic
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Composant de témoignages avec rotation ---
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "Au lycée Carnot, nous avons économisé 15 000€ la première année en adoptant NIRD. Nos anciens ordinateurs fonctionnent mieux qu'avant avec Linux !",
      author: "Équipe du Lycée Carnot, Bruay-la-Buissière",
      image: IMAGES.TEACHERS[0]
    },
    {
      quote: "La transition vers Linux a été plus simple que prévu. Nos élèves sont ravis de pouvoir réparer eux-mêmes les ordinateurs !",
      author: "Professeur de technologie, Lyon",
      image: IMAGES.STUDENTS[1]
    },
    {
      quote: "En tant qu'éco-délégué, je suis fier de contribuer à réduire la pollution numérique de notre établissement.",
      author: "Élève éco-délégué, Paris",
      image: IMAGES.TECHS[2]
    }
  ];
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % IMAGES.COMMUNITIES.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div 
      className="testimonial-carousel"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${IMAGES.COMMUNITIES[imageIndex]})`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="testimonial-overlay"></div>
      <div className="testimonial-content">
        <div className="testimonial-slide">
          <div 
            className="testimonial-image"
            style={{ 
              backgroundImage: `url(${testimonials[currentTestimonial].image})`,
              transition: 'background-image 1s ease-in-out'
            }}
          />
          <blockquote>"{testimonials[currentTestimonial].quote}"</blockquote>
          <cite>— {testimonials[currentTestimonial].author}</cite>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  // Hook pour les animations au scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe animate-on-scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => {
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Hook pour l'interaction mobile améliorée
  useEffect(() => {
    // Désactiver le zoom sur double-tap sur mobile
    let lastTouchEnd = 0;
    const preventZoom = (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    document.addEventListener('touchend', preventZoom, false);

    return () => {
      document.removeEventListener('touchend', preventZoom, false);
    };
  }, []);

  return (
    <div className="homepage">
      {/* Navigation */}
      <Navigation />

      {/* 1. HERO SECTION avec carrousel */}
      <section id="accueil" className="hero-section">
        <HeroCarousel images={IMAGES.HERO_CAROUSEL} interval={3000} />
      </section>

      {/* 2. SECTION DÉFI */}
      <section className="challenge-section animate-on-scroll" id="defi">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Le Défi : Windows 10 n'est plus supporté</h2>
          <p className="section-subtitle">
            Des milliers d'ordinateurs scolaires menacés d'obsolescence alors qu'ils fonctionnent encore
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card animate-on-scroll" style={{animationDelay: '0.1s'}}>
            <div className="stat-number">60%</div>
            <div className="stat-label">des établissements dépendent de Windows</div>
          </div>
          <div className="stat-card animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <div className="stat-number">2.5M</div>
            <div className="stat-label">ordinateurs scolaires en France</div>
          </div>
          <div className="stat-card animate-on-scroll" style={{animationDelay: '0.3s'}}>
            <div className="stat-number">80%</div>
            <div className="stat-label">pourraient être reconditionnés</div>
          </div>
          {/* <div className="stat-card animate-on-scroll" style={{animationDelay: '0.4s'}}>
            <div className="stat-number">70%</div>
            <div className="stat-label">d'économie avec le logiciel libre</div>
          </div> */}
        </div>
      </section>

      {/* 3. DIAGNOSTIC INTERACTIF */}
      {/* 4. LES 3 PILIERS */}
      <section className="pillars-section animate-on-scroll" id="piliers">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Les 3 Piliers de la Résistance NIRD</h2>
          <p className="section-subtitle">
            Notre approche holistique pour un numérique éducatif responsable
          </p>
        </div>
        <div className="pillars-grid">
          <PillarCard
            icon={<Users size={32} />}
            title="Numérique Inclusif"
            description="Redonner du pouvoir d'agir aux équipes éducatives et assurer l'accessibilité à tous les élèves, quels que soient leurs besoins."
            color="linear-gradient(135deg, #3b82f6, #8b5cf6)"
            rotationImages={IMAGES.PILLAR_INCLUSIF_ROTATION}
          />
          <PillarCard
            icon={<Shield size={32} />}
            title="Numérique Responsable"
            description="Promouvoir l'éthique, la souveraineté des données et l'utilisation de logiciels libres (Linux) pour plus de transparence."
            color="linear-gradient(135deg, #10b981, #3b82f6)"
            rotationImages={IMAGES.PILLAR_RESPONSABLE_ROTATION}
          />
          <PillarCard
            icon={<Leaf size={32} />}
            title="Numérique Durable"
            description="Lutter contre l'obsolescence programmée par le réemploi et le reconditionnement du matériel, réduire l'impact environnemental."
            color="linear-gradient(135deg, #059669, #10b981)"
            rotationImages={IMAGES.PILLAR_DURABLE_ROTATION}
          />
        </div>
      </section>

      {/* 5. LES HÉROS DU VILLAGE */}
      <section className="village-section">
        <div className="section-header">
          <h2 className="section-title">Les Héros de notre Village</h2>
          <p className="section-subtitle">
            Chaque membre de la communauté scolaire a un rôle à jouer
          </p>
        </div>
        <div className="characters-grid">
          <CharacterCard 
            name="L'Enseignant Forgeron"
            role="Installe Linux et forme les collègues aux outils libres"
            emoji="🛠️"
            rotationImages={IMAGES.TEACHERS}
          />
          <CharacterCard 
            name="L'Élève Éco-délégué"
            role="Sensibilise à la sobriété numérique et anime l'atelier réparation"
            emoji="🌱"
            rotationImages={IMAGES.STUDENTS}
          />
          <CharacterCard 
            name="Le Technicien Résistant"
            role="Réemploie le matériel obsolète et optimise les ressources"
            emoji="💻"
            rotationImages={IMAGES.TECHS}
          />
          {/* <CharacterCard 
            name="Le Principal Visionnaire"
            role="Porte la transition NIRD et mobilise les partenaires"
            emoji="👁️"
            rotationImages={IMAGES.TEACHERS}
          /> */}
        </div>
      </section>
     
      {/* 9. COMMUNAUTÉ */}
      <section className="community-section" id="communaute">
        <div className="community-content">
          <div className="community-header">
            <h2 className="section-title">Rejoignez le Mouvement</h2>
            <p>Plus de 50 établissements ont déjà commencé leur transition</p>
          </div>
          
          <div className="community-stats">
            <div className="community-stat">
              <Users size={40} />
              <div className="stat-content">
                <div className="stat-number">50+</div>
                <div className="stat-label">Établissements</div>
              </div>
            </div>
            <div className="community-stat">
              <MapPin size={40} />
              <div className="stat-content">
                <div className="stat-number">12</div>
                <div className="stat-label">Régions</div>
              </div>
            </div>
            <div className="community-stat">
              <Star size={40} />
              <div className="stat-content">
                <div className="stat-number">500+</div>
                <div className="stat-label">Contributions</div>
              </div>
            </div>
            <div className="community-stat">
              <Award size={40} />
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">Libre</div>
              </div>
            </div>
          </div>
          
          <div className="cta-community">
            <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer" className="cta-button primary large">
              🌐 Accéder à la Forge des Communs
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield size={32} />
              <div>
                <span className="logo-text">NIRD</span>
                <p>Village Numérique Résistant</p>
              </div>
            </div>
            <p className="footer-mission">
              Projet porté par le collectif enseignant NIRD et le Bureau de la Nuit de l'Info 2025
            </p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Le Projet</h4>
              <a href="#apropos">À propos</a>
              <a href="#equipe">Notre équipe</a>
              <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer">Site officiel</a>
              <a href="#partenaires">Partenaires</a>
            </div>
            <div className="footer-column">
              <h4>Ressources</h4>
              <a href="#guides">Guides pratiques</a>
              <a href="#formations">Formations</a>
              <a href="#outils">Outils libres</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-column">
              <h4>Communauté</h4>
              <a href="#forum">Forum d'entraide</a>
              <a href="#evenements">Événements</a>
              <a href="#contribuer">Contribuer</a>
              <a href="#temoignages">Témoignages</a>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <a href="mailto:contact@nird.fr">contact@nird.fr</a>
              <a href="#newsletter">Newsletter</a>
              <a href="#presse">Presse</a>
              <a href="#mentions">Mentions légales</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Collectif NIRD | Projet Nuit de l'Info 2025 | Lycée Carnot de Bruay-la-Buissière</p>
          <div className="license-info">
          </div>
        </div>
      </footer>3
    </div>
  );
};

export default HomePage;