import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import './PurchaseOrder.css';

function PurchaseOrder() {
  const navigate = useNavigate();

  const subModules = [
    { 
      name: 'Vendor', 
      icon: <HiOutlineUserGroup />, 
      path: '/vendor',
      // Premium industrial transport background matching your aesthetic
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="po-grid-container">
      <div className="po-tiles-grid">
        {subModules.map((module, i) => (
          <div 
            key={i} 
            className="po-tile-card image-tile" 
            style={{ '--tile-bg': `url(${module.image})` }}
            onClick={() => navigate(module.path)}
          >
            <div className="tile-image-overlay"></div>

            <div className="po-tile-top">
              <div className="po-tile-icon-box">
                {module.icon}
              </div>
            </div>
            
            <div className="po-tile-content">
              <h3>{module.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseOrder;