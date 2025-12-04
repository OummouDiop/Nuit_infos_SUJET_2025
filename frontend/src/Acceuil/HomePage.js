import React from 'react';
import './HomePage.css';
import { Shield, Zap, Leaf } from 'lucide-react'; // Utilisation d'icônes modernes

// --- Composants Modulaires ---

const PillarCard = ({ icon, title, description }) => (
  <div className="pillar-card">
    <div className="pillar-icon-container">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href="#en-savoir-plus" className="card-link">Découvrir →</a>
  </div>
);

const HomePage = () => {
  return (
    <div className="homepage">
      {/* 1. HERO SECTION : Le Défi */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>🛡️ Le Village Numérique Résistant</h1>
          <h2>Contrez l'obsolescence et la dépendance : Adoptez NIRD.</h2>
          <p>
            Face à l'empire numérique des Big Tech, l'École peut devenir un village ingénieux, 
            autonome et créatif. Découvrez comment réduire vos dépendances 
            numériques, étape par étape.
          </p>
          <a href="#diagnostic" className="cta-button primary">
            Commencer le Diagnostic NIRD Gratuit
          </a>
        </div>
        <div className="hero-visual">
          {/* Remplacer par une illustration libre de droit d'un village ou d'un castor/forgeron  */}
        </div>
      </header>

      {/* 2. PILLARS SECTION : Les Fondations NIRD */}
      <section className="pillars-section">
        <h2 className="section-title">Notre Force : Les 3 Piliers de NIRD</h2>
        <div className="pillars-grid">
          <PillarCard
            icon={<Shield size={48} />}
            title="Numérique Inclusif"
            description="Redonner du pouvoir d'agir aux équipes éducatives et assurer l'accessibilité à tous."
          />
          <PillarCard
            icon={<Zap size={48} />}
            title="Numérique Responsable"
            description="Promouvoir l'éthique, la souveraineté des données et l'utilisation de logiciels libres (Linux)."
          />
          <PillarCard
            icon={<Leaf size={48} />}
            title="Numérique Durable"
            description="Lutter contre l'obsolescence programmée par le réemploi et le reconditionnement du matériel."
          />
        </div>
      </section>

      {/* 3. GAMIFICATION SECTION : Le Parcours de Transition */}
      <section className="gamification-section" id="diagnostic">
        <h2 className="section-title">Entrez dans la Résistance en 4 Étapes</h2>
        <div className="step-container">
          <div className="step-item">
            <span className="step-number">1</span>
            <h3>Comprendre</h3>
            <p>Diagnostiquez votre niveau de dépendance actuel.</p>
          </div>
          <div className="step-separator">→</div>
          <div className="step-item">
            <span className="step-number">2</span>
            <h3>Réemployer</h3>
            <p>Trouvez des solutions pour donner une seconde vie à votre matériel.</p>
          </div>
          <div className="step-separator">→</div>
          <div className="step-item">
            <span className="step-number">3</span>
            <h3>Adopter le Libre</h3>
            <p>Découvrez les outils et les ressources libres et autonomes.</p>
          </div>
          <div className="step-separator">→</div>
          <div className="step-item final">
            <span className="step-number">4</span>
            <h3>Contribuer</h3>
            <p>Rejoignez la communauté NIRD pour mutualiser les efforts.</p>
          </div>
        </div>
        <a href="#diagnostic" className="cta-button secondary">
          Je veux rendre mon établissement autonome
        </a>
      </section>

      {/* 4. FOOTER (ou une section de conclusion simple) */}
      <footer className="footer-section">
        <p>© 2025 Collectif NIRD | Projet Nuit de l'Info | Licence Libre (Open Source)</p>
      </footer>
    </div>
  );
};

export default HomePage;