// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RoleplayPage from './pages/RoleplayPage.jsx';  
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/role" element={<Roleplay />} /> */}
//         <Route path="/roleplaypage" element={<RoleplayPage />} />
//       </Routes>
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleplayPage from './pages/RoleplayPage.jsx';  
// Composants
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
            <Route path="/roleplaypage" element={<RoleplayPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
  
}

export default App;
