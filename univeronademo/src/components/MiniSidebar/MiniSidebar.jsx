import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineDocumentReport, HiOutlineBadgeCheck } from 'react-icons/hi';
// Added fresh analytical icons for the report/inspection tracks
import { MdOutlineFactCheck, MdOutlineAssessment, MdOutlineSpeed } from 'react-icons/md';
import './MiniSidebar.css';

function MiniSidebar({ darkMode, isExpanded }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. ESCAPE GUARDIAN: Hide completely on main grid selection screens (Matches your rules)
  if (
    currentPath === '/' || 
    currentPath === '/sales' || 
    currentPath === '/inspection'
  ) {
    return null;
  }

  // 2. CONFIG SET A: SalesHub Content Bundle
  const salesHubItems = [
    { id: 1, name: 'Customer', icon: <HiOutlineUsers />, path: '/customer' },
    { id: 2, name: 'Order', icon: <HiOutlineClipboardList />, path: '/order' },
    { id: 3, name: 'To Invoice', icon: <HiOutlineDocumentText />, path: '/invoice' },
    { id: 4, name: 'Quotation', icon: <HiOutlineDocumentReport />, path: '/quotation' },
  ];

  // 3. CONFIG SET B: Inspection Content Bundle (Parsed directly for your reports)
  const inspectionItems = [
    { id: 1, name: 'Flash Inspection', icon: <MdOutlineFactCheck />, path: '/flash-inspection' },
    { id: 2, name: 'Inspection Report', icon: <HiOutlineClipboardList />, path: '/inspection-report' },
    { id: 3, name: 'Vendor Assessment', icon: <MdOutlineAssessment />, path: '/vendor-assessment' },
    { id: 4, name: 'Expediting Report', icon: <MdOutlineSpeed />, path: '/expediting-report' },
    { id: 5, name: 'Inspection Release Note', icon: <HiOutlineBadgeCheck />, path: '/inspection-release-note' },
  ];

  // 4. DETECTOR LAYER: Switch tracking array if route maps to an inspection module
  const isInspectionWorkspace = [
    '/flash-inspection', 
    '/inspection-report', 
    '/vendor-assessment', 
    '/expediting-report',
    '/inspection-release-note'
  ].includes(currentPath);

  const activeMenuItems = isInspectionWorkspace ? inspectionItems : salesHubItems;

  return (
    <div className={`mini-sidebar ${darkMode ? 'dark-mini' : 'light-mini'} ${isExpanded ? 'expanded' : ''}`}>
      <div className="mini-sidebar-icons">
        {activeMenuItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.id} 
            className={`icon-btn ${currentPath === item.path ? 'active' : ''}`}
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