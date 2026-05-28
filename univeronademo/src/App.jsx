import { useState } from 'react';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 1. Add the darkMode state here
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {/* 2. Pass darkMode and setDarkMode to Navbar */}
      <Navbar 
        toggleSidebar={toggleSidebar} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
      {/* 3. Pass darkMode to Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        darkMode={darkMode} 
      />
    </div>
  );
}

export default App;