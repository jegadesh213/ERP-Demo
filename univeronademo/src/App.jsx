import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Sales from "./Pages/Sales/Sales.jsx";
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        
        {/* Glow Backgrounds */}
        <div className="bg-glow purple"></div>
        <div className="bg-glow blue"></div>

        {/* Global Components */}
        <Navbar toggleSidebar={toggleSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />

        {/* Page Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h2 style={{ textAlign: 'center' }}>Home Dashboard</h2>} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/settings" element={<h2 style={{ textAlign: 'center' }}>Settings Page</h2>} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;