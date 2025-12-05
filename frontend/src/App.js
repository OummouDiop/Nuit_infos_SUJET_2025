<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import NIRDQuiz from './Quiz/NIRDQuiz';
function App() {
  return (

      <NIRDQuiz />
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importations des composants de navigation et de page
import Navbar from './Acceuil/Navbar'; // ⬅️ NOUVEAU : Importation du Navbar
import HomePage from './Acceuil/HomePage';
// import DiagnosticPage from './Diagnostic/DiagnosticPage'; 
// import ResourcesPage from './Ressources/ResourcesPage'; 

function App() {
  return (
    // 1. Enveloppez toute l'application dans le Router
    <Router>
      <div className="App">
        
        {/* 2. AJOUT DU NAV BAR : Placé ici pour qu'il soit affiché sur toutes les pages */}
        <Navbar />
        
        <main>
          {/* 3. Définissez les chemins possibles */}
          <Routes>
            {/* Page d'Accueil : Path "/" */}
            <Route path="/" element={<HomePage />} />
            
            {/* Exemple de Route pour le Diagnostic NIRD : Path "/diagnostic" */}
            {/* <Route path="/diagnostic" element={<DiagnosticPage />} /> */}
            
            {/* Exemple de Route pour les Ressources NIRD : Path "/ressources" */}
            {/* <Route path="/ressources" element={<ResourcesPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
>>>>>>> 2f9b40d9c5be6dc66187d1716814efc116687add
  );
}

export default App;