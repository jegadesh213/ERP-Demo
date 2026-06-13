import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Swapped out unneeded items for HiOutlineDocumentReport
import { HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineDocumentReport } from 'react-icons/hi';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import './MobileMenu.css';

function MobileMenu({ isOpen, toggleMobileMenu, darkMode }) {
  const location = useLocation();

  // Updated menu array matching Sales Hub operational workspaces
  const menuItems = [
    { id: 1, name: 'Order', icon: <HiOutlineClipboardList />, path: '/order' },
    { id: 2, name: 'To Invoice', icon: <HiOutlineDocumentText />, path: '/invoice' },
    { id: 3, name: 'Quotation', icon: <HiOutlineDocumentReport />, path: '/quotation' },
  ];

  return (
    <>
      <div className={`mobile-menu ${isOpen ? 'open' : ''} ${darkMode ? 'dark-mobile-menu' : 'light-mobile-menu'}`}>
        
        {/* Mobile Header with User Info */}
        <div className="mobile-menu-header">
          <div className="mobile-user-profile">
            <FaUserCircle className="mobile-avatar" />
            <span className="mobile-username">Admin User</span>
          </div>
          <button className="mobile-close-btn" onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
        </div>

        {/* Menu Links */}
        <div className="mobile-menu-links">
          {menuItems.map((item) => (
            <Link 
              to={item.path} 
              key={item.id} 
              className={`mobile-link-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={toggleMobileMenu} // Auto-closes drawer nicely
            >
              <span className="mobile-link-icon">{item.icon}</span>
              <span className="mobile-link-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Background Overlay */}
      {isOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
}

export default MobileMenu;