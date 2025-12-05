import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleplayPage from './pages/RoleplayPage.jsx';  
// Composants
import HomePage from './Acceuil/HomePage';
import ResistantDigitalVillageQuiz from './Quiz/ResistantDigitalVillageQuiz.jsx';
import NirdPage from './Nird/NirdPage';
import Chatbot from './chatbot/Chatbot';
// import DiagnosticPage from './Diagnostic/DiagnosticPage';
// import ResourcesPage from './Ressources/ResourcesPage';

function App() {
  return (
    <Router>
      <div className="App">

        {/* NAVBAR visible sur toutes les pages */}

        <main>
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />

            {/* Quiz NIRD */}
            
            <Route path="/quiz" element={<ResistantDigitalVillageQuiz />} />

            {/* Autres pages si besoin */}
            {/* <Route path="/diagnostic" element={<DiagnosticPage />} /> */}
            {/* <Route path="/ressources" element={<ResourcesPage />} /> */}
            
            {/* Route NIRD */}
            <Route path="/nird" element={<NirdPage />} />
            <Route path="/roleplaypage" element={<RoleplayPage />} />
            
            {/* Route Chatbot */}
            <Route path="/chatbot" element={<Chatbot isFullPage={true} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
  
}

export default App;
