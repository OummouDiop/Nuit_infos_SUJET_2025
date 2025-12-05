import React, { useState } from 'react';
import './HomePage.css';
import { Shield, Zap, Leaf, Menu, X, Users, Trophy, Star, CheckCircle, Play, Award, MapPin, Heart, Globe, Download, ChevronRight, ArrowRight } from 'lucide-react';

const PillarCard = ({ icon, title, description, color, image }) => (
  <div className="pillar-card">
    <div className="pillar-image" style={{ backgroundImage: `url(${image})` }}>
      <div className="pillar-icon-container" style={{ background: color }}>
        {icon}
      </div>
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

const MediaCard = ({ title, type, duration, link, source, thumbnail }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="media-card">
    <div className="media-thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}>
      <div className="media-play">▶</div>
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

const CharacterCard = ({ name, role, emoji, image }) => (
  <div className="character-card">
    <div className="character-image" style={{ backgroundImage: `url(${image})` }}>
      <div className="character-emoji">{emoji}</div>
    </div>
    <div className="character-content">
      <h4>{name}</h4>
      <p>{role}</p>
    </div>
  </div>
);

const ActionStep = ({ number, title, description, completed, image }) => (
  <div className="action-step">
    <div className="step-image" style={{ backgroundImage: `url(${image})` }}>
      <span className="step-number">{number}</span>
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

// Images libres de droit (Unsplash avec des URLs spécifiques)
const IMAGES = {
  HERO: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&q=80', // Village
  DIAGNOSTIC: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-1600&q=80', // Analyse
  PILLAR_INCLUSIF: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', // Équipe éducative
  PILLAR_RESPONSABLE: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80', // Code libre
  PILLAR_DURABLE: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', // Réparation
  CHARACTER_TEACHER: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80', // Enseignant
  CHARACTER_STUDENT: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=600&q=80', // Étudiant
  CHARACTER_TECH: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', // Technicien
  CHARACTER_PRINCIPAL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', // Principal
  LINUX: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80', // Linux
  COMMUNITY: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80', // Communauté
  WORKSHOP: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', // Atelier
  SCHOOL: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80', // École
  RECYCLING: 'https://images.unsplash.com/photo-1575408264798-b50b252663e6?w=800&q=80', // Recyclage
  VIDEO_THUMB: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', // Vidéo thumb
  ACTION_INVENTORY: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Inventaire
  ACTION_TEST: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', // Test
  ACTION_TEAM: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Équipe
  ACTION_RECONDITION: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80', // Reconditionnement
};

// --- Composant Navigation ---
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Le Défi', href: '#defi' },
    { label: 'Diagnostic', href: '#diagnostic' },
    { label: 'Les 3 Piliers', href: '#piliers' },
    { label: 'Ressources', href: '#ressources' },
    { label: 'Agir', href: '#agir' },
    { label: 'Communauté', href: '#communaute' },
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

        <div className="nav-cta-desktop">
          <a href="#diagnostic" className="nav-button">
            <Zap size={16} /> Diagnostic gratuit
          </a>
        </div>

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
          <div className="mobile-cta">
            <a href="#diagnostic" className="mobile-nav-button">
              <Zap size={16} /> Commencer le diagnostic
            </a>
          </div>
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
      image: IMAGES.LINUX
    };
    if (percentage < 70) return {
      title: "Résistant en Marche ⚡",
      description: "Vous êtes sur la bonne voie ! Quelques ajustements vous rendront plus autonome.",
      color: "#3b82f6",
      image: IMAGES.WORKSHOP
    };
    return {
      title: "Géant Dépendant 🏰",
      description: "Les Big Tech dominent votre écosystème. Il est temps de reprendre le contrôle !",
      color: "#ef4444",
      image: IMAGES.SCHOOL
    };
  };

  return (
    <div className="diagnostic-game" id="diagnostic" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${IMAGES.DIAGNOSTIC})` }}>
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
              <div className="result-image" style={{ backgroundImage: `url(${getResult().image})` }}>
                <div className="result-badge" style={{ backgroundColor: getResult().color }}>
                  {getResult().title.split(' ')[0]}
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

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <Navigation />

      {/* 1. HERO SECTION */}
      <header 
        className="hero-section" 
        id="accueil"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${IMAGES.HERO})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
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
              <Zap size={20} /> Commencer le diagnostic gratuit
            </a>
            <a href="#video" className="cta-button secondary">
              <Play size={20} /> Voir la vidéo de présentation
            </a>
          </div>
        </div>
      </header>

      {/* 2. SECTION DÉFI */}
      <section className="challenge-section" id="defi">
        <div className="section-header">
          <h2 className="section-title">Le Défi : Windows 10 n'est plus supporté</h2>
          <p className="section-subtitle">
            Des milliers d'ordinateurs scolaires menacés d'obsolescence alors qu'ils fonctionnent encore
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">60%</div>
            <div className="stat-label">des établissements dépendent de Windows</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2.5M</div>
            <div className="stat-label">ordinateurs scolaires en France</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">80%</div>
            <div className="stat-label">pourraient être reconditionnés</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">70%</div>
            <div className="stat-label">d'économie avec le logiciel libre</div>
          </div>
        </div>

        <div className="challenge-visual">
          <div className="visual-left">
            <div className="problem-card">
              <h4>Le Problème</h4>
              <ul>
                <li>✅ Ordinateur fonctionnel</li>
                <li>❌ Windows 10 non supporté</li>
                <li>🚫 Obligé de jeter</li>
                <li>💰 Coût de remplacement : 500€</li>
              </ul>
            </div>
          </div>
          <div className="visual-arrow">⟶</div>
          <div className="visual-right">
            <div className="solution-card">
              <h4>La Solution NIRD</h4>
              <ul>
                <li>✅ Ordinateur fonctionnel</li>
                <li>✅ Installation de Linux</li>
                <li>✅ Reconditionné</li>
                <li>💰 Économie : 500€</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIAGNOSTIC INTERACTIF */}
      <DiagnosticGame />

      {/* 4. LES 3 PILIERS */}
      <section className="pillars-section" id="piliers">
        <div className="section-header">
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
            image={IMAGES.PILLAR_INCLUSIF}
          />
          <PillarCard
            icon={<Shield size={32} />}
            title="Numérique Responsable"
            description="Promouvoir l'éthique, la souveraineté des données et l'utilisation de logiciels libres (Linux) pour plus de transparence."
            color="linear-gradient(135deg, #10b981, #3b82f6)"
            image={IMAGES.PILLAR_RESPONSABLE}
          />
          <PillarCard
            icon={<Leaf size={32} />}
            title="Numérique Durable"
            description="Lutter contre l'obsolescence programmée par le réemploi et le reconditionnement du matériel, réduire l'impact environnemental."
            color="linear-gradient(135deg, #059669, #10b981)"
            image={IMAGES.PILLAR_DURABLE}
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
            image={IMAGES.CHARACTER_TEACHER}
          />
          <CharacterCard 
            name="L'Élève Éco-délégué"
            role="Sensibilise à la sobriété numérique et anime l'atelier réparation"
            emoji="🌱"
            image={IMAGES.CHARACTER_STUDENT}
          />
          <CharacterCard 
            name="Le Technicien Résistant"
            role="Réemploie le matériel obsolète et optimise les ressources"
            emoji="💻"
            image={IMAGES.CHARACTER_TECH}
          />
          <CharacterCard 
            name="Le Principal Visionnaire"
            role="Porte la transition NIRD et mobilise les partenaires"
            emoji="👁️"
            image={IMAGES.CHARACTER_PRINCIPAL}
          />
        </div>
      </section>

      {/* 6. PARCOURS VISUEL */}
      <section className="journey-section" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${IMAGES.COMMUNITY})` }}>
        <div className="journey-overlay"></div>
        <div className="journey-content">
          <h2 className="section-title">Votre Parcours vers l'Autonomie</h2>
          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-icon">1</div>
              <div className="step-content">
                <h3>Comprendre</h3>
                <p>Diagnostiquer votre dépendance numérique actuelle</p>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-icon">2</div>
              <div className="step-content">
                <h3>Réemployer</h3>
                <p>Redonner vie à votre matériel avec des solutions libres</p>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-icon">3</div>
              <div className="step-content">
                <h3>Libérer</h3>
                <p>Adopter Linux et les outils numériques responsables</p>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step final">
              <div className="step-icon">4</div>
              <div className="step-content">
                <h3>Contribuer</h3>
                <p>Rejoindre et enrichir la communauté NIRD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESSOURCES MULTIMÉDIAS */}
      <section className="media-section" id="ressources">
        <div className="section-header">
          <h2 className="section-title">Ressources pour Comprendre le Combat</h2>
          <p className="section-subtitle">
            Reportages et témoignages sur la résistance numérique
          </p>
        </div>
        <div className="media-grid">
          <MediaCard 
            title="Windows 11 : l'alternative des logiciels libres"
            type="vidéo" 
            duration="2 min"
            link="https://video.echirolles.fr/w/hVykGUtRZqRenBeiutqRvQ"
            source="France 3 Alpes"
            thumbnail={IMAGES.VIDEO_THUMB}
          />
          <MediaCard 
            title="Mises à jour Windows et obsolescence programmée"
            type="audio" 
            duration="4 min"
            link="https://www.radiofrance.fr/francéniter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octo-bre-2025-4136495"
            source="France Inter"
            thumbnail={IMAGES.VIDEO_THUMB}
          />
          <MediaCard 
            title="L'État obligé de jeter des milliers d'ordinateurs ?"
            type="vidéo" 
            duration="3 min"
            link="https://www.youtube.com/watch?v=7GT8oubek-c"
            source="France Info"
            thumbnail={IMAGES.VIDEO_THUMB}
          />
        </div>
      </section>

      {/* 8. FEUILLE DE ROUTE */}
      <section className="action-section" id="agir">
        <div className="section-header">
          <h2 className="section-title">Votre Feuille de Route Résistante</h2>
          <p className="section-subtitle">
            Un plan d'action concret en 4 étapes
          </p>
        </div>
        <div className="action-steps">
          <ActionStep 
            number="1"
            title="Faire l'inventaire"
            description="Recenser votre parc informatique et identifier les équipements obsolètes"
            completed={false}
            image={IMAGES.ACTION_INVENTORY}
          />
          <ActionStep 
            number="2"
            title="Tester Linux"
            description="Installer une distribution éducative sur une machine test"
            completed={false}
            image={IMAGES.ACTION_TEST}
          />
          <ActionStep 
            number="3"
            title="Former une équipe"
            description="Mobiliser enseignants, élèves et techniciens"
            completed={false}
            image={IMAGES.ACTION_TEAM}
          />
          <ActionStep 
            number="4"
            title="Reconditionner"
            description="Donner une seconde vie aux ordinateurs avec Linux"
            completed={false}
            image={IMAGES.ACTION_RECONDITION}
          />
        </div>
        
        <div className="download-section">
          <a href="#" className="download-button">
            <Download size={20} /> Télécharger le kit complet (PDF)
          </a>
          <p className="download-note">Inclus : guides, checklist, modèles de communication</p>
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
            <a href="#contact" className="cta-button secondary">
              ✉️ Nous contacter
            </a>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-content">
              <blockquote>
                "Au lycée Carnot, nous avons économisé 15 000€ la première année en adoptant NIRD. 
                Nos anciens ordinateurs fonctionnent mieux qu'avant avec Linux !"
              </blockquote>
              <cite>— Équipe du Lycée Carnot, Bruay-la-Buissière</cite>
            </div>
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
            <div className="license-item">
              <Heart size={16} />
              <span>Logiciel Libre sous licence AGPL v3.0</span>
            </div>
            <div className="license-item">
              <Globe size={16} />
              <a href="https://github.com/votre-equipe/nird-nuit-info-2025" target="_blank" rel="noopener noreferrer">
                Code source disponible
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;