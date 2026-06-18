import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorAssessmentReport.css';

function VendorAssessmentReport() {
  const navigate = useNavigate();

  // Active Tab layout manager for extensive multi-section tracking
  const [activeTab, setActiveTab] = useState('general');

  // SECTION 1: Base Report Header Metadata
  const [metaData, setMetaData] = useState({
    client: '', dateOfAssessment: '', project: '', reportNo: '',
    poNo: '', location: '', vendor: '', assignmentNo: '',
    assessmentSummary: '', assessorName: '', assessorSignature: '', assessorDate: ''
  });

  // SECTION 2: Organisation & Financials State
  const [orgFinancialData, setOrgFinancialData] = useState({
    yearEstablishment: '', totalYearsCompleted: '',
    managersCount: '', engineersCount: '', qcPersonnelCount: '', othersCount: '',
    ownershipCompanies: '', legalStatus: '', principalActivities: '',
    countryRegistered: '', registrationAddress: '', operationsAddress: '',
    financialAccountsCopy: '', financialReorgDetails: ''
  });

  // SECTION 3: HSSE Layer Log Strings
  const [hsseData, setHsseData] = useState({
    legalCompliance: '', hssePolicyStatement: '', emergencyResponsePlans: '',
    businessContinuityPlan: '', employeeInduction: '', contractorInduction: '',
    trainingQualifications: '', riskManagementProcess: '', incidentReportingProcess: '',
    incidentReviewStatistics: ''
  });

  // SECTION 4: Technical Resources Matrix
  const [technicalData, setTechnicalData] = useState({
    relevantExperience: '', resourceAvailability: '', rolesResponsibilities: '',
    jobDescriptionsAvailable: '', futureCommitments: '', shopFloorSpace: '',
    productionEmployeesWorks: '', machineryTypesNumbers: '', weldingProcessDetails: '',
    weldingFacilitiesCapacity: '', rollingBendingForming: '', testingFacilities: '',
    cleanRoomFacilities: '', storageFacilities: '', travelRoutesTraceability: '',
    cranesLiftingCapacity: '', housekeepingStatus: '', manpowerPlanCompleted: '',
    consumableStorageContamination: '', goodsReceivingQc: '', subcontractedProcesses: '',
    subOrderQualityControl: '', auditSubcontractors: '', workstationWpsPqrInstructions: ''
  });

  // SECTION 5: Quality Systems & Key Personnel
  const [qualityPersonnelData, setQualityPersonnelData] = useState({
    certifiedQualitySystem: '', certifiedQualityDetails: '', qualityPolicyObjectivesIssues: '',
    customerSatisfactionMeasurement: '', qaQcManagerAvailable: '', iso9001ScopeValidity: '',
    surveillanceWorkScopeQuality: '', iso9001LocationsValidity: '', internalAuditScheduleComment: '',
    subvendorAuditSchedule: '', subvendorNoProcedureQuality: '', codesStandardsRevisions: '',
    approvedForConstructionDrawings: '', technicalClarificationRegister: '', shopFloorInstructionsPoRef: '',
    qaToShopFloorMethodology: '', nonconformingProductProcedure: '', internalNcRegisterStatus: '',
    calibrationProcedureEquipmentDate: '', internalEngineeringQualifications: '', vendorQualityPlansUsed: '',
    planManufacturingProcesses: '', planSpecificationsStandards: '', productionScheduleMonitoring: '',
    orderDocumentControl: '', employeeInductionProgram: '', projectOrganisationChart: '',
    keyPersonnelList: '', dedicatedPmQaDetails: '', ndtPersonnelQualifications: '',
    weldersCurrentAssessments: '', welderQualificationRegister: '', managersSpecificationUnderstanding: ''
  });

  // SECTION 6: Project Management, Competency & Capacity Workload
  const [pmCapacityData, setPmCapacityData] = useState({
    projectInCharge: '', planningInCharge: '', projectManagementPlan: '',
    selectionRecruitmentPersonnel: '', personnelClientProceduresEvaluation: '',
    personnelWorkAssignmentSystem: '', performanceTrackingProcess: '',
    continuousCompetenceAssessment: '', currentWorkloadPercentage: '',
    workloadForecastCapacity: '', capacityControlSystem: '', workloadManpowerMachineAssessment: ''
  });

  // SECTION 7: Photographic Media Upload Track Matrix (Consistent with your high-fidelity standard)
  const [photos, setPhotos] = useState([
    { id: 1, label: 'Photo 1', file: null, preview: '', description: '' },
    { id: 2, label: 'Photo 2', file: null, preview: '', description: '' },
    { id: 3, label: 'Photo 3', file: null, preview: '', description: '' },
    { id: 4, label: 'Photo 4', file: null, preview: '', description: '' },
    { id: 5, label: 'Photo 5', file: null, preview: '', description: '' },
    { id: 6, label: 'Photo 6', file: null, preview: '', description: '' }
  ]);

  // Master State Event Handlers
  const handleMetaChange = (e) => setMetaData({ ...metaData, [e.target.name]: e.target.value });
  const handleOrgFinancialChange = (e) => setOrgFinancialData({ ...orgFinancialData, [e.target.name]: e.target.value });
  const handleHsseChange = (e) => setHsseData({ ...hsseData, [e.target.name]: e.target.value });
  const handleTechnicalChange = (e) => setTechnicalData({ ...technicalData, [e.target.name]: e.target.value });
  const handleQualityPersonnelChange = (e) => setQualityPersonnelData({ ...qualityPersonnelData, [e.target.name]: e.target.value });
  const handlePmCapacityChange = (e) => setPmCapacityData({ ...pmCapacityData, [e.target.name]: e.target.value });

  const handleFileChange = (index, file) => {
    if (!file) return;
    const updatedPhotos = [...photos];
    updatedPhotos[index].file = file;
    updatedPhotos[index].preview = URL.createObjectURL(file);
    setPhotos(updatedPhotos);
  };

  const handlePhotoDescriptionChange = (index, value) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].description = value;
    setPhotos(updatedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Vendor Assessment Report Submission Pack:", {
      metaData, orgFinancialData, hsseData, technicalData, qualityPersonnelData, pmCapacityData, photos
    });
  };

  return (
    <div className="vendor-assess-container">
      <div className="vendor-assess-header">
        <h2>Vendor Assessment Report</h2>
        <p>Comprehensive Audit Matrix across Corporate Scope, Technical Capacities, HSSE Compliance & Quality Systems</p>
      </div>

      {/* HORIZONTAL WORKSPACE SECTIONS NAVIGATION TAB RAIL */}
      <div className="assess-tabs-rail">
        <button type="button" className={`tab-node ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General & Summary</button>
        <button type="button" className={`tab-node ${activeTab === 'scope' ? 'active' : ''}`} onClick={() => setActiveTab('scope')}>Business Scope & Finance</button>
        <button type="button" className={`tab-node ${activeTab === 'hsse' ? 'active' : ''}`} onClick={() => setActiveTab('hsse')}>HSSE Controls</button>
        <button type="button" className={`tab-node ${activeTab === 'technical' ? 'active' : ''}`} onClick={() => setActiveTab('technical')}>Technical Resources</button>
        <button type="button" className={`tab-node ${activeTab === 'quality' ? 'active' : ''}`} onClick={() => setActiveTab('quality')}>Quality & Key Personnel</button>
        <button type="button" className={`tab-node ${activeTab === 'pm' ? 'active' : ''}`} onClick={() => setActiveTab('pm')}>PM & Capacity Forecast</button>
      </div>

      <form onSubmit={handleSubmit} className="vendor-assess-form">
        
        {/* TAB LAYER 1: GENERAL REGISTRATION METADATA */}
        {activeTab === 'general' && (
          <div className="tab-view-animation">
            <div className="assess-bento-card fields-dual-grid">
              <div className="input-element-box"><label>Client</label><input type="text" name="client" value={metaData.client} onChange={handleMetaChange} placeholder="Client Corporation" /></div>
              <div className="input-element-box"><label>Date of Assessment</label><input type="date" name="dateOfAssessment" value={metaData.dateOfAssessment} onChange={handleMetaChange} /></div>
              <div className="input-element-box"><label>Project</label><input type="text" name="project" value={metaData.project} onChange={handleMetaChange} placeholder="Project Name Descriptor" /></div>
              <div className="input-element-box"><label>Report No</label><input type="text" name="reportNo" value={metaData.reportNo} onChange={handleMetaChange} placeholder="e.g., VAR-2026-003" /></div>
              <div className="input-element-box"><label>PO No.</label><input type="text" name="poNo" value={metaData.poNo} onChange={handleMetaChange} placeholder="Purchase Order Tracking ID" /></div>
              <div className="input-element-box"><label>Location</label><input type="text" name="location" value={metaData.location} onChange={handleMetaChange} placeholder="Manufacturing Plant / City" /></div>
              <div className="input-element-box"><label>Vendor</label><input type="text" name="vendor" value={metaData.vendor} onChange={handleMetaChange} placeholder="Vendor Manufacturing Entity Name" /></div>
              <div className="input-element-box"><label>Assignment No</label><input type="text" name="assignmentNo" value={metaData.assignmentNo} onChange={handleMetaChange} placeholder="Assigned Workspace Code" /></div>
            </div>

            <div className="assess-bento-card text-block-card">
              <div className="textarea-element-box">
                <label>Assessment Summary :</label>
                <textarea name="assessmentSummary" value={metaData.assessmentSummary} onChange={handleMetaChange} placeholder="Provide an overall technical executive summary assessment statement..." rows="4" />
              </div>
              <div className="assessor-stamps-row">
                <div className="input-element-box"><label>Name of Assessor</label><input type="text" name="assessorName" value={metaData.assessorName} onChange={handleMetaChange} placeholder="Lead Auditor Full Name" /></div>
                <div className="input-element-box"><label>Signature Stamp ID</label><input type="text" name="assessorSignature" value={metaData.assessorSignature} onChange={handleMetaChange} placeholder="Digital Signature Verification" /></div>
                <div className="input-element-box"><label>Date</label><input type="date" name="assessorDate" value={metaData.assessorDate} onChange={handleMetaChange} /></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB LAYER 2: BUSINESS SCOPE & FINANCIAL DATA */}
        {activeTab === 'scope' && (
          <div className="tab-view-animation">
            <div className="assess-bento-card">
              <h3>Organisation Scope of Business</h3>
              <div className="fields-dual-grid sub-space-top">
                <div className="input-element-box"><label>Year Establishment</label><input type="text" name="yearEstablishment" value={orgFinancialData.yearEstablishment} onChange={handleOrgFinancialChange} placeholder="YYYY" /></div>
                <div className="input-element-box"><label>Total No. of Years Completed</label><input type="number" name="totalYearsCompleted" value={orgFinancialData.totalYearsCompleted} onChange={handleOrgFinancialChange} placeholder="0" /></div>
              </div>

              <div className="metrics-quad-count-row">
                <div className="count-node"><label>Managers</label><input type="number" name="managersCount" value={orgFinancialData.managersCount} onChange={handleOrgFinancialChange} placeholder="0" /></div>
                <div className="count-node"><label>Engineers</label><input type="number" name="engineersCount" value={orgFinancialData.engineersCount} onChange={handleOrgFinancialChange} placeholder="0" /></div>
                <div className="count-node"><label>QC Personnel</label><input type="number" name="qcPersonnelCount" value={orgFinancialData.qcPersonnelCount} onChange={handleOrgFinancialChange} placeholder="0" /></div>
                <div className="count-node"><label>Others</label><input type="number" name="othersCount" value={orgFinancialData.othersCount} onChange={handleOrgFinancialChange} placeholder="0" /></div>
              </div>

              <div className="textarea-stack-lane">
                <div className="textarea-element-box"><label>List of companies and ownership percentage of each</label><textarea name="ownershipCompanies" value={orgFinancialData.ownershipCompanies} onChange={handleOrgFinancialChange} placeholder="Provide details regarding parent companies or stock ratios..." rows="2" /></div>
                <div className="textarea-element-box"><label>Identify the legal status of the company (e.g. Partnership, LLP, Private Ltd, Limited etc.)</label><textarea name="legalStatus" value={orgFinancialData.legalStatus} onChange={handleOrgFinancialChange} placeholder="Legal registration parameters..." rows="2" /></div>
                <div className="textarea-element-box"><label>What are the principal activities of the company?</label><textarea name="principalActivities" value={orgFinancialData.principalActivities} onChange={handleOrgFinancialChange} placeholder="Core industrial trading profiles..." rows="2" /></div>
              </div>

              <div className="fields-dual-grid sub-space-top">
                <div className="input-element-box"><label>In what country is the company registered?</label><input type="text" name="countryRegistered" value={orgFinancialData.countryRegistered} onChange={handleOrgFinancialChange} placeholder="Country of Incorporation" /></div>
                <div className="textarea-element-box full-width-span"><label>Provide the registration address</label><textarea name="registrationAddress" value={orgFinancialData.registrationAddress} onChange={handleOrgFinancialChange} placeholder="Registered Legal Location" rows="2" /></div>
                <div className="textarea-element-box full-width-span"><label>Provide the operations address of the business if different from registration address</label><textarea name="operationsAddress" value={orgFinancialData.operationsAddress} onChange={handleOrgFinancialChange} placeholder="Factory Plant Operational Location" rows="2" /></div>
              </div>
            </div>

            <div className="assess-bento-card space-break-top">
              <h3>Financial Data</h3>
              <div className="textarea-stack-lane sub-space-top">
                <div className="textarea-element-box"><label>Provide a copy of your company accounts for the past 3 years (Details / References)</label><textarea name="financialAccountsCopy" value={orgFinancialData.financialAccountsCopy} onChange={handleOrgFinancialChange} placeholder="Audit documentation submission status references..." rows="2" /></div>
                <div className="textarea-element-box"><label>Within the last 5 years, has your company been subject to a court-supervised financial reorganisation, or has your company sought relief under a debtor relief law? If yes give details.</label><textarea name="financialReorgDetails" value={orgFinancialData.financialReorgDetails} onChange={handleOrgFinancialChange} placeholder="If no, write N/A. If yes, specify complete legal relief logs..." rows="2" /></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB LAYER 3: HEALTH, SAFETY, SECURITY AND ENVIRONMENT (HSSE) */}
        {activeTab === 'hsse' && (
          <div className="tab-view-animation textarea-stack-lane">
            <div className="assess-bento-card">
              <h3>3.1 Legal Compliance and Standards</h3>
              <div className="textarea-element-box sub-space-top"><label>Does your company have a process in place to identify, and ensure compliance with, applicable HSSE legal and regulatory requirements?</label><textarea name="legalCompliance" value={hsseData.legalCompliance} onChange={handleHsseChange} placeholder="Specify tracking processes or certified compliance paradigms..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>3.2 Policy and Organisation</h3>
              <div className="textarea-element-box sub-space-top"><label>Does the company have a documented HSSE Policy Statement?</label><textarea name="hssePolicyStatement" value={hsseData.hssePolicyStatement} onChange={handleHsseChange} placeholder="Details or references..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have a documented and tested formal emergency response plans?</label><textarea name="emergencyResponsePlans" value={hsseData.emergencyResponsePlans} onChange={handleHsseChange} placeholder="Drill schedule parameters and emergency structural charts..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have a Business Continuity Plan with clear accountabilities</label><textarea name="businessContinuityPlan" value={hsseData.businessContinuityPlan} onChange={handleHsseChange} placeholder="Business continuity tracking metrics..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have a documented HSSE Induction Plan for all employees within your organisation?</label><textarea name="employeeInduction" value={hsseData.employeeInduction} onChange={handleHsseChange} placeholder="Induction training references..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have a documented HSSE Induction Plan for all contractors within your organisation?</label><textarea name="contractorInduction" value={hsseData.contractorInduction} onChange={handleHsseChange} placeholder="Contractor safety screening track..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have a documented programme in place to ensure that all employees have suitable HSSE training and qualifications in order to carry out their roles and responsibilities?</label><textarea name="trainingQualifications" value={hsseData.trainingQualifications} onChange={handleHsseChange} placeholder="Training metrics and safety licenses tracking..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>3.3 Risk Management & 3.4 Incident Management</h3>
              <div className="textarea-element-box sub-space-top"><label>Describe risk identification, assessment, and mitigation process allowing the company to manage risk in HSSE performance improvement (ALARP level)</label><textarea name="riskManagementProcess" value={hsseData.riskManagementProcess} onChange={handleHsseChange} placeholder="ALARP mitigation methods logs..." rows="3" /></div>
              <div className="textarea-element-box"><label>What is the accident and incident reporting process?</label><textarea name="incidentReportingProcess" value={hsseData.incidentReportingProcess} onChange={handleHsseChange} placeholder="Chain of notification, forms utilized, and containment timelines..." rows="2" /></div>
              <div className="textarea-element-box"><label>How are accident reports and injury statistics reviewed?</label><textarea name="incidentReviewStatistics" value={hsseData.incidentReviewStatistics} onChange={handleHsseChange} placeholder="Management review intervals, safety indicator trend metrics..." rows="2" /></div>
            </div>
          </div>
        )}

        {/* TAB LAYER 4: TECHNICAL RESOURCES MAP */}
        {activeTab === 'technical' && (
          <div className="tab-view-animation textarea-stack-lane">
            <div className="assess-bento-card">
              <h3>4.1 Experience & 4.2 Resource Availability</h3>
              <div className="textarea-element-box sub-space-top"><label>Provide details of the company history and experience relevant to the scope</label><textarea name="relevantExperience" value={technicalData.relevantExperience} onChange={handleTechnicalChange} placeholder="Relevant engineering project track history..." rows="2" /></div>
              <div className="textarea-element-box"><label>Outline the personnel and office resources</label><textarea name="resourceAvailability" value={technicalData.resourceAvailability} onChange={handleTechnicalChange} placeholder="Engineering departments counts and layout assets..." rows="2" /></div>
              <div className="textarea-element-box"><label>Review Organisation identifying personnel, roles and responsibilities for suitability</label><textarea name="rolesResponsibilities" value={technicalData.rolesResponsibilities} onChange={handleTechnicalChange} placeholder="Audit remarks regarding capability matching..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the company have job descriptions available for all personnel?</label><textarea name="jobDescriptionsAvailable" value={technicalData.jobDescriptionsAvailable} onChange={handleTechnicalChange} placeholder="Standardized job descriptions validation..." rows="2" /></div>
              <div className="textarea-element-box"><label>Are there future commitments for proposer's resources impacting scope (pre-qualification exercises, outstanding tenders)?</label><textarea name="futureCommitments" value={technicalData.futureCommitments} onChange={handleTechnicalChange} placeholder="Capacity congestion warnings or competing tender loads..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>4.4 - 4.15 Shop Floor Assets & Facilities Capacity</h3>
              <div className="textarea-element-box sub-space-top"><label>Estimate shop floor space. Detail areas and types.</label><textarea name="shopFloorSpace" value={technicalData.shopFloorSpace} onChange={handleTechnicalChange} placeholder="Square meters metrics, heavy bays, blasting sheds, clean zones..." rows="2" /></div>
              <div className="textarea-element-box"><label>How many production related employees are at the works?</label><textarea name="productionEmployeesWorks" value={technicalData.productionEmployeesWorks} onChange={handleTechnicalChange} placeholder="Active trades counts (fitters, welders, operators)..." rows="2" /></div>
              <div className="textarea-element-box"><label>Detail Machinery types & numbers relevant to the scope of work</label><textarea name="machineryTypesNumbers" value={technicalData.machineryTypesNumbers} onChange={handleTechnicalChange} placeholder="CNC lathes, milling machine metrics, borers, cutting tables..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of Welding process</label><textarea name="weldingProcessDetails" value={technicalData.weldingProcessDetails} onChange={handleTechnicalChange} placeholder="TIG, MIG, SAW, SMAW processes configurations..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of welding capacity / Facilities</label><textarea name="weldingFacilitiesCapacity" value={technicalData.weldingFacilitiesCapacity} onChange={handleTechnicalChange} placeholder="Number of power sources, active positioners, boom tracks..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of Rolling / bending / material forming / heat treatment facilities</label><textarea name="rollingBendingForming" value={technicalData.rollingBendingForming} onChange={handleTechnicalChange} placeholder="Plate rollers maximum thickness parameters, heat furnaces calibrations..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of Testing facilities</label><textarea name="testingFacilities" value={technicalData.testingFacilities} onChange={handleTechnicalChange} placeholder="Hydrostatic loops, NDT darkrooms, spectro-analyzers..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of Clean room facilities</label><textarea name="cleanRoomFacilities" value={technicalData.cleanRoomFacilities} onChange={handleTechnicalChange} placeholder="ISO class configurations, positive pressure vectors, stainless steel clean docks..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of Storage facilities</label><textarea name="storageFacilities" value={technicalData.storageFacilities} onChange={handleTechnicalChange} placeholder="Raw plate yards, specialized indoor alloy racking, component vaults..." rows="2" /></div>
              <div className="textarea-element-box"><label>Shop travel routes / route card with parts traceability</label><textarea name="travelRoutesTraceability" value={technicalData.travelRoutesTraceability} onChange={handleTechnicalChange} placeholder="Heat code preservation metrics, tracking route cards..." rows="2" /></div>
              <div className="textarea-element-box"><label>Capacity of cranes / lifting equipment / material handling</label><textarea name="cranesLiftingCapacity" value={technicalData.cranesLiftingCapacity} onChange={handleTechnicalChange} placeholder="Overhead EOT crane tonnages, jib limits, forklifts configurations..." rows="2" /></div>
              <div className="textarea-element-box"><label>Housekeeping Status</label><textarea name="housekeepingStatus" value={technicalData.housekeepingStatus} onChange={handleTechnicalChange} placeholder="5S compliance scores, clear aisle tracks, trash segregation loops..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>4.16 - 4.22 Subcontracting & Order Quality Control</h3>
              <div className="textarea-element-box sub-space-top"><label>Has the vendor completed a manpower plan?</label><textarea name="manpowerPlanCompleted" value={technicalData.manpowerPlanCompleted} onChange={handleTechnicalChange} placeholder="Project manpower baseline availability logs..." rows="2" /></div>
              <div className="textarea-element-box"><label>What are the vendor's consumable storage facilities and are they operated correctly to ensure no cross contamination?</label><textarea name="consumableStorageContamination" value={technicalData.consumableStorageContamination} onChange={handleTechnicalChange} placeholder="Flux holding ovens, low-hydrogen rod climate cells..." rows="2" /></div>
              <div className="textarea-element-box"><label>What are the vendor's good receiving quality control procedures?</label><textarea name="goodsReceivingQc" value={technicalData.goodsReceivingQc} onChange={handleTechnicalChange} placeholder="MTR check validation loops, dimensional verification at dock gates..." rows="2" /></div>
              <div className="textarea-element-box"><label>What processes are sub-contracted?</label><textarea name="subcontractedProcesses" value={technicalData.subcontractedProcesses} onChange={handleTechnicalChange} placeholder="Galvanizing, complex deep non-destructive testing, heat treatments loops..." rows="2" /></div>
              <div className="textarea-element-box"><label>How does the vendor control sub-order quality?</label><textarea name="subOrderQualityControl" value={technicalData.subOrderQualityControl} onChange={handleTechnicalChange} placeholder="Incoming raw inspection specifications alignment fields..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the vendor audit sub-contractors?</label><textarea name="auditSubcontractors" value={technicalData.auditSubcontractors} onChange={handleTechnicalChange} placeholder="Sub-vendor audit schedule limits, approved suppliers list..." rows="2" /></div>
              <div className="textarea-element-box"><label>Do work stations have instructions with regard special processes / requirements (WPS/PQR/WPQ, NDT, HT)?</label><textarea name="workstationWpsPqrInstructions" value={technicalData.workstationWpsPqrInstructions} onChange={handleTechnicalChange} placeholder="WPS placards visibility at welding booths, NDT parameter logs sheets..." rows="2" /></div>
            </div>
          </div>
        )}

        {/* TAB LAYER 5: QUALITY SYSTEMS & KEY PERSONNEL */}
        {activeTab === 'quality' && (
          <div className="tab-view-animation textarea-stack-lane">
            <div className="assess-bento-card">
              <h3>5.1 Quality System and Management Plan & 5.2 Certification</h3>
              <div className="textarea-element-box sub-space-top"><label>Does the company have a certified quality management system ? (Provide Details if Yes)</label><textarea name="certifiedQualitySystem" value={qualityPersonnelData.certifiedQualitySystem} onChange={handleQualityPersonnelChange} placeholder="ISO 9001:2015 registration body credentials and certificates registry logs..." rows="2" /></div>
              <div className="textarea-element-box"><label>Review Quality Policy and Quality objective statements. Detail any issues or concerns.</label><textarea name="qualityPolicyObjectivesIssues" value={qualityPersonnelData.qualityPolicyObjectivesIssues} onChange={handleQualityPersonnelChange} placeholder="Alignment analysis regarding corporate quality metrics targets..." rows="2" /></div>
              <div className="textarea-element-box"><label>Detail examples of how company measures policies and objectives (e.g. customer satisfaction management)</label><textarea name="customerSatisfactionMeasurement" value={qualityPersonnelData.customerSatisfactionMeasurement} onChange={handleQualityPersonnelChange} placeholder="Survey frequency indices, customer complaint resolution feedback tracks..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does company have a dedicated QA/QC Manager? Confirm ISO 9001 Certification scope & locations validity.</label><textarea name="qaQcManagerAvailable" value={qualityPersonnelData.qaQcManagerAvailable} onChange={handleQualityPersonnelChange} placeholder="QA/QC organizational hierarchy mapping verification, geographical scope check..." rows="2" /></div>
              <div className="textarea-element-box"><label>If certification does not cover surveillance work scope, explain quality management provisions:</label><textarea name="surveillanceWorkScopeQuality" value={qualityPersonnelData.surveillanceWorkScopeQuality} onChange={handleQualityPersonnelChange} placeholder="Alternative inspection data plans, supplementary procedure validations..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>5.3 Audit Schedule & 5.4 Relevant Documentation Tracking</h3>
              <div className="textarea-element-box sub-space-top"><label>Review internal audit schedule/ surveillance. Are all audits up-to-date? Comment on sub-vendor tracking.</label><textarea name="internalAuditScheduleComment" value={qualityPersonnelData.internalAuditScheduleComment} onChange={handleQualityPersonnelChange} placeholder="Audit log dates conformance checks, gaps tracking findings..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does the vendor have latest revisions of codes and standards relevant to project?</label><textarea name="codesStandardsRevisions" value={qualityPersonnelData.codesStandardsRevisions} onChange={handleQualityPersonnelChange} placeholder="ASME online registration validations, ASTM standard subscriptions..." rows="2" /></div>
              <div className="textarea-element-box"><label>Are drawings and datasheets approved for construction? If not, how is document control managed?</label><textarea name="approvedForConstructionDrawings" value={qualityPersonnelData.approvedForConstructionDrawings} onChange={handleQualityPersonnelChange} placeholder="EPC contractor stamp verification tracking, revision controls systems..." rows="2" /></div>
              <div className="textarea-element-box"><label>Outline methodology whereby client requirements flow from QA department to shop floor & QC personnel</label><textarea name="qaToShopFloorMethodology" value={qualityPersonnelData.qaToShopFloorMethodology} onChange={handleQualityPersonnelChange} placeholder="Pre-production distribution briefings, travelers document attachments..." rows="2" /></div>
              <div className="textarea-element-box"><label>What is vendor's procedure for control of non-conforming products? Check internal NC register status.</label><textarea name="nonconformingProductProcedure" value={qualityPersonnelData.nonconformingProductProcedure} onChange={handleQualityPersonnelChange} placeholder="Quarantine area tagging validation loops, trend indicators analysis..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does vendor have calibration procedure? Verify shop floor equipment indices are in date.</label><textarea name="calibrationProcedureEquipmentDate" value={qualityPersonnelData.calibrationProcedureEquipmentDate} onChange={handleQualityPersonnelChange} placeholder="Micrometers calibration records check, pressure gauge card tracking..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>5.5 Quality Plan Assessment & 6. Key Personnel Qualifications</h3>
              <div className="textarea-element-box sub-space-top"><label>Does vendor use quality plans indicating all manufacturing processes, specs, and production monitoring?</label><textarea name="vendorQualityPlansUsed" value={qualityPersonnelData.vendorQualityPlansUsed} onChange={handleQualityPersonnelChange} placeholder="ITP creation tracking, progress mapping vectors against Master Schedule..." rows="2" /></div>
              <div className="textarea-element-box"><label>Describe documented induction programme for all employees. Confirm project organization chart availability.</label><textarea name="employeeInductionProgram" value={qualityPersonnelData.employeeInductionProgram} onChange={handleQualityPersonnelChange} placeholder="Onboarding safety and quality tracking records checklist..." rows="2" /></div>
              <div className="textarea-element-box"><label>Do NDT personnel have current qualifications relevant to PO spec? (ASNT/ISO 9712 programme check)</label><textarea name="ndtPersonnelQualifications" value={qualityPersonnelData.ndtPersonnelQualifications} onChange={handleQualityPersonnelChange} placeholder="Level II / III certifications validation logs registry..." rows="2" /></div>
              <div className="textarea-element-box"><label>Do welders have current assessments for processes? Is there a welder qualification register?</label><textarea name="weldersCurrentAssessments" value={qualityPersonnelData.weldersCurrentAssessments} onChange={handleQualityPersonnelChange} placeholder="WPQ record tracking logs, renewal timeline charts parameters..." rows="2" /></div>
              <div className="textarea-element-box"><label>Discuss spec requirements of PO (ASME/API/ISO) with QA/QC and PMs. Do they understand specifications?</label><textarea name="managersSpecificationUnderstanding" value={qualityPersonnelData.managersSpecificationUnderstanding} onChange={handleQualityPersonnelChange} placeholder="Interview notes regarding technical code literacy feedback metrics..." rows="2" /></div>
            </div>
          </div>
        )}

        {/* TAB LAYER 6: PROJECT MANAGEMENT, PERSONNEL COMPETENCY & CAPACITY WORKLOAD */}
        {activeTab === 'pm' && (
          <div className="tab-view-animation textarea-stack-lane">
            <div className="assess-bento-card">
              <h3>7. Project Management Elements</h3>
              <div className="textarea-element-box sub-space-top"><label>7.1 Project In-charge & 7.2 Planning In-charge Assignments</label><textarea name="projectInCharge" value={pmCapacityData.projectInCharge} onChange={handlePmCapacityChange} placeholder="Identify key names, experience boundaries, technical clear records..." rows="2" /></div>
              <div className="textarea-element-box"><label>7.3 Project Management Plan Status</label><textarea name="projectManagementPlan" value={pmCapacityData.projectManagementPlan} onChange={handlePmCapacityChange} placeholder="Document control reference numbers, phase gates reviews schedules..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>8. Personnel Competency Selection & Records Keeping</h3>
              <div className="textarea-element-box sub-space-top"><label>What is written process/procedure to select and assess personnel (employees, contractors, sub-contractors)?</label><textarea name="selectionRecruitmentPersonnel" value={pmCapacityData.selectionRecruitmentPersonnel} onChange={handlePmCapacityChange} placeholder="Sourcing screening criteria, technical competency test rules..." rows="2" /></div>
              <div className="textarea-element-box"><label>What procedure evaluates Personnel ability to comply with client inspection procedures?</label><textarea name="personnelClientProceduresEvaluation" value={pmCapacityData.personnelClientProceduresEvaluation} onChange={handlePmCapacityChange} placeholder="Mock audits parameters, procedure revision walkthrough evaluations..." rows="2" /></div>
              <div className="textarea-element-box"><label>Provide details of system in place to manage assignment of Personnel to work assignments & track performance:</label><textarea name="personnelWorkAssignmentSystem" value={pmCapacityData.personnelWorkAssignmentSystem} onChange={handlePmCapacityChange} placeholder="Matrix allocations trackers, re-assessment frequencies, performance indicators loops..." rows="2" /></div>
            </div>

            <div className="assess-bento-card">
              <h3>9. Training, Development & Capacity Workload Forecast</h3>
              <div className="textarea-element-box sub-space-top"><label>What is current percentage workload of maximum capacity? Specify vendor's workload forecast capacity.</label><textarea name="currentWorkloadPercentage" value={pmCapacityData.currentWorkloadPercentage} onChange={handlePmCapacityChange} placeholder="Current shop load status, backlog hours commitments profile..." rows="2" /></div>
              <div className="textarea-element-box"><label>Does vendor have capacity control system? Assess workload compared to manpower and machine capacity.</label><textarea name="capacityControlSystem" value={pmCapacityData.capacityControlSystem} onChange={handlePmCapacityChange} placeholder="ERP allocation modules review, shop capacity congestion warning indicators..." rows="3" /></div>
            </div>

            {/* ATTACHMENT PHOTOGRAPHS WITH INTEGRATED PREVIEW FILE UPLOADERS */}
            <div className="assess-bento-card photographs-upload-container">
              <h3>Vendor Assessment Photographs Evidence</h3>
              <p className="upload-section-description">Upload site assessment photographic logs corresponding directly to facility machinery configurations, technical resources layout, or ITP storage controls.</p>
              
              <div className="photos-uploader-vertical-stack">
                {photos.map((item, idx) => (
                  <div key={item.id} className="photo-row-node">
                    <div className="dropzone-media-preview-box">
                      {item.preview ? (
                        <img src={item.preview} alt={`${item.label} Evidence Preview`} className="dropzone-thumbnail-element" />
                      ) : (
                        <label htmlFor={`assess-file-${item.id}`} className="dropzone-interact-label">
                          <span className="plus-sign-accent">+</span>
                          <span className="label-descriptor-text">Upload {item.label}</span>
                        </label>
                      )}
                      <input 
                        type="file" 
                        id={`assess-file-${item.id}`} 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(idx, e.target.files[0])}
                        className="invisible-native-file-input"
                      />
                    </div>
                    
                    <div className="photo-text-description-box">
                      <label>{item.label} Operational Description</label>
                      <input 
                        type="text" 
                        value={item.description} 
                        onChange={(e) => handlePhotoDescriptionChange(idx, e.target.value)} 
                        placeholder="Provide structural context for this photographic assessment clear record..." 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REUSABLE FLUID CANVAS ACTION INTERACTION CONTROLS ROW */}
        <div className="canvas-action-control-bar">
          <button type="button" className="action-button-element secondary" onClick={() => navigate('/inspection')}>
            Discard Document
          </button>
          <button type="submit" className="action-button-element primary">
            Commit Vendor Assessment
          </button>
        </div>

      </form>
    </div>
  );
}

export default VendorAssessmentReport;