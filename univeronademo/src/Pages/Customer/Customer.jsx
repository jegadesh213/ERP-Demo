import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH, FaTimes, FaPlus, FaSearch } from 'react-icons/fa';
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
              <th className="hide-on-mobile">Action</th>
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
                  <div className="detail-item"><span className="detail-label">Customer Type</span><span className="detail-value">{selectedCustomer.type === 1 ? 'B to B' : selectedCustomer.type === 2 ? 'B to C' : selectedCustomer.type === 3 ? 'One time' : selectedCustomer.type === 4 ? 'Export' : selectedCustomer.type || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Division</span><span className="detail-value">{selectedCustomer.division || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Type of Industry</span><span className="detail-value">{selectedCustomer.industry_id === 1 ? 'Information Technology' : selectedCustomer.industry_id === 2 ? 'Manufacturing' : selectedCustomer.industry_id || '—'}</span></div>
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
                   <div className="detail-item"><span className="detail-label">Country ID</span><span className="detail-value">{selectedCustomer.billing_country_id || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">State ID</span><span className="detail-value">{selectedCustomer.billing_state_id || '—'}</span></div>
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
                   <div className="detail-item"><span className="detail-label">Country ID</span><span className="detail-value">{selectedCustomer.shipping_country_id || '—'}</span></div>
                   <div className="detail-item"><span className="detail-label">State ID</span><span className="detail-value">{selectedCustomer.shipping_state_id || '—'}</span></div>
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
                  <div className="detail-item"><span className="detail-label">Payment Term ID</span><span className="detail-value">{selectedCustomer.payment_term_id === 1 ? 'Net 30 Days' : selectedCustomer.payment_term_id || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Payment Method ID</span><span className="detail-value">{selectedCustomer.payment_method_id === 1 ? 'Bank Transfer' : selectedCustomer.payment_method_id || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Currency</span><span className="detail-value">{selectedCustomer.currency_id === 2 ? 'USD - US Dollar' : 'INR - Indian Rupee'}</span></div>
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
                  
                  <div className="detail-item">
                    <span className="detail-label">Account Type</span>
                    <span className="detail-value">
                      {selectedCustomer.account_type === 1 || selectedCustomer.account_type === '1' 
                        ? 'Savings' 
                        : selectedCustomer.account_type === 2 || selectedCustomer.account_type === '2' 
                        ? 'Current' 
                        : selectedCustomer.account_type || '—'}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* TAB 4: SALES & NOTES */}
            {activeTab === 'notes' && (
              <>
                <h3 className="cust-section-title" style={{ fontSize: '16px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '8px', marginBottom: '15px', color: '#7b61ff' }}>
                  Sales, Documents & Notes
                </h3>
                <div className="detail-grid">
                  <div className="detail-item"><span className="detail-label">Sales Region</span><span className="detail-value">{selectedCustomer.sales_region || '—'}</span></div>
                  <div className="detail-item"><span className="detail-label">Customer Group</span><span className="detail-value">{selectedCustomer.customer_group || '—'}</span></div>
                  <div className="detail-item">
                    <span className="detail-label">Shipping Method</span>
                    <span className="detail-value">
                      {selectedCustomer.shipping_method === 1 || selectedCustomer.shipping_method === '1' 
                        ? 'Air Freight' 
                        : selectedCustomer.shipping_method === 2 || selectedCustomer.shipping_method === '2' 
                        ? 'Road Transport' 
                        : selectedCustomer.shipping_method || '—'}
                    </span>
                  </div>
                  <div className="detail-item"><span className="detail-label">Project</span><span className="detail-value">{selectedCustomer.project || '—'}</span></div>
                  <div className="detail-item" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <span className="detail-label">Notes</span>
                    <span className="detail-value" style={{ display: 'block', marginTop: '6px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {selectedCustomer.note || "No internal commercial conditions recorded against this master profile layer."}
                    </span>
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;