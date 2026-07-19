import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiOutlineUsers, 
  HiOutlineClipboardList, 
  HiOutlineDocumentText, 
  HiOutlineDocumentReport, 
  HiOutlineBadgeCheck, 
  HiOutlineDocumentAdd, 
  HiOutlinePencilAlt, 
  HiOutlineEye 
} from 'react-icons/hi';
import { MdOutlineFactCheck, MdOutlineAssessment, MdOutlineSpeed } from 'react-icons/md';
import './MiniSidebar.css';

function MiniSidebar({ darkMode, isExpanded }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. ESCAPE GUARDIAN: Hide completely on main grid selection screens
  if (
    currentPath === '/' || 
    currentPath === '/sales' || 
    currentPath === '/inspection' ||
    currentPath === '/purchase-order'
  ) {
    return null;
  }

  // 2. CONFIG SET A: SalesHub Core Content Bundle
  const salesHubItems = [
    { id: 1, name: 'Customer', icon: <HiOutlineUsers />, path: '/customer' },
    { id: 2, name: 'Quotation', icon: <HiOutlineDocumentReport />, path: '/quotation' },
    { id: 3, name: 'Order', icon: <HiOutlineClipboardList />, path: '/order' },
    { id: 4, name: 'To Invoice', icon: <HiOutlineDocumentText />, path: '/invoice' },
  ];

  // 3. CONFIG SET B: Inspection Module Workspace Bundle
  const inspectionItems = [
    { id: 1, name: 'Flash Inspection', icon: <MdOutlineFactCheck />, path: '/flash-inspection' },
    { id: 2, name: 'Inspection Report', icon: <HiOutlineClipboardList />, path: '/inspection-report' },
    { id: 3, name: 'Vendor Assessment', icon: <MdOutlineAssessment />, path: '/vendor-assessment' },
    { id: 4, name: 'Expediting Report', icon: <MdOutlineSpeed />, path: '/expediting-report' },
    { id: 5, name: 'Inspection Release Note', icon: <HiOutlineBadgeCheck />, path: '/release-note' },
  ];

  // 4. 📑 CONFIG SET C: NEW Modular Quotation Workspace Bundle
  const quotationItems = [
    { id: 1, name: 'Create Quotation', icon: <HiOutlineDocumentAdd />, path: '/create-quotation', state: { mode: 'create' } },
    { id: 2, name: 'Change Quotation', icon: <HiOutlinePencilAlt />, path: '/change-quotation', state: { mode: 'change' } },
    { id: 3, name: 'Display Quotation', icon: <HiOutlineEye />, path: '/display-quotation', state: { mode: 'display' } },
    { id: 4, name: 'Quotation Report', icon: <HiOutlineDocumentReport />, path: '/quotation-report', state: {} },
  ];

  // 5. DETECTOR LAYER: Evaluate Workspace Context Matches
  const isInspectionWorkspace = [
    '/flash-inspection', 
    '/inspection-report', 
    '/vendor-assessment', 
    '/expediting-report',
    '/release-note'
  ].includes(currentPath);

  const isQuotationWorkspace = [
    // '/quotation',
    '/create-quotation',
    '/change-quotation',
    '/display-quotation',
    '/quotation-report'
  ].includes(currentPath);

  // Determine active dataset based on context priority maps
  let activeMenuItems = salesHubItems;
  if (isInspectionWorkspace) {
    activeMenuItems = inspectionItems;
  } else if (isQuotationWorkspace) {
    activeMenuItems = quotationItems;
  }

  return (
    <div className={`mini-sidebar ${darkMode ? 'dark-mini' : 'light-mini'} ${isExpanded ? 'expanded' : ''}`}>
      <div className="mini-sidebar-icons">
        {activeMenuItems.map((item) => (
          <Link 
            to={item.path} 
            state={item.state} /* Safely passes the tracking modes parameters down onto forms */
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