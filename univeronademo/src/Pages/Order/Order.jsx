import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH, FaTimes, FaRegTimesCircle, FaPlus, FaSearch } from 'react-icons/fa';
import './Order.css';

function Order() {
  const navigate = useNavigate();
  
  // States
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); 

  // ===================================
  // 1. FETCH INITIAL CUSTOMER LIST
  // ===================================
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://sdsinfotech.co.in/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 1|rYASEZ9eoX2xeUUQ14XXPeKv2HecomL2loEfIV8Jbd21bab2' // IMPORTANT: Replace with your actual token
          }
        });

        const result = await response.json();

        if (result.statusCode === 200 && result.data) {
          setCustomers(result.data);
        } else {
          console.error("Failed to load data:", result.statusMessage);
        }
      } catch (error) {
        console.error("Connection failed:", error);
      }
    };

    fetchCustomers();
  }, []);

  // ===================================
  // 2. FETCH DEEP CUSTOMER DETAILS
  // ===================================
  const handleRowClick = async (customer) => {
    // Open the modal instantly with basic list data
    setSelectedCustomer(customer); 
    setActiveTab('general');
    setIsLoadingDetails(true); 

    try {
      // Fetch the deep data using the specific customer ID
      const response = await fetch(`https://sdsinfotech.co.in/api/customers/${customer.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1|rYASEZ9eoX2xeUUQ14XXPeKv2HecomL2loEfIV8Jbd21bab2' // IMPORTANT: Replace with your actual token
        }
      });

      const result = await response.json();

      // If successful, silently overwrite the basic data with the deep detailed data
      if (result.statusCode === 200 && result.data) {
        setSelectedCustomer(result.data);
      } else {
        console.error("Failed to load details:", result.statusMessage);
      }
    } catch (error) {
      console.error("Connection failed while fetching details:", error);
    } finally {
      setIsLoadingDetails(false); 
    }
  };

  // NEW: Handler for clicking the Edit button
  const handleEditClick = (e, customerId) => {
    e.stopPropagation(); // Prevents the row from expanding
    navigate('/create-customer', { state: { editId: customerId } });
  };

  return (
    <div className="order-page">
      
      {/* ===================================
          PAGE HEADER
      =================================== */}
      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">Customers</h1>
          <button className="btn-create" onClick={() => navigate('/create-customer')}>
            <FaPlus /> Create Customer
          </button>
        </div>

        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>

      {/* ===================================
          DATA TABLE
      =================================== */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th className="hide-on-mobile">Email</th>
              <th className="hide-on-mobile">City</th>
              <th className="hide-on-mobile">Phone</th>
              <th className="hide-on-mobile">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id} onClick={() => handleRowClick(cust)}>
                <td>{cust.customer_no}</td>
                <td>{cust.name}</td>
                <td className="hide-on-mobile">{cust.email || '-'}</td>
                <td className="hide-on-mobile">{cust.city || '-'}</td>
                <td className="hide-on-mobile">{cust.primary_mobile || '-'}</td>
                <td className="hide-on-mobile">
                  <div className="action-icons">
                    <button className="btn-icon btn-edit-icon" title="Edit" onClick={(e) => handleEditClick(e, cust.id)}>
                      <FaEdit />
                    </button>
                    <button className="btn-icon btn-delete-icon" title="Delete" onClick={(e) => { e.stopPropagation(); }}>
                      <FaTrash />
                    </button>
                    <button className="btn-icon" style={{ color: '#888' }} title="More">
                      <FaEllipsisH />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Empty State / Loading State for Table */}
            {customers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                  Loading customers or no data available...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===================================
          ADVANCED DETAIL MODAL
      =================================== */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 className="modal-title">Customer</h2>
                
                {/* Shows a loading message while the deep API fetch is running */}
                {isLoadingDetails && (
                  <span style={{ fontSize: '12px', color: '#3b82f6', fontStyle: 'italic' }}>
                    Fetching latest details...
                  </span>
                )}
              </div>
              
              <div className="modal-actions">
                <button className="btn-icon btn-edit-icon" title="Edit" onClick={(e) => handleEditClick(e, selectedCustomer.id)}>
                  <FaEdit />
                </button>
                <button className="btn-icon btn-delete-icon" title="Delete"><FaTrash /></button>
                <button className="btn-close-modal" onClick={() => setSelectedCustomer(null)}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="modal-tabs">
              <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                General Information
              </button>
              <button className={`tab-btn ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
                Address Details
              </button>
              <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
                Internal Notes
              </button>
            </div>

            {/* TAB: GENERAL INFORMATION */}
            {activeTab === 'general' && (
              <>
                <div className="detail-grid">
                  <div className="detail-item"><span className="detail-label">Customer ID</span><span className="detail-value" style={{ color: '#3b82f6', fontWeight: 'bold' }}>{selectedCustomer.customer_no}</span></div>
                  <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">{selectedCustomer.type === 1 ? 'B to B' : selectedCustomer.type}</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Name</span><span className="detail-value">{selectedCustomer.name}</span></div>
                  <div className="detail-item"><span className="detail-label">Project</span><span className="detail-value">{selectedCustomer.project || '—'}</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{selectedCustomer.email || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Primary Mobile</span><span className="detail-value">{selectedCustomer.primary_mobile || '—'}</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Secondary Mobile</span><span className="detail-value">{selectedCustomer.secondary_mobile || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Website</span><span className="detail-value">{selectedCustomer.website || '—'}</span></div>
                  
                  <div className="detail-item"><span className="detail-label">GST Tax ID</span><span className="detail-value">{selectedCustomer.gst_no || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">PAN Number</span><span className="detail-value">{selectedCustomer.pan_no || '—'}</span></div>
                </div>

                <h3 style={{ marginTop: '20px', fontSize: '18px' }}>Bank Accounts</h3>
                <div className="bank-accounts-section">
                  <FaRegTimesCircle className="empty-state-icon" />
                  <h4>No bank accounts</h4>
                  <p style={{ color: '#888', fontSize: '14px' }}>Create a bank account to get started.</p>
                </div>
              </>
            )}

            {/* TAB: ADDRESS DETAILS */}
            {activeTab === 'address' && (
              <div className="detail-grid">
                 <div className="detail-item"><span className="detail-label">Address 1</span><span className="detail-value">{selectedCustomer.address1 || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Address 2</span><span className="detail-value">{selectedCustomer.address2 || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">City</span><span className="detail-value">{selectedCustomer.city || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Zip Code</span><span className="detail-value">{selectedCustomer.zip_code || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Landmark</span><span className="detail-value">{selectedCustomer.landmark || '—'}</span></div>
              </div>
            )}

            {/* TAB: INTERNAL NOTES */}
            {activeTab === 'notes' && (
              <div style={{ padding: '20px 0', color: '#888' }}>
                No internal notes available for this customer.
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}

export default Order;