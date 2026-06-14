import React from 'react';
import { useNavigate } from 'react-router-dom';
// 🛠️ FIXED: Changed HiOutlineDocumentCheck to HiOutlineBadgeCheck
import { 
  HiOutlineShieldCheck, 
  HiOutlineClipboardList, 
  HiOutlineSearchCircle, 
  HiOutlineTrendingUp, 
  HiOutlineBadgeCheck 
} from 'react-icons/hi';
import './Inspection.css';

function Inspection() {
  const navigate = useNavigate();

  const subModules = [
    { 
      name: 'Flash Inspection Report', 
      icon: <HiOutlineSearchCircle />, 
      path: '/flash-inspection',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
    },
    { 
      name: 'Inspection Report', 
      icon: <HiOutlineClipboardList />, 
      path: '/inspection-report',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
    },
    { 
      name: 'Vendor Assessment Report', 
      icon: <HiOutlineShieldCheck />, 
      path: '/vendor-assessment',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600'
    },
    { 
      name: 'Expediting Report', 
      icon: <HiOutlineTrendingUp />, 
      path: '/expediting-report',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600'
    },
    { 
      name: 'Inspection Release Note', 
      /* 🛠️ FIXED: Swapped out tag usage here */
      icon: <HiOutlineBadgeCheck />, 
      path: '/release-note',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="inspect-grid-container">
      <div className="inspect-tiles-grid">
        {subModules.map((module, i) => (
          <div 
            key={i} 
            className="inspect-tile-card image-tile" 
            style={{ '--tile-bg': `url(${module.image})` }}
            onClick={() => navigate(module.path)}
          >
            <div className="tile-image-overlay"></div>

            <div className="inspect-tile-top">
              <div className="inspect-tile-icon-box">
                {module.icon}
              </div>
            </div>
            
            <div className="inspect-tile-content">
              <h3>{module.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inspection;