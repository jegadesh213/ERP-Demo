import { useState } from 'react';
// 1. Add 'Navigate' to your react-router-dom imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar.jsx";
import MobileMenu from "./components/MobileMenu/MobileMenu.jsx";
import Order from "./Pages/Order/Order.jsx"; // 2. Import the new Order page
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMiniExpanded, setIsMiniExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMiniSidebar = () => setIsMiniExpanded(!isMiniExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        
        <div className="bg-glow purple"></div>
        <div className="bg-glow blue"></div>

        <Navbar 
          toggleSidebar={toggleSidebar} 
          toggleMiniSidebar={toggleMiniSidebar} 
          toggleMobileMenu={toggleMobileMenu} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
        <MiniSidebar darkMode={darkMode} isExpanded={isMiniExpanded} />
        <MobileMenu isOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} darkMode={darkMode} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<h2 style={{ textAlign: 'center' }}>Home Dashboard</h2>} />
            
            {/* 3. The Redirect: If they go to /sales, instantly send them to /order */}
            <Route path="/sales" element={<Navigate to="/order" replace />} />
            
            {/* The actual Order page where the Sales Dashboard text lives */}
            <Route path="/order" element={<Order />} />
            
            <Route path="/settings" element={<h2 style={{ textAlign: 'center' }}>Settings Page</h2>} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;