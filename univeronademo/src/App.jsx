import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 1. Import Router
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Sales from "./Pages/Sales/Sales.jsx"; // 2. Import your new page
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // 3. Wrap everything in the Router
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        
        {/* Navbar and Sidebar stay outside of Routes so they never disappear */}
        <Navbar toggleSidebar={toggleSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />

        {/* 4. Main Content Area where pages will swap out */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h2>Home Dashboard</h2>} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/settings" element={<h2>Settings Page</h2>} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;