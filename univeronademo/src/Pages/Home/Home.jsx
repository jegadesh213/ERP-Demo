import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineTrendingUp, HiOutlineShieldCheck } from 'react-icons/hi';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="minimal-home-container">
      <div className="minimal-tiles-grid">
        
        {/* Sales Tile */}
        <div className="minimal-tile" onClick={() => navigate('/sales')}>
          <div className="minimal-icon-circle">
            <HiOutlineTrendingUp className="minimal-icon" />
          </div>
          <h3 className="minimal-tile-label">Sales</h3>
        </div>

        {/* Inspection Tile */}
        <div className="minimal-tile" onClick={() => navigate('/inspection')}>
          <div className="minimal-icon-circle">
            <HiOutlineShieldCheck className="minimal-icon" />
          </div>
          <h3 className="minimal-tile-label">Inspection</h3>
        </div>

      </div>
    </div>
  );
}

export default Home;