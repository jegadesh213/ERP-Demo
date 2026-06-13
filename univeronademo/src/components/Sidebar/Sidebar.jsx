import React from 'react';
import { useNavigate } from 'react-router-dom';
// Swapped FaShoppingCart for the cleaner Hi icon packs to match your landing page dashboard theme
import { HiOutlineTrendingUp, HiOutlineShieldCheck, HiOutlineCog } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, darkMode }) {
  const navigate = useNavigate();

  // Updated array: Included both Sales and Inspection with their matching logos
  const erpModules = [
    { id: 1, title: 'Sales', icon: <HiOutlineTrendingUp />, path: '/sales' },
    { id: 2, title: 'Inspection', icon: <HiOutlineShieldCheck />, path: '/inspection' },
    { id: 3, title: 'Settings', icon: <HiOutlineCog />, path: '/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark-sidebar' : 'light-sidebar'}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <div className="tile-container">
          {erpModules.map((mod) => (
            <button key={mod.id} className="tile-btn" onClick={() => handleNavigation(mod.path)}>
              <span className="tile-icon">{mod.icon}</span>
              <span className="tile-title">{mod.title}</span>
            </button>
          ))}
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;