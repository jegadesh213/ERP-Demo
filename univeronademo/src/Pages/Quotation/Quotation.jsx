import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineDocumentAdd, 
  HiOutlinePencilAlt, 
  HiOutlineEye, 
  HiOutlineDocumentReport, 
  HiArrowRight 
} from 'react-icons/hi';
import './Quotation.css';

function Quotation() {
  const navigate = useNavigate();

  // 4 Modular tiles mapped to standard ERP transaction patterns
  const quotationModules = [
    { 
      name: 'Create Quotation', 
      icon: <HiOutlineDocumentAdd />, 
      path: '/create-quotation', 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Change Quotation', 
      icon: <HiOutlinePencilAlt />, 
      path: '/change-quotation',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Display Quotation', 
      icon: <HiOutlineEye />, 
      path: '/display-quotation',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Quotation Report', 
      icon: <HiOutlineDocumentReport />, 
      path: '/report-quotation',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600' 
    }
  ];

  return (
    <div className="hub-grid-container">
      <div className="q-page-header">
        <h1 className="q-page-title">Quotation Management</h1>
        {/* <p className="q-page-subtitle">Process, edit, display, or generate comprehensive analytical reports for sales quotations</p> */}
      </div>

      <div className="hub-tiles-grid">
        {quotationModules.map((module, i) => (
          <div 
            key={i} 
            className="hub-tile-card image-tile" 
            style={{ '--tile-bg': `url(${module.image})` }}
            onClick={() => navigate(module.path)}
          >
            {/* Blended Glassmorphic Overlay Layer */}
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

export default Quotation;