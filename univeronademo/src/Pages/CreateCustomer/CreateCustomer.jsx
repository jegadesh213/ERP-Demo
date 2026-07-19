import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext'; 
import './CreateCustomer.css';

function CreateCustomer() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // State for Attachments (Tracks original File objects)
  const [attachments, setAttachments] = useState([]);

  // 🌍 NEW: Dynamic Geo-Location Datasets API State Elements
  const [countriesList, setCountriesList] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);

  const [formData, setFormData] = useState({
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
    bill_address1: "",
    bill_address2: "",
    bill_city: "",
    bill_zip: "",
    bill_country: "",
    bill_state: "",
    bill_landmark: "",
    ship_address1: "",
    ship_address2: "",
    ship_city: "",
    ship_zip: "",
    ship_country: "",
    ship_state: "",
    ship_landmark: "",
    gst_no: "",
    pan_no: "",
    payment_term: "",
    payment_method: "",
    currency: "INR",
    credit_limit: "",
    bank_holder: "",
    bank_name: "",
    bank_account: "",
    bank_ifsc: "",
    bank_branch: "",
    bank_type: "",
    sales_region: "",
    customer_group: "",
    shipping_method: "",
    project: "",
    notes: ""
  });

  const location = useLocation();
  const editId = location.state?.editId; 
  const activeToken = localStorage.getItem('auth_token');

  // 🌍 1. API HOOK: Fetch global countries list on component mounting initialization
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
        const result = await response.json();
        if (!result.error && result.data) {
          // Sort alphabetically for clean UI presentation
          const orderedCountries = result.data.map(c => c.name).sort();
          setCountriesList(orderedCountries);
        }
      } catch (error) {
        console.error("Failed fetching global countries database:", error);
      }
    };
    fetchCountries();
  }, []);

  // 🌍 2. API HOOK: Fetch dynamic states for Bill To Address country selection changes
  useEffect(() => {
    if (!formData.bill_country) {
      setBillingStates([]);
      return;
    }
    const fetchBillStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: formData.bill_country })
        });
        const result = await response.json();
        if (!result.error && result.data?.states) {
          setBillingStates(result.data.states.map(s => s.name).sort());
        } else {
          setBillingStates([]);
        }
      } catch (error) {
        console.error("Failed fetching regional states for billing country:", error);
      }
    };
    fetchBillStates();
  }, [formData.bill_country]);

  // 🌍 3. API HOOK: Fetch dynamic states for Ship To Address country selection changes
  useEffect(() => {
    if (!formData.ship_country) {
      setShippingStates([]);
      return;
    }
    const fetchShipStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: formData.ship_country })
        });
        const result = await response.json();
        if (!result.error && result.data?.states) {
          setShippingStates(result.data.states.map(s => s.name).sort());
        } else {
          setShippingStates([]);
        }
      } catch (error) {
        console.error("Failed fetching regional states for shipping country:", error);
      }
    };
    fetchShipStates();
  }, [formData.ship_country]);

  // 🧬 Primary Data Fetching Pipeline for Customer Editing Registry Context
  useEffect(() => {
    if (editId) {
      const fetchCustomerData = async () => {
        showLoader(); 
        try {
          const response = await fetch(`https://sdsinfotech.co.in/api/customers/${editId}`, {
            headers: { 'Authorization': `Bearer ${activeToken}` }
          });
          const result = await response.json();
          
          if (result.statusCode === 200 && result.data) {
            const data = result.data;
            setFormData(prev => ({
              ...prev,
              type: data.type?.toString() || "1",
              customer_number: data.customer_no || "",
              name: data.name || "",
              contact_person: data.contact_person_name || "",
              phone: data.primary_mobile || "",
              mobile: data.secondary_mobile || "",
              email: data.email || "",
              website: data.website || "",
              division: data.division || "",
              industry: data.industry_id?.toString() || "",
              bill_address1: data.billing_address1 || "",
              bill_address2: data.billing_address2 || "",
              bill_city: data.billing_city || "",
              bill_zip: data.billing_postal_code || "",
              bill_landmark: data.billing_land_mark || "",
              
              // 🌍 Dynamic Field Injections: Mapping string keys to verify fallback cascading triggers
              bill_country: data.billing_country_name || "", 
              bill_state: data.billing_state_name || "",
              ship_address1: data.shipping_address1 || "",
              ship_address2: data.shipping_address2 || "",
              ship_city: data.shipping_city || "",
              ship_zip: data.shipping_postal_code || "",
              ship_landmark: data.shipping_land_mark || "",
              ship_country: data.shipping_country_name || "",
              ship_state: data.shipping_state_name || "",
              
              gst_no: data.gst_no || "",
              pan_no: data.pan_no || "",
              payment_term: data.payment_term_id?.toString() || "",
              payment_method: data.payment_method_id?.toString() || "",
              currency: data.currency_id === 2 ? "USD" : "INR",
              credit_limit: data.credit_limit || "",
              bank_holder: data.holder_name || "",
              bank_name: data.bank_name || "",
              bank_account: data.account_no || "",
              bank_ifsc: data.ifsc_code || "",
              bank_branch: data.branch_name || "",
              bank_type: data.account_type || "",
              sales_region: data.sales_region || "",
              customer_group: data.customer_group || "",
              shipping_method: data.shipping_method || "",
              notes: data.note || "",
              status: data.status?.toString() || "1"
            }));
          }
        } catch (error) {
          console.error("Failed to fetch customer for editing:", error);
        } finally {
          hideLoader(); 
        }
      };
      fetchCustomerData();
    }
  }, [editId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAttachments(files);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile' || name === 'phone') {
      const cleanValue = value.replace(/[^\d]/g, ''); 
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return; 
    }

    // 🌍 Clear target states variables when switching base countries
    if (name === 'bill_country') {
      setFormData(prev => ({ ...prev, bill_country: value, bill_state: '' }));
      return;
    }
    if (name === 'ship_country') {
      setFormData(prev => ({ ...prev, ship_country: value, ship_state: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (formData.mobile && !/^\d{10,15}$/.test(formData.mobile)) {
      alert("Please enter a valid mobile number containing only digits (10 to 15 digits).");
      return;
    }
    
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      alert("Please enter a valid phone number containing only digits.");
      return;
    }

    setIsSubmitting(true);
    showLoader();
    
    const dataPayload = new FormData();
    
    dataPayload.append('type', parseInt(formData.type) || 1);
    dataPayload.append('name', formData.name);
    dataPayload.append('contact_person_name', formData.contact_person || '');
    dataPayload.append('primary_mobile', formData.phone || '');
    dataPayload.append('secondary_mobile', formData.mobile || '');
    dataPayload.append('email', formData.email || '');
    dataPayload.append('website', formData.website || '');
    dataPayload.append('industry_id', formData.industry ? parseInt(formData.industry) : '');
    dataPayload.append('division', formData.division || '');
    dataPayload.append('billing_address1', formData.bill_address1 || '');
    dataPayload.append('billing_address2', formData.bill_address2 || '');
    
    // 🌍 Appending text values for your master configurations database log tracking maps
    dataPayload.append('billing_country_name', formData.bill_country || '');
    dataPayload.append('billing_state_name', formData.bill_state || '');
    dataPayload.append('billing_country_id', formData.bill_country || '');
    dataPayload.append('billing_state_id', formData.bill_state || '');
    
    dataPayload.append('billing_city', formData.bill_city || '');
    dataPayload.append('billing_postal_code', formData.bill_zip || '');
    dataPayload.append('billing_land_mark', formData.bill_landmark || '');
    dataPayload.append('shipping_address1', formData.ship_address1 || '');
    dataPayload.append('shipping_address2', formData.ship_address2 || '');
    
    // 🌍 Appending text values for your master configurations database log tracking maps
    dataPayload.append('shipping_country_name', formData.ship_country || '');
    dataPayload.append('shipping_state_name', formData.ship_state || '');
    dataPayload.append('shipping_country_id', formData.ship_country || '');
    dataPayload.append('shipping_state_id', formData.ship_state || '');
    
    dataPayload.append('shipping_city', formData.ship_city || '');
    dataPayload.append('shipping_postal_code', formData.ship_zip || '');
    dataPayload.append('shipping_land_mark', formData.ship_landmark || '');
    dataPayload.append('gst_no', formData.gst_no || '');
    dataPayload.append('pan_no', formData.pan_no || '');
    dataPayload.append('payment_term_id', parseInt(formData.payment_term) || 1);
    dataPayload.append('payment_method_id', parseInt(formData.payment_method) || 1);
    dataPayload.append('currency_id', formData.currency === "USD" ? 2 : 1);
    dataPayload.append('credit_limit', formData.credit_limit || "0.00");
    dataPayload.append('bank_name', formData.bank_name || '');
    dataPayload.append('account_no', formData.bank_account || '');
    dataPayload.append('ifsc_code', formData.bank_ifsc || '');
    dataPayload.append('branch_name', formData.bank_branch || '');
    dataPayload.append('holder_name', formData.bank_holder || '');
    dataPayload.append('account_type', formData.bank_type || '');
    dataPayload.append('sales_region', formData.sales_region || '');
    dataPayload.append('customer_group', formData.customer_group || '');
    dataPayload.append('shipping_method', formData.shipping_method || '');
    dataPayload.append('note', formData.notes || '');
    dataPayload.append('status', parseInt(formData.status) || 1);

    attachments.forEach((file) => {
      dataPayload.append('attachments[]', file);
    });

    const method = editId ? 'POST' : 'POST'; 
    if (editId) {
      dataPayload.append('_method', 'PUT');
    }

    try {
      const url = editId 
        ? `https://sdsinfotech.co.in/api/customers/${editId}` 
        : 'https://sdsinfotech.co.in/api/customers';

      const response = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${activeToken}` },
        body: dataPayload
      });

      const result = await response.json();

      if (result.statusCode === 200 || result.statusCode === 201 || !result.error) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate('/customer'), 2000);
      } else {
        alert("Failed to save: " + (result.statusMessage || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Connection failed. Please check your network.");
    } finally {
      setIsSubmitting(false);
      hideLoader();
    }
  };

  return (
    <div className="create-page">
      <div className="cust-page-header">
        <h1 className="cust-page-title">{editId ? "Edit Customer Profile" : "Create Customer Master"}</h1>
      </div>

      <form className="customer-form-scroller" onSubmit={(e) => e.preventDefault()}>
        <div className="cust-glass-card">
          <h3 className="cust-section-title">General Information</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <label>Customer Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="1">B to B</option>
                <option value="2">B to C</option>
                <option value="3">One time</option>
                <option value="4">Export</option>
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Customer Number</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="customer_number" value={formData.customer_number} onChange={handleChange} maxLength={10} placeholder="Auto-generated ID string" readOnly={!!editId} />
            </div>
            <div className="cust-input-group">
              <label>Division</label>
              <select name="division" value={formData.division} onChange={handleChange}>
                <option value="">Select Division</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div className="cust-input-group">
              <label>Type of Industry</label>
              <select name="industry" value={formData.industry} onChange={handleChange}>
                <option value="">Select Industry</option>
                <option value="1">Information Technology</option>
                <option value="2">Manufacturing</option>
              </select>
            </div>
            <div className="cust-input-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="1">Active Ledger</option>
                <option value="0">Inactive Blocked</option>
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Customer Name</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} placeholder="Legal Corporate Name" required />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Contact Person Name</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} maxLength={30} placeholder="Primary representative" />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Phone (Primary)</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Mobile (Secondary)</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Email</label><span className="char-limit">Max 30</span></div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={30} placeholder="accounting@domain.com" />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Website</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="website" value={formData.website} onChange={handleChange} maxLength={30} placeholder="https://" />
            </div>
          </div>
        </div>

        {/* ===================================================
           BILL TO ADDRESS (DYNAMIC API DRIVEN SELECTIONS)
        ====================================================== */}
        <div className="cust-glass-card">
          <h3 className="cust-section-title">Bill to Address</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="bill_address1" value={formData.bill_address1} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="bill_address2" value={formData.bill_address2} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
              <input type="text" name="bill_city" value={formData.bill_city} onChange={handleChange} maxLength={40} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="bill_zip" value={formData.bill_zip} onChange={handleChange} maxLength={10} />
            </div>
            <div className="cust-input-group">
              <label>Country</label>
              <select name="bill_country" value={formData.bill_country} onChange={handleChange}>
                <option value="">Select Country</option>
                {countriesList.map(country => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
            <div className="cust-input-group">
              <label>State</label>
              <select name="bill_state" value={formData.bill_state} onChange={handleChange} disabled={!formData.bill_country || billingStates.length === 0}>
                <option value="">{billingStates.length === 0 && formData.bill_country ? "Loading States..." : "Select State"}</option>
                {billingStates.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="bill_landmark" value={formData.bill_landmark} onChange={handleChange} maxLength={30} />
            </div>
          </div>
        </div>

        {/* ===================================================
           SHIP TO ADDRESS (DYNAMIC API DRIVEN SELECTIONS)
        ====================================================== */}
        <div className="cust-glass-card">
          <h3 className="cust-section-title">Ship to Address</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Street 1</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="ship_address1" value={formData.ship_address1} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Street 2</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="ship_address2" value={formData.ship_address2} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>City</label><span className="char-limit">Max 40</span></div>
              <input type="text" name="ship_city" value={formData.ship_city} onChange={handleChange} maxLength={40} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Postal Code</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="ship_zip" value={formData.ship_zip} onChange={handleChange} maxLength={10} />
            </div>
            <div className="cust-input-group">
              <label>Country</label>
              <select name="ship_country" value={formData.ship_country} onChange={handleChange}>
                <option value="">Select Country</option>
                {countriesList.map(country => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
            <div className="cust-input-group">
              <label>State</label>
              <select name="ship_state" value={formData.ship_state} onChange={handleChange} disabled={!formData.ship_country || shippingStates.length === 0}>
                <option value="">{shippingStates.length === 0 && formData.ship_country ? "Loading States..." : "Select State"}</option>
                {shippingStates.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="ship_landmark" value={formData.ship_landmark} onChange={handleChange} maxLength={30} />
            </div>
          </div>
        </div>

        <div className="cust-glass-card">
          <h3 className="cust-section-title">Financial & Tax Details</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <div className="label-wrapper"><label>GST Tax No</label><span className="char-limit">Max 15</span></div>
              <input type="text" name="gst_no" value={formData.gst_no} onChange={handleChange} maxLength={15} placeholder="22AAAAA0000A1Z5" />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>PAN Number</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="pan_no" value={formData.pan_no} onChange={handleChange} maxLength={10} placeholder="ABCDE1234F" />
            </div>
            <div className="cust-input-group">
              <label>Payment Term</label>
              <select name="payment_term" value={formData.payment_term} onChange={handleChange}>
                <option value="">Select Term</option>
                <option value="1">Net 30 Days</option>
              </select>
            </div>
            <div className="cust-input-group">
              <label>Payment Method</label>
              <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
                <option value="">Select Method</option>
                <option value="1">Bank Transfer</option>
              </select>
            </div>
            <div className="cust-input-group">
              <label>Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Credit Limit</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="credit_limit" value={formData.credit_limit} onChange={handleChange} maxLength={10} placeholder="0.00" />
            </div>
          </div>
        </div>

        <div className="cust-glass-card">
          <h3 className="cust-section-title">Bank Details</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Account Holder Name</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="bank_holder" value={formData.bank_holder} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Bank Name</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Account Number</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="bank_account" value={formData.bank_account} onChange={handleChange} maxLength={30} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>IFSC Code</label><span className="char-limit">Max 15</span></div>
              <input type="text" name="bank_ifsc" value={formData.bank_ifsc} onChange={handleChange} maxLength={15} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Branch Name</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="bank_branch" value={formData.bank_branch} onChange={handleChange} maxLength={30} />
            </div>
            <div className="cust-input-group">
              <label>Account Type</label>
              <select name="bank_type" value={formData.bank_type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>
          </div>
        </div>

        <div className="cust-glass-card">
          <h3 className="cust-section-title">Sales, Documents & Notes</h3>
          <div className="cust-form-grid">
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Sales Region</label><span className="char-limit">Max 20</span></div>
              <input type="text" name="sales_region" value={formData.sales_region} onChange={handleChange} maxLength={20} />
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Customer Group</label><span className="char-limit">Max 15</span></div>
              <input type="text" name="customer_group" value={formData.customer_group} onChange={handleChange} maxLength={15} />
            </div>
            <div className="cust-input-group">
              <label>Shipping Method</label>
              <select name="shipping_method" value={formData.shipping_method} onChange={handleChange}>
                <option value="">Select Method</option>
                <option value="Air">Air Freight</option>
                <option value="Road">Road Transport</option>
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Project</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="project" value={formData.project} onChange={handleChange} maxLength={50} />
            </div>
            <div className="cust-input-group full-width-field">
              <label>Documents Attachment</label>
              <input type="file" multiple className="file-upload-input" onChange={handleImageUpload} />
            </div>
            <div className="cust-input-group full-width-field">
              <div className="label-wrapper"><label>Notes</label><span className="char-limit">Max 300</span></div>
              <textarea name="notes" value={formData.notes} onChange={handleChange} maxLength={300} placeholder="Add specific internal billing parameters history notes..."></textarea>
            </div>
          </div>

          <div className="cust-action-shelf">
            <button type="button" className="cust-btn-cancel" onClick={() => navigate('/customer')} disabled={isSubmitting}>
              Cancel Configuration
            </button>
            <button type="button" className="cust-btn-save" onClick={handleSave} disabled={isSubmitting}>
              <HiOutlineUserAdd /> {isSubmitting ? "Processing Registry..." : "Save Customer Account"}
            </button>
          </div>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <FaCheckCircle className="success-icon" />
            <h2>Customer Saved!</h2>
            <p style={{ color: '#888', marginTop: '10px' }}>Syncing ledger profile arrays onto live system maps...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCustomer;