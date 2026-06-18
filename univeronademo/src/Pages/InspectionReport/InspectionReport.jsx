import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InspectionReport.css';

function InspectionReport() {
  const navigate = useNavigate();

  // SECTION 1: Master Metadata Fields
  const [metaData, setMetaData] = useState({
    customer: '', reportNo: '', vendor: '', location: '',
    subVendor: '', dateOfVisit: '', project: '', nextVisit: '',
    customerPo: '', assignmentNo: '', vendorPo: ''
  });

  // SECTION 2: Product / Item Inspected Matrix
  const [inspectedItems, setInspectedItems] = useState([
    { poItemNo: '', qty: '', description: '', tagNo: '' },
    { poItemNo: '', qty: '', description: '', tagNo: '' },
    { poItemNo: '', qty: '', description: '', tagNo: '' }
  ]);

  // SECTION 3: Compliance Options & Summary
  const [inspectionResult, setInspectionResult] = useState('compliance');
  const [orderStatus, setOrderStatus] = useState('complete');
  const [summaryText, setSummaryText] = useState('');
  
  const [attachments, setAttachments] = useState({
    ncr: false, punchList: false, releaseNote: false, certificate: false
  });

  // SECTION 4: Record of Hours
  const [hoursRecord, setHoursRecord] = useState({
    inspectionHours: '', travellingHours: '', travelDistance: '',
    engineerName: '', engineerDate: '', coordinatorName: '', coordinatorDate: ''
  });

  // SECTION 5: Detailed Field Logs
  const [personnelPresent, setPersonnelPresent] = useState('');
  const [referenceDocs, setReferenceDocs] = useState('');
  const [inspectionPerformed, setInspectionPerformed] = useState('');
  const [calibrationDetails, setCalibrationDetails] = useState('');
  const [concernsNcrAction, setConcernsNcrAction] = useState('');
  const [overallOrderStatusLog, setOverallOrderStatusLog] = useState('');
  const [nextVisitLog, setNextVisitLog] = useState('');
  const [resultsConclusions, setResultsConclusions] = useState('');

  // SECTION 6: Upgraded Photo Upload & Descriptions State Matrix
  const [photos, setPhotos] = useState([
    { id: 1, label: 'Photo 1', file: null, preview: '', description: '' },
    { id: 2, label: 'Photo 2', file: null, preview: '', description: '' },
    { id: 3, label: 'Photo 3', file: null, preview: '', description: '' },
    { id: 4, label: 'Photo 4', file: null, preview: '', description: '' },
    { id: 5, label: 'Photo 5', file: null, preview: '', description: '' },
    { id: 6, label: 'Photo 6', file: null, preview: '', description: '' }
  ]);

  // Event Handler Utilities
  const handleMetaChange = (e) => setMetaData({ ...metaData, [e.target.name]: e.target.value });
  const handleHoursChange = (e) => setHoursRecord({ ...hoursRecord, [e.target.name]: e.target.value });
  
  const handleFileChange = (index, file) => {
    if (!file) return;
    const updatedPhotos = [...photos];
    updatedPhotos[index].file = file;
    updatedPhotos[index].preview = URL.createObjectURL(file);
    setPhotos(updatedPhotos);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].description = value;
    setPhotos(updatedPhotos);
  };
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...inspectedItems];
    updatedItems[index][field] = value;
    setInspectedItems(updatedItems);
  };

  const handleAddRow = () => {
    setInspectedItems([...inspectedItems, { poItemNo: '', qty: '', description: '', tagNo: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Inspection Report Submitted Data:", {
      metaData, inspectedItems, inspectionResult, orderStatus, summaryText,
      attachments, hoursRecord, personnelPresent, referenceDocs, inspectionPerformed,
      calibrationDetails, concernsNcrAction, overallOrderStatusLog, nextVisitLog, resultsConclusions, photos
    });
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>Inspection Report</h2>
        {/* <p>Comprehensive Engineering Evaluation, Quality Control Log, and Field Hour Verification</p> */}
      </div>

      <form onSubmit={handleSubmit} className="inspect-report-form">
        
        {/* 1. CORE TRACKING METADATA */}
        <div className="inspect-bento-card meta-grid-card">
          <div className="field-row">
            <div className="input-group">
              <label>Customer</label>
              <input type="text" name="customer" value={metaData.customer} onChange={handleMetaChange} placeholder="Client Entity" />
            </div>
            <div className="input-group">
              <label>Report No.</label>
              <input type="text" name="reportNo" value={metaData.reportNo} onChange={handleMetaChange} placeholder="e.g., IR-2026-005" />
            </div>
          </div>
          <div className="field-row">
            <div className="input-group">
              <label>Vendor</label>
              <input type="text" name="vendor" value={metaData.vendor} onChange={handleMetaChange} placeholder="Main Manufacturer" />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input type="text" name="location" value={metaData.location} onChange={handleMetaChange} placeholder="Site Facility City" />
            </div>
          </div>
          <div className="field-row">
            <div className="input-group">
              <label>Sub-Vendor</label>
              <input type="text" name="subVendor" value={metaData.subVendor} onChange={handleMetaChange} placeholder="Subcontractor (If Applicable)" />
            </div>
            <div className="input-group">
              <label>Date of Visit</label>
              <input type="date" name="dateOfVisit" value={metaData.dateOfVisit} onChange={handleMetaChange} />
            </div>
          </div>
          <div className="field-row">
            <div className="input-group">
              <label>Project</label>
              <input type="text" name="project" value={metaData.project} onChange={handleMetaChange} placeholder="Project ID Structure" />
            </div>
            <div className="input-group">
              <label>Next Visit Target</label>
              <input type="date" name="nextVisit" value={metaData.nextVisit} onChange={handleMetaChange} />
            </div>
          </div>
          <div className="field-row">
            <div className="input-group">
              <label>Customer PO</label>
              <input type="text" name="customerPo" value={metaData.customerPo} onChange={handleMetaChange} placeholder="Procurement Order No." />
            </div>
            <div className="input-group">
              <label>Assignment No.</label>
              <input type="text" name="assignmentNo" value={metaData.assignmentNo} onChange={handleMetaChange} placeholder="Operational Work Assignment Code" />
            </div>
          </div>
          <div className="input-group full-width">
            <label>Vendor PO</label>
            <input type="text" name="vendorPo" value={metaData.vendorPo} onChange={handleMetaChange} placeholder="Supplier Factory Order Number" />
          </div>
        </div>

        {/* 2. PRODUCT / ITEM INSPECTED MATRIX */}
        <div className="inspect-bento-card item-table-card">
          <div className="table-action-header">
            <h3>Product / Item Inspected</h3>
            <button type="button" className="append-row-btn" onClick={handleAddRow}>+ Append Item Line</button>
          </div>
          <div className="table-overflow-scroller">
            <table className="inspect-matrix-table">
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
                    <td><input type="text" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} placeholder="Material Specification Properties" /></td>
                    <td><input type="text" value={item.tagNo} onChange={(e) => handleItemChange(idx, 'tagNo', e.target.value)} placeholder="TAG-ID-RE-00" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. CORE RESULTS CHECKLISTS & ACTION TEXTAREAS */}
        <div className="inspect-bento-card binary-matrix-card">
          <div className="checkbox-split-control-lane">
            <div className="radio-block">
              <h4>Results of Inspection</h4>
              <div className="flex-selection-row">
                <label className="custom-check-wrapper">
                  <input type="radio" name="inspectionResult" checked={inspectionResult === 'compliance'} onChange={() => setInspectionResult('compliance')} />
                  <span>Compliance</span>
                </label>
                <label className="custom-check-wrapper">
                  <input type="radio" name="inspectionResult" checked={inspectionResult === 'non-compliance'} onChange={() => setInspectionResult('non-compliance')} />
                  <span>Non-Compliance</span>
                </label>
              </div>
            </div>

            <div className="radio-block">
              <h4>Order Status</h4>
              <div className="flex-selection-row">
                <label className="custom-check-wrapper">
                  <input type="radio" name="orderStatus" checked={orderStatus === 'complete'} onChange={() => setOrderStatus('complete')} />
                  <span>Complete</span>
                </label>
                <label className="custom-check-wrapper">
                  <input type="radio" name="orderStatus" checked={orderStatus === 'incomplete'} onChange={() => setOrderStatus('incomplete')} />
                  <span>Incomplete</span>
                </label>
              </div>
            </div>
          </div>

          <div className="textarea-row">
            <label>Inspection Summary :</label>
            <textarea value={summaryText} onChange={(e) => setSummaryText(e.target.value)} placeholder="Provide immediate analytical brief summaries..." rows="3" />
          </div>

          <div className="attachments-accent-lane">
            <h4>Attachments Document Validation Checklist</h4>
            <div className="checkbox-spread-row">
              <label className="custom-check-wrapper">
                <input type="checkbox" checked={attachments.ncr} onChange={() => setAttachments({...attachments, ncr: !attachments.ncr})} />
                <span>NCR</span>
              </label>
              <label className="custom-check-wrapper">
                <input type="checkbox" checked={attachments.punchList} onChange={() => setAttachments({...attachments, punchList: !attachments.punchList})} />
                <span>Punch List</span>
              </label>
              <label className="custom-check-wrapper">
                <input type="checkbox" checked={attachments.releaseNote} onChange={() => setAttachments({...attachments, releaseNote: !attachments.releaseNote})} />
                <span>Release Note</span>
              </label>
              <label className="custom-check-wrapper">
                <input type="checkbox" checked={attachments.certificate} onChange={() => setAttachments({...attachments, certificate: !attachments.certificate})} />
                <span>Certificate</span>
              </label>
            </div>
          </div>
        </div>

        {/* 4. CHRONO TRACKING FIELD LOGS PANEL */}
        <div className="inspect-bento-card complex-logs-card">
          <div className="textarea-row">
            <label>Personnel present</label>
            <textarea value={personnelPresent} onChange={(e) => setPersonnelPresent(e.target.value)} placeholder="List all attendees, client representatives, and vendor operators present..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>Reference Documents (Code / Standard / Specifications / Drawing)</label>
            <textarea value={referenceDocs} onChange={(e) => setReferenceDocs(e.target.value)} placeholder="ASME Sec VIII, ISO 9001, Drawing Ref IDs, Code compliance targets..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>Inspection Performed</label>
            <textarea value={inspectionPerformed} onChange={(e) => setInspectionPerformed(e.target.value)} placeholder="Detailed descriptive logs regarding physical tasks performed..." rows="3" />
          </div>
          <div className="textarea-row">
            <label>Calibration details:</label>
            <textarea value={calibrationDetails} onChange={(e) => setCalibrationDetails(e.target.value)} placeholder="Instruments tracking codes, verification expiration limits, gauges error indices..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>Concerns, NCR & Immediate Action:</label>
            <textarea value={concernsNcrAction} onChange={(e) => setConcernsNcrAction(e.target.value)} placeholder="Any critical warning indicators, localized material stress logs, immediate systemic correction shifts..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>Overall order status:</label>
            <textarea value={overallOrderStatusLog} onChange={(e) => setOverallOrderStatusLog(e.target.value)} placeholder="Summary percentage status metrics..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>Next Visit Goals & Target Windows</label>
            <textarea value={nextVisitLog} onChange={(e) => setNextVisitLog(e.target.value)} placeholder="Schedule parameters, milestone tests dates..." rows="2" />
          </div>
          <div className="textarea-row">
            <label>8. Results and conclusions</label>
            <textarea value={resultsConclusions} onChange={(e) => setResultsConclusions(e.target.value)} placeholder="Final conclusions track validation decisions statement..." rows="3" />
          </div>
        </div>

        {/* 5. PHOTOGRAPHS ATTACHMENT SHEETS WITH INTEGRATED FILE UPLOADERS */}
        <div className="inspect-bento-card photographs-section-card">
          <h3>Attachments Photographs & Descriptions</h3>
          
          <div className="photos-uploader-flex-list">
            {photos.map((item, idx) => (
              <div key={item.id} className="photo-upload-row-item">
                
                {/* Visual File Selection Dropzone */}
                <div className="photo-thumbnail-uploader-box">
                  {item.preview ? (
                    <img src={item.preview} alt={`${item.label} Preview`} className="uploaded-thumb-preview" />
                  ) : (
                    <label htmlFor={`file-input-${item.id}`} className="upload-dropzone-label">
                      <span className="upload-plus-icon">+</span>
                      <span className="upload-hint-text">Upload {item.label}</span>
                    </label>
                  )}
                  <input 
                    type="file" 
                    id={`file-input-${item.id}`} 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(idx, e.target.files[0])}
                    className="hidden-file-input"
                  />
                </div>

                {/* Description Text Input Node */}
                <div className="photo-description-field-box">
                  <label>{item.label} Description</label>
                  <input 
                    type="text" 
                    value={item.description} 
                    onChange={(e) => handleDescriptionChange(idx, e.target.value)} 
                    placeholder="Enter visual item verification context description..." 
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 6. RECORD OF HOURS MATRIX & STAMPS */}
        <div className="inspect-bento-card hours-record-matrix-card">
          <h3>Record of Hours</h3>
          <div className="hours-inputs-metrics-row">
            <div className="input-group">
              <label>Inspection Hours</label>
              <input type="text" name="inspectionHours" value={hoursRecord.inspectionHours} onChange={handleHoursChange} placeholder="e.g., 6.5 Hrs" />
            </div>
            <div className="input-group">
              <label>Travelling Hours:</label>
              <input type="text" name="travellingHours" value={hoursRecord.travellingHours} onChange={handleHoursChange} placeholder="e.g., 2.0 Hrs" />
            </div>
            <div className="input-group">
              <label>Travel Distance (Km):</label>
              <input type="number" name="travelDistance" value={hoursRecord.travelDistance} onChange={handleHoursChange} placeholder="140" />
            </div>
          </div>

          <div className="signatures-stamps-double-lane">
            <div className="signature-block">
              <h4>Inspection Engineer Validation</h4>
              <div className="input-group"><label>Name</label><input type="text" name="engineerName" value={hoursRecord.engineerName} onChange={handleHoursChange} placeholder="Engineer Identity String" /></div>
              <div className="input-group"><label>Date</label><input type="date" name="engineerDate" value={hoursRecord.engineerDate} onChange={handleHoursChange} /></div>
            </div>
            <div className="signature-block">
              <h4>Coordinator Validation Verification</h4>
              <div className="input-group"><label>Name</label><input type="text" name="coordinatorName" value={hoursRecord.coordinatorName} onChange={handleHoursChange} placeholder="Coordinator Identity String" /></div>
              <div className="input-group"><label>Date</label><input type="date" name="coordinatorDate" value={hoursRecord.coordinatorDate} onChange={handleHoursChange} /></div>
            </div>
          </div>
        </div>

        {/* SUBMISSION FOOTER FLUID RAIL */}
        <div className="report-canvas-action-footer">
          <button type="button" className="form-secondary-btn" onClick={() => navigate('/inspection')}>
            Discard Document
          </button>
          <button type="submit" className="form-primary-btn">
            Commit Full Inspection Report
          </button>
        </div>

      </form>
    </div>
  );
}

export default InspectionReport;