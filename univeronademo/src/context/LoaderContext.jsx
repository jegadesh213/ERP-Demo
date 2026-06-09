import React, { createContext, useContext, useState } from 'react';
import './Loader.css';

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && (
        <div className="global-loader-overlay">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading, please wait...</p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
}

// Custom hook to quickly access the loader anywhere
export const useLoader = () => useContext(LoaderContext);