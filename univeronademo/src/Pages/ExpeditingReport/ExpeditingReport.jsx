import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpeditingReport.css';

function ExpeditingReport() {
  const navigate = useNavigate();

  // SECTION 1: Master Metadata tracking state
  const [metaData, setMetaData] = useState({
    client: '', vendor: '', project: '', location: '',
    poNo: '', reportNo: '', clientContact: '', vendorContact: '',
    dateOfVisit: '', nextVisitDate: '', dateOfPreviousVisit: '', assignmentNo: '',
    materialDescription: '', poCompletionStatus: 'Partial',
    poDeliveryDate: '', expectedDeliveryDate: '', overallPoStatus: ''
  });

  // SECTION 2: Percentage Progress Metrics
  const [progressMetrics, setProgressMetrics] = useState({
    engineering: '', material: '', welding: '', ndt: '',
    hydroTest: '', docDossier: '', packing: '', despatch: ''
  });

  // SECTION 3: Visit Summary & Signature Timestamps
  const [visitSummary, setVisitSummary] = useState({
    summaryText: '', expeditingEngineer: '', engineerDate: '',
    reviewedBy: '', reviewDate: ''
  });

  // SECTION 4: Free Text Area Log Sheets
  const [fieldLogs, setFieldLogs] = useState({
    personnelPresent: '', poDetails: '', productionStatus: '',
    inspectionTestingStatus: '', ncrStatus: '', deliveryShipmentStatus: '',
    areasOfConcern: '', conclusion: '', attachments: ''
  });

  // SECTION 5: Dynamic Document Status Matrix Rows
  const [documents, setDocuments] = useState([
    { siNo: '1', docNo: '', description: '', rev: '', date: '', approvalStatus: '' }
  ]);

  // SECTION 6: Dynamic Sub Vendor Work Status Matrix Rows
  const [subVendors, setSubVendors] = useState([
    { poNoDate: '', subVendorName: '', poItemNo: '', description: '', deliveryDate: '', status: '' }
  ]);

  // SECTION 7: Upgraded Image Attachment Upload Slots (8 Positions)
  const [photos, setPhotos] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, label: `Photo ${i + 1}`, file: null, preview: '', description: ''
    }))
  );

  // Core Event Change Handlers mapping pipelines
  const handleMetaChange = (e) => setMetaData({ ...metaData, [e.target.name]: e.target.value });
  const handleProgressChange = (e) => setProgressMetrics({ ...progressMetrics, [e.target.name]: e.target.value });
  const handleSummaryChange = (e) => setVisitSummary({ ...visitSummary, [e.target.name]: e.target.value });
  const handleLogsChange = (e) => setFieldLogs({ ...fieldLogs, [e.target.name]: e.target.value });

  const handleDocRowChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedPhotos[index][field] = value; // logic block mapping
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const handleSubVendorRowChange = (index, field, value) => {
    const updatedSub = [...subVendors];
    updatedSub[index][field] = value;
    setSubVendors(updatedSub);
  };

  const handleFileChange = (index, file) => {
    if (!file) return;
    const updatedPhotos = [...photos];
    updatedPhotos[index].file = file;
    updatedPhotos[index].preview = URL.createObjectURL(file);
    setPhotos(updatedPhotos);
  };

  const handlePhotoDescChange = (index, value) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].description = value;
    setPhotos(updatedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Expediting Report Form Pack:", {
      metaData, progressMetrics, visitSummary, fieldLogs, documents, subVendors, photos
    });
  };

  return (
    <div className="expedite-report-container">
      <div className="expedite-report-header">
        <h2>Expediting Report</h2>
        {/* <p>Supply Chain Logistics Tracking, Production Milestones & Dispatch Clearance Logs</p> */}
      </div>

      <form onSubmit={handleSubmit} className="expedite-report-form">
        
        {/* 1. MASTER WORKSPACE HEADER METADATA */}
        <div className="expedite-bento-card fields-dual-column-grid">
          <div className="input-field-node"><label>Client</label><input type="text" name="client" value={metaData.client} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Vendor</label><input type="text" name="vendor" value={metaData.vendor} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Project</label><input type="text" name="project" value={metaData.project} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Location</label><input type="text" name="location" value={metaData.location} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>PO No.</label><input type="text" name="poNo" value={metaData.poNo} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Report No.</label><input type="text" name="reportNo" value={metaData.reportNo} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Client Contact</label><input type="text" name="clientContact" value={metaData.clientContact} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Vendor Primary Contact</label><input type="text" name="vendorContact" value={metaData.vendorContact} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Date of Visit</label><input type="date" name="dateOfVisit" value={metaData.dateOfVisit} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Next Visit Date</label><input type="date" name="nextVisitDate" value={metaData.nextVisitDate} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Date of Previous Visit</label><input type="date" name="dateOfPreviousVisit" value={metaData.dateOfPreviousVisit} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Assignment No.</label><input type="text" name="assignmentNo" value={metaData.assignmentNo} onChange={handleMetaChange} /></div>
          
          <div className="input-field-node full-column-width">
            <label>Material Description as per PO</label>
            <textarea name="materialDescription" value={metaData.materialDescription} onChange={handleMetaChange} rows="2" />
          </div>

          <div className="radio-group-lane">
            <h4>PO Completion Status</h4>
            <div className="flex-radio-options">
              <label className="native-check-label">
                <input type="radio" name="poCompletionStatus" checked={metaData.poCompletionStatus === 'Partial'} onChange={() => setMetaData({...metaData, poCompletionStatus: 'Partial'})} />
                <span>Partial</span>
              </label>
              <label className="native-check-label">
                <input type="radio" name="poCompletionStatus" checked={metaData.poCompletionStatus === 'Complete'} onChange={() => setMetaData({...metaData, poCompletionStatus: 'Complete'})} />
                <span>Complete</span>
              </label>
            </div>
          </div>

          <div className="input-field-node"><label>PO Delivery Date</label><input type="date" name="poDeliveryDate" value={metaData.poDeliveryDate} onChange={handleMetaChange} /></div>
          <div className="input-field-node"><label>Expected Delivery Date</label><input type="date" name="expectedDeliveryDate" value={metaData.expectedDeliveryDate} onChange={handleMetaChange} /></div>
          <div className="input-field-node full-column-width"><label>PO Status (Overall Completion %)</label><input type="number" name="overallPoStatus" value={metaData.overallPoStatus} onChange={handleMetaChange} placeholder="e.g. 75" /></div>
        </div>

        {/* 2. SUB-BREAKDOWN PERCENTAGE PROGRESS METRICS */}
        <div className="expedite-bento-card progress-breakdown-card">
          <h3>Completion Status Breakdown Matrix</h3>
          <div className="metrics-four-column-grid">
            <div className="input-field-node"><label>Engineering (%)</label><input type="text" name="engineering" value={progressMetrics.engineering} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Material (%)</label><input type="text" name="material" value={progressMetrics.material} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Welding (%)</label><input type="text" name="welding" value={progressMetrics.welding} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>NDT (%)</label><input type="text" name="ndt" value={progressMetrics.ndt} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Hydro Test (%)</label><input type="text" name="hydroTest" value={progressMetrics.hydroTest} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Doc Dossier (%)</label><input type="text" name="docDossier" value={progressMetrics.docDossier} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Packing (%)</label><input type="text" name="packing" value={progressMetrics.packing} onChange={handleProgressChange} placeholder="%" /></div>
            <div className="input-field-node"><label>Despatch (%)</label><input type="text" name="despatch" value={progressMetrics.despatch} onChange={handleProgressChange} placeholder="%" /></div>
          </div>
        </div>

        {/* 3. VISIT SUMMARY TEXT AREA & ENGINEERS SIGNATURES */}
        <div className="expedite-bento-card text-lane-stack-card">
          <div className="input-field-node full-column-width">
            <label>SUMMARY OF VISIT :</label>
            <textarea name="summaryText" value={visitSummary.summaryText} onChange={handleSummaryChange} placeholder="Describe the master progress observations during this logistics track evaluation window..." rows="4" />
          </div>
          <div className="signatures-timestamps-matrix">
            <div className="input-field-node"><label>Expediting Engineer</label><input type="text" name="expeditingEngineer" value={visitSummary.expeditingEngineer} onChange={handleSummaryChange} /></div>
            <div className="input-field-node"><label>Date</label><input type="date" name="engineerDate" value={visitSummary.engineerDate} onChange={handleSummaryChange} /></div>
            <div className="input-field-node"><label>Reviewed By</label><input type="text" name="reviewedBy" value={visitSummary.reviewedBy} onChange={handleSummaryChange} /></div>
            <div className="input-field-node"><label>Date</label><input type="date" name="reviewDate" value={visitSummary.reviewDate} onChange={handleSummaryChange} /></div>
          </div>
        </div>

        {/* 4. CHRONO COMPLEX LOG DATA BOXES */}
        <div className="expedite-bento-card text-lane-stack-card">
          <div className="input-field-node full-column-width"><label>PERSONNEL PRESENT :</label><textarea name="personnelPresent" value={fieldLogs.personnelPresent} onChange={handleLogsChange} rows="2" /></div>
          <div className="input-field-node full-column-width"><label>PO DETAILS :</label><textarea name="poDetails" value={fieldLogs.poDetails} onChange={handleLogsChange} rows="2" /></div>
          <div className="input-field-node full-column-width"><label>PRODUCTION STATUS :</label><textarea name="productionStatus" value={fieldLogs.productionStatus} onChange={handleLogsChange} rows="3" /></div>
          <div className="input-field-node full-column-width"><label>INSPECTION & TESTING STATUS :</label><textarea name="inspectionTestingStatus" value={fieldLogs.inspectionTestingStatus} onChange={handleLogsChange} rows="3" /></div>
          <div className="input-field-node full-column-width"><label>NCR STATUS</label><textarea name="ncrStatus" value={fieldLogs.ncrStatus} onChange={handleLogsChange} rows="2" /></div>
          <div className="input-field-node full-column-width"><label>DELIVERY/SHIPMENT STATUS :</label><textarea name="deliveryShipmentStatus" value={fieldLogs.deliveryShipmentStatus} onChange={handleLogsChange} rows="2" /></div>
          <div className="input-field-node full-column-width"><label>AREAS OF CONCERN /ACTION:</label><textarea name="areasOfConcern" value={fieldLogs.areasOfConcern} onChange={handleLogsChange} rows="2" /></div>
          <div className="input-field-node full-column-width"><label>CONCLUSION :</label><textarea name="conclusion" value={fieldLogs.conclusion} onChange={handleLogsChange} rows="3" /></div>
          <div className="input-field-node full-column-width"><label>ATTACHMENTS:</label><textarea name="attachments" value={fieldLogs.attachments} onChange={handleLogsChange} rows="2" /></div>
        </div>

        {/* 5. DOCUMENT STATUS MATRIX GRID TABLE */}
        <div className="expedite-bento-card data-table-card">
          <div className="table-header-control-row">
            <h3>DOCUMENT STATUS</h3>
            <button type="button" className="add-matrix-row-btn" onClick={() => setDocuments([...documents, { siNo: `${documents.length + 1}`, docNo: '', description: '', rev: '', date: '', approvalStatus: '' }])}>+ Append Doc Line</button>
          </div>
          <div className="table-responsive-rail">
            <table className="expedite-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Si. No.</th>
                  <th>Document No.</th>
                  <th>Description</th>
                  <th style={{ width: '80px' }}>Rev</th>
                  <th style={{ width: '150px' }}>Date</th>
                  <th>Approval Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, idx) => (
                  <tr key={idx}>
                    <td><input type="text" value={doc.siNo} readOnly className="static-index-input" /></td>
                    <td><input type="text" value={doc.docNo} onChange={(e) => handleDocRowChange(idx, 'docNo', e.target.value)} placeholder="e.g., DOC-XYZ-01" /></td>
                    <td><input type="text" value={doc.description} onChange={(e) => handleDocRowChange(idx, 'description', e.target.value)} placeholder="Engineering parameters" /></td>
                    <td><input type="text" value={doc.rev} onChange={(e) => handleDocRowChange(idx, 'rev', e.target.value)} placeholder="0" /></td>
                    <td><input type="date" value={doc.date} onChange={(e) => handleDocRowChange(idx, 'date', e.target.value)} /></td>
                    <td><input type="text" value={doc.approvalStatus} onChange={(e) => handleDocRowChange(idx, 'approvalStatus', e.target.value)} placeholder="Approved / Commented" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. SUB VENDOR WORK STATUS GRID TABLE */}
        <div className="expedite-bento-card data-table-card">
          <div className="table-header-control-row">
            <h3>SUB VENDOR WORK STATUS</h3>
            <button type="button" className="add-matrix-row-btn" onClick={() => setSubVendors([...subVendors, { poNoDate: '', subVendorName: '', poItemNo: '', description: '', deliveryDate: '', status: '' }])}>+ Append Sub-Vendor Line</button>
          </div>
          <div className="table-responsive-rail">
            <table className="expedite-matrix-table">
              <thead>
                <tr>
                  <th>PO No. & Date</th>
                  <th>Sub Vendor Name</th>
                  <th>PO Item No.</th>
                  <th>Description</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subVendors.map((sub, idx) => (
                  <tr key={idx}>
                    <td><input type="text" value={sub.poNoDate} onChange={(e) => handleSubVendorRowChange(idx, 'poNoDate', e.target.value)} placeholder="PO-123 & DD/MM/YY" /></td>
                    <td><input type="text" value={sub.subVendorName} onChange={(e) => handleSubVendorRowChange(idx, 'subVendorName', e.target.value)} placeholder="Subcontractor Forge Hub" /></td>
                    <td><input type="text" value={sub.poItemNo} onChange={(e) => handleSubVendorRowChange(idx, 'poItemNo', e.target.value)} placeholder="01" /></td>
                    <td><input type="text" value={sub.description} onChange={(e) => handleSubVendorRowChange(idx, 'description', e.target.value)} placeholder="Raw casting bars" /></td>
                    <td><input type="date" value={sub.deliveryDate} onChange={(e) => handleSubVendorRowChange(idx, 'deliveryDate', e.target.value)} /></td>
                    <td><input type="text" value={sub.status} onChange={(e) => handleSubVendorRowChange(idx, 'status', e.target.value)} placeholder="In Progress / Shipped" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. PHOTOGRAPHS INTEGRATED COHESIVE FILE UPLOADERS */}
        <div className="expedite-bento-card photographs-section-card">
          <h3>Attachments Photographs & Descriptions</h3>
          <p className="photo-section-hint">Provide exact high-fidelity image snapshots detailing component fabrication setups, raw item tracing stamps, or material dispatch storage docks verification notes.</p>
          
          <div className="photos-dropzones-vertical-list">
            {photos.map((item, idx) => (
              <div key={item.id} className="photo-uploader-row-node">
                
                {/* Media Selection Container */}
                <div className="thumbnail-dropzone-element-box">
                  {item.preview ? (
                    <img src={item.preview} alt={`${item.label} Evidence Snapshot`} className="uploaded-thumbnail-node" />
                  ) : (
                    <label htmlFor={`expedite-img-${item.id}`} className="dropzone-label-trigger">
                      <span className="plus-sign-indicator">+</span>
                      <span className="hint-label-text">Upload {item.label}</span>
                    </label>
                  )}
                  <input 
                    type="file" 
                    id={`expedite-img-${item.id}`} 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(idx, e.target.files[0])}
                    className="invisible-input-file-tag"
                  />
                </div>

                {/* Description input row component match */}
                <div className="description-text-entry-box">
                  <label>{item.label} Description</label>
                  <input 
                    type="text" 
                    value={item.description} 
                    onChange={(e) => handlePhotoDescChange(idx, e.target.value)} 
                    placeholder="Enter visual timeline inspection context description details..." 
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* WORKSPACE ACTIONS CONTROLS BOTTOM BUTTONS RAIL */}
        <div className="expedite-form-action-rail-footer">
          <button type="button" className="canvas-secondary-btn" onClick={() => navigate('/inspection')}>
            Discard Document
          </button>
          <button type="submit" className="canvas-primary-btn">
            Commit Expediting Report
          </button>
        </div>

      </form>
    </div>
  );
}

export default ExpeditingReport;