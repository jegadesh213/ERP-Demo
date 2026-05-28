import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { useState } from "react";

import {
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars
} from "react-icons/fa";

import { HiOutlineViewGrid } from "react-icons/hi";

function Navbar({ toggleSidebar, darkMode, setDarkMode }) {
  // const [darkMode, setDarkMode] = useState(true);
    

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app light"
      }
    >
      {/* Glow Background */}
      <div className="bg-glow purple"></div>
      <div className="bg-glow blue"></div>

      {/* Navbar */}
      <nav className="navbar navbar-animation">
        {/* Logo */}
        <div className="logo-section logo-animation">
            {/* ADD THE ONCLICK HERE */}
            <HiOutlineViewGrid className="menu-icon" onClick={toggleSidebar} />

            <img src={Mainlogo} alt="Logo" className="main-logo" />
        </div>

        {/* Menu */}
        {/* <ul className="nav-links">
          <li>Features</li>
          <li>Modules</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul> */}

        {/* Right Side */}
        <div className="right-section icon-animation">
          <FaUserCircle className="user-icon" />

          {/* Toggle */}
          <div
            className={
              darkMode
                ? "toggle dark-toggle"
                : "toggle light-toggle"
            }
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            <div
              className={
                darkMode
                  ? "toggle-circle dark-circle"
                  : "toggle-circle light-circle"
              }
            >
              {darkMode ? (
                <FaMoon />
              ) : (
                <FaSun />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}

        <div className="mobile-navbar">

        {/* Grid Icon */}
        <div className="mobile-icon-box" onClick={toggleSidebar}>
            <HiOutlineViewGrid className="mobile-icon" />
        </div>

        {/* Logo */}
        <img
            src={Mainlogo}
            alt="Logo"
            className="mobile-logo"
        />

        {/* Right Side */}
        <div className="mobile-right">

            <FaUserCircle className="mobile-user" />

            {/* Toggle */}
            <div
            className={
                darkMode
                ? "toggle dark-toggle"
                : "toggle light-toggle"
            }
            onClick={() =>
                setDarkMode(!darkMode)
            }
            >
            <div
                className={
                darkMode
                    ? "toggle-circle dark-circle"
                    : "toggle-circle light-circle"
                }
            >
                {darkMode ? (
                <FaMoon />
                ) : (
                <FaSun />
                )}
            </div>
            </div>

        </div>

        </div>
    </div>
  );
}

export default Navbar;