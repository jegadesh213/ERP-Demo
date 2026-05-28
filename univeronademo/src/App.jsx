import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar.jsx"; // 1. Import it
import Sales from "./Pages/Sales/Sales.jsx"; 
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  // 1. Add the new state for the Mini Sidebar
  const [isMiniExpanded, setIsMiniExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // 2. Create the toggle function
  const toggleMiniSidebar = () => setIsMiniExpanded(!isMiniExpanded);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        
        <div className="bg-glow purple"></div>
        <div className="bg-glow blue"></div>

        {/* 3. Pass toggleMiniSidebar to the Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          toggleMiniSidebar={toggleMiniSidebar} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
        
        {/* 4. Pass isExpanded down to the Mini Sidebar */}
        <MiniSidebar darkMode={darkMode} isExpanded={isMiniExpanded} />

        <div className="main-content">
          {/* ... your routes stay the same */}
        </div>

      </div>
    </Router>
  );
}

export default App;