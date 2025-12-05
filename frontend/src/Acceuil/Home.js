import React from 'react';
import './Home.css';

const Home = () => {
  const goToChatbot = () => {
    // Rediriger vers la page du chatbot
    window.location.href = '/chatbot';
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header avec logo NIRD */}
        <div className="home-header">
          <div className="nird-logo">🌱</div>
          <h1 className="home-title">
            <span className="nird-acronym">NIRD</span>
            <span className="nird-subtitle">Numérique Inclusif, Responsable et Durable</span>
          </h1>
        </div>

        {/* Description */}
        <div className="home-description">
          <p>
            Découvrez une approche responsable du numérique avec notre assistant IA spécialisé 
            dans l'éco-conception, l'accessibilité et la durabilité technologique.
          </p>
        </div>

        {/* Bouton principal */}
        <div className="home-action">
          <button 
            className="chatbot-button"
            onClick={goToChatbot}
          >
            <span className="button-icon">💬</span>
            <span className="button-text">Discuter avec l'Assistant NIRD</span>
          </button>
        </div>

        {/* Footer avec lien officiel */}
        <div className="home-footer">
          <p>
            <a 
              href="https://nird.forge.apps.education.fr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="official-link"
            >
              🔗 Site officiel NIRD
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;