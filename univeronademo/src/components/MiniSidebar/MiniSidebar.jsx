import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Added HiOutlineUsers for the Customer profile logo icon
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineDocumentReport } from 'react-icons/hi';
import './MiniSidebar.css';

function MiniSidebar({ darkMode, isExpanded }) {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/sales') return null;

  const menuItems = [
    { id: 1, name: 'Customer', icon: <HiOutlineUsers />, path: '/customer' },
    { id: 2, name: 'Order', icon: <HiOutlineClipboardList />, path: '/order' },
    { id: 3, name: 'To Invoice', icon: <HiOutlineDocumentText />, path: '/invoice' },
    { id: 4, name: 'Quotation', icon: <HiOutlineDocumentReport />, path: '/quotation' },
  ];

  return (
    <div className={`mini-sidebar ${darkMode ? 'dark-mini' : 'light-mini'} ${isExpanded ? 'expanded' : ''}`}>
      <div className="mini-sidebar-icons">
        {menuItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.id} 
            className={`icon-btn ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon-wrapper">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
            
            {/* Custom Tooltip that pops out on hover */}
            {!isExpanded && <span className="tooltip">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MiniSidebar;