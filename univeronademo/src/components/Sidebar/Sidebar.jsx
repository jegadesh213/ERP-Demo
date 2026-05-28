import React from 'react';
import { FaShoppingCart, FaCog, FaTimes } from 'react-icons/fa';// Importing ERP-style icons
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, darkMode }) {
  
  const erpModules = [
    { id: 1, title: 'Sales', icon: <FaShoppingCart /> },
    { id: 2, title: 'Settings', icon: <FaCog /> }
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark-sidebar' : 'light-sidebar'}`}>
        
        {/* Header with Close Button */}
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Tile Grid Container */}
        <div className="tile-container">
          {erpModules.map((mod) => (
            <button key={mod.id} className="tile-btn">
              <span className="tile-icon">{mod.icon}</span>
              <span className="tile-title">{mod.title}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Clickable Background Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;