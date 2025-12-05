import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleplayPage from './pages/RoleplayPage.jsx';  
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/role" element={<Roleplay />} /> */}
        <Route path="/roleplaypage" element={<RoleplayPage />} />
      </Routes>
    </Router>
  );
  
}

export default App;
