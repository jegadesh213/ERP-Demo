import "./Navbar.css";
import Mainlogo from "../../assets/Mainlogo.png";
import { useState } from "react";

import {
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars
} from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] =
    useState(true);

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
      <nav className="navbar">
        {/* Logo */}
        <div className="logo-section">

            <FaBars className="menu-icon" />

            <img
                src={Mainlogo}
                alt="Logo"
                className="main-logo"
            />

        </div>

        {/* Menu */}
        {/* <ul className="nav-links">
          <li>Features</li>
          <li>Modules</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul> */}

        {/* Right Side */}
        <div className="right-section">
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
    </div>
  );
}

export default Navbar;