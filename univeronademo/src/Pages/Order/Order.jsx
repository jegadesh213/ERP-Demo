import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineSave, HiOutlineDocumentReport } from 'react-icons/hi';
import './Order.css';

function Order() {
  // Master header inputs state matching image_c1655d.png structure
  const [masterFields, setMasterFields] = useState({
    orderNumber: 'ORD-2026-884',
    orderCreationDate: '',
    quotationNumber: '',
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

  // Handle live calculation logic inside row matrices
  const handleItemChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Continuous math calculation updates
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

  // Action: Add dynamic sales row
  const addRow = () => {
    setItems([...items, {
      id: Date.now(), material: '', description: '', quantity: 1, uom: 'EA', unitPrice: 0, taxes: 0, total: 0
    }]);
  };

  // Action: Remove specific line row
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
    console.log("SUBMITTING SALES ORDER:", { masterFields, items, grandTotal: calculateGrandTotal() });
    alert("Sales Order Registered Successfully!");
  };

  return (
    <div className="o-form-container">
      {/* Page Header Segment */}
      <div className="o-page-header">
        <h1 className="o-page-title">Sales Order Form</h1>
        {/* <p className="o-page-subtitle">Execute and convert verified quotation references into firm commercial orders</p> */}
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* ===================================
            MASTER HEADER CARDS (image_c1655d.png)
           =================================== */}
        <div className="o-master-card">
          <div className="o-form-grid">
            
            {/* Left Column Structural Inputs */}
            <div className="o-form-column">
              <div className="o-input-group readonly">
                <label>Order Number</label>
                <input type="text" name="orderNumber" value={masterFields.orderNumber} readOnly />
              </div>
              <div className="o-input-group">
                <label>Quotation Number</label>
                <input type="text" name="quotationNumber" placeholder="Quotation Number" value={masterFields.quotationNumber} onChange={handleMasterChange} />
              </div>
              <div className="o-input-group">
                <label>Customer</label>
                <input type="text" name="customer" placeholder="Customer Name" value={masterFields.customer} onChange={handleMasterChange} required />
              </div>
              <div className="o-input-group">
                <label>Expiration Date</label>
                <input type="date" name="expirationDate" value={masterFields.expirationDate} onChange={handleMasterChange} />
              </div>
            </div>

            {/* Right Column Structural Inputs */}
            <div className="o-form-column">
              <div className="o-input-group">
                <label>Order Creation Date</label>
                <input type="date" name="orderCreationDate" value={masterFields.orderCreationDate} onChange={handleMasterChange} required />
              </div>
              <div className="o-input-group">
                <label>Currency</label>
                <select name="currency" value={masterFields.currency} onChange={handleMasterChange}>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div className="o-input-group shadow-adjust">
                <label>Payment Term</label>
                <input type="text" name="paymentTerm" placeholder="Terms of Payment" value={masterFields.paymentTerm} onChange={handleMasterChange} />
              </div>
            </div>

          </div>
        </div>

        {/* ===================================
            DYNAMIC GRID ROW MATRICES
           =================================== */}
        <div className="o-table-card">
          <div className="o-table-header-bar">
            <h3>Material Items</h3>
            <button type="button" className="o-add-row-btn" onClick={addRow}>
              <HiOutlinePlus /> Insert Line Row
            </button>
          </div>

          <div className="o-table-scroller">
            <table className="o-matrix-table">
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
                    <td className="o-calculated-total">
                      {masterFields.currency} {item.total}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button type="button" className="o-row-delete-btn" onClick={() => deleteRow(item.id)}>
                        <HiOutlineTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summation Total Indicator Panel */}
          <div className="o-table-summary-pane">
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{masterFields.currency} {calculateGrandTotal()}</span>
            </div>
          </div>
        </div>

        {/* ===================================
            TERMS & CONDITIONS FOOT OVERLAYS
           =================================== */}
        <div className="o-footer-card">
          <div className="o-input-group textarea-full">
            <label>Terms and Conditions</label>
            <textarea name="termsConditions" rows="4" placeholder="Specify Terms and conditions..." value={masterFields.termsConditions} onChange={handleMasterChange}></textarea>
          </div>

          <div className="o-form-grid spacing-top">
            <div className="o-input-group">
              <label>Sales Person</label>
              <input type="text" name="salesPerson" placeholder="Assigned representative" value={masterFields.salesPerson} onChange={handleMasterChange} />
            </div>
            <div className="o-input-group">
              <label>Customer Reference</label>
              <input type="text" name="customerReference" placeholder="Customer reference tracking ID" value={masterFields.customerReference} onChange={handleMasterChange} />
            </div>
          </div>

          {/* Action Shelf Triggers */}
          <div className="o-action-submit-shelf">
            {/* <button type="button" className="o-btn-draft">
              <HiOutlineSave /> Draft Configuration
            </button> */}
            <button type="submit" className="o-btn-submit">
                <HiOutlineDocumentReport /> Confirm Sales Order
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default Order;