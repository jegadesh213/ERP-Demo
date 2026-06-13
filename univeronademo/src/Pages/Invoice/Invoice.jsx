import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineSave, HiOutlineDocumentText } from 'react-icons/hi';
import './Invoice.css';

function Invoice() {
  // Master header inputs state matching image_b77397.png structure exactly
  const [masterFields, setMasterFields] = useState({
    invoiceNumber: 'INV-2026-905',
    invoiceDate: '',
    orderNumber: '',
    currency: 'INR',
    customer: '',
    paymentTerm: '',
    expirationDate: '',
    salesPerson: '',
    customerReference: '',
    termsConditions: ''
  });

  // Dynamic tabular line items state
  const [items, setItems] = useState([
    { id: Date.now(), material: '', description: '', quantity: 1, uom: 'EA', unitPrice: 0, taxes: 0, total: 0 }
  ]);

  // Handle master header text inputs
  const handleMasterChange = (e) => {
    const { name, value } = e.target;
    setMasterFields(prev => ({ ...prev, [name]: value }));
  };

  // Handle calculation logic inside row matrices
  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Continuous live calculations
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

  // Action: Add dynamic line row
  const addRow = () => {
    setItems([...items, {
      id: Date.now(), material: '', description: '', quantity: 1, uom: 'EA', unitPrice: 0, taxes: 0, total: 0
    }]);
  };

  // Action: Remove specific row
  const deleteRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems([{ id: Date.now(), material: '', description: '', quantity: 1, uom: 'EA', unitPrice: 0, taxes: 0, total: 0 }]);
    }
  };

  // Calculate global invoice summary amount
  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTING INVOICE DOCUMENT:", { masterFields, items, grandTotal: calculateGrandTotal() });
    alert("Invoice Record Finalized Successfully!");
  };

  return (
    <div className="i-form-container">
      {/* Page Title Section */}
      <div className="i-page-header">
        <h1 className="i-page-title">Invoice Form</h1>
        {/* <p className="i-page-subtitle">Generate accounts receivable statements, billing documents, and transaction logs</p> */}
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* ===================================
            MASTER HEADER CARDS (image_b77397.png)
           =================================== */}
        <div className="i-master-card">
          <div className="i-form-grid">
            
            {/* Left Column Structural Inputs */}
            <div className="i-form-column">
              <div className="i-input-group readonly">
                <label>Invoice Number</label>
                <input type="text" name="invoiceNumber" value={masterFields.invoiceNumber} readOnly />
              </div>
              <div className="i-input-group">
                <label>Order Number</label>
                <input type="text" name="orderNumber" placeholder="Order Number" value={masterFields.orderNumber} onChange={handleMasterChange} />
              </div>
              <div className="i-input-group">
                <label>Customer</label>
                <input type="text" name="customer" placeholder="Customer Name" value={masterFields.customer} onChange={handleMasterChange} required />
              </div>
              <div className="i-input-group">
                <label>Expiration Date</label>
                <input type="date" name="expirationDate" value={masterFields.expirationDate} onChange={handleMasterChange} />
              </div>
            </div>

            {/* Right Column Structural Inputs */}
            <div className="i-form-column">
              <div className="i-input-group">
                <label>Invoice Date</label>
                <input type="date" name="invoiceDate" value={masterFields.invoiceDate} onChange={handleMasterChange} required />
              </div>
              <div className="i-input-group">
                <label>Currency</label>
                <select name="currency" value={masterFields.currency} onChange={handleMasterChange}>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div className="i-input-group">
                <label>Payment Term</label>
                <input type="text" name="paymentTerm" placeholder="Terms of Payment" value={masterFields.paymentTerm} onChange={handleMasterChange} />
              </div>
            </div>

          </div>
        </div>

        {/* ===================================
            DYNAMIC GRID ROW MATRICES
           =================================== */}
        <div className="i-table-card">
          <div className="i-table-header-bar">
            <h3>Line Items</h3>
            <button type="button" className="i-add-row-btn" onClick={addRow}>
              <HiOutlinePlus /> Insert Line Row
            </button>
          </div>

          <div className="i-table-scroller">
            <table className="i-matrix-table">
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
                      <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} required />
                    </td>
                    <td>
                      <input type="text" placeholder="EA / KG" value={item.uom} onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="0" step="0.01" placeholder="0.00" value={item.unitPrice || ''} onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)} required />
                    </td>
                    <td>
                      <input type="number" min="0" max="100" placeholder="0" value={item.taxes || ''} onChange={(e) => handleItemChange(item.id, 'taxes', e.target.value)} />
                    </td>
                    <td className="i-calculated-total">
                      {masterFields.currency} {item.total}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button type="button" className="i-row-delete-btn" onClick={() => deleteRow(item.id)}>
                        <HiOutlineTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summation Total Indicator Panel */}
          <div className="i-table-summary-pane">
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{masterFields.currency} {calculateGrandTotal()}</span>
            </div>
          </div>
        </div>

        {/* ===================================
            TERMS & CONDITIONS FOOT OVERLAYS
           =================================== */}
        <div className="i-footer-card">
          <div className="i-input-group textarea-full">
            <label>Terms and Conditions</label>
            <textarea name="termsConditions" rows="4" placeholder="Terms and Conditions...." value={masterFields.termsConditions} onChange={handleMasterChange}></textarea>
          </div>

          <div className="i-form-grid spacing-top">
            <div className="i-input-group">
              <label>Sales Person</label>
              <input type="text" name="salesPerson" placeholder="Sales Person Name" value={masterFields.salesPerson} onChange={handleMasterChange} />
            </div>
            <div className="i-input-group">
              <label>Customer Reference</label>
              <input type="text" name="customerReference" placeholder="Reference ID" value={masterFields.customerReference} onChange={handleMasterChange} />
            </div>
          </div>

          {/* Action Shelf Triggers */}
          <div className="i-action-submit-shelf">
            {/* <button type="button" className="i-btn-draft">
              <HiOutlineSave /> Save As Draft
            </button> */}
            <button type="submit" className="i-btn-submit">
              <HiOutlineDocumentText /> Post Invoice
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default Invoice;