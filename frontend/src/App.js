import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Acceuil/Home';
import ChatbotPage from './Acceuil/ChatbotPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
