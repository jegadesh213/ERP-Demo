import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar({ toggleSidebar, darkMode, setDarkMode }) {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-animation">
        <div className="logo-section logo-animation">
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
        <div className="mobile-icon-box" onClick={toggleSidebar}>
          <HiOutlineViewGrid className="mobile-icon" />
        </div>
        <Link to="/">
          <img src={Mainlogo} alt="Logo" className="mobile-logo" />
        </Link>
        <div className="mobile-right">
          <FaUserCircle className="mobile-user" />
          <div className={darkMode ? "toggle dark-toggle" : "toggle light-toggle"} onClick={() => setDarkMode(!darkMode)}>
            <div className={darkMode ? "toggle-circle dark-circle" : "toggle-circle light-circle"}>
              {darkMode ? <FaMoon /> : <FaSun />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;