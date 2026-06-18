import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import { LoaderProvider } from './context/LoaderContext';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar.jsx";
import MobileMenu from "./components/MobileMenu/MobileMenu.jsx";
import Home from "./Pages/Home/Home.jsx";
import SalesHub from "./Pages/SalesHub/SalesHub.jsx";
import Order from "./Pages/Order/Order.jsx"; 
import CreateCustomer from "./Pages/CreateCustomer/CreateCustomer.jsx";
import Customer from "./Pages/Customer/Customer.jsx";
import Quotation from "./Pages/Quotation/Quotation.jsx";
import Invoice from "./Pages/Invoice/Invoice.jsx";
import Inspection from "./Pages/Inspection/Inspection.jsx";
import Login from "./Pages/Login/Login.jsx"
import FlashInspection from "./Pages/FlashInspectionReport/FlashInspectionReport.jsx";

import './App.css';

// 🛠️ AUTH GUARD ROUTE PROTECTION
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  // If no session token exists, securely bounce them straight to the login screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 🛠️ CONDITIONAL APP SHELL WRAPPER
function AppContent({
  isSidebarOpen, toggleSidebar,
  isMiniExpanded, toggleMiniSidebar,
  isMobileMenuOpen, toggleMobileMenu,
  darkMode, setDarkMode
}) {
  const location = useLocation();
  
  // Check if the user is currently looking at the login gateway view
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      
      {/* Only render background glows, top navbars, and side drawer trees if NOT on the login page */}
      {!isLoginPage && (
        <>
          <div className="bg-glow purple"></div>
          <div className="bg-glow blue"></div>

          <Navbar 
            toggleSidebar={toggleSidebar} 
            toggleMiniSidebar={toggleMiniSidebar} 
            toggleMobileMenu={toggleMobileMenu} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
          
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
          <MiniSidebar darkMode={darkMode} isExpanded={isMiniExpanded} />
          <MobileMenu isOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} darkMode={darkMode} />
        </>
      )}

      {/* Adjust content class spacing if it's the full-screen login layout */}
      <div className={isLoginPage ? "login-content-wrapper" : "main-content"}>
        <Routes>
          {/* 🛠️ 1. PUBLIC GATEWAY: Changing "/" to land directly on your Login Page */}
          <Route path="/login" element={<Login />} />
          
          {/* 🛠️ 2. DASHBOARD ROOT: This path now handles your Home page and protects it via the Guard */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          {/* 🛠️ 3. REMAINING PROTECTED WORKSPACES */}
          <Route path="/sales" element={
            <ProtectedRoute>
              <SalesHub />
            </ProtectedRoute>
          } />
          
          <Route path="/customer" element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          } />
          
          <Route path="/create-customer" element={
            <ProtectedRoute>
              <CreateCustomer />
            </ProtectedRoute>
          } />
          
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />

          {/* Inspection Start */}
          
          <Route path="/inspection" element={
            <ProtectedRoute>
              <Inspection />
            </ProtectedRoute>
          } />

          <Route path="/flash-inspection" element={
            <ProtectedRoute>
              <FlashInspection />
            </ProtectedRoute>
          } />

          {/* <Route path="/inspection" element={
            <ProtectedRoute>
              <Inspection />
            </ProtectedRoute>
          } />

          <Route path="/inspection" element={
            <ProtectedRoute>
              <Inspection />
            </ProtectedRoute>
          } />

          <Route path="/inspection" element={
            <ProtectedRoute>
              <Inspection />
            </ProtectedRoute>
          } />

          <Route path="/inspection" element={
            <ProtectedRoute>
              <Inspection />
            </ProtectedRoute>
          } /> */}

          {/* Inspection End */}
          
          <Route path="/invoice" element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          } />
          
          <Route path="/quotation" element={
            <ProtectedRoute>
              <Quotation />
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <h2 style={{ textAlign: 'center' }}>Settings Page</h2>
            </ProtectedRoute>
          } />

          {/* Catch-all fallback default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

// MAIN APP LAYER ENTRY
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMiniExpanded, setIsMiniExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMiniSidebar = () => setIsMiniExpanded(!isMiniExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Router>
      <LoaderProvider>
        <AppContent 
          isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}
          isMiniExpanded={isMiniExpanded} toggleMiniSidebar={toggleMiniSidebar}
          isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu}
          darkMode={darkMode} setDarkMode={setDarkMode}
        />
      </LoaderProvider>
    </Router>
  );
}

export default App;