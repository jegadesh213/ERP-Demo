import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH, FaTimes, FaRegTimesCircle, FaPlus, FaSearch, FaFileDownload } from 'react-icons/fa';
import { useLoader } from '../../context/LoaderContext'; 
import './Customer.css';

function Customer() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const activeToken = localStorage.getItem('auth_token');
  
  useEffect(() => {
    const fetchCustomers = async () => {
      showLoader(); 
      try {
        const response = await fetch('https://sdsinfotech.co.in/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeToken}`
          }
        });

        const result = await response.json();
        if (result.statusCode === 200 && result.data) {
          setCustomers(result.data);
        }
      } catch (error) {
        console.error("Connection failed:", error);
      } finally {
        hideLoader(); 
      }
    };

    fetchCustomers();
  }, []);

  const handleRowClick = async (customer) => {
    setSelectedCustomer(customer); 
    setActiveTab('general');
    setIsLoadingDetails(true);
    showLoader(); 

    try {
      const response = await fetch(`https://sdsinfotech.co.in/api/customers/${customer.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        }
      });

      const result = await response.json();
      if (result.statusCode === 200 && result.data) {
        setSelectedCustomer(result.data);
      }
    } catch (error) {
      console.error("Fetching details failed:", error);
    } finally {
      setIsLoadingDetails(false);
      hideLoader(); 
    }
  };

  const handleEditClick = (e, customerId) => {
    e.stopPropagation(); 
    navigate('/create-customer', { state: { editId: customerId } });
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAppliedSearch(searchTerm);
    }
  };

  const filteredCustomers = customers.filter((cust) => {
    if (!appliedSearch) return true;
    const lowerSearch = appliedSearch.toLowerCase();
    
    return (
  (cust.customer_no && cust.customer_no.toLowerCase().includes(lowerSearch)) ||
  (cust.name && cust.name.toLowerCase().includes(lowerSearch)) ||
  (cust.email && cust.email.toLowerCase().includes(lowerSearch)) ||
  (cust.billing_city && cust.billing_city.toLowerCase().includes(lowerSearch)) || //  Fixed
  (cust.primary_mobile && cust.primary_mobile.toLowerCase().includes(lowerSearch))
);
  });

  return (
    <div className="order-page">
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
            <input 
              type="text" 
              placeholder="Search and press Enter..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>
      </div>

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
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} onClick={() => handleRowClick(cust)}>
                <td>{cust.customer_no}</td>
                <td>{cust.name}</td>
                <td className="hide-on-mobile">{cust.email || '-'}</td>
                <td className="hide-on-mobile">{cust.billing_city || '-'}</td> {/* Fixed */}
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
            
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                  {customers.length === 0 ? "Loading customers..." : "No matching records found. Press Enter to search again."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 className="modal-title">Customer Details</h2>
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

                {/* ATTACHMENTS PREVIEW LANE */}
                <h3 style={{ marginTop: '25px', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Verified System Attachments</h3>
                <div className="attachments-preview-container" style={{ marginTop: '12px' }}>
                  {selectedCustomer.attachments && selectedCustomer.attachments.length > 0 ? (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {selectedCustomer.attachments.map((file, idx) => {
                        const fileUrl = file.url || file.file_path || file;
                        const isImg = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);

                        return (
                          <div key={idx} className="attachment-card" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', width: '120px', textAlign: 'center', background: '#f9f9f9' }}>
                            {isImg ? (
                              <img src={fileUrl} alt="attachment" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '4px', marginBottom: '6px' }} />
                            ) : (
                              <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', borderRadius: '4px', marginBottom: '6px' }}>
                                <FaFileDownload size={24} style={{ color: '#6b7280' }} />
                              </div>
                            )}
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'none', fontWeight: '500', wordBreak: 'break-all' }}>
                              View File
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' }}>No verified file uploads found on this ledger profile.</p>
                  )}
                </div>

                <h3 style={{ marginTop: '20px', fontSize: '16px' }}>Bank Accounts</h3>
                <div className="bank-accounts-section">
                  <FaRegTimesCircle className="empty-state-icon" />
                  <h4>No bank accounts</h4>
                  <p style={{ color: '#888', fontSize: '14px' }}>Create a bank account to get started.</p>
                </div>
              </>
            )}

            {activeTab === 'address' && (
              <div className="detail-grid">
                 <div className="detail-item"><span className="detail-label">Address 1</span><span className="detail-value">{selectedCustomer.billing_address1 || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Address 2</span><span className="detail-value">{selectedCustomer.billing_address2 || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">City</span><span className="detail-value">{selectedCustomer.billing_city || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Zip Code</span><span className="detail-value">{selectedCustomer.billing_postal_code || '—'}</span></div>
                 <div className="detail-item"><span className="detail-label">Landmark</span><span className="detail-value">{selectedCustomer.billing_land_mark || '—'}</span></div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div style={{ padding: '20px 0', color: '#222' }}>
                {selectedCustomer.note || "No internal notes available for this customer."}
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;