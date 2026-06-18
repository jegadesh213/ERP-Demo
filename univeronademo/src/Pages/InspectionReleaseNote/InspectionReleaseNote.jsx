import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InspectionReleaseNote.css';

function InspectionReleaseNote() {
  const navigate = useNavigate();

  const [customNoteRemark, setCustomNoteRemark] = useState('');

  // SECTION 1: Tracking Metadata Configuration States
  const [metaData, setMetaData] = useState({
    client: '', irnNo: '', project: '', date: '',
    poNo: '', location: '', vendor: '', assignmentNo: '', subVendor: '',
    pagePrefixX: '1', pagePrefixY: '1'
  });

  // SECTION 2: Dynamic PO Item Grid Lines Tracking
  const [releaseItems, setReleaseItems] = useState([
    { poItemNo: '', quantity: '', description: '', tagNo: '' },
    { poItemNo: '', quantity: '', description: '', tagNo: '' },
    { poItemNo: '', quantity: '', description: '', tagNo: '' }
  ]);

  // SECTION 3: Batch Selection Radio Checkbox Track
  const [batchStatus, setBatchStatus] = useState('Full'); // Full, Partial, Final

  // SECTION 4: Inspector Signature Fields Validation
  const [signatureData, setSignatureData] = useState({
    signature: '', name: '', date: '', stampId: ''
  });

  // Event Change Handlers mapping pipelines
  const handleMetaChange = (e) => setMetaData({ ...metaData, [e.target.name]: e.target.value });
  const handleSignatureChange = (e) => setSignatureData({ ...signatureData, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...releaseItems];
    updatedItems[index][field] = value;
    setReleaseItems(updatedItems);
  };

  const handleAddRow = () => {
    setReleaseItems([...releaseItems, { poItemNo: '', quantity: '', description: '', tagNo: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Inspection Release Note Data Committed:", {
      metaData, releaseItems, batchStatus, signatureData
    });
  };

  return (
    <div className="irn-release-container">
      <div className="irn-release-header">
        <h2>Inspection Release Note</h2>
        {/* <p>Material Clearance Dispatch Certification, Quality Batch Release Records & Disclaimer Boards</p> */}
      </div>

      <form onSubmit={handleSubmit} className="irn-release-form">
        
        {/* 1. CORE TRACKING METADATA BENTO SHEET PANEL */}
        <div className="irn-bento-card metadata-grid-panel">
          <div className="field-row">
            <div className="input-group">
              <label>Client</label>
              <input type="text" name="client" value={metaData.client} onChange={handleMetaChange} placeholder="Client Corporation" />
            </div>
            <div className="input-group">
              <label>IRN No.</label>
              <input type="text" name="irnNo" value={metaData.irnNo} onChange={handleMetaChange} placeholder="e.g., IRN-2026-8809" />
            </div>
          </div>
          
          <div className="field-row">
            <div className="input-group">
              <label>Project</label>
              <input type="text" name="project" value={metaData.project} onChange={handleMetaChange} placeholder="Project Identification Tracker" />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" value={metaData.date} onChange={handleMetaChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>PO No:</label>
              <input type="text" name="poNo" value={metaData.poNo} onChange={handleMetaChange} placeholder="Purchase Order Reference" />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input type="text" name="location" value={metaData.location} onChange={handleMetaChange} placeholder="Facility Plant Site" />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Vendor</label>
              <input type="text" name="vendor" value={metaData.vendor} onChange={handleMetaChange} placeholder="Main Supplier Factory" />
            </div>
            <div className="input-group">
              <label>Assignment No.</label>
              <input type="text" name="assignmentNo" value={metaData.assignmentNo} onChange={handleMetaChange} placeholder="Operational Work Assignment Code" />
            </div>
          </div>

          <div className="field-row">
            <div className="input-group">
              <label>Sub Vendor</label>
              <input type="text" name="subVendor" value={metaData.subVendor} onChange={handleMetaChange} placeholder="Subcontractor Vendor Name" />
            </div>
            <div className="input-group page-numbering-box">
              <label>Continuation Page (Form X of Y)</label>
              <div className="page-inputs-combo">
                <input type="number" name="pagePrefixX" value={metaData.pagePrefixX} onChange={handleMetaChange} placeholder="x" />
                <span className="divider-slash">of</span>
                <input type="number" name="pagePrefixY" value={metaData.pagePrefixY} onChange={handleMetaChange} placeholder="y" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT GRID MATRIX ENTRY LOG MODULE */}
        <div className="irn-bento-card release-table-panel">
          <div className="table-header-control-strip">
            <h3>Released Materials Registry</h3>
            <button type="button" className="append-grid-row-btn" onClick={handleAddRow}>+ Add Material Row</button>
          </div>
          
          <div className="table-responsive-scroller-rail">
            <table className="irn-matrix-grid-table">
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>PO Item No.</th>
                  <th style={{ width: '120px' }}>Quantity</th>
                  <th>Description</th>
                  <th>Tag No. / Identification No.</th>
                </tr>
              </thead>
              <tbody>
                {releaseItems.map((item, idx) => (
                  <tr key={idx}>
                    <td><input type="text" value={item.poItemNo} onChange={(e) => handleItemChange(idx, 'poItemNo', e.target.value)} placeholder="01" /></td>
                    <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} placeholder="0" /></td>
                    <td><input type="text" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} placeholder="Material Specification properties" /></td>
                    <td><input type="text" value={item.tagNo} onChange={(e) => handleItemChange(idx, 'tagNo', e.target.value)} placeholder="TAG-ID-REF" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span className="table-footnote-hint">* Attach additional sheets if required with IRN Number references securely documented.</span>
        </div>

        {/* 3. ITEMS BATCH QUANTITY SELECTION DISPATCH BORDER WITH INTEGRATED REMARKS TEXTAREA */}
        <div className="irn-bento-card batch-allocation-panel">
          <h4>Items Released Status Classification</h4>
          <div className="flex-radio-check-spread">
            <label className="checkbox-field-wrapper">
              <input type="radio" name="batchStatus" checked={batchStatus === 'Full'} onChange={() => setBatchStatus('Full')} />
              <span>Full Batch of PO</span>
            </label>
            <label className="checkbox-field-wrapper">
              <input type="radio" name="batchStatus" checked={batchStatus === 'Partial'} onChange={() => setBatchStatus('Partial')} />
              <span>Partial Batch of PO</span>
            </label>
            <label className="checkbox-field-wrapper">
              <input type="radio" name="batchStatus" checked={batchStatus === 'Final'} onChange={() => setBatchStatus('Final')} />
              <span>Final Batch of PO</span>
            </label>
          </div>

          {/* 🆕 ADDED NOTE FIELD INTERACTION ROW */}
          <div className="irn-textarea-note-row">
            <label htmlFor="irn-remarks-note">Note :</label>
            <textarea 
              id="irn-remarks-note"
              value={customNoteRemark}
              onChange={(e) => setCustomNoteRemark(e.target.value)}
              placeholder="Type specific internal batch remarks, exceptions, or technical release notes here..."
              rows="3"
            />
          </div>
        </div>

        {/* 4. CONTRACTUAL REGULATORY DISCLAIMER ALERT BLOCK */}
        <div className="irn-bento-card regulatory-disclaimer-panel">
          <h5>Official Notification & Disclaimer Clause :</h5>
          <p>
            This Inspection release note does not relieve the vendor / sub vendor from any responsibility, 
            or any contractual obligations or guarantee, nor shall it be interpreted in any way so as to imply 
            acceptance of the goods. Inspection is performed to the best of our ability, knowledge and belief 
            but our organisation shall not be held responsible in any way whatsoever for the content of or 
            technical accuracy of the purchase order.
          </p>
        </div>

        {/* 5. INSPECTOR VALIDATION & STAMPING BOARD */}
        <div className="irn-bento-card validator-signature-panel">
          <h3>Inspector Signature and Stamp Validation</h3>
          
          <div className="signature-double-column-lane">
            <div className="fields-stack-column">
              <div className="input-group">
                <label>Signature Track</label>
                <input type="text" name="signature" value={signatureData.signature} onChange={handleSignatureChange} placeholder="Digital Signature Hash / Stamp Identifier" />
              </div>
              <div className="input-group">
                <label>Inspector Full Name</label>
                <input type="text" name="name" value={signatureData.name} onChange={handleSignatureChange} placeholder="Lead Validation Engineer" />
              </div>
              <div className="input-group">
                <label>Verification Date</label>
                <input type="date" name="date" value={signatureData.date} onChange={handleSignatureChange} />
              </div>
            </div>

            <div className="stamp-box-graphic-container">
              <label>Official Verification Stamp Box</label>
              <div className="stamp-inner-bounds">
                <input type="text" name="stampId" value={signatureData.stampId} onChange={handleSignatureChange} placeholder="STAMP RECORD ID" className="stamp-id-field" />
              </div>
            </div>
          </div>
        </div>

        {/* FLOW RAILS SUBMIT CONTROLS BAR BUTTONS */}
        <div className="irn-canvas-action-bar-footer">
          <button type="button" className="action-trigger secondary-btn" onClick={() => navigate('/inspection')}>
            Discard Document
          </button>
          <button type="submit" className="action-trigger primary-btn">
            Commit Inspection Release Note
          </button>
        </div>

      </form>
    </div>
  );
}

export default InspectionReleaseNote;