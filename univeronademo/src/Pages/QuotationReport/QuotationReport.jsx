import React, { useState } from 'react';
import { HiOutlineDatabase, HiOutlineRefresh } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext';
import './QuotationReport.css';

function QuotationReport() {
  const { showLoader, hideLoader } = useLoader();

  // 1. Selection Screen Filters State Matrix
  const [filters, setFilters] = useState({
    quotationNo: '',
    customerNo: '',
    dateFrom: '',
    dateTo: ''
  });

  // Toggle state to control data table visibility visibility parameter
  const [showTable, setShowTable] = useState(false);
  const [reportData, setReportData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ quotationNo: '', customerNo: '', dateFrom: '', dateTo: '' });
    setShowTable(false);
    setReportData([]);
  };

  // Mock fetching mechanism mapping perfectly to columns in the uploaded layout
  const handleExecuteReport = (e) => {
    e.preventDefault();
    showLoader();

    // Simulate database network processing delay
    setTimeout(() => {
      setReportData([
        {
          quotationNo: 'QT-2026-042',
          quotationDate: '2026-07-19',
          customerCode: 'C000008',
          customerName: 'Walter White',
          currency: 'INR',
          paymentTerm: 'Net 30 Days',
          expirationDate: '2026-08-19',
          salesPerson: 'Vignesh Kumar',
          customerReference: 'REF-MIT-9942',
          itemNo: '10',
          material: 'MAT-TRK-01',
          materialDescription: 'Heavy Vehicle Brake Assembly',
          quantity: 10,
          uom: 'PCS',
          unitPrice: 4500.00,
          tax: 8100.00,
          netValue: 53100.00
        },
        {
          quotationNo: 'QT-2026-042',
          quotationDate: '2026-07-19',
          customerCode: 'C000008',
          customerName: 'Walter White',
          currency: 'INR',
          paymentTerm: 'Net 30 Days',
          expirationDate: '2026-08-19',
          salesPerson: 'Vignesh Kumar',
          customerReference: 'REF-MIT-9942',
          itemNo: '20',
          material: 'MAT-TRK-05',
          materialDescription: 'Pneumatic Suspension Valve Ring',
          quantity: 25,
          uom: 'EOA',
          unitPrice: 850.00,
          tax: 2550.00,
          netValue: 23800.00
        }
      ]);
      setShowTable(true);
      hideLoader();
    }, 600);
  };

  // Sum calculations for specific columns highlighted in your design mapping
  const calculateColumnSum = (field) => {
    return reportData.reduce((sum, row) => sum + (parseFloat(row[field]) || 0), 0);
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>Quotation Analytical Reports</h2>
      </div>

      {/* ===================================================
         1. TOP TRACK LAYER: SELECTION SCREEN PARAMETERS CARD 
      ====================================================== */}
      <div className="inspect-bento-card meta-grid-card">
        <h3 className="q-report-section-title">Selection Parameters</h3>
        <form onSubmit={handleExecuteReport}>
          <div className="field-row">
            <div className="input-group">
              <label>Quotation No</label>
              <input 
                type="text" 
                name="quotationNo" 
                placeholder="e.g., QT-2026-042" 
                value={filters.quotationNo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="input-group">
              <label>Customer No</label>
              <input 
                type="text" 
                name="customerNo" 
                placeholder="e.g., C000008" 
                value={filters.customerNo}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="field-row" style={{ marginTop: '20px' }}>
            <div className="input-group">
              <label>Quotation Date (From)</label>
              <input 
                type="date" 
                name="dateFrom" 
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            <div className="input-group">
              <label>Quotation Date (To)</label>
              <input 
                type="date" 
                name="dateTo" 
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="q-report-filter-actions">
            <button type="button" className="form-secondary-btn" onClick={handleReset}>
              <HiOutlineRefresh /> Clear Parameters
            </button>
            <button type="submit" className="form-primary-btn">
              <HiOutlineDatabase /> Get Data Matrix
            </button>
          </div>
        </form>
      </div>

      {/* ===================================================
         2. BOTTOM TRACK LAYER: INEDITABLE OUTPUT LIST DATA TABLE
      ====================================================== */}
      {showTable && (
        <div className="inspect-bento-card item-table-card" style={{ marginTop: '24px' }}>
          <h3 className="q-report-section-title">Output Summary Ledgers</h3>
          
          <div className="table-overflow-scroller">
            <table className="inspect-matrix-table clean-theme-header report-output-flat-table">
              <thead>
                <tr>
                  <th>Quotation No</th>
                  <th>Quotation Date</th>
                  <th>Customer Code</th>
                  <th>Customer Name</th>
                  <th>Currency</th>
                  <th>Payment Term</th>
                  <th>Expiration Date</th>
                  <th>Sales Person</th>
                  <th>Customer Reference</th>
                  <th>Item No</th>
                  <th>Material</th>
                  <th>Material Description</th>
                  <th>Quantity</th>
                  <th>UOM</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Net Value</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.quotationNo}</td>
                    <td>{row.quotationDate}</td>
                    <td>{row.customerCode}</td>
                    <td>{row.customerName}</td>
                    <td>{row.currency}</td>
                    <td>{row.paymentTerm}</td>
                    <td>{row.expirationDate}</td>
                    <td>{row.salesPerson}</td>
                    <td>{row.customerReference}</td>
                    <td>{row.itemNo}</td>
                    <td>{row.material}</td>
                    <td className="allow-text-wrap">{row.materialDescription}</td>
                    <td style={{ textAlign: 'center' }}>{row.quantity}</td>
                    <td>{row.uom}</td>
                    <td style={{ textAlign: 'right' }}>{row.unitPrice.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>{row.tax.toFixed(2)}</td>
                    <td style={{ textAlign: 'right', fontWeight: '600' }}>{row.netValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              
              {/* ACCENT SUMMARY SUM ROW FOOTER PATTERN MATCHING EXCEL HIGHLIGHTS */}
              <tfoot>
                <tr className="report-summary-sum-row">
                  <td colSpan="12" style={{ textAlign: 'right', fontWeight: '700' }}>SUM:</td>
                  <td style={{ textAlign: 'center', fontWeight: '700' }}>{calculateColumnSum('quantity')}</td>
                  <td colSpan="2"></td>
                  <td style={{ textAlign: 'right', fontWeight: '700' }}>{calculateColumnSum('tax').toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: '700', color: '#00cc88' }}>{calculateColumnSum('netValue').toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuotationReport;