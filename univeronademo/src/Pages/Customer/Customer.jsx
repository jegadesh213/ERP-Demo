import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH, FaTimes, FaPlus, FaSearch, FaExclamationTriangle, FaPaperclip, FaExternalLinkAlt } from 'react-icons/fa';
import { useLoader } from '../../context/LoaderContext'; 
import './Customer.css';

function Customer() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const activeToken = localStorage.getItem('auth_token');

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

  useEffect(() => {
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

  const handleDeleteClick = (e, customer) => {
    if (e) {
      e.stopPropagation();
      if (e.nativeEvent) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
    setCustomerToDelete(customer);
  };

  const confirmDelete = async (e) => {
    if (e) e.stopPropagation();
    if (!customerToDelete) return;
    
    showLoader();
    try {
      const response = await fetch(`https://sdsinfotech.co.in/api/customers/${customerToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        }
      });

      const result = await response.json();
      if (result.statusCode === 200 || !result.error) {
        setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
        if (selectedCustomer && selectedCustomer.id === customerToDelete.id) {
          setSelectedCustomer(null);
        }
        setCustomerToDelete(null);
      } else {
        alert("Delete failed: " + (result.statusMessage || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete request error:", error);
      alert("Failed to delete customer record. Please check your network connection.");
    } finally {
      hideLoader();
    }
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
      (cust.billing_city && cust.billing_city.toLowerCase().includes(lowerSearch)) ||
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
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} onClick={() => handleRowClick(cust)}>
                <td>{cust.customer_no}</td>
                <td>{cust.name}</td>
                <td className="hide-on-mobile">{cust.email || '-'}</td>
                <td className="hide-on-mobile">{cust.billing_city || '-'}</td>
                <td className="hide-on-mobile">{cust.primary_mobile || '-'}</td>
                <td>
                  <div className="action-icons">
                    <button 
                      className="btn-icon btn-edit-icon" 
                      title="Edit" 
                      onClick={(e) => handleEditClick(e, cust.id)}
                      onTouchEnd={(e) => handleEditClick(e, cust.id)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete-icon" 
                      title="Delete" 
                      onClick={(e) => handleDeleteClick(e, cust)}
                      onTouchEnd={(e) => handleDeleteClick(e, cust)}
                    >
                      <FaTrash />
                    </button>
                    <button className="btn-icon hide-on-mobile" style={{ color: '#888' }} title="More">
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

      {/* ===================================================
          DETAILS VIEW MODAL
      ====================================================== */}
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
                <button 
                  className="btn-icon btn-edit-icon" 
                  title="Edit" 
                  onClick={(e) => handleEditClick(e, selectedCustomer.id)}
                  onTouchEnd={(e) => handleEditClick(e, selectedCustomer.id)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="btn-icon btn-delete-icon" 
                  title="Delete" 
                  onClick={(e) => handleDeleteClick(e, selectedCustomer)}
                  onTouchEnd={(e) => handleDeleteClick(e, selectedCustomer)}
                >
                  <FaTrash />
                </button>
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
              <button className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>
                Financial & Bank Details
              </button>
              <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
                Sales & Notes
              </button>
            </div>

            {/* TAB 1: GENERAL INFORMATION */}
            {activeTab === 'general' && (
              <>
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  General Information
                </h3>
                <div className="detail-grid">
                  <div className="detail-item"><span className="detail-label">Customer ID</span><span className="detail-value" style={{ color: '#3b82f6', fontWeight: 'bold' }}>{selectedCustomer.customer_no}</span></div>
                  
                  {/* DISPLAY DYNAMIC CUSTOMER TYPE OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Customer Type</span>
                    <span className="detail-value">
                      {selectedCustomer.customer_type?.name || (selectedCustomer.type === 1 ? 'Individual' : selectedCustomer.type === 2 ? 'Company' : selectedCustomer.type || '—')}
                    </span>
                  </div>

                  <div className="detail-item"><span className="detail-label">Division</span><span className="detail-value">{selectedCustomer.division || '—'}</span></div>
                  
                  {/* DISPLAY DYNAMIC INDUSTRY OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Type of Industry</span>
                    <span className="detail-value">
                      {selectedCustomer.industry?.name || selectedCustomer.industry_id || '—'}
                    </span>
                  </div>

                  <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value">{selectedCustomer.status === 1 ? 'Active Ledger' : selectedCustomer.status === 0 ? 'Inactive Blocked' : '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Customer Name</span><span className="detail-value">{selectedCustomer.name || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Contact Person Name</span><span className="detail-value">{selectedCustomer.contact_person_name || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Phone (Primary)</span><span className="detail-value">{selectedCustomer.primary_mobile || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Mobile (Secondary)</span><span className="detail-value">{selectedCustomer.secondary_mobile || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{selectedCustomer.email || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Website</span><span className="detail-value">{selectedCustomer.website || '—'}</span></div>
                </div>
              </>
            )}

            {/* TAB 2: ADDRESS DETAILS */}
            {activeTab === 'address' && (
              <>
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Bill to Address
                </h3>
                <div className="detail-grid" style={{ marginBottom: '25px' }}>
                   <div className="detail-item"><span className="detail-label">Street 1</span><span className="detail-value">{selectedCustomer.billing_address1 || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Street 2</span><span className="detail-value">{selectedCustomer.billing_address2 || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">City</span><span className="detail-value">{selectedCustomer.billing_city || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Postal Code</span><span className="detail-value">{selectedCustomer.billing_postal_code || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Country</span><span className="detail-value">{selectedCustomer.billing_country?.name || selectedCustomer.billing_country_name || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">State</span><span className="detail-value">{selectedCustomer.billing_state?.name || selectedCustomer.billing_state_name || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Land Mark</span><span className="detail-value">{selectedCustomer.billing_land_mark || '—'}</span></div>
                </div>
                 
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Ship to Address
                </h3>
                <div className="detail-grid">
                   <div className="detail-item"><span className="detail-label">Street 1</span><span className="detail-value">{selectedCustomer.shipping_address1 || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Street 2</span><span className="detail-value">{selectedCustomer.shipping_address2 || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">City</span><span className="detail-value">{selectedCustomer.shipping_city || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Postal Code</span><span className="detail-value">{selectedCustomer.shipping_postal_code || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Country</span><span className="detail-value">{selectedCustomer.shipping_country?.name || selectedCustomer.shipping_country_name || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">State</span><span className="detail-value">{selectedCustomer.shipping_state?.name || selectedCustomer.shipping_state_name || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">Land Mark</span><span className="detail-value">{selectedCustomer.shipping_land_mark || '—'}</span></div>
                </div>
              </>
            )}

            {/* TAB 3: FINANCIAL & BANK DETAILS */}
            {activeTab === 'financial' && (
              <>
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Financial & Tax Details
                </h3>
                <div className="detail-grid" style={{ marginBottom: '25px' }}>
                  <div className="detail-item"><span className="detail-label">GST Tax No</span><span className="detail-value">{selectedCustomer.gst_no || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">PAN Number</span><span className="detail-value">{selectedCustomer.pan_no || '—'}</span></div>
                  
                  {/* DISPLAY DYNAMIC PAYMENT TERM OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Payment Term</span>
                    <span className="detail-value">
                      {selectedCustomer.payment_term?.name || selectedCustomer.payment_term_id || '—'}
                    </span>
                  </div>

                  {/* DISPLAY DYNAMIC PAYMENT METHOD OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Payment Method</span>
                    <span className="detail-value">
                      {selectedCustomer.payment_method?.name || selectedCustomer.payment_method_id || '—'}
                    </span>
                  </div>

                  {/* DISPLAY DYNAMIC CURRENCY OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Currency</span>
                    <span className="detail-value">
                      {selectedCustomer.currency?.code 
                        ? `${selectedCustomer.currency.code} - ${selectedCustomer.currency.name} (${selectedCustomer.currency.symbol || ''})` 
                        : selectedCustomer.currency_id || '—'}
                    </span>
                  </div>

                  <div className="detail-item"><span className="detail-label">Credit Limit</span><span className="detail-value">{selectedCustomer.credit_limit || '0.00'}</span></div>
                </div>

                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Bank Details
                </h3>
                <div className="detail-grid">
                  <div className="detail-item"><span className="detail-label">Account Holder Name</span><span className="detail-value">{selectedCustomer.holder_name || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Bank Name</span><span className="detail-value">{selectedCustomer.bank_name || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Account Number</span><span className="detail-value" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{selectedCustomer.account_no || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">IFSC Code</span><span className="detail-value" style={{ fontFamily: 'monospace' }}>{selectedCustomer.ifsc_code || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Branch Name</span><span className="detail-value">{selectedCustomer.branch_name || '—'}</span></div>
                  
                  {/* DISPLAY DYNAMIC BANK ACCOUNT TYPE OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Account Type</span>
                    <span className="detail-value">
                      {selectedCustomer.bank_account_type?.name || (selectedCustomer.account_type === 1 || selectedCustomer.account_type === '1' ? 'Savings' : selectedCustomer.account_type === 2 || selectedCustomer.account_type === '2' ? 'Current' : selectedCustomer.account_type || '—')}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* TAB 4: SALES & NOTES */}
            {activeTab === 'notes' && (
              <>
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Sales & Notes
                </h3>
                <div className="detail-grid" style={{ marginBottom: '25px' }}>
                  <div className="detail-item"><span className="detail-label">Sales Region</span><span className="detail-value">{selectedCustomer.sales_region || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Customer Group</span><span className="detail-value">{selectedCustomer.customer_group || '—'}</span></div>
                  
                  {/* DISPLAY DYNAMIC SHIPPING METHOD OBJECT */}
                  <div className="detail-item">
                    <span className="detail-label">Shipping Method</span>
                    <span className="detail-value">
                      {selectedCustomer.shipping_method_obj?.name || selectedCustomer.shipping_method_relation?.name || (selectedCustomer.shipping_method === 1 || selectedCustomer.shipping_method === '1' ? 'Air Freight' : selectedCustomer.shipping_method === 2 || selectedCustomer.shipping_method === '2' ? 'Road Transport' : selectedCustomer.shipping_method || '—')}
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Project</span>
                    <span className="detail-value">{selectedCustomer.project || '—'}</span>
                  </div>

                  <div className="detail-item" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <span className="detail-label">Notes</span>
                    <span className="detail-value" style={{ display: 'block', marginTop: '6px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {selectedCustomer.note || "No internal commercial conditions recorded against this master profile layer."}
                    </span>
                  </div>
                </div>

                {/* ATTACHMENTS SECTION */}
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Uploaded Attachments & Documents
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {Array.isArray(selectedCustomer.attachments) && selectedCustomer.attachments.length > 0 ? (
                    selectedCustomer.attachments.map((fileItem, idx) => {
                      const fileUrl = typeof fileItem === 'string' ? fileItem : fileItem.url || fileItem.file_path || fileItem.file;
                      const fileName = typeof fileItem === 'string' ? fileItem.split('/').pop() : fileItem.file_name || fileItem.name || `Document ${idx + 1}`;
                      
                      return (
                        <a
                          key={idx}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <FaPaperclip />
                          <span>{fileName}</span>
                          <FaExternalLinkAlt style={{ fontSize: '11px', marginLeft: '4px' }} />
                        </a>
                      );
                    })
                  ) : (
                    <span style={{ fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
                      No attachment files uploaded for this profile.
                    </span>
                  )}
                </div>
              </>
            )}
            
          </div>
        </div>
      )}

      {/* ===================================================
          DELETE CONFIRMATION POPUP MODAL
      ====================================================== */}
      {customerToDelete && (
        <div className="modal-overlay" onClick={() => setCustomerToDelete(null)} style={{ zIndex: 1100 }}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '420px', padding: '30px', textAlign: 'center' }}
          >
            <div style={{ color: '#ef4444', fontSize: '42px', marginBottom: '12px' }}>
              <FaExclamationTriangle />
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0' }}>
              Confirm Customer Deletion
            </h2>
            
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.5', margin: '0 0 24px 0' }}>
              Are you sure you want to permanently delete customer account <strong style={{ color: '#3b82f6' }}>{customerToDelete.name}</strong> (<span style={{ fontFamily: 'monospace' }}>{customerToDelete.customer_no}</span>)? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
              <button 
                type="button" 
                className="tab-btn" 
                onClick={(e) => { e.stopPropagation(); setCustomerToDelete(null); }}
                onTouchEnd={(e) => { e.stopPropagation(); setCustomerToDelete(null); }}
                style={{ padding: '10px 22px', borderRadius: '12px', background: 'rgba(128,128,128,0.1)' }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmDelete}
                onTouchEnd={confirmDelete}
                style={{ 
                  padding: '10px 22px', 
                  borderRadius: '12px', 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Customer;