import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { FaUserCircle, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggleSidebar, toggleMiniSidebar, toggleMobileMenu, darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-animation">
        <div className="logo-section logo-animation">
          
          {/* Desktop Hamburger -> Opens the floating Mini Sidebar */}
          {location.pathname !== "/" && (
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

      {/* Mobile Bottom Navbar */}
      <div className="mobile-navbar">
        
        {/* Left Side: Hamburger & Grid */}
        <div className="mobile-left">
          
          {/* Mobile Hamburger -> Opens the full-screen Mobile Menu */}
          {location.pathname !== "/" && (
            <FaBars className="hamburger-icon" onClick={toggleMobileMenu} />
          )}
          
          <div className="mobile-icon-box" onClick={toggleSidebar}>
            <HiOutlineViewGrid className="mobile-icon" />
          </div>
        </div>
        
        {/* Center: Logo */}
        <Link to="/" className="mobile-logo-link">
          <img src={Mainlogo} alt="Logo" className="mobile-logo" />
        </Link>

        {/* Right Side: User & Single Theme Icon */}
        <div className="mobile-right">
          <FaUserCircle className="mobile-user" />
          
          {/* Single Icon Toggle */}
          <div className="mobile-theme-icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>

        </div>

      </div>
    </>
  );
}

export default Navbar;