import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composants
import Navbar from './Acceuil/Navbar';
import HomePage from './Acceuil/HomePage';
import NIRDQuiz from './Quiz/NIRDQuiz';
import NirdPage from './Nird/NirdPage';
// import DiagnosticPage from './Diagnostic/DiagnosticPage';
// import ResourcesPage from './Ressources/ResourcesPage';

function App() {
  return (
    <Router>
      <div className="App">

        {/* NAVBAR visible sur toutes les pages */}
        <Navbar />

        <main>
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />

            {/* Quiz NIRD */}
            <Route path="/quiz" element={<NIRDQuiz />} />

            {/* Autres pages si besoin */}
            {/* <Route path="/diagnostic" element={<DiagnosticPage />} /> */}
            {/* <Route path="/ressources" element={<ResourcesPage />} /> */}
            
            {/* Route NIRD */}
            <Route path="/nird" element={<NirdPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
