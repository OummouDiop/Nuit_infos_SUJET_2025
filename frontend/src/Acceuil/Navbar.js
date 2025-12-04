import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Liste des liens de navigation
  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Le Défi', path: '/defi' },
    { name: 'Diagnostic NIRD', path: '/diagnostic' },
    { name: 'Ressources Libres', path: '/ressources' },
    { name: 'Communauté', path: '/communaute' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Titre de l'application NIRD */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          {/* Remplacer par un SVG/Image de la Forge des Communs NIRD */}
          <span className="logo-icon">🛡️</span> NIRD
        </Link>

        {/* Liens de Navigation (Bureau) */}
        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="nav-item">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
       
        {/* Bouton Menu Mobile */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile Déroulant */}
        <div className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links mobile">
            {navLinks.map((link) => (
              <li key={link.name} onClick={() => setIsMenuOpen(false)}>
                <Link to={link.path} className="nav-item">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/diagnostic" className="nav-cta mobile" onClick={() => setIsMenuOpen(false)}>
            Passer à l'action
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;