import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineDocumentAdd, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import './CreateQuotation.css';

function CreateQuotation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect modes programmatically passed down from the dashboard tiles layout state
  const currentMode = location.state?.mode || 'create';
  const isDisplayMode = currentMode === 'display';
  const isChangeMode = currentMode === 'change';

  // 1. Master Header Inputs matching layout fields
  const [masterFields, setMasterFields] = useState({
    quotationNumber: 'QT-2026-042',
    quotationDate: new Date().toISOString().split('T')[0],
    customer: '',
    currency: 'INR',
    expirationDate: '',
    paymentTerm: '',
    salesPerson: '',
    customerReference: '',
    termsConditions: ''
  });

  // 2. Dynamic Matrix Lines Table State Array
  const [items, setItems] = useState([
    { id: 'item_1', material: '', description: '', quantity: 1, uom: '', unitPrice: 0, taxes: 0, total: '0.00' }
  ]);

  const handleMasterChange = (e) => {
    if (isDisplayMode) return;
    const { name, value } = e.target;
    setMasterFields(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    if (isDisplayMode) return;
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Dynamic pricing aggregate math tracking pipelines
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

  const addRow = () => {
    if (isDisplayMode) return;
    const newId = `item_${Date.now()}`;
    setItems([...items, {
      id: newId, material: '', description: '', quantity: 1, uom: '', unitPrice: 0, taxes: 0, total: '0.00'
    }]);
  };

  const deleteRow = (id) => {
    if (isDisplayMode) return;
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems([{ id: `item_${Date.now()}`, material: '', description: '', quantity: 1, uom: '', unitPrice: 0, taxes: 0, total: '0.00' }]);
    }
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
  };

  const getPageHeaderTitle = () => {
    if (isDisplayMode) return "Display Quotation Document";
    if (isChangeMode) return "Change/Edit Quotation Ledger";
    return "Create Sales Quotation Master";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisplayMode) return;
    console.log("Submitting Quotation Sheet Data Payload:", {
      masterFields,
      items,
      grandTotal: calculateGrandTotal()
    });
    alert(`Quotation processed successfully!`);
    navigate('/quotation');
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>{getPageHeaderTitle()}</h2>
      </div>

      <form onSubmit={handleSubmit} className="inspect-report-form">
        
        {/* ===================================================
           1. TOP AREA LAYER: CORE HEADER SPLIT FIELDS 
        ====================================================== */}
        <div className="inspect-bento-card meta-grid-card">
          <div className="field-row">
            <div className="input-group readonly">
              <label>Quotation Number</label>
              <input type="text" value={masterFields.quotationNumber} readOnly />
            </div>
            <div className="input-group">
              <label>Quotation Date</label>
              <input 
                type="date" 
                name="quotationDate" 
                value={masterFields.quotationDate} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
                required 
              />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Customer</label>
              <input 
                type="text" 
                name="customer" 
                placeholder="Search Client Profile..." 
                value={masterFields.customer} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
                required 
              />
            </div>
            <div className="input-group">
              <label>Currency</label>
              <input 
                type="text" 
                name="currency" 
                placeholder="e.g., INR, USD" 
                value={masterFields.currency} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
              />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Expiration Date</label>
              <input 
                type="date" 
                name="expirationDate" 
                value={masterFields.expirationDate} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
              />
            </div>
            <div className="input-group">
              <label>Payment Term</label>
              <input 
                type="text" 
                name="paymentTerm" 
                placeholder="Terms of Payment Parameters" 
                value={masterFields.paymentTerm} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
              />
            </div>
          </div>
        </div>

        {/* ===================================================
           2. CENTER AREA LAYER: SHEET MATRICES ROWS LINE ITEMS 
        ====================================================== */}
        <div className="inspect-bento-card item-table-card">
          <div className="table-action-header">
            <h3 style={{ textTransform: 'uppercase', color: '#7b61ff', letterSpacing: '0.3px' }}>
              Line Items Matrix
            </h3>
            {!isDisplayMode && (
              <button type="button" className="append-row-btn" onClick={addRow}>
                + Append Item Line
              </button>
            )}
          </div>
          
          <div className="table-overflow-scroller">
            <table className="inspect-matrix-table clean-theme-header">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Material</th>
                  <th style={{ width: '30%' }}>Description</th>
                  <th style={{ width: '10%' }}>Quantity</th>
                  <th style={{ width: '10%' }}>UOM</th>
                  <th style={{ width: '12%' }}>Unit Price</th>
                  <th style={{ width: '8%' }}>Taxes</th>
                  <th style={{ width: '10%' }}>Total Amount</th>
                  {!isDisplayMode && <th style={{ width: '5%', textAlign: 'center' }}>Action</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input 
                        type="text" 
                        value={item.material} 
                        onChange={(e) => handleItemChange(item.id, 'material', e.target.value)} 
                        disabled={isDisplayMode} 
                        placeholder="Material ID" 
                        required 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={item.description} 
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} 
                        disabled={isDisplayMode} 
                        placeholder="Specifications Context..." 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} 
                        disabled={isDisplayMode} 
                        required 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={item.uom} 
                        onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)} 
                        disabled={isDisplayMode} 
                        placeholder="PCS / KG" 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        value={item.unitPrice || ''} 
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)} 
                        disabled={isDisplayMode} 
                        placeholder="0.00" 
                        required 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={item.taxes || ''} 
                        onChange={(e) => handleItemChange(item.id, 'taxes', e.target.value)} 
                        disabled={isDisplayMode} 
                        placeholder="0" 
                      />
                    </td>
                    <td style={{ fontWeight: '700', paddingLeft: '12px' }}>
                      {item.total}
                    </td>
                    {!isDisplayMode && (
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" className="q-row-delete-btn" style={{ background: 'transparent', border: 'none', color: '#ff3b30', cursor: 'pointer' }} onClick={() => deleteRow(item.id)}>
                          <HiOutlineTrash size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="q-table-summary-pane" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(128,128,128,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 20px', borderRadius: '10px', background: 'rgba(128,128,128,0.05)' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Total Accumulation:</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#00cc88' }}>{masterFields.currency} {calculateGrandTotal()}</span>
            </div>
          </div>
        </div>

        {/* ===================================================
           3. FOOT AREA LAYER: CONDITIONS & OTHER LOGS
        ====================================================== */}
        <div className="inspect-bento-card complex-logs-card">
          <div className="textarea-row">
            <label>Terms and Conditions</label>
            <textarea 
              name="termsConditions" 
              value={masterFields.termsConditions} 
              onChange={handleMasterChange} 
              disabled={isDisplayMode} 
              placeholder="Specify structural corporate terms parameters details..." 
              rows="4" 
            />
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#7b61ff', margin: '20px 0 15px 0', borderBottom: '1px solid rgba(128,128,128,0.1)', paddingBottom: '8px' }}>
            Other Information
          </h3>
          
          <div className="field-row">
            <div className="input-group">
              <label>Sales Person</label>
              <input 
                type="text" 
                name="salesPerson" 
                placeholder="Representative Identity" 
                value={masterFields.salesPerson} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
              />
            </div>
            <div className="input-group">
              <label>Customer Reference</label>
              <input 
                type="text" 
                name="customerReference" 
                placeholder="Reference Identifier ID" 
                value={masterFields.customerReference} 
                onChange={handleMasterChange} 
                disabled={isDisplayMode} 
              />
            </div>
          </div>
        </div>

        {/* CONTROLS SAVE ACTION SHELF BUTTON */}
        <div className="report-canvas-action-footer">
          <button type="button" className="form-secondary-btn" onClick={() => navigate('/quotation')}>
            {isDisplayMode ? "Exit View" : "Discard"}
          </button>
          {!isDisplayMode && (
            <button type="submit" className="form-primary-btn" style={{ padding: '14px 40px', borderRadius: '14px' }}>
              {isChangeMode ? "UPDATE LEDGER" : "SAVE QUOTATION"}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default CreateQuotation;