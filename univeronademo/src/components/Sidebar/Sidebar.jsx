import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Added HiOutlineDocumentText to match your clean dashboard icon pack theme
import { HiOutlineTrendingUp, HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineCog } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, darkMode }) {
  const navigate = useNavigate();

  // 2. Added the Purchase Order module into the data loop array
  const erpModules = [
    { id: 1, title: 'Sales', icon: <HiOutlineTrendingUp />, path: '/sales' },
    { id: 2, title: 'Inspection', icon: <HiOutlineShieldCheck />, path: '/inspection' },
    { id: 3, title: 'Purchase Order', icon: <HiOutlineDocumentText />, path: '/purchase-order' },
    { id: 4, title: 'Settings', icon: <HiOutlineCog />, path: '/settings' }
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