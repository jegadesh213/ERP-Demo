import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { LoaderProvider } from './context/LoaderContext';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar.jsx";
import MobileMenu from "./components/MobileMenu/MobileMenu.jsx";
import Home from "./Pages/Home/Home.jsx";
import SalesHub from "./Pages/SalesHub/SalesHub.jsx";
import Order from "./Pages/Order/Order.jsx"; 
import CreateCustomer from "./Pages/CreateCustomer/CreateCustomer.jsx";

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
      <LoaderProvider>
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
              <Route path="/" element={<Home />} />
              
              {/* UPDATED: Path maps cleanly to the new intermediate gateway hub */}
              <Route path="/sales" element={<SalesHub />} />
              
              <Route path="/order" element={<Order />} />
              <Route path="/create-customer" element={<CreateCustomer />} />
              <Route path="/settings" element={<h2 style={{ textAlign: 'center' }}>Settings Page</h2>} />
              <Route path="/inspection" element={<h2 style={{ textAlign: 'center', color: 'white' }}>Inspection Module</h2>} />
              
              {/* Fallback empty routes to prevent breaks on click */}
              <Route path="/invoice" element={<h2 style={{ textAlign: 'center', color: 'white' }}>Invoices List</h2>} />
              <Route path="/quotation" element={<h2 style={{ textAlign: 'center', color: 'white' }}>Quotations List</h2>} />
            </Routes>
          </div>

        </div>
      </LoaderProvider>
    </Router>
  );
}

export default App;