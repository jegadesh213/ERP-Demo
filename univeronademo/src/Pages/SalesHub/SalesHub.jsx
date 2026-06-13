import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineDocumentReport, HiArrowRight } from 'react-icons/hi';
import './SalesHub.css';

function SalesHub() {
  const navigate = useNavigate();

  const subModules = [
    { 
      name: 'Order', 
      icon: <HiOutlineClipboardList />, 
      path: '/order',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' // Smooth logistics/order asset
    },
    { 
      name: 'To Invoice', 
      icon: <HiOutlineDocumentText />, 
      path: '/invoice',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' // Premium financial ledger asset
    },
    { 
      name: 'Quotation', 
      icon: <HiOutlineDocumentReport />, 
      path: '/quotation',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600' // Clean business contract asset
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
            {/* Dark tint overlay layer to keep text perfectly legible */}
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