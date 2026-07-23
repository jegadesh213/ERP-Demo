import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaPaperclip, FaTimes } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext'; 
import './CreateCustomer.css';

function CreateCustomer() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // State for Attachments
  const [attachments, setAttachments] = useState([]);
  const [existingAttachments, setExistingAttachments] = useState([]);

  // Dynamic API Master Datasets
  const [countriesList, setCountriesList] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [industriesList, setIndustriesList] = useState([]);
  const [paymentTermsList, setPaymentTermsList] = useState([]);
  const [paymentMethodsList, setPaymentMethodsList] = useState([]);
  const [customerTypesList, setCustomerTypesList] = useState([]);
  const [bankAccountTypesList, setBankAccountTypesList] = useState([]);
  const [shippingMethodsList, setShippingMethodsList] = useState([]);

  const [formData, setFormData] = useState({
    type: "",           // Stores Customer Type ID as string
    customer_number: "",
    division: "",
    industry: "",       // Stores Industry ID as string
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
    payment_term: "",   // Stores Payment Term ID as string
    payment_method: "", // Stores Payment Method ID as string
    currency: "",       // Stores Currency ID as string
    credit_limit: "",
    bank_holder: "",
    bank_name: "",
    bank_account: "",
    bank_ifsc: "",
    bank_branch: "",
    bank_type: "",      // Stores Bank Account Type ID as string
    sales_region: "",
    customer_group: "",
    shipping_method: "",// Stores Shipping Method ID as string
    project: "",
    notes: ""
  });

  const location = useLocation();
  const editId = location.state?.editId; 
  const activeToken = localStorage.getItem('auth_token');

  // 1. API HOOK: Fetch all global master reference datasets
  useEffect(() => {
    const fetchMasterData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      };

      // Countries
      fetch('https://sdsinfotech.co.in/api/common/countries', { headers })
        .then(res => res.json())
        .then(res => res.data && setCountriesList(res.data))
        .catch(err => console.error("Countries fetch error:", err));

      // Currencies
      fetch('https://sdsinfotech.co.in/api/common/currencies', { headers })
        .then(res => res.json())
        .then(res => res.data && setCurrenciesList(res.data))
        .catch(err => console.error("Currencies fetch error:", err));

      // Industries
      fetch('https://sdsinfotech.co.in/api/common/industries', { headers })
        .then(res => res.json())
        .then(res => res.data && setIndustriesList(res.data))
        .catch(err => console.error("Industries fetch error:", err));

      // Payment Terms
      fetch('https://sdsinfotech.co.in/api/common/payment-terms', { headers })
        .then(res => res.json())
        .then(res => res.data && setPaymentTermsList(res.data))
        .catch(err => console.error("Payment Terms fetch error:", err));

      // Payment Methods
      fetch('https://sdsinfotech.co.in/api/common/payment-methods', { headers })
        .then(res => res.json())
        .then(res => res.data && setPaymentMethodsList(res.data))
        .catch(err => console.error("Payment Methods fetch error:", err));

      // Customer Types
      fetch('https://sdsinfotech.co.in/api/common/customer-types', { headers })
        .then(res => res.json())
        .then(res => res.data && setCustomerTypesList(res.data))
        .catch(err => console.error("Customer Types fetch error:", err));

      // Bank Account Types
      fetch('https://sdsinfotech.co.in/api/common/bank-account-types', { headers })
        .then(res => res.json())
        .then(res => res.data && setBankAccountTypesList(res.data))
        .catch(err => console.error("Bank Account Types fetch error:", err));

      // Shipping Methods
      fetch('https://sdsinfotech.co.in/api/common/shipping-methods', { headers })
        .then(res => res.json())
        .then(res => res.data && setShippingMethodsList(res.data))
        .catch(err => console.error("Shipping Methods fetch error:", err));
    };

    fetchMasterData();
  }, [activeToken]);

  const getCountryNameById = (id) => {
    if (!id) return '';
    const found = countriesList.find(c => c.id.toString() === id.toString());
    return found ? found.name : '';
  };

  const getStateNameById = (id, statesList) => {
    if (!id) return '';
    const found = statesList.find(s => s.id.toString() === id.toString());
    return found ? found.name : '';
  };

  // 2. API HOOK: Fetch dynamic states for Bill To Address
  useEffect(() => {
    if (!formData.bill_country) {
      setBillingStates([]);
      return;
    }
    fetch(`https://sdsinfotech.co.in/api/common/states/${formData.bill_country}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      }
    })
      .then(res => res.json())
      .then(res => setBillingStates(res.data || []))
      .catch(err => console.error("Failed fetching regional states for billing country:", err));
  }, [formData.bill_country, activeToken]);

  // 3. API HOOK: Fetch dynamic states for Ship To Address
  useEffect(() => {
    if (!formData.ship_country) {
      setShippingStates([]);
      return;
    }
    fetch(`https://sdsinfotech.co.in/api/common/states/${formData.ship_country}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      }
    })
      .then(res => res.json())
      .then(res => setShippingStates(res.data || []))
      .catch(err => console.error("Failed fetching regional states for shipping country:", err));
  }, [formData.ship_country, activeToken]);

  // 4. Fetch Customer Data for Editing
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
              type: data.type ? data.type.toString() : data.customer_type?.id ? data.customer_type.id.toString() : "1",
              customer_number: data.customer_no || "",
              name: data.name || "",
              contact_person: data.contact_person_name || "",
              phone: data.primary_mobile || "",
              mobile: data.secondary_mobile || "",
              email: data.email || "",
              website: data.website || "",
              division: data.division || "",
              
              industry: data.industry_id ? data.industry_id.toString() : data.industry?.id ? data.industry.id.toString() : "",
              
              bill_address1: data.billing_address1 || "",
              bill_address2: data.billing_address2 || "",
              bill_city: data.billing_city || "",
              bill_zip: data.billing_postal_code || "",
              bill_landmark: data.billing_land_mark || "",
              
              bill_country: data.billing_country_id ? data.billing_country_id.toString() : data.billing_country?.id ? data.billing_country.id.toString() : "", 
              bill_state: data.billing_state_id ? data.billing_state_id.toString() : data.billing_state?.id ? data.billing_state.id.toString() : "",
              
              ship_address1: data.shipping_address1 || "",
              ship_address2: data.shipping_address2 || "",
              ship_city: data.shipping_city || "",
              ship_zip: data.shipping_postal_code || "",
              ship_landmark: data.shipping_land_mark || "",
              ship_country: data.shipping_country_id ? data.shipping_country_id.toString() : data.shipping_country?.id ? data.shipping_country.id.toString() : "",
              ship_state: data.shipping_state_id ? data.shipping_state_id.toString() : data.shipping_state?.id ? data.shipping_state.id.toString() : "",
              
              gst_no: data.gst_no || "",
              pan_no: data.pan_no || "",
              
              payment_term: data.payment_term_id ? data.payment_term_id.toString() : data.payment_term?.id ? data.payment_term.id.toString() : "",
              payment_method: data.payment_method_id ? data.payment_method_id.toString() : data.payment_method?.id ? data.payment_method.id.toString() : "",
              currency: data.currency_id ? data.currency_id.toString() : data.currency?.id ? data.currency.id.toString() : "",
              
              credit_limit: data.credit_limit || "",
              bank_holder: data.holder_name || "",
              bank_name: data.bank_name || "",
              bank_account: data.account_no || "",
              bank_ifsc: data.ifsc_code || "",
              bank_branch: data.branch_name || "",
              
              bank_type: data.account_type ? data.account_type.toString() : data.bank_account_type?.id ? data.bank_account_type.id.toString() : "",
              sales_region: data.sales_region || "",
              customer_group: data.customer_group || "",
              
              shipping_method: data.shipping_method ? data.shipping_method.toString() : data.shipping_method_obj?.id ? data.shipping_method_obj.id.toString() : "",
              
              project: data.project || "",
              notes: data.note || "",
              status: data.status?.toString() || "1"
            }));

            if (Array.isArray(data.attachments)) {
              setExistingAttachments(data.attachments);
            }
          }
        } catch (error) {
          console.error("Failed to fetch customer for editing:", error);
        } finally {
          hideLoader(); 
        }
      };
      fetchCustomerData();
    }
  }, [editId, activeToken]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const removeStagedFile = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile' || name === 'phone') {
      const cleanValue = value.replace(/[^\d]/g, ''); 
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return; 
    }

    if (name === 'bank_ifsc') {
      setFormData(prev => ({ ...prev, bank_ifsc: value.toUpperCase() }));
      return;
    }

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

    if (formData.bank_ifsc) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(formData.bank_ifsc)) {
        alert("Invalid IFSC Code format!\n\nFormat requirements:\n- First 4 characters: Letters (Bank Code)\n- 5th character: Must be zero '0'\n- Last 6 characters: Numbers or Letters (Branch Code)\n\nExample: SBIN0001234");
        return;
      }
    }

    setIsSubmitting(true);
    showLoader();
    
    const dataPayload = new FormData();
    
    // Sends Customer Type ID as Integer
    dataPayload.append('type', formData.type ? parseInt(formData.type, 10) : 1);
    
    dataPayload.append('name', formData.name);
    dataPayload.append('contact_person_name', formData.contact_person || '');
    dataPayload.append('primary_mobile', formData.phone || '');
    dataPayload.append('secondary_mobile', formData.mobile || '');
    dataPayload.append('email', formData.email || '');
    dataPayload.append('website', formData.website || '');
    
    // Sends Industry ID as Integer
    dataPayload.append('industry_id', formData.industry ? parseInt(formData.industry, 10) : '');
    
    dataPayload.append('division', formData.division || '');
    dataPayload.append('billing_address1', formData.bill_address1 || '');
    dataPayload.append('billing_address2', formData.bill_address2 || '');
    
    dataPayload.append('billing_country_id', formData.bill_country ? parseInt(formData.bill_country, 10) : '');
    dataPayload.append('billing_country_name', getCountryNameById(formData.bill_country));
    dataPayload.append('billing_state_id', formData.bill_state ? parseInt(formData.bill_state, 10) : '');
    dataPayload.append('billing_state_name', getStateNameById(formData.bill_state, billingStates));
    
    dataPayload.append('billing_city', formData.bill_city || '');
    dataPayload.append('billing_postal_code', formData.bill_zip || '');
    dataPayload.append('billing_land_mark', formData.bill_landmark || '');
    dataPayload.append('shipping_address1', formData.ship_address1 || '');
    dataPayload.append('shipping_address2', formData.ship_address2 || '');
    
    dataPayload.append('shipping_country_id', formData.ship_country ? parseInt(formData.ship_country, 10) : '');
    dataPayload.append('shipping_country_name', getCountryNameById(formData.ship_country));
    dataPayload.append('shipping_state_id', formData.ship_state ? parseInt(formData.ship_state, 10) : '');
    dataPayload.append('shipping_state_name', getStateNameById(formData.ship_state, shippingStates));
    
    dataPayload.append('shipping_city', formData.ship_city || '');
    dataPayload.append('shipping_postal_code', formData.ship_zip || '');
    dataPayload.append('shipping_land_mark', formData.ship_landmark || '');
    dataPayload.append('gst_no', formData.gst_no || '');
    dataPayload.append('pan_no', formData.pan_no || '');
    
    dataPayload.append('payment_term_id', formData.payment_term ? parseInt(formData.payment_term, 10) : '');
    dataPayload.append('payment_method_id', formData.payment_method ? parseInt(formData.payment_method, 10) : '');
    dataPayload.append('currency_id', formData.currency ? parseInt(formData.currency, 10) : '');
    
    dataPayload.append('credit_limit', formData.credit_limit || "0.00");
    dataPayload.append('bank_name', formData.bank_name || '');
    dataPayload.append('account_no', formData.bank_account || '');
    dataPayload.append('ifsc_code', formData.bank_ifsc || '');
    dataPayload.append('branch_name', formData.bank_branch || '');
    dataPayload.append('holder_name', formData.bank_holder || '');
    
    // Sends Bank Account Type ID as Integer
    dataPayload.append('account_type', formData.bank_type ? parseInt(formData.bank_type, 10) : '');
    
    dataPayload.append('sales_region', formData.sales_region || '');
    dataPayload.append('customer_group', formData.customer_group || '');
    
    // Sends Shipping Method ID as Integer
    dataPayload.append('shipping_method', formData.shipping_method ? parseInt(formData.shipping_method, 10) : '');
    
    dataPayload.append('project', formData.project || '');
    dataPayload.append('note', formData.notes || '');
    dataPayload.append('status', parseInt(formData.status) || 1);

    attachments.forEach((file) => {
      dataPayload.append('attachments[]', file);
    });

    const method = 'POST'; 
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
            
            {/* DYNAMIC CUSTOMER TYPE DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Customer Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Customer Type</option>
                {customerTypesList.map(ct => (
                  <option key={ct.id} value={ct.id}>{ct.name}</option>
                ))}
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

            {/* DYNAMIC INDUSTRY DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Type of Industry</label>
              <select name="industry" value={formData.industry} onChange={handleChange}>
                <option value="">Select Industry</option>
                {industriesList.map(ind => (
                  <option key={ind.id} value={ind.id}>{ind.name}</option>
                ))}
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
              <div className="label-wrapper"><label>Website</label><span className="char-limit">Max 100</span></div>
              <input type="text" name="website" value={formData.website} onChange={handleChange} maxLength={100} placeholder="https://www.example.com" />
            </div>
          </div>
        </div>

        {/* BILL TO ADDRESS */}
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
                {countriesList.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="cust-input-group">
              <label>State</label>
              <select name="bill_state" value={formData.bill_state} onChange={handleChange} disabled={!formData.bill_country}>
                <option value="">{!formData.bill_country ? "Select Country First" : billingStates.length === 0 ? "Loading States..." : "Select State"}</option>
                {billingStates.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="bill_landmark" value={formData.bill_landmark} onChange={handleChange} maxLength={30} />
            </div>
          </div>
        </div>

        {/* SHIP TO ADDRESS */}
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
                {countriesList.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="cust-input-group">
              <label>State</label>
              <select name="ship_state" value={formData.ship_state} onChange={handleChange} disabled={!formData.ship_country}>
                <option value="">{!formData.ship_country ? "Select Country First" : shippingStates.length === 0 ? "Loading States..." : "Select State"}</option>
                {shippingStates.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
            </div>
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Land Mark</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="ship_landmark" value={formData.ship_landmark} onChange={handleChange} maxLength={30} />
            </div>
          </div>
        </div>

        {/* FINANCIAL & TAX DETAILS */}
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

            {/* DYNAMIC PAYMENT TERM DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Payment Term</label>
              <select name="payment_term" value={formData.payment_term} onChange={handleChange}>
                <option value="">Select Term</option>
                {paymentTermsList.map(pt => (
                  <option key={pt.id} value={pt.id}>{pt.name}</option>
                ))}
              </select>
            </div>

            {/* DYNAMIC PAYMENT METHOD DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Payment Method</label>
              <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
                <option value="">Select Method</option>
                {paymentMethodsList.map(pm => (
                  <option key={pm.id} value={pm.id}>{pm.name}</option>
                ))}
              </select>
            </div>

            {/* DYNAMIC CURRENCY DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="">Select Currency</option>
                {currenciesList.map(curr => (
                  <option key={curr.id} value={curr.id}>
                    {curr.code} - {curr.name} {curr.symbol ? `(${curr.symbol})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="cust-input-group">
              <div className="label-wrapper"><label>Credit Limit</label><span className="char-limit">Max 10</span></div>
              <input type="text" name="credit_limit" value={formData.credit_limit} onChange={handleChange} maxLength={10} placeholder="0.00" />
            </div>
          </div>
        </div>

        {/* BANK DETAILS */}
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
              <div className="label-wrapper"><label>IFSC Code</label><span className="char-limit">11 Chars (e.g. SBIN0001234)</span></div>
              <input 
                type="text" 
                name="bank_ifsc" 
                value={formData.bank_ifsc} 
                onChange={handleChange} 
                maxLength={11} 
                placeholder="SBIN0001234" 
              />
            </div>

            <div className="cust-input-group">
              <div className="label-wrapper"><label>Branch Name</label><span className="char-limit">Max 30</span></div>
              <input type="text" name="bank_branch" value={formData.bank_branch} onChange={handleChange} maxLength={30} />
            </div>

            {/* DYNAMIC BANK ACCOUNT TYPE DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Account Type</label>
              <select name="bank_type" value={formData.bank_type} onChange={handleChange}>
                <option value="">Select Account Type</option>
                {bankAccountTypesList.map(bat => (
                  <option key={bat.id} value={bat.id}>{bat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SALES & NOTES */}
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

            {/* DYNAMIC SHIPPING METHOD DROPDOWN FROM API */}
            <div className="cust-input-group">
              <label>Shipping Method</label>
              <select name="shipping_method" value={formData.shipping_method} onChange={handleChange}>
                <option value="">Select Shipping Method</option>
                {shippingMethodsList.map(sm => (
                  <option key={sm.id} value={sm.id}>{sm.name}</option>
                ))}
              </select>
            </div>
            
            <div className="cust-input-group">
              <div className="label-wrapper"><label>Project</label><span className="char-limit">Max 50</span></div>
              <input type="text" name="project" value={formData.project} onChange={handleChange} maxLength={50} placeholder="Associated Project Code/Name" />
            </div>

            {/* ATTACHMENT FIELD */}
            <div className="cust-input-group full-width-field">
              <label>Documents Attachment</label>
              <input type="file" multiple className="file-upload-input" onChange={handleImageUpload} />
              
              {attachments.length > 0 && (
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {attachments.map((file, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        background: 'rgba(59, 130, 246, 0.15)', 
                        color: '#3b82f6', 
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FaPaperclip /> {file.name}
                      <FaTimes 
                        style={{ cursor: 'pointer', marginLeft: '4px' }} 
                        onClick={() => removeStagedFile(idx)} 
                      />
                    </span>
                  ))}
                </div>
              )}

              {existingAttachments.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>Existing Attachments:</span>
                  <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {existingAttachments.map((att, idx) => {
                      const fileUrl = typeof att === 'string' ? att : att.url || att.file_path || att.file;
                      const fileName = typeof att === 'string' ? att.split('/').pop() : att.file_name || att.name || `Attachment ${idx + 1}`;
                      return (
                        <a 
                          key={idx} 
                          href={fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ 
                            background: 'rgba(123, 97, 255, 0.15)', 
                            color: '#7b61ff', 
                            padding: '6px 12px', 
                            borderRadius: '8px', 
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'none'
                          }}
                        >
                          <FaPaperclip /> {fileName}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
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