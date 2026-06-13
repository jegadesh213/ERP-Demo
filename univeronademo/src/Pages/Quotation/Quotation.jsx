import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineSave, HiOutlineDocumentAdd } from 'react-icons/hi';
import './Quotation.css';

function Quotation() {
  // Master header inputs state matching your sheet structure
  const [masterFields, setMasterFields] = useState({
    quotationNumber: 'QT-2026-042',
    quotationDate: '',
    customer: '',
    currency: 'INR',
    expirationDate: '',
    paymentTerm: '',
    salesPerson: '',
    customerReference: '',
    termsConditions: ''
  });

  // Dynamic tabular rows state
  const [items, setItems] = useState([
    { id: Date.now(), material: '', description: '', quantity: 1, uom: 'EOA', unitPrice: 0, taxes: 0, total: 0 }
  ]);

  // Handle master field text mutations
  const handleMasterChange = (e) => {
    const { name, value } = e.target;
    setMasterFields(prev => ({ ...prev, [name]: value }));
  };

  // Handle live row metric calculations
  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Dynamic continuous pricing calculation
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

  // Action: Add dynamic line item row
  const addRow = () => {
    setItems([...items, {
      id: Date.now(), material: '', description: '', quantity: 1, uom: 'EOA', unitPrice: 0, taxes: 0, total: 0
    }]);
  };

  // Action: Remove specific line item row
  const deleteRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      // Keep at least one clear baseline row active
      setItems([{ id: Date.now(), material: '', description: '', quantity: 1, uom: 'PCS', unitPrice: 0, taxes: 0, total: 0 }]);
    }
  };

  // Dynamic Overall Aggregate Calculation
  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTING QUOTATION:", { masterFields, items, grandTotal: calculateGrandTotal() });
    alert("Quotation Document Processed Successfully!");
  };

  return (
    <div className="q-form-container">
      <form onSubmit={handleSubmit}>
        
        {/* ===================================
            MASTER HEADER SECTION (SPLIT SYSTEM)
           =================================== */}
        <div className="q-master-card">
          <div className="q-form-grid">
            
            {/* Left Column Fields */}
            <div className="q-form-column">
              <div className="q-input-group readonly">
                <label>Quotation Number</label>
                <input type="text" name="quotationNumber" value={masterFields.quotationNumber} readOnly />
              </div>
              <div className="q-input-group">
                <label>Customer</label>
                <input type="text" name="customer" placeholder="Search customer info..." value={masterFields.customer} onChange={handleMasterChange} required />
              </div>
              <div className="q-input-group">
                <label>Expiration Date</label>
                <input type="date" name="expirationDate" value={masterFields.expirationDate} onChange={handleMasterChange} />
              </div>
            </div>

            {/* Right Column Fields */}
            <div className="q-form-column">
              <div className="q-input-group">
                <label>Quotation Date</label>
                <input type="date" name="quotationDate" value={masterFields.quotationDate} onChange={handleMasterChange} required />
              </div>
              <div className="q-input-group">
                <label>Currency</label>
                <select name="currency" value={masterFields.currency} onChange={handleMasterChange}>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div className="q-input-group">
                <label>Payment Term</label>
                <input type="text" name="paymentTerm" placeholder="Terms of Payment" value={masterFields.paymentTerm} onChange={handleMasterChange} />
              </div>
            </div>

          </div>
        </div>

        {/* ===================================
            DYNAMIC MATRICES LINE ITEMS TABLE
           =================================== */}
        <div className="q-table-card">
          <div className="q-table-header-bar">
            <h3>Line Items Matrix</h3>
            <button type="button" className="q-add-row-btn" onClick={addRow}>
              <HiOutlinePlus /> Insert Line Row
            </button>
          </div>

          <div className="q-table-scroller">
            <table className="q-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>Material</th>
                  <th style={{ width: '28%' }}>Description</th>
                  <th style={{ width: '10%' }}>Quantity</th>
                  <th style={{ width: '10%' }}>UOM</th>
                  <th style={{ width: '12%' }}>Unit Price</th>
                  <th style={{ width: '10%' }}>Taxes (%)</th>
                  <th style={{ width: '12%' }}>Total Amount</th>
                  <th style={{ width: '6%', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input type="text" placeholder="Material ID" value={item.material} onChange={(e) => handleItemChange(item.id, 'material', e.target.value)} required />
                    </td>
                    <td>
                      <input type="text" placeholder="Specifications details" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} required />
                    </td>
                    <td>
                      <input type="text" placeholder="EOA / KG" value={item.uom} onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="0" step="0.01" placeholder="0.00" value={item.unitPrice || ''} onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)} required />
                    </td>
                    <td>
                      <input type="number" min="0" max="100" placeholder="0" value={item.taxes || ''} onChange={(e) => handleItemChange(item.id, 'taxes', e.target.value)} />
                    </td>
                    <td className="q-calculated-total">
                      {item.currency} {item.total}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button type="button" className="q-row-delete-btn" onClick={() => deleteRow(item.id)}>
                        <HiOutlineTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Accumulation Foot Block */}
          <div className="q-table-summary-pane">
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{masterFields.currency} {calculateGrandTotal()}</span>
            </div>
          </div>
        </div>

        {/* ===================================
            TERMS & CONDITIONS FOOT CONTROLS
           =================================== */}
        <div className="q-footer-card">
          <div className="q-input-group textarea-full">
            <label>Terms and Conditions</label>
            <textarea name="termsConditions" rows="4" placeholder="Specify terms or conditions..." value={masterFields.termsConditions} onChange={handleMasterChange}></textarea>
          </div>

          <div className="q-form-grid spacing-top">
            <div className="q-input-group">
              <label>Sales Person</label>
              <input type="text" name="salesPerson" placeholder="Sales Person name" value={masterFields.salesPerson} onChange={handleMasterChange} />
            </div>
            <div className="q-input-group">
              <label>Customer Reference</label>
              <input type="text" name="customerReference" placeholder="Reference ID" value={masterFields.customerReference} onChange={handleMasterChange} />
            </div>
          </div>

          {/* Core Master Action Submit Blocks */}
          <div className="q-action-submit-shelf">
            {/* <button type="button" className="q-btn-draft">
              <HiOutlineSave /> Save As Draft
            </button> */}
            <button type="submit" className="q-btn-submit">
              <HiOutlineDocumentAdd /> Submit Quotation
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default Quotation;