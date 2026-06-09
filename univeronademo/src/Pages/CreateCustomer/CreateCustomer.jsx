import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './CreateCustomer.css';

function CreateCustomer() {
  const navigate = useNavigate();

  // State for Profile Image
  const [profileImg, setProfileImg] = useState(null);

  // Dynamic Country/State Dropdowns (UI Only)
  const countryStateData = {
    "India": ["Tamil Nadu", "Maharashtra", "Karnataka", "Kerala", "Delhi", "Telangana"],
    "USA": ["California", "Texas", "New York", "Florida", "Washington"],
    "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
    "UAE": ["Dubai", "Abu Dhabi", "Sharjah"]
  };

  // 1. MASSIVE UI STATE: Holds data for every single input field on the screen
  const [formData, setFormData] = useState({
    // General
    type: "1",
    customer_number: "",
    division: "",
    industry: "",
    status: "1",
    name: "",
    contact_person: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
    // Bill To
    bill_address1: "",
    bill_address2: "",
    bill_city: "",
    bill_zip: "",
    bill_country: "",
    bill_state: "",
    bill_landmark: "",
    // Ship To
    ship_address1: "",
    ship_address2: "",
    ship_city: "",
    ship_zip: "",
    ship_country: "",
    ship_state: "",
    ship_landmark: "",
    // Financial
    gst_no: "",
    pan_no: "",
    payment_term: "",
    payment_method: "",
    currency: "INR",
    credit_limit: "",
    // Bank
    bank_holder: "",
    bank_name: "",
    bank_account: "",
    bank_ifsc: "",
    bank_branch: "",
    bank_type: "",
    // Sales & Docs
    sales_region: "",
    customer_group: "",
    shipping_method: "",
    project: "",
    notes: ""
  });

  // NEW: Catch the passed ID from the router
  const location = useLocation();
  const editId = location.state?.editId; 

  // NEW: Fetch existing data if we are in "Edit Mode"
  useEffect(() => {
    if (editId) {
      const fetchCustomerData = async () => {
        try {
          const response = await fetch(`https://sdsinfotech.co.in/api/customers/${editId}`, {
            headers: { 'Authorization': 'Bearer 2|s2dvSgBaN7J2Q2UVU4O57IZKpOHAXynESdG2ygqP5afc106b' }
          });
          const result = await response.json();
          
          if (result.statusCode === 200 && result.data) {
            const data = result.data;
            // Map the API fields back into the UI form
            setFormData(prev => ({
              ...prev,
              type: data.type?.toString() || "1",
              customer_number: data.customer_no || "",
              name: data.name || "",
              phone: data.primary_mobile || "",
              mobile: data.secondary_mobile || "",
              email: data.email || "",
              website: data.website || "",
              project: data.project || "",
              bill_address1: data.address1 || "",
              bill_address2: data.address2 || "",
              bill_city: data.city || "",
              bill_zip: data.zip_code || "",
              bill_landmark: data.landmark || "",
              gst_no: data.gst_no || "",
              pan_no: data.pan_no || "",
              status: data.status?.toString() || "1"
            }));
          }
        } catch (error) {
          console.error("Failed to fetch customer for editing:", error);
        }
      };
      fetchCustomerData();
    }
  }, [editId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Handles Image Upload Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  // Universal Handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 2. FILTERED POST REQUEST
  const handleSave = async () => {
    setIsSubmitting(true);
    
    const payload = {
      type: parseInt(formData.type) || 1,
      name: formData.name,
      gst_no: formData.gst_no,
      pan_no: formData.pan_no,
      primary_mobile: formData.phone, 
      secondary_mobile: formData.mobile, 
      email: formData.email,
      website: formData.website,
      project: formData.project,
      address1: formData.bill_address1,
      address2: formData.bill_address2,
      country_id: 1, 
      state_id: 1,   
      city: formData.bill_city,
      zip_code: formData.bill_zip,
      landmark: formData.bill_landmark,
      sales_person_id: 1, 
      payment_term_id: 1, 
      payment_method_id: 1, 
      status: parseInt(formData.status) || 1
    };

    try {
      // NEW: Dynamically choose PUT or POST based on editId
      const method = editId ? 'PUT' : 'POST';
      const url = editId 
        ? `https://sdsinfotech.co.in/api/customer/${editId}` 
        : 'https://sdsinfotech.co.in/api/customer';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_BEARER_TOKEN_HERE' 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.statusCode === 200 || result.statusCode === 201 || !result.error) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate('/order'), 2000);
      } else {
        alert("Failed to save: " + (result.statusMessage || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Connection failed. Please check your network.");
    } finally {
      setIsSubmitting(false);
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
            <div className="form-grid">
              
              <div className="form-group">
                <label>Customer Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="1">B to B</option>
                  <option value="2">B to C</option>
                  <option value="3">One time</option>
                  <option value="4">Export</option>
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Number</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="customer_number" value={formData.customer_number} onChange={handleChange} maxLength={10} placeholder="Auto-generated or enter" />
              </div>
              
              <div className="form-group">
                <label>Division</label>
                <select name="division" value={formData.division} onChange={handleChange}>
                  <option value="">Select Division</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Type of Industry</label>
                <select name="industry" value={formData.industry} onChange={handleChange}>
                  <option value="">Select Industry</option>
                  <option value="IT">Information Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="1">Active</option>
                  <option value="0">In Active</option>
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} placeholder="Full Name" />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Contact Person Name</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} maxLength={30} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Phone (Primary)</label><span className="char-limit">Max 16</span></div>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength={16} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Mobile (Secondary)</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Email</label><span className="char-limit">Max 30</span></div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={30} />
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Website</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="website" value={formData.website} onChange={handleChange} maxLength={30} placeholder="https://" />
              </div>
            </div>

            {/* <div className="profile-upload-container" style={{ marginTop: '30px', borderTop: '1px dashed rgba(128, 128, 128, 0.2)', paddingTop: '30px' }}>
              <h4 style={{ color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>Customer Profile Image</h4>
              <label className="profile-circle">
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                {profileImg ? <img src={profileImg} alt="Profile" className="profile-image" /> : <span className="upload-placeholder">+ Upload<br/>Photo</span>}
              </label>
              <span style={{ fontSize: '12px', color: '#888' }}>Allowed formats: JPG, PNG</span>
            </div> */}
          </div>

          {/* ==========================================
              2. BILL TO ADDRESS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Bill to Address</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="bill_address1" value={formData.bill_address1} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="bill_address2" value={formData.bill_address2} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
                <input type="text" name="bill_city" value={formData.bill_city} onChange={handleChange} maxLength={40} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="bill_zip" value={formData.bill_zip} onChange={handleChange} maxLength={10} />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <select name="bill_country" value={formData.bill_country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>State</label>
                <select name="bill_state" value={formData.bill_state} onChange={handleChange} disabled={!formData.bill_country}>
                  <option value="">Select State</option>
                  {formData.bill_country && countryStateData[formData.bill_country].map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              
              <div className="form-group">
                <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="bill_landmark" value={formData.bill_landmark} onChange={handleChange} maxLength={30} />
              </div>
            </div>
          </div>

          {/* ==========================================
              3. SHIP TO ADDRESS (Kept in UI)
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Ship to Address</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="ship_address1" value={formData.ship_address1} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="ship_address2" value={formData.ship_address2} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
                <input type="text" name="ship_city" value={formData.ship_city} onChange={handleChange} maxLength={40} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="ship_zip" value={formData.ship_zip} onChange={handleChange} maxLength={10} />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <select name="ship_country" value={formData.ship_country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>State</label>
                <select name="ship_state" value={formData.ship_state} onChange={handleChange} disabled={!formData.ship_country}>
                  <option value="">Select State</option>
                  {formData.ship_country && countryStateData[formData.ship_country].map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              <div className="form-group">
                <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="ship_landmark" value={formData.ship_landmark} onChange={handleChange} maxLength={30} />
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
                <input type="text" name="gst_no" value={formData.gst_no} onChange={handleChange} maxLength={15} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>PAN Number</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="pan_no" value={formData.pan_no} onChange={handleChange} maxLength={10} />
              </div>
              <div className="form-group">
                <label>Payment Term</label>
                <select name="payment_term" value={formData.payment_term} onChange={handleChange}>
                  <option value="">Select Term</option>
                  <option value="Net 30">Net 30</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select name="currency" value={formData.currency} onChange={handleChange}>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Credit Limit</label><span className="char-limit">Max 10</span></div>
                <input type="text" name="credit_limit" value={formData.credit_limit} onChange={handleChange} maxLength={10} />
              </div>
            </div>
          </div>

          {/* ==========================================
              5. BANK DETAILS (Kept in UI)
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Bank Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Account Holder Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="bank_holder" value={formData.bank_holder} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Bank Name</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Account Number</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="bank_account" value={formData.bank_account} onChange={handleChange} maxLength={30} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>IFSC Code</label><span className="char-limit">Max 15</span></div>
                <input type="text" name="bank_ifsc" value={formData.bank_ifsc} onChange={handleChange} maxLength={15} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Branch Name</label><span className="char-limit">Max 30</span></div>
                <input type="text" name="bank_branch" value={formData.bank_branch} onChange={handleChange} maxLength={30} />
              </div>
              <div className="form-group">
                <label>Account Type</label>
                <select name="bank_type" value={formData.bank_type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
            </div>
          </div>

          {/* ==========================================
              6. SALES & DOCUMENTS
          ========================================== */}
          <div className="form-section">
            <h3 className="section-title">Sales, Documents & Notes</h3>
            <div className="form-grid">
              <div className="form-group">
                <div className="label-wrapper"><label>Sales Region</label><span className="char-limit">Max 20</span></div>
                <input type="text" name="sales_region" value={formData.sales_region} onChange={handleChange} maxLength={20} />
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Customer Group</label><span className="char-limit">Max 15</span></div>
                <input type="text" name="customer_group" value={formData.customer_group} onChange={handleChange} maxLength={15} />
              </div>
              <div className="form-group">
                <label>Shipping Method</label>
                <select name="shipping_method" value={formData.shipping_method} onChange={handleChange}>
                  <option value="">Select Method</option>
                  <option value="Air">Air Freight</option>
                  <option value="Road">Road Transport</option>
                </select>
              </div>
              <div className="form-group">
                <div className="label-wrapper"><label>Project</label><span className="char-limit">Max 50</span></div>
                <input type="text" name="project" value={formData.project} onChange={handleChange} maxLength={50} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Documents Attachment</label>
                <input type="file" multiple />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div className="label-wrapper"><label>Notes</label><span className="char-limit">Max 300</span></div>
                <textarea name="notes" value={formData.notes} onChange={handleChange} maxLength={300} placeholder="Add any internal notes here..."></textarea>
              </div>
            </div>
          </div>

          {/* SUBMIT ACTIONS */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/order')} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="button" className="btn-save" onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Customer"}
            </button>
          </div>
          
        </form>
      </div>

      {/* ==========================================
          SUCCESS POPUP COMPONENT
      ========================================== */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <FaCheckCircle className="success-icon" />
            <h2>Customer Created!</h2>
            <p style={{ color: '#888', marginTop: '10px' }}>Redirecting to dashboard...</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default CreateCustomer;