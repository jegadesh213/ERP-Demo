import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineSave, HiOutlineShoppingCart, HiX } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext';
import './ChangeQuotation.css';

function ChangeQuotation() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // 1. Transaction Lookup and Modal Visibility Controls
  const [searchQuotationNo, setSearchQuotationNo] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // 2. Master Header Data Matrix Mapping (White fields = editable, Grey fields = disabled)
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

  // 3. Line Items Table Collection
  const [items, setItems] = useState([]);

  // Mock API framework handler to fill editable and ineditable components
  const handleFetchDocument = () => {
    if (!searchQuotationNo.trim()) {
      alert("Please enter a valid Quotation Number first.");
      return;
    }
    showLoader();
    setTimeout(() => {
      setMasterFields({
        quotationNumber: searchQuotationNo.toUpperCase(),
        quotationDate: '2026-07-19',
        customer: 'Maruthi Industries Ltd',
        currency: 'INR',
        expirationDate: '2026-08-25',
        paymentTerm: 'Net 30 Days',
        salesPerson: 'Vignesh Kumar',
        customerReference: 'REF-MIT-9942',
        termsConditions: '1. Standard freight delivery metrics apply.\n2. Price validation holds for 30 calendar days.'
      });

      setItems([
        { id: 'item_1', material: 'MAT-TRK-01', description: 'Heavy Vehicle Brake Assembly', quantity: 10, uom: 'PCS', unitPrice: 4500.00, taxes: 18, total: '53100.00' },
        { id: 'item_2', material: 'MAT-TRK-05', description: 'Pneumatic Suspension Valve Ring', quantity: 25, uom: 'EOA', unitPrice: 850.00, taxes: 12, total: '23800.00' }
      ]);

      setHasFetched(true);
      hideLoader();
    }, 700);
  };

  const handleMasterChange = (e) => {
    const { name, value } = e.target;
    setMasterFields(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const qty = parseFloat(updatedItem.quantity) || 0;
        const price = parseFloat(updatedItem.unitPrice) || 0;
        const taxPercent = parseFloat(updatedItem.taxes) || 0;
        
        const baseAmount = qty * price;
        const taxAmount = baseAmount * (taxPercent / 100);
        
        updatedItem.total = (baseAmount + taxAmount).toFixed(2);
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
  };

  const handleSaveChange = (e) => {
    e.preventDefault();
    alert("Quotation modifications posted successfully!");
    navigate('/quotation');
  };

  const handleConfirmOrder = () => {
    alert("Sales Order created successfully from Quotation record mappings!");
    setShowOrderModal(false);
    navigate('/order');
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>Change Quotation Document</h2>
      </div>

      <form onSubmit={handleSaveChange} className="inspect-report-form">
        
        {/* ===================================================
           1. TOP AREA LAYER: MASTER METADATA FORM MATRIX
        ====================================================== */}
        <div className="inspect-bento-card meta-grid-card">
          <div className="field-row">
            {/* EDITABLE SEARCH LOCK: Quotation input query anchor */}
            <div className="input-group search-action-field">
              <label>Quotation Number</label>
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter ID (e.g., QT-2026-042)" 
                  value={searchQuotationNo}
                  onChange={(e) => setSearchQuotationNo(e.target.value)}
                />
                <button type="button" className="q-fetch-action-btn" onClick={handleFetchDocument}>
                  <HiOutlineSearch size={18} />
                </button>
              </div>
            </div>

            {/* INEDITABLE LAYER FIELD (GREY AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group disabled-grey-field">
              <label>Quotation Date</label>
              <input type="text" value={masterFields.quotationDate} disabled placeholder="—" />
            </div>
          </div>

          <div className="field-row">
            {/* INEDITABLE LAYER FIELD (GREY AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group disabled-grey-field">
              <label>Customer</label>
              <input type="text" value={masterFields.customer} disabled placeholder="—" />
            </div>
            {/* INEDITABLE LAYER FIELD (GREY AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group disabled-grey-field">
              <label>Currency</label>
              <input type="text" value={masterFields.currency} disabled placeholder="—" />
            </div>
          </div>

          <div className="field-row">
            {/* EDITABLE FIELD (WHITE AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group">
              <label>Expiration Date</label>
              <input 
                type="date" 
                name="expirationDate" 
                value={masterFields.expirationDate} 
                onChange={handleMasterChange} 
                disabled={!hasFetched}
              />
            </div>
            {/* INEDITABLE LAYER FIELD (GREY AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group disabled-grey-field">
              <label>Payment Term</label>
              <input type="text" value={masterFields.paymentTerm} disabled placeholder="—" />
            </div>
          </div>
        </div>

        {/* ===================================================
           2. CENTER AREA LAYER: DATA MATRIX ENTRY MATRIX TABLE
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
                {hasFetched ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td><input type="text" value={item.material} onChange={(e) => handleItemChange(item.id, 'material', e.target.value)} /></td>
                      <td><input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} /></td>
                      <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} /></td>
                      <td><input type="text" value={item.uom} onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)} /></td>
                      <td><input type="number" step="0.01" value={item.unitPrice} onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)} /></td>
                      <td><input type="number" value={item.taxes} onChange={(e) => handleItemChange(item.id, 'taxes', e.target.value)} /></td>
                      <td style={{ fontWeight: '700', paddingLeft: '16px' }}>{item.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#888', fontStyle: 'italic' }}>
                      Please query a Quotation Number at the top parameters block to release configuration arrays.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {hasFetched && (
            <div className="q-table-summary-pane" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(128,128,128,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 20px', borderRadius: '10px', background: 'rgba(128,128,128,0.05)' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Total Accumulation:</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#00cc88' }}>{masterFields.currency} {calculateGrandTotal()}</span>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
           3. FOOT AREA LAYER: DATA LEDGERS & INTERNAL NOTES
        ====================================================== */}
        <div className="inspect-bento-card complex-logs-card">
          <div className="textarea-row">
            <label>Terms and Conditions</label>
            <textarea 
              name="termsConditions" 
              value={masterFields.termsConditions} 
              onChange={handleMasterChange} 
              disabled={!hasFetched} 
              rows="4" 
            />
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#7b61ff', margin: '20px 0 15px 0', borderBottom: '1px solid rgba(128,128,128,0.1)', paddingBottom: '8px' }}>
            Other Information
          </h3>
          
          <div className="field-row">
            {/* EDITABLE FIELD (WHITE AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group">
              <label>Sales Person</label>
              <input 
                type="text" 
                name="salesPerson" 
                value={masterFields.salesPerson} 
                onChange={handleMasterChange} 
                disabled={!hasFetched} 
              />
            </div>
            {/* EDITABLE FIELD (WHITE AS PER DESIGN CONSTRAINTS) */}
            <div className="input-group">
              <label>Customer Reference</label>
              <input 
                type="text" 
                name="customerReference" 
                value={masterFields.customerReference} 
                onChange={handleMasterChange} 
                disabled={!hasFetched} 
              />
            </div>
          </div>
        </div>

        {/* ===================================================
           4. SYSTEM SUBMIT ACTION CONTROLS RAIL
        ====================================================== */}
        <div className="report-canvas-action-footer">
          <button type="button" className="form-secondary-btn" onClick={() => navigate('/quotation')}>
            Discard Changes
          </button>
          {hasFetched && (
            <>
              <button type="button" className="form-order-trigger-btn" onClick={() => setShowOrderModal(true)}>
                <HiOutlineShoppingCart /> CREATE ORDER
              </button>
              <button type="submit" className="form-primary-btn">
                <HiOutlineSave /> SAVE ALTERATIONS
              </button>
            </>
          )}
        </div>

      </form>

      {/* ===================================================
         5. MODAL OVERLAY POPUP LAYER: SALES ORDER REVIEW WINDOW
      ====================================================== */}
      {showOrderModal && (
        <div className="order-popup-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="order-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="order-popup-header">
              <div>
                <h3>Confirm Order Conversion Matrix</h3>
                <p>Verify ledger line parameters items before pushing to live orders collection.</p>
              </div>
              <button type="button" className="popup-close-btn" onClick={() => setShowOrderModal(false)}>
                <HiX />
              </button>
            </div>

            <div className="popup-table-wrapper">
              <table className="inspect-matrix-table clean-theme-header">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>UOM</th>
                    <th>Unit Price</th>
                    <th>Taxes</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.material}</td>
                      <td>{item.description}</td>
                      <td style={{ textAlign: 'center', fontWeight: '600' }}>{item.quantity}</td>
                      <td>{item.uom}</td>
                      <td style={{ textAlign: 'right' }}>{item.unitPrice}</td>
                      <td style={{ textAlign: 'center' }}>{item.taxes}%</td>
                      <td style={{ textAlign: 'right', fontWeight: '700' }}>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="popup-textarea-preview">
              <label>Applied Commercial Terms Conditions</label>
              <textarea value={masterFields.termsConditions} disabled rows="3" />
            </div>

            <div className="popup-actions-shelf">
              <button type="button" className="form-secondary-btn" onClick={() => setShowOrderModal(false)}>
                Cancel Request
              </button>
              <button type="button" className="form-primary-btn popup-confirm-btn" onClick={handleConfirmOrder}>
                <HiOutlineShoppingCart /> CONFIRM & CREATE ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeQuotation;