import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import './NirdPage.css';

function NirdPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'jeu de rol', href: '/roleplaypage' },
    { label: 'problem/solution', href: '/nird' },
    { label: 'chatbot', href: '#piliers' },
  ];
  const problems = [
    { icon: '🗑️', title: 'Obsolescence programmée', description: 'Les équipements deviennent rapidement obsolètes, forçant des achats coûteux' },
    { icon: '⚠️', title: 'Fin du support Windows 10', description: 'Des milliers d\'ordinateurs deviennent inutilisables sans mise à jour payante' },
    { icon: '💰', title: 'Licences coûteuses', description: 'Les écoles dépensent des fortunes en licences propriétaires' },
    { icon: '☁️', title: 'Données hors UE', description: 'Nos données sont stockées sur des serveurs hors Union Européenne' }
  ];

  const objectives = [
    { icon: '👥', title: 'Inclusion', description: 'Rendre le numérique accessible à tous, sans exclusion' },
    { icon: '🛡️', title: 'Responsabilité', description: 'Contrôler nos données et notre infrastructure' },
    { icon: '🌱', title: 'Durabilité', description: 'Prolonger la vie du matériel, réduire les déchets' }
  ];

  const solutions = [
    { icon: '💻', title: 'Passer à Linux', description: 'Un système d\'exploitation libre, gratuit et performant' },
    { icon: '🔧', title: 'Réparation & réemploi', description: 'Donner une seconde vie au matériel existant' },
    { icon: '💾', title: 'Logiciels libres', description: 'Utiliser des alternatives open source aux outils propriétaires' },
    { icon: '🔗', title: 'Mutualisation', description: 'Partager les ressources et les connaissances' }
  ];

  const Card = ({ icon, title, description }) => (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05, y: -8, rotate: 2 }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </motion.div>
  );

  return (
    <div className="nird-page">
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

      {/* Header */}
      <header className="header-blue">
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="header-title">C'est quoi NIRD ?</h1>
          <p className="header-subtitle">Numérique Inclusif, Responsable et Durable</p>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <section>
          <h2 className="section-title problems">Les problèmes actuels</h2>
          <div className="cards-grid">
            {problems.map((p, i) => <Card key={i} {...p} />)}
          </div>
        </section>

        <section>
          <h2 className="section-title">Les objectifs de NIRD</h2>
          <div className="cards-grid">
            {objectives.map((o, i) => <Card key={i} {...o} />)}
          </div>
        </section>

        <section>
          <h2 className="section-title solutions">Les solutions concrètes</h2>
          <div className="cards-grid">
            {solutions.map((s, i) => <Card key={i} {...s} />)}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-blue">
        <p className="footer-title">Village NIRD</p>
        <p>Numérique Inclusif, Responsable et Durable</p>
        <p>Un projet pour la Nuit de l'Info 2025</p>
        <p>© 2025 Village NIRD. Tous droits réservés.</p>
        <p>Projet sous licence libre</p>
      </footer>
    </div>
  );
}

export default NirdPage;
