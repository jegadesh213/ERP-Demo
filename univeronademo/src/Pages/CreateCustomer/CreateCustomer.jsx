import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCustomer.css';

function CreateCustomer() {
  const navigate = useNavigate();

  // State for Profile Image
  const [profileImg, setProfileImg] = useState(null);

  // Data for Dynamic Country/State Dropdowns
  const countryStateData = {
    "India": ["Tamil Nadu", "Maharashtra", "Karnataka", "Kerala", "Delhi", "Telangana"],
    "USA": ["California", "Texas", "New York", "Florida", "Washington"],
    "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
    "UAE": ["Dubai", "Abu Dhabi", "Sharjah"],
    "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia"],
    "Singapore": ["Central Region", "East Region", "North Region"]
  };

  const [selectedBillCountry, setSelectedBillCountry] = useState('');
  const [selectedShipCountry, setSelectedShipCountry] = useState('');

  // Handles Image Upload Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="create-page">
      <div className="page-header">
        <h1 className="page-title">Create Customer</h1>
      </div>

      <div className="form-card">
        <form className="customer-form">

          {/* ==========================================
              1. GENERAL INFORMATION
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">General Information</h3>
            <div className="profile-upload-container" style={{ 
                marginTop: '0px', 
                paddingTop: '30px' 
              }}>
              {/* <h4 style={{ color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>
                Customer Profile Image
              </h4> */}
              <label className="profile-circle">
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="profile-image" />
                ) : (
                  <span className="upload-placeholder">+ Upload Customer<br/>Photo</span>
                )}
              </label>
              {/* <span style={{ fontSize: '12px', color: '#888' }}>Allowed formats: JPG, PNG</span> */}
            </div>
            <div className="form-grid">
              
              <div className="form-group">
                <label>Customer Type</label>
                <select>
                  <option value="">Select Type</option>
                  <option value="B to B">B to B</option>
                  <option value="B to C">B to C</option>
                  <option value="One time">One time</option>
                  <option value="Export">Export</option>
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Number</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} placeholder="Auto-generated or enter" />
              </div>
              
              <div className="form-group">
                <label>Division</label>
                <select>
                  <option value="">Select Division</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Type of Industry</label>
                <select>
                  <option value="">Select Industry</option>
                  <option value="IT">Information Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Finance">Finance & Banking</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option value="Active">Active</option>
                  <option value="In Active">In Active</option>
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} placeholder="Full Name" />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Contact Person Name</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Phone</label><span className="char-limit">Max 16</span></div>
                <input type="text" maxLength={16} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Mobile</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Email</label><span className="char-limit">Max 30</span></div>
                <input type="email" maxLength={30} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Website</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} placeholder="https://" />
              </div>
            </div>
          </div>


          {/* ==========================================
              2. BILL TO ADDRESS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Bill to Address</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
                <input type="text" maxLength={40} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <select value={selectedBillCountry} onChange={(e) => setSelectedBillCountry(e.target.value)}>
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>State</label>
                <select disabled={!selectedBillCountry}>
                  <option value="">Select State</option>
                  {selectedBillCountry && countryStateData[selectedBillCountry].map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} />
              </div>
            </div>
          </div>


          {/* ==========================================
              3. SHIP TO ADDRESS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Ship to Address</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
                <input type="text" maxLength={40} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <select value={selectedShipCountry} onChange={(e) => setSelectedShipCountry(e.target.value)}>
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>State</label>
                <select disabled={!selectedShipCountry}>
                  <option value="">Select State</option>
                  {selectedShipCountry && countryStateData[selectedShipCountry].map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} />
              </div>
            </div>
          </div>


          {/* ==========================================
              4. FINANCIAL & TAX DETAILS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Financial & Tax Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>GST Tax No</label><span className="char-limit">Max 15</span></div>
                <input type="text" maxLength={15} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>PAN Number</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} />
              </div>
              <div className="form-group">
                <label>Payment Term</label>
                <select>
                  <option value="">Select Term</option>
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 60">Net 60</option>
                  <option value="Due on Receipt">Due on Receipt</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select>
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                </select>
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Credit Limit</label><span className="char-limit">Max 10</span></div>
                <input type="text" maxLength={10} />
              </div>
            </div>
          </div>


          {/* ==========================================
              5. BANK DETAILS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Bank Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Account Holder Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Bank Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Account Number</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>IFSC Code</label><span className="char-limit">Max 15</span></div>
                <input type="text" maxLength={15} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Branch Name</label><span className="char-limit">Max 30</span></div>
                <input type="text" maxLength={30} />
              </div>
              <div className="form-group">
                <label>Account Type</label>
                <select>
                  <option value="">Select Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>
            </div>
          </div>


          {/* ==========================================
              6. SALES, DOCUMENTS & NOTES
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Sales, Documents & Notes</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Sales Region</label><span className="char-limit">Max 20</span></div>
                <input type="text" maxLength={20} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Group</label><span className="char-limit">Max 15</span></div>
                <input type="text" maxLength={15} />
              </div>
              <div className="form-group">
                <label>Shipping Method</label>
                <select>
                  <option value="">Select Method</option>
                  <option value="Air">Air Freight</option>
                  <option value="Road">Road Transport</option>
                  <option value="Sea">Sea Freight</option>
                  <option value="Courier">Express Courier</option>
                </select>
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Project</label><span className="char-limit">Max 50</span></div>
                <input type="text" maxLength={50} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Documents Attachment</label>
                <input type="file" multiple />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div className="label-wrapper"><label>Notes</label><span className="char-limit">Max 300</span></div>
                <textarea maxLength={300} placeholder="Add any internal notes here..."></textarea>
              </div>
            </div>
          </div>


          {/* ==========================================
              7. SYSTEM AUDIT (Read Only)
          ========================================== */}
          <div className="form-section" style={{ opacity: 0.7 }}>
            <h3 className="section-title">System Audit (Auto-Generated)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Created On</label>
                <input type="date" disabled value={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Created By</label><span className="char-limit">Max 50</span></div>
                <input type="text" disabled value="Admin User" />
              </div>
              <div className="form-group">
                <label>Changed On</label>
                <input type="date" disabled />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Changed By</label><span className="char-limit">Max 50</span></div>
                <input type="text" disabled />
              </div>
            </div>
          </div>

          {/* ==========================================
              SUBMIT ACTIONS
          ========================================== */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/order')}>
              Cancel
            </button>
            <button type="button" className="btn-save">
              Save Customer
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer;