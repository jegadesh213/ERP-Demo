import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { FaMoon, FaSun, FaBars, FaArrowLeft, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar, toggleMiniSidebar, toggleMobileMenu, darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Create shared element refs to self-collapse menu cards when clicking outside boundary spaces
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Layout state tracks
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [userName, setUserName] = useState("User Account");
  const [userEmail, setUserEmail] = useState("");

  // Conditional guards matching page location routes
  const hideHamburger = location.pathname === "/" || location.pathname === "/sales" || location.pathname === '/inspection';
  const isHomePage = location.pathname === "/";

  // Pull profile text metadata safely from system database session blocks
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("user_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setUserName(parsed.name);
        if (parsed.email) setUserEmail(parsed.email);
      }
    } catch (err) {
      console.error("Failed to safely parse user profile dictionary strings:", err);
    }
  }, []);

  // Shared outside boundary click listener rule
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setShowDesktopDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setShowMobileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Flush browser cookies/local storage arrays and return user back to Login window view
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_profile");
    setShowDesktopDropdown(false);
    setShowMobileDropdown(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ===================================
          DESKTOP NAVIGATION SYSTEM
      =================================== */}
      <nav className="navbar navbar-animation">
        <div className="logo-section logo-animation">
          <button className="nav-back-btn" onClick={() => navigate(-1)} title="Go Back">
            <FaArrowLeft />
          </button>

          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMiniSidebar} />
          )}

          {!isHomePage && (
            <HiOutlineViewGrid className="menu-icon" onClick={toggleSidebar} />
          )}
          
          <Link to="/">
            <img src={Mainlogo} alt="Logo" className="main-logo" />
          </Link>
        </div>

        <div className="right-section icon-animation">
          {/* DESKTOP CONTAINER MODAL ARTERY */}
          <div className="navbar-profile-wrapper" ref={desktopDropdownRef}>
            <button 
              type="button" 
              className={`navbar-profile-trigger-btn ${showDesktopDropdown ? 'active-state' : ''}`}
              onClick={() => setShowDesktopDropdown(!showDesktopDropdown)}
            >
              <FaUserCircle className="user-icon" /> 
            </button>

            {showDesktopDropdown && (
              <div className="profile-glass-dropdown-card desktop-position">
                <div className="dropdown-meta-profile">
                  <span className="dropdown-profile-fullname">{userName}</span>
                  {userEmail && <span className="dropdown-profile-email-string">{userEmail}</span>}
                </div>
                <div className="dropdown-separator-bar"></div>
                <button type="button" className="dropdown-logout-trigger-action" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout Session</span>
                </button>
              </div>
            )}
          </div>

          <div className={darkMode ? "toggle dark-toggle" : "toggle light-toggle"} onClick={() => setDarkMode(!darkMode)}>
            <div className={darkMode ? "toggle-circle dark-circle" : "toggle-circle light-circle"}>
              {darkMode ? <FaMoon /> : <FaSun />}
            </div>
          </div>
        </div>
      </nav>

      {/* ===================================
          MOBILE NAVIGATION BAR (BOTTOM DOCK)
      =================================== */}
      <div className="mobile-navbar">
        <div className="mobile-left">
          {!hideHamburger && (
            <FaBars className="hamburger-icon" onClick={toggleMobileMenu} />
          )}

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
          {/* MOBILE PROFILE POPUP TOGGLE OVERLAY */}
          <div className="navbar-profile-wrapper" ref={mobileDropdownRef}>
            <button 
              type="button" 
              className="mobile-avatar-shortcut-btn"
              onClick={() => setShowMobileDropdown(!showMobileDropdown)}
              title="View User Profile"
            >
              <FaUserCircle className="mobile-user" />
            </button>

            {showMobileDropdown && (
              <div className="profile-glass-dropdown-card mobile-position">
                <div className="dropdown-meta-profile">
                  <span className="dropdown-profile-fullname">{userName}</span>
                  {userEmail && <span className="dropdown-profile-email-string">{userEmail}</span>}
                </div>
                <div className="dropdown-separator-bar"></div>
                <button type="button" className="dropdown-logout-trigger-action" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout Session</span>
                </button>
              </div>
            )}
          </div>

          <div className="mobile-theme-icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;