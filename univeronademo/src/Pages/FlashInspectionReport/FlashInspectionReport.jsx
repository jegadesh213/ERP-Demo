import React, { useState } from 'react';
import './FlashInspectionReport.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

function FlashInspectionReport() {
      const navigate = useNavigate();
    
    
  // Primary Meta Fields state tracking
  const [metaData, setMetaData] = useState({
    customer: '', reportNo: '', vendor: '', location: '',
    subVendor: '', dateOfVisit: '', project: '', nextVisit: '',
    customerPo: '', assignmentNo: '', subVendorPo: ''
  });

  // Table rows dynamic management
  const [inspectedItems, setInspectedItems] = useState([
    { poItemNo: '', qty: '', description: '', tagNo: '' },
    { poItemNo: '', qty: '', description: '', tagNo: '' },
    { poItemNo: '', qty: '', description: '', tagNo: '' }
  ]);

  // Checklist and status selections
  const [inspectionResult, setInspectionResult] = useState('compliance'); // compliance / non-compliance
  const [orderStatus, setOrderStatus] = useState('complete'); // complete / incomplete
  const [summaryText, setSummaryText] = useState('');
  
  const [checklist, setChecklist] = useState({
    preInspectionMeet: false, documentReview: false, paintingInspection: false,
    intermediateInspection: false, dimensionalInspection: false, packingInspection: false,
    finalInspection: false, witnessTests: false, loadingInspection: false,
    ncr: false, punchList: false, releaseNote: false, certificate: false
  });

  const [inspectorSignDate, setInspectorSignDate] = useState('');

  // Handle inputs mapping transitions
  const handleMetaChange = (e) => {
    setMetaData({ ...metaData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...inspectedItems];
    updatedItems[index][field] = value;
    setInspectedItems(updatedItems);
  };

  const handleChecklistChange = (field) => {
    setChecklist({ ...checklist, [field]: !checklist[field] });
  };

  const handleAddRow = () => {
    setInspectedItems([...inspectedItems, { poItemNo: '', qty: '', description: '', tagNo: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flash Inspection Report Submission Data:", {
      metaData, inspectedItems, inspectionResult, orderStatus, summaryText, checklist, inspectorSignDate
    });
  };

  return (
    <div className="flash-report-container">
      <div className="flash-report-header">
        <h2>Flash Inspection Report</h2>
        {/* <p>Operational Verification, Item Assessment Track & Clearance Validation Records</p> */}
      </div>

      <form onSubmit={handleSubmit} className="flash-report-form">
        
        {/* SECTION 1: CORE TRACKING METADATA BENTO CARD */}
        <div className="report-bento-card meta-grid-section">
          <div className="input-group">
            <label>Customer</label>
            <input type="text" name="customer" value={metaData.customer} onChange={handleMetaChange} placeholder="Enter Client Name" />
          </div>
          <div className="input-group">
            <label>Report No.</label>
            <input type="text" name="reportNo" value={metaData.reportNo} onChange={handleMetaChange} placeholder="e.g., FIR-2026-001" />
          </div>
          <div className="input-group">
            <label>Vendor</label>
            <input type="text" name="vendor" value={metaData.vendor} onChange={handleMetaChange} placeholder="Vendor Manufacturing Hub" />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input type="text" name="location" value={metaData.location} onChange={handleMetaChange} placeholder="City / Facility Site" />
          </div>
          <div className="input-group">
            <label>Sub-Vendor</label>
            <input type="text" name="subVendor" value={metaData.subVendor} onChange={handleMetaChange} placeholder="Subcontractor Details" />
          </div>
          <div className="input-group">
            <label>Date of Visit</label>
            <input type="date" name="dateOfVisit" value={metaData.dateOfVisit} onChange={handleMetaChange} />
          </div>
          <div className="input-group">
            <label>Project</label>
            <input type="text" name="project" value={metaData.project} onChange={handleMetaChange} placeholder="Project Description Name" />
          </div>
          <div className="input-group">
            <label>Next Visit</label>
            <input type="date" name="nextVisit" value={metaData.nextVisit} onChange={handleMetaChange} />
          </div>
          <div className="input-group">
            <label>Customer PO</label>
            <input type="text" name="customerPo" value={metaData.customerPo} onChange={handleMetaChange} placeholder="PO Procurement Code" />
          </div>
          <div className="input-group">
            <label>Assignment No.</label>
            <input type="text" name="assignmentNo" value={metaData.assignmentNo} onChange={handleMetaChange} placeholder="Track Code Reference" />
          </div>
          <div className="input-group full-width-input">
            <label>Sub-Vendor PO</label>
            <input type="text" name="subVendorPo" value={metaData.subVendorPo} onChange={handleMetaChange} placeholder="Sub-Vendor PO Tracking ID" />
          </div>
        </div>

        {/* SECTION 2: PRODUCT / ITEM INSPECTED TABLE CARD */}
        <div className="report-bento-card table-section-card">
          <div className="table-header-row">
            <h3>Product / Item Inspected</h3>
            <button type="button" className="add-row-btn" onClick={handleAddRow}>+ Add Row</button>
          </div>
          <div className="table-responsive-wrapper">
            <table className="inspected-items-table">
              <thead>
                <tr>
                  <th>PO Item No</th>
                  <th>Qty</th>
                  <th>Description</th>
                  <th>Tag No. / Identification No.</th>
                </tr>
              </thead>
              <tbody>
                {inspectedItems.map((item, idx) => (
                  <tr key={idx}>
                    <td><input type="text" value={item.poItemNo} onChange={(e) => handleItemChange(idx, 'poItemNo', e.target.value)} placeholder="01" /></td>
                    <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(idx, 'qty', e.target.value)} placeholder="0" /></td>
                    <td><input type="text" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} placeholder="Item Detail Notes" /></td>
                    <td><input type="text" value={item.tagNo} onChange={(e) => handleItemChange(idx, 'tagNo', e.target.value)} placeholder="TAG-XYZ-00" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: CHECKBOX PARSING ENGINE & STATUS LAYOUTS */}
        <div className="report-bento-card matrix-checklist-section">
          
          <div className="results-status-split">
            <div className="radio-group-block">
              <h4>Results of Inspection</h4>
              <div className="custom-options-row">
                <label className="checkbox-field-label">
                  <input type="radio" name="inspectionResult" checked={inspectionResult === 'compliance'} onChange={() => setInspectionResult('compliance')} />
                  <span>Compliance</span>
                </label>
                <label className="checkbox-field-label">
                  <input type="radio" name="inspectionResult" checked={inspectionResult === 'non-compliance'} onChange={() => setInspectionResult('non-compliance')} />
                  <span>Non-Compliance</span>
                </label>
              </div>
            </div>

            <div className="radio-group-block">
              <h4>Order Status</h4>
              <div className="custom-options-row">
                <label className="checkbox-field-label">
                  <input type="radio" name="orderStatus" checked={orderStatus === 'complete'} onChange={() => setOrderStatus('complete')} />
                  <span>Complete</span>
                </label>
                <label className="checkbox-field-label">
                  <input type="radio" name="orderStatus" checked={orderStatus === 'incomplete'} onChange={() => setOrderStatus('incomplete')} />
                  <span>Incomplete</span>
                </label>
              </div>
            </div>
          </div>

          <div className="textarea-group">
            <label>Inspection Summary Notes</label>
            <textarea value={summaryText} onChange={(e) => setSummaryText(e.target.value)} placeholder="Add specific technical findings, remarks, or observations from this inspection window..." rows="4" />
          </div>

          <div className="inspection-matrix-grid">
            <h4>Inspection Matrix Checklist</h4>
            <div className="matrix-check-box-columns">
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.preInspectionMeet} onChange={() => handleChecklistChange('preInspectionMeet')} />
                <span>Pre-Inspection Meet</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.documentReview} onChange={() => handleChecklistChange('documentReview')} />
                <span>Document Review</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.paintingInspection} onChange={() => handleChecklistChange('paintingInspection')} />
                <span>Painting Inspection</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.intermediateInspection} onChange={() => handleChecklistChange('intermediateInspection')} />
                <span>Intermediate Inspection</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.dimensionalInspection} onChange={() => handleChecklistChange('dimensionalInspection')} />
                <span>Dimensional Inspection</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.packingInspection} onChange={() => handleChecklistChange('packingInspection')} />
                <span>Packing Inspection</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.finalInspection} onChange={() => handleChecklistChange('finalInspection')} />
                <span>Final Inspection</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.witnessTests} onChange={() => handleChecklistChange('witnessTests')} />
                <span>Witness Tests</span>
              </label>
              <label className="checkbox-field-label">
                <input type="checkbox" checked={checklist.loadingInspection} onChange={() => handleChecklistChange('loadingInspection')} />
                <span>Loading Inspection</span>
              </label>
            </div>
          </div>

          <div className="clearance-certificates-row">
            <label className="checkbox-field-label">
              <input type="checkbox" checked={checklist.ncr} onChange={() => handleChecklistChange('ncr')} />
              <span>NCR</span>
            </label>
            <label className="checkbox-field-label">
              <input type="checkbox" checked={checklist.punchList} onChange={() => handleChecklistChange('punchList')} />
              <span>Punch List</span>
            </label>
            <label className="checkbox-field-label">
              <input type="checkbox" checked={checklist.releaseNote} onChange={() => handleChecklistChange('releaseNote')} />
              <span>Release Note</span>
            </label>
            <label className="checkbox-field-label">
              <input type="checkbox" checked={checklist.certificate} onChange={() => handleChecklistChange('certificate')} />
              <span>Certificate</span>
            </label>
          </div>

          <div className="inspector-signature-row">
            <div className="input-group">
              <label>Inspector Sign & Date Stamp</label>
              <input type="text" value={inspectorSignDate} onChange={(e) => setInspectorSignDate(e.target.value)} placeholder="Inspector Signature / Digital Identity Stamp & Date" />
            </div>
          </div>

          <div className="form-submission-action-bar">
            <button type="button" className="action-btn cancel" onClick={() => navigate('/inspection')}>Discard Document</button>
            <button type="submit" className="action-btn submit">Save Flash Report</button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default FlashInspectionReport;