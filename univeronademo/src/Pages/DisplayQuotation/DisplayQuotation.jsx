import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useLoader } from '../../context/LoaderContext';
import './DisplayQuotation.css';

function DisplayQuotation() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // 1. Search State Management
  const [searchQuotationNo, setSearchQuotationNo] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  
  // Custom Error Modal Popup State
  const [errorPopupMessages, setErrorPopupMessages] = useState([]);

  // 2. Master Header fields initialized
  const [masterFields, setMasterFields] = useState({
    quotationNumber: '',
    quotationDate: '',
    customer: '',
    currency: '',
    expirationDate: '',
    paymentTerm: '',
    salesPerson: '',
    customerReference: '',
    termsConditions: ''
  });

  // 3. Line Items state array
  const [items, setItems] = useState([]);

  const activeToken = localStorage.getItem('auth_token');

  // Live API Fetch Handler for Quotation Document Search
  const handleFetchQuotation = async () => {
    const queryTerm = searchQuotationNo.trim();

    if (!queryTerm) {
      setErrorPopupMessages(["Please enter a valid Quotation Number first."]);
      return;
    }

    showLoader();

    try {
      // Call the API list endpoint
      const response = await fetch(`https://sdsinfotech.co.in/api/quotations?quotation_no=${encodeURIComponent(queryTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        }
      });

      const result = await response.json();

      if ((result.statusCode === 200 || !result.error) && result.data) {
        const rawData = Array.isArray(result.data) ? result.data : [result.data];

        // Find exact or partial matching quotation from response array
        const matchedQuotation = rawData.find(q => 
          q.quotation_no && q.quotation_no.toLowerCase() === queryTerm.toLowerCase()
        ) || rawData[0];

        if (matchedQuotation) {
          // Populate Master Header Fields
          setMasterFields({
            quotationNumber: matchedQuotation.quotation_no || queryTerm.toUpperCase(),
            quotationDate: matchedQuotation.date || '—',
            customer: matchedQuotation.customer?.name || (matchedQuotation.customer_id ? `Customer ID: ${matchedQuotation.customer_id}` : '—'),
            currency: matchedQuotation.currency?.code || matchedQuotation.currency?.name || 'INR',
            expirationDate: matchedQuotation.expiration_date || '—',
            paymentTerm: matchedQuotation.payment_term?.name || (matchedQuotation.payment_term_id ? `Term ID: ${matchedQuotation.payment_term_id}` : '—'),
            salesPerson: matchedQuotation.sales_person || matchedQuotation.created_by || '—',
            customerReference: matchedQuotation.customer_ref || '—',
            termsConditions: matchedQuotation.note || 'No terms or conditions recorded.'
          });

          // Unroll & Format Line Items Array
          if (Array.isArray(matchedQuotation.items) && matchedQuotation.items.length > 0) {
            const formattedItems = matchedQuotation.items.map((item, idx) => {
              const unitPriceNum = parseFloat(item.unit_price) || 0;
              const taxAmountNum = parseFloat(item.tax_amount) || 0;
              const calcTaxPercent = unitPriceNum > 0 ? ((taxAmountNum / unitPriceNum) * 100).toFixed(0) : 0;

              return {
                id: item.id || `item-${idx}`,
                material: item.material || '—',
                description: item.material_description || '—',
                quantity: item.quantity ? parseFloat(item.quantity) : 0,
                uom: item.uom || '—',
                unitPrice: unitPriceNum,
                taxes: calcTaxPercent,
                total: item.total_amount ? parseFloat(item.total_amount).toFixed(2) : '0.00'
              };
            });

            setItems(formattedItems);
          } else {
            setItems([]);
          }

          setHasFetched(true);
        } else {
          setErrorPopupMessages([`No matching quotation found for "${queryTerm}".`]);
          setHasFetched(false);
        }
      } else {
        setErrorPopupMessages([result.statusMessage || "Failed to load quotation details."]);
        setHasFetched(false);
      }
    } catch (error) {
      console.error("Fetch Quotation Error:", error);
      setErrorPopupMessages(["Network connection failed. Please check your network connection."]);
      setHasFetched(false);
    } finally {
      hideLoader();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFetchQuotation();
    }
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>Display Quotation Document</h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="inspect-report-form">
        
        {/* ===================================================
           1. TOP AREA LAYER: MASTER METADATA HEADER (INEDITABLE)
        ====================================================== */}
        <div className="inspect-bento-card meta-grid-card">
          <div className="field-row">
            {/* SEARCH INPUT FIELD WITH BUTTON */}
            <div className="input-group search-action-field">
              <label>Quotation Number</label>
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter ID (e.g., Q000001 or Q000002)" 
                  value={searchQuotationNo}
                  onChange={(e) => setSearchQuotationNo(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  type="button" 
                  className="q-fetch-action-btn" 
                  onClick={handleFetchQuotation}
                  title="Fetch Document Records"
                >
                  <HiOutlineSearch size={18} />
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Quotation Date</label>
              <input type="text" value={masterFields.quotationDate || '—'} disabled />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Customer</label>
              <input type="text" value={masterFields.customer || '—'} disabled />
            </div>
            <div className="input-group">
              <label>Currency</label>
              <input type="text" value={masterFields.currency || '—'} disabled />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Expiration Date</label>
              <input type="text" value={masterFields.expirationDate || '—'} disabled />
            </div>
            <div className="input-group">
              <label>Payment Term</label>
              <input type="text" value={masterFields.paymentTerm || '—'} disabled />
            </div>
          </div>
        </div>

        {/* ===================================================
           2. CENTER AREA LAYER: INEDITABLE LINE ITEMS MATRIX
        ====================================================== */}
        <div className="inspect-bento-card item-table-card">
          <div className="table-action-header">
            <h3 style={{ textTransform: 'uppercase', color: '#7b61ff', letterSpacing: '0.3px' }}>
              Line Items Matrix
            </h3>
          </div>
          
          <div className="table-overflow-scroller">
            <table className="inspect-matrix-table clean-theme-header">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Material</th>
                  <th style={{ width: '35%' }}>Description</th>
                  <th style={{ width: '10%' }}>Quantity</th>
                  <th style={{ width: '10%' }}>UOM</th>
                  <th style={{ width: '12%' }}>Unit Price</th>
                  <th style={{ width: '8%' }}>Taxes (%)</th>
                  <th style={{ width: '10%' }}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {hasFetched && items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td><input type="text" value={item.material} disabled /></td>
                      <td><input type="text" value={item.description} disabled /></td>
                      <td><input type="number" value={item.quantity} disabled /></td>
                      <td><input type="text" value={item.uom} disabled /></td>
                      <td><input type="number" value={item.unitPrice} disabled /></td>
                      <td><input type="number" value={item.taxes} disabled /></td>
                      <td style={{ fontWeight: '700', paddingLeft: '16px', color: 'inherit' }}>
                        {item.total}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#888', fontStyle: 'italic' }}>
                      {hasFetched && items.length === 0 
                        ? "No line items found for this quotation."
                        : "No document records loaded. Enter a Quotation Number above and click search."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {hasFetched && items.length > 0 && (
            <div className="q-table-summary-pane" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(128,128,128,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 20px', borderRadius: '10px', background: 'rgba(128,128,128,0.05)' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Total Accumulation:</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#00cc88' }}>{masterFields.currency} {calculateGrandTotal()}</span>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
           3. FOOT AREA LAYER: LEGER CONDITIONS & INFO
        ====================================================== */}
        <div className="inspect-bento-card complex-logs-card">
          <div className="textarea-row">
            <label>Terms and Conditions</label>
            <textarea value={masterFields.termsConditions} disabled rows="4" placeholder="No conditions recorded..." />
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#7b61ff', margin: '20px 0 15px 0', borderBottom: '1px solid rgba(128,128,128,0.1)', paddingBottom: '8px' }}>
            Other Information
          </h3>
          
          <div className="field-row">
            <div className="input-group">
              <label>Sales Person</label>
              <input type="text" value={masterFields.salesPerson || '—'} disabled />
            </div>
            <div className="input-group">
              <label>Customer Reference</label>
              <input type="text" value={masterFields.customerReference || '—'} disabled />
            </div>
          </div>
        </div>

        {/* REGISTRY ACTIONS CANVASES CONTROL FOOTER RAIL */}
        <div className="report-canvas-action-footer">
          <button type="button" className="form-secondary-btn" onClick={() => navigate('/quotation')}>
            Exit Component View
          </button>
        </div>

      </form>

      {/* ===================================================
         CUSTOM ERROR POPUP MODAL
      ====================================================== */}
      {errorPopupMessages.length > 0 && (
        <div className="modal-overlay" onClick={() => setErrorPopupMessages([])} style={{ zIndex: 1200 }}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '440px', padding: '30px', textAlign: 'center' }}
          >
            <div style={{ color: '#ef4444', fontSize: '42px', marginBottom: '12px' }}>
              <FaExclamationTriangle />
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 14px 0', color: '#ef4444' }}>
              Validation Failed
            </h2>
            
            <div style={{ textAlign: 'left', background: 'rgba(239, 68, 68, 0.08)', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px' }}>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#d32f2f', fontSize: '13px', lineHeight: '1.6' }}>
                {errorPopupMessages.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button 
                type="button" 
                onClick={() => setErrorPopupMessages([])}
                style={{ 
                  padding: '10px 28px', 
                  borderRadius: '12px', 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DisplayQuotation;