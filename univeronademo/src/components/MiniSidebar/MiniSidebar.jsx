import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineCube, HiOutlineAdjustments, HiOutlineCog } from 'react-icons/hi';
import './MiniSidebar.css';

function MiniSidebar({ darkMode, isExpanded }) {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const menuItems = [
    { id: 1, name: 'Order', icon: <HiOutlineClipboardList />, path: '/order' },
    { id: 2, name: 'To Invoice', icon: <HiOutlineDocumentText />, path: '/invoice' },
    { id: 3, name: 'Products', icon: <HiOutlineCube />, path: '/products' },
    { id: 4, name: 'Configurations', icon: <HiOutlineAdjustments />, path: '/configurations' },
    { id: 5, name: 'Settings', icon: <HiOutlineCog />, path: '/settings' },
  ];

  return (
    <div className={`mini-sidebar ${darkMode ? 'dark-mini' : 'light-mini'} ${isExpanded ? 'expanded' : ''}`}>
      <div className="mini-sidebar-icons">
        {menuItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.id} 
            className={`icon-btn ${location.pathname === item.path ? 'active' : ''}`}
            // Removed the native 'title' attribute from here!
          >
            <span className="icon-wrapper">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
            
            {/* Custom Tooltip: Only exists when the sidebar is collapsed */}
            {!isExpanded && <span className="tooltip">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MiniSidebar;