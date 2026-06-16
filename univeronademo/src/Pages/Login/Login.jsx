import React, { useState, useEffect } from 'react';
import Mainlogo from "../../assets/Mainlogo.png";
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineExclamationCircle, HiSun, HiMoon } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // 🌓 Defaulting to light mode as requested (false = Light, true = Dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const carouselImages = [
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    showLoader();

    try {
      const response = await fetch('https://sdsinfotech.co.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!result.error && result.statusCode === 200) {
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user_profile', JSON.stringify(result.data.data));
        navigate('/'); 
      } else {
        setErrorMessage(result.data?.message || result.statusMessage || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login endpoint error:", error);
      setErrorMessage("Network connection failed. Please check your network.");
    } finally {
      hideLoader();
    }
  };

  return (
    // Dynamic theme class injector based on state
    <div className={`login-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background radial glowing gradients matching the main workspace pages */}
      <div className="bg-glow purple"></div>
      <div className="bg-glow blue"></div>

      {/* Central Glassmorphic Card Housing the Interface Elements */}
      <div className="login-glass-card">
        
        {/* LEFT COMPONENT FIELDS LANE */}
        <div className="login-fields-side">
          <div className="login-brand-header">
            <img 
              src={Mainlogo} 
              alt="Univerona Logo" 
              className="login-brand-logo-img" 
            />
          </div>

          <div className="login-form-box">
            <h3>Welcome!</h3>

            {errorMessage && (
              <div className="login-error-message-box">
                <HiOutlineExclamationCircle className="err-msg-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-action-form">
              <div className="login-input-group-row">
                <label>Email Address</label>
                <div className="login-field-icon-wrapper">
                  <HiOutlineMail className="field-inner-icon" />
                  <input 
                    type="email" 
                    placeholder="name@domain.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="login-input-group-row">
                <label>Password</label>
                <div className="login-field-icon-wrapper">
                  <HiOutlineLockClosed className="field-inner-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="login-submit-trigger-btn">
                Login
              </button>
            </form>

            <div className="login-footer-action-lane">
              <span className="un-clickable-text-btn">Create An Account</span>
              <span className="separator-dot">•</span>
              <span className="un-clickable-text-btn">Forgot Password?</span>
            </div>
          </div>
        </div>

        {/* RIGHT MEDIA SLIDER LANE */}
        <div className="login-carousel-side">
          {carouselImages.map((img, idx) => (
            <div 
              key={idx}
              className={`carousel-slide-bg ${idx === currentSlide ? 'active-slide' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="carousel-slide-glass-gradient-overlay"></div>
            </div>
          ))}
        </div>

      </div>

      {/* 🛠️ LIGHT/DARK MODE TOGGLE FLOATER */}
      <button 
        className="theme-toggle-floater" 
        onClick={() => setIsDarkMode(!isDarkMode)}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <HiSun className="toggle-icon" /> : <HiMoon className="toggle-icon" />}
      </button>
    </div>
  );
}

export default Login;