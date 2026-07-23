import React, { useState } from 'react';
import { HiOutlineDatabase, HiOutlineRefresh } from 'react-icons/hi';
import { useLoader } from '../../context/LoaderContext';
import './QuotationReport.css';

function QuotationReport() {
  const { showLoader, hideLoader } = useLoader();

  // 1. Selection Screen Filters State
  const [filters, setFilters] = useState({
    quotationNo: '',
    customerNo: '',
    dateFrom: '',
    dateTo: ''
  });

  const [showTable, setShowTable] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const activeToken = localStorage.getItem('auth_token');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ quotationNo: '', customerNo: '', dateFrom: '', dateTo: '' });
    setShowTable(false);
    setReportData([]);
    setErrorMessage('');
  };

  // 2. Fetch API & Data Normalization Matrix
  const handleExecuteReport = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    showLoader();

    try {
      // Build Dynamic Query Parameters for API Call
      const queryParams = new URLSearchParams();
      if (filters.quotationNo) queryParams.append('quotation_no', filters.quotationNo.trim());
      if (filters.customerNo) queryParams.append('customer_no', filters.customerNo.trim());
      if (filters.dateFrom) queryParams.append('date_from', filters.dateFrom);
      if (filters.dateTo) queryParams.append('date_to', filters.dateTo);

      const url = `https://sdsinfotech.co.in/api/quotations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        }
      });

      const result = await response.json();

      if (result.statusCode === 200 || !result.error) {
        // Handle array responses (List API) or single object responses (Show API)
        const rawList = Array.isArray(result.data) 
          ? result.data 
          : result.data ? [result.data] : [];

        // Unroll / Flatten quotation head + items line arrays into tabular rows
        const formattedRows = [];

        rawList.forEach((quotation) => {
          const items = Array.isArray(quotation.items) && quotation.items.length > 0 
            ? quotation.items 
            : [{}]; // Dummy row fallback if quotation has no items

          items.forEach((item) => {
            formattedRows.push({
              quotationNo: quotation.quotation_no || '',
              quotationDate: quotation.date || '',
              customerCode: quotation.customer?.customer_no || quotation.customer_id?.toString() || '',
              customerName: quotation.customer?.name || '',
              currency: quotation.currency?.code || quotation.currency?.name || quotation.currency_id?.toString() || '',
              paymentTerm: quotation.payment_term?.name || quotation.payment_term_id?.toString() || '',
              expirationDate: quotation.expiration_date || '',
              salesPerson: quotation.sales_person || quotation.created_by || '—',
              customerReference: quotation.customer_ref || quotation.note || '—',
              
              // Item Level Fields
              itemNo: item.item_no ?? '—',
              material: item.material || '—',
              materialDescription: item.material_description || '—',
              quantity: parseFloat(item.quantity) || 0,
              uom: item.uom || '—',
              unitPrice: parseFloat(item.unit_price) || 0,
              tax: parseFloat(item.tax_amount) || 0,
              netValue: parseFloat(item.total_amount) || 0
            });
          });
        });

        // 3. Client-Side Segregation / Filtering Pass
        // Guarantees proper segregation even if backend parameters are ignored by API
        const segregatedRows = formattedRows.filter((row) => {
          // Filter by Quotation No (Partial match, case-insensitive)
          if (filters.quotationNo && !row.quotationNo.toLowerCase().includes(filters.quotationNo.trim().toLowerCase())) {
            return false;
          }

          // Filter by Customer No / ID / Name (Partial match, case-insensitive)
          if (filters.customerNo) {
            const searchCust = filters.customerNo.trim().toLowerCase();
            const matchCode = row.customerCode.toLowerCase().includes(searchCust);
            const matchName = row.customerName.toLowerCase().includes(searchCust);
            if (!matchCode && !matchName) return false;
          }

          // Filter by Date Range From
          if (filters.dateFrom && row.quotationDate < filters.dateFrom) {
            return false;
          }

          // Filter by Date Range To
          if (filters.dateTo && row.quotationDate > filters.dateTo) {
            return false;
          }

          return true;
        });

        setReportData(segregatedRows);
        setShowTable(true);
      } else {
        setErrorMessage(result.statusMessage || "Failed to retrieve quotation records.");
      }
    } catch (error) {
      console.error("API Call Error:", error);
      setErrorMessage("Network error occurred while fetching quotation report.");
    } finally {
      hideLoader();
    }
  };

  // Helper for Summary Calculation Footer
  const calculateColumnSum = (field) => {
    return reportData.reduce((sum, row) => sum + (parseFloat(row[field]) || 0), 0);
  };

  return (
    <div className="inspect-report-container">
      <div className="inspect-report-header">
        <h2>Quotation Analytical Reports</h2>
      </div>

      {/* ===================================================
         1. SELECTION SCREEN PARAMETERS CARD
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
                placeholder="e.g., Q000001" 
                value={filters.quotationNo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="input-group">
              <label>Customer No</label>
              <input 
                type="text" 
                name="customerNo" 
                placeholder="e.g., 1 or C000001" 
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

      {/* ERROR DISPLAY */}
      {errorMessage && (
        <div style={{ padding: '15px', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginTop: '15px' }}>
          {errorMessage}
        </div>
      )}

      {/* ===================================================
         2. OUTPUT DATA TABLE
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
                {reportData.length > 0 ? (
                  reportData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.quotationNo || '—'}</td>
                      <td>{row.quotationDate || '—'}</td>
                      <td>{row.customerCode || '—'}</td>
                      <td>{row.customerName || '—'}</td>
                      <td>{row.currency || '—'}</td>
                      <td>{row.paymentTerm || '—'}</td>
                      <td>{row.expirationDate || '—'}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                      No matching quotation records found for the specified selection parameters.
                    </td>
                  </tr>
                )}
              </tbody>
              
              {/* SUMMARY FOOTER ROW */}
              {reportData.length > 0 && (
                <tfoot>
                  <tr className="report-summary-sum-row">
                    <td colSpan="12" style={{ textAlign: 'right', fontWeight: '700' }}>SUM:</td>
                    <td style={{ textAlign: 'center', fontWeight: '700' }}>{calculateColumnSum('quantity')}</td>
                    <td colSpan="2"></td>
                    <td style={{ textAlign: 'right', fontWeight: '700' }}>{calculateColumnSum('tax').toFixed(2)}</td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: '#00cc88' }}>{calculateColumnSum('netValue').toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuotationReport;