import React, { useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    // The main container uses responsive classes to move from top to bottom
    // e.g., 'fixed bottom-0 md:top-4 md:bottom-auto'
    <nav className={`
      fixed w-full z-50 transition-all duration-300
      bottom-0 md:top-6 md:bottom-auto md:w-auto md:left-1/2 md:-translate-x-1/2
      ${isDarkMode ? 'theme-dark' : 'theme-light'}
    `}>
      
      {/* The inner pill container */}
      <div className="flex items-center justify-between px-6 py-3 rounded-none md:rounded-full backdrop-blur-md border border-opacity-20 shadow-lg">
        
        {/* Logo - Hidden on mobile if you strictly want a tab bar, or kept small */}
        <div className="hidden md:block font-bold text-xl mr-8">
          Univerona
        </div>

        {/* Navigation Links - Row on desktop, evenly spaced on mobile */}
        <ul className="flex flex-row w-full md:w-auto justify-around md:justify-center md:gap-6">
          <li><a href="#features" className="text-sm">Features</a></li>
          <li><a href="#modules" className="text-sm">Modules</a></li>
          <li><a href="#pricing" className="text-sm">Pricing</a></li>
          <li><a href="#resources" className="text-sm">Resources</a></li>
        </ul>

        {/* Controls - User Profile & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4 ml-8">
          <button className="rounded-full p-2 bg-gray-200 dark:bg-gray-700">
            {/* User Icon SVG */}
          </button>
          
          {/* Theme Toggle Switch */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center p-1 rounded-full bg-gray-300 dark:bg-gray-800"
          >
            {/* Toggle Knobs */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;