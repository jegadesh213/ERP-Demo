import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEllipsisH, FaTimes, FaRegTimesCircle, FaPlus, FaSearch } from 'react-icons/fa';
import './Order.css';

function Order() {
  const customers = [
    { id: 'CUST000001', name: 'sadmin', email: 'rootzero15@gmail.com', city: '-', phone: '-' },
    { id: 'CUST000002', name: 'Test_cust', email: 'sell@seller.com', city: '-', phone: '-' },
    { id: 'CUST000003', name: 'test', email: '-', city: '-', phone: '-' },
    { id: 'CUST000004', name: 'Test', email: '-', city: 'Test', phone: '-' },
    { id: 'CUST000005', name: 'test_edit', email: '-', city: 'Chennai', phone: '-' },
    { id: 'CUST000006', name: 'Maruthi', email: 'maruthi@gmail.com', city: 'Chennai', phone: '044 22606070' },
    { id: 'CUST000007', name: 'JAIBHIM Solutions Ltd', email: 'jaibhim@gmail.com', city: 'Ambattur', phone: '9876423678' },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // NEW: State to manage the active tab in the modal
  const [activeTab, setActiveTab] = useState('general');

  // Triggered when a row is clicked (Now works on Desktop AND Mobile!)
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setActiveTab('general'); // Always open to the first tab
  };

  return (
    <div className="order-page">
      {/* Upgraded Page Header */}
      {/* Upgraded Page Header */}
      <div className="page-header">
        
        {/* Left Side: Title and Create Button */}
        <div className="header-left">
          <h1 className="page-title">Customers</h1>
          <button className="btn-create">
            <FaPlus /> Create Customer
          </button>
        </div>

        {/* Right Side: Search Bar (MUST be outside of header-left) */}
        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
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
            {customers.map((cust, index) => (
              <tr key={index} onClick={() => handleRowClick(cust)}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td className="hide-on-mobile">{cust.email}</td>
                <td className="hide-on-mobile">{cust.city}</td>
                <td className="hide-on-mobile">{cust.phone}</td>
                <td className="hide-on-mobile">
                  <div className="action-icons">
                    <span><FaEdit /></span>
                    <span><FaTrash /></span>
                    <span><FaEllipsisH /></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================================
          ADVANCED DETAIL MODAL
      =================================== */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header with Actions */}
            <div className="modal-header-top">
              <h2 className="modal-title">Customer</h2>
              <div className="modal-actions">
                
                {/* Replaced text with minimalist icons */}
                <button className="btn-icon btn-edit-icon" title="Edit">
                  <FaEdit />
                </button>
                <button className="btn-icon btn-delete-icon" title="Delete">
                  <FaTrash />
                </button>
                
                <button className="btn-close-modal" onClick={() => setSelectedCustomer(null)}>
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="modal-tabs">
              <button 
                className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} 
                onClick={() => setActiveTab('general')}
              >
                General Information
              </button>
              <button 
                className={`tab-btn ${activeTab === 'address' ? 'active' : ''}`} 
                onClick={() => setActiveTab('address')}
              >
                Address Details
              </button>
              <button 
                className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} 
                onClick={() => setActiveTab('notes')}
              >
                Internal Notes
              </button>
            </div>

            {/* Tab Content: General Information */}
            {activeTab === 'general' && (
              <>
                <div className="detail-grid">
                  {/* Column 1 */}
                  <div className="detail-item"><span className="detail-label">Customer ID</span><span className="detail-value" style={{ color: '#3b82f6', fontWeight: 'bold' }}>{selectedCustomer.id}</span></div>
                  {/* Column 2 */}
                  <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">Individual</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Name</span><span className="detail-value">{selectedCustomer.name}</span></div>
                  <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value">—</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{selectedCustomer.email}</span></div>
                  <div className="detail-item"><span className="detail-label">Phone</span><span className="detail-value">{selectedCustomer.phone}</span></div>
                  
                  <div className="detail-item"><span className="detail-label">Mobile</span><span className="detail-value">—</span></div>
                  <div className="detail-item"><span className="detail-label">Website</span><span className="detail-value">—</span></div>
                  
                  <div className="detail-item"><span className="detail-label">GST Tax ID</span><span className="detail-value">—</span></div>
                  <div className="detail-item"><span className="detail-label">PAN Number</span><span className="detail-value">—</span></div>
                </div>

                {/* Bank Accounts Sub-Section */}
                <h3 style={{ marginTop: '20px', fontSize: '18px' }}>Bank Accounts</h3>
                <div className="bank-accounts-section">
                  <FaRegTimesCircle className="empty-state-icon" />
                  <h4>No bank accounts</h4>
                  <p style={{ color: '#888', fontSize: '14px' }}>Create a bank account to get started.</p>
                </div>
              </>
            )}

            {/* Tab Content: Address Details */}
            {activeTab === 'address' && (
              <div className="detail-grid">
                 <div className="detail-item"><span className="detail-label">City</span><span className="detail-value">{selectedCustomer.city}</span></div>
                 <div className="detail-item"><span className="detail-label">State/Province</span><span className="detail-value">—</span></div>
                 <div className="detail-item"><span className="detail-label">Country</span><span className="detail-value">—</span></div>
              </div>
            )}

            {/* Tab Content: Internal Notes */}
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