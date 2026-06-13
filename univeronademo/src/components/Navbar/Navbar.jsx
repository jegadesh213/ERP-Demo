import React from "react";
import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { FaUserCircle, FaMoon, FaSun, FaBars, FaArrowLeft } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar, toggleMiniSidebar, toggleMobileMenu, darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper condition: returns true ONLY if we are on the Home Page or the Sales Hub Page
  const hideHamburger = location.pathname === "/" || location.pathname === "/sales";

  return (
    <>
      {/* ===================================
          DESKTOP NAVBAR
      =================================== */}
      <nav className="navbar navbar-animation">
        <div className="logo-section logo-animation">
          
          {/* Back Button (Far Left) */}
          <button 
            className="nav-back-btn" 
            onClick={() => navigate(-1)} 
            title="Go Back"
          >
            <FaArrowLeft />
          </button>

          {/* UPDATED: Hamburger will hide completely (return null) on / and /sales */}
          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMiniSidebar} />
          )}

          <HiOutlineViewGrid className="menu-icon" onClick={toggleSidebar} />
          
          <Link to="/">
            <img src={Mainlogo} alt="Logo" className="main-logo" />
          </Link>
          
        </div>

        <div className="right-section icon-animation">
          <FaUserCircle className="user-icon" />
          <div className={darkMode ? "toggle dark-toggle" : "toggle light-toggle"} onClick={() => setDarkMode(!darkMode)}>
            <div className={darkMode ? "toggle-circle dark-circle" : "toggle-circle light-circle"}>
              {darkMode ? <FaMoon /> : <FaSun />}
            </div>
          </div>
        </div>
      </nav>

      {/* ===================================
          MOBILE BOTTOM NAVBAR 
      =================================== */}
      <div className="mobile-navbar">
        <div className="mobile-left">
          
          {/* UPDATED: Mobile Hamburger will also hide completely on / and /sales */}
          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMobileMenu} />
          )}

          <div className="mobile-icon-box" onClick={toggleSidebar}>
            <HiOutlineViewGrid className="mobile-icon" />
          </div>
        </div>
        
        <Link to="/" className="mobile-logo-link">
          <img src={Mainlogo} alt="Logo" className="mobile-logo" />
        </Link>

        <div className="mobile-right">
          <FaUserCircle className="mobile-user" />
          <div className="mobile-theme-icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;