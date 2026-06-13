import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineDocumentReport, HiOutlineUsers, HiArrowRight } from 'react-icons/hi';
import './SalesHub.css';

function SalesHub() {
  const navigate = useNavigate();

  const subModules = [
    { 
      name: 'Customer', 
      icon: <HiOutlineUsers />, 
      path: '/customer',
      /* 👉 FIXED: Replaced with a unique, dedicated team/client workspace asset */
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Order', 
      icon: <HiOutlineClipboardList />, 
      path: '/order',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'To Invoice', 
      icon: <HiOutlineDocumentText />, 
      path: '/invoice',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Quotation', 
      icon: <HiOutlineDocumentReport />, 
      path: '/quotation',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600' 
    }
  ];

  return (
    <div className="hub-grid-container">
      <div className="hub-tiles-grid">
        {subModules.map((module, i) => (
          <div 
            key={i} 
            className="hub-tile-card image-tile" 
            style={{ '--tile-bg': `url(${module.image})` }}
            onClick={() => navigate(module.path)}
          >
            <div className="tile-image-overlay"></div>

            <div className="hub-tile-top">
              <div className="hub-tile-icon-box">
                {module.icon}
              </div>
              <HiArrowRight className="hub-tile-arrow" />
            </div>
            
            <div className="hub-tile-content">
              <h3>{module.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesHub;