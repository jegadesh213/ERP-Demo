import React from "react";
import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { FaUserCircle, FaMoon, FaSun, FaBars, FaArrowLeft } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar, toggleMiniSidebar, toggleMobileMenu, darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper condition: true only if we are on the Home Page or the Sales Hub Page
  const hideHamburger = location.pathname === "/" || location.pathname === "/sales";

  /* ===================================================
     👉 NEW FIX CONDITION: True only if we are on the Home Page root
     =================================================== */
  const isHomePage = location.pathname === "/";

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

          {/* Hamburger will hide completely on / and /sales */}
          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMiniSidebar} />
          )}

          {/* UPDATED FIX: The Grid icon will now only render if we are NOT on the Landing Home Page */}
          {!isHomePage && (
            <HiOutlineViewGrid className="menu-icon" onClick={toggleSidebar} />
          )}
          
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
          
          {/* Mobile Hamburger will also hide completely on / and /sales */}
          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMobileMenu} />
          )}

          {/* UPDATED FIX: Mobile Grid icon will also hide completely on the Landing Home Page */}
          {!isHomePage && (
            <div className="mobile-icon-box" onClick={toggleSidebar}>
              <HiOutlineViewGrid className="mobile-icon" />
            </div>
          )}
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