import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css';
const EmployeeDashboard = ({ employeeData, onLogout, currentView, onViewChange }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy payslip data
  const dummyPayslips = [
    { id: 1, month: 'January', year: 2024, amount: 7500, downloadUrl: '#', status: 'Paid', date: '2024-01-31' },
    { id: 2, month: 'December', year: 2023, amount: 7500, downloadUrl: '#', status: 'Paid', date: '2023-12-31' },
    { id: 3, month: 'November', year: 2023, amount: 7500, downloadUrl: '#', status: 'Paid', date: '2023-11-30' },
    { id: 4, month: 'October', year: 2023, amount: 7500, downloadUrl: '#', status: 'Paid', date: '2023-10-31' },
    { id: 5, month: 'September', year: 2023, amount: 7200, downloadUrl: '#', status: 'Paid', date: '2023-09-30' },
    { id: 6, month: 'August', year: 2023, amount: 7200, downloadUrl: '#', status: 'Paid', date: '2023-08-31' },
    { id: 7, month: 'July', year: 2023, amount: 7200, downloadUrl: '#', status: 'Paid', date: '2023-07-31' },
    { id: 8, month: 'June', year: 2023, amount: 7000, downloadUrl: '#', status: 'Paid', date: '2023-06-30' },
  ];

  useEffect(() => {
    // Extract unique years from payslips
    const uniqueYears = [...new Set(dummyPayslips.map(p => p.year))].sort((a, b) => b - a);
    setYears(uniqueYears);
  }, []);

  const filteredPayslips = selectedYear 
    ? dummyPayslips.filter(p => p.year === selectedYear)
    : dummyPayslips;

  const handleDownload = async (payslip) => {
    setLoading(true);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a dummy PDF download
    const pdfContent = `
      PAYSLIP
      ================
      Employee: ${employeeData.name}
      Employee ID: ${employeeData.id}
      Month: ${payslip.month} ${payslip.year}
      Amount: $${payslip.amount}
      Status: ${payslip.status}
      Date: ${payslip.date}
      
      ---
      Company Name
      Employee Portal System
    `;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payslip-${payslip.month.toLowerCase()}-${payslip.year}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setLoading(false);
  };

  const calculateTotalEarnings = () => {
    return dummyPayslips.reduce((total, payslip) => total + payslip.amount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateYearsOfService = () => {
    const joinDate = new Date(employeeData.joinDate);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - joinDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - joinDate.getMonth();
    
    if (monthsDiff < 0) {
      return `${yearsDiff - 1} years ${12 + monthsDiff} months`;
    }
    return `${yearsDiff} years ${monthsDiff} months`;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="company-info">
            <div className="logo-circle">
              <i className="fas fa-briefcase"></i>
            </div>
            <div>
              <h1>Employee Portal</h1>
              <p>Access your professional information securely</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {employeeData.name.charAt(0)}
            </div>
            <div className="user-details">
              <strong>{employeeData.name}</strong>
              <small>{employeeData.position}</small>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="logout-btn"
            disabled={loading}
          >
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="profile-card">
            <div 
              className="profile-avatar"
              style={{ background: employeeData.avatarColor || '#667eea' }}
            >
              {employeeData.name.charAt(0)}
            </div>
            <h3>{employeeData.name}</h3>
            <p className="employee-role">{employeeData.position}</p>
            <p className="employee-dept">{employeeData.department}</p>
            <div className="employee-id-display">
              <i className="fas fa-id-badge"></i>
              <span>{employeeData.id}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-btn ${currentView === 'overview' ? 'active' : ''}`}
              onClick={() => onViewChange('overview')}
            >
              <i className="fas fa-tachometer-alt"></i> Overview
            </button>
            <button 
              className={`nav-btn ${currentView === 'payslips' ? 'active' : ''}`}
              onClick={() => onViewChange('payslips')}
            >
              <i className="fas fa-file-invoice-dollar"></i> Payslips
            </button>
            <button 
              className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => onViewChange('profile')}
            >
              <i className="fas fa-user-circle"></i> Profile
            </button>
            <button 
              className={`nav-btn ${currentView === 'documents' ? 'active' : ''}`}
              onClick={() => onViewChange('documents')}
            >
              <i className="fas fa-folder"></i> Documents
            </button>
          </nav>

          <div className="stats-summary">
            <div className="stat-item">
              <i className="fas fa-calendar-alt"></i>
              <div>
                <h4>Service</h4>
                <p>{calculateYearsOfService()}</p>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-money-check-alt"></i>
              <div>
                <h4>Monthly</h4>
                <p>{formatCurrency(employeeData.salary / 12)}</p>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-star"></i>
              <div>
                <h4>Status</h4>
                <p className="status-active">Active</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {currentView === 'overview' && (
            <div className="overview-view">
              <div className="page-header">
                <h2><i className="fas fa-tachometer-alt"></i> Dashboard Overview</h2>
                <p>Welcome back, {employeeData.name.split(' ')[0]}! Here's your summary.</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon primary">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Total Earnings</h3>
                    <p className="stat-value">{formatCurrency(calculateTotalEarnings())}</p>
                    <p className="stat-desc">Lifetime income</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon success">
                    <i className="fas fa-file-invoice"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Total Payslips</h3>
                    <p className="stat-value">{dummyPayslips.length}</p>
                    <p className="stat-desc">Monthly records</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon warning">
                    <i className="fas fa-calendar-day"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Years of Service</h3>
                    <p className="stat-value">{calculateYearsOfService()}</p>
                    <p className="stat-desc">With company</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon info">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Department</h3>
                    <p className="stat-value">{employeeData.department}</p>
                    <p className="stat-desc">{employeeData.position}</p>
                  </div>
                </div>
              </div>

              <div className="recent-section">
                <div className="section-header">
                  <h3><i className="fas fa-history"></i> Recent Payslips</h3>
                  <button 
                    className="view-all-btn"
                    onClick={() => onViewChange('payslips')}
                  >
                    View All <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="payslip-grid">
                  {dummyPayslips.slice(0, 3).map(payslip => (
                    <div key={payslip.id} className="payslip-card">
                      <div className="payslip-header">
                        <div className="month-badge">
                          {payslip.month.substring(0, 3)}
                        </div>
                        <span className="year-tag">{payslip.year}</span>
                      </div>
                      <div className="payslip-body">
                        <h4>{payslip.month} {payslip.year}</h4>
                        <p className="amount">{formatCurrency(payslip.amount)}</p>
                        <div className="payslip-footer">
                          <span className={`status ${payslip.status.toLowerCase()}`}>
                            {payslip.status}
                          </span>
                          <button 
                            className="download-btn"
                            onClick={() => handleDownload(payslip)}
                            disabled={loading}
                          >
                            {loading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fas fa-download"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'payslips' && (
            <div className="payslips-view">
              <div className="page-header">
                <h2><i className="fas fa-file-invoice-dollar"></i> Payslip History</h2>
                <p>View and download your monthly payslips</p>
              </div>

              <div className="controls-bar">
                <div className="year-filter">
                  <label htmlFor="yearSelect">
                    <i className="fas fa-filter"></i> Filter by Year:
                  </label>
                  <select 
                    id="yearSelect"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="summary-box">
                  <i className="fas fa-chart-pie"></i>
                  <div>
                    <small>Filtered Total</small>
                    <p>{formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0))}</p>
                  </div>
                </div>
              </div>

              <div className="payslips-table-container">
                <table className="payslips-table">
                  <thead>
                    <tr>
                      <th>Month & Year</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayslips.map(payslip => (
                      <tr key={payslip.id}>
                        <td>
                          <div className="month-cell">
                            <div className="month-icon">
                              {payslip.month.charAt(0)}
                            </div>
                            <div>
                              <strong>{payslip.month} {payslip.year}</strong>
                              <small>Monthly Salary</small>
                            </div>
                          </div>
                        </td>
                        <td className="amount-cell">
                          <strong>{formatCurrency(payslip.amount)}</strong>
                        </td>
                        <td>
                          <span className={`status-badge ${payslip.status.toLowerCase()}`}>
                            <i className="fas fa-check-circle"></i> {payslip.status}
                          </span>
                        </td>
                        <td>
                          {new Date(payslip.date).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-view"
                              onClick={() => alert(`Viewing ${payslip.month} ${payslip.year} payslip`)}
                            >
                              <i className="fas fa-eye"></i> View
                            </button>
                            <button 
                              className="btn-download"
                              onClick={() => handleDownload(payslip)}
                              disabled={loading}
                            >
                              {loading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                              ) : (
                                <i className="fas fa-download"></i>
                              )} Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="payslip-summary">
                <div className="summary-card">
                  <h4><i className="fas fa-chart-line"></i> Earnings Summary</h4>
                  <div className="summary-stats">
                    <div className="summary-stat">
                      <small>This Year ({selectedYear || 'All'})</small>
                      <p>{formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0))}</p>
                    </div>
                    <div className="summary-stat">
                      <small>Average Monthly</small>
                      <p>{formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0) / (filteredPayslips.length || 1))}</p>
                    </div>
                    <div className="summary-stat">
                      <small>Total Payslips</small>
                      <p>{filteredPayslips.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="profile-view">
              <div className="page-header">
                <h2><i className="fas fa-user-circle"></i> My Profile</h2>
                <p>Manage your personal information</p>
              </div>

              <div className="profile-content">
                <div className="profile-card-large">
                  <div className="profile-header">
                    <div 
                      className="profile-avatar-large"
                      style={{ background: employeeData.avatarColor || '#667eea' }}
                    >
                      {employeeData.name.charAt(0)}
                    </div>
                    <div className="profile-title">
                      <h3>{employeeData.name}</h3>
                      <p className="profile-position">{employeeData.position}</p>
                      <div className="profile-tags">
                        <span className="tag">{employeeData.department}</span>
                        <span className="tag status-tag">Active</span>
                        <span className="tag">{employeeData.id}</span>
                      </div>
                    </div>
                    <button className="edit-profile-btn">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </div>

                  <div className="profile-details-grid">
                    <div className="detail-card">
                      <div className="detail-header">
                        <i className="fas fa-info-circle"></i>
                        <h4>Basic Information</h4>
                      </div>
                      <div className="detail-content">
                        <div className="info-row">
                          <span className="label">Full Name</span>
                          <span className="value">{employeeData.name}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Employee ID</span>
                          <span className="value">{employeeData.id}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Joining Date</span>
                          <span className="value">
                            {new Date(employeeData.joinDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="label">Service Period</span>
                          <span className="value">{calculateYearsOfService()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <i className="fas fa-briefcase"></i>
                        <h4>Employment Details</h4>
                      </div>
                      <div className="detail-content">
                        <div className="info-row">
                          <span className="label">Position</span>
                          <span className="value">{employeeData.position}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Department</span>
                          <span className="value">{employeeData.department}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Annual Salary</span>
                          <span className="value salary">{formatCurrency(employeeData.salary)}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Monthly</span>
                          <span className="value">{formatCurrency(employeeData.salary / 12)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <i className="fas fa-address-card"></i>
                        <h4>Contact Information</h4>
                      </div>
                      <div className="detail-content">
                        <div className="info-row">
                          <span className="label">Email</span>
                          <span className="value">{employeeData.email}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Contact Number</span>
                          <span className="value">{employeeData.contact}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Work Status</span>
                          <span className="value status-active">Currently Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'documents' && (
            <div className="documents-view">
              <div className="page-header">
                <h2><i className="fas fa-folder"></i> My Documents</h2>
                <p>Access and manage your employment documents</p>
              </div>
              <div className="coming-soon">
                <i className="fas fa-folder-open"></i>
                <h3>Documents Section</h3>
                <p>This section is under development and will be available soon.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>
              <i className="fas fa-shield-alt"></i>
              Secured by 256-bit SSL encryption
            </p>
          </div>
          <div className="footer-right">
            <p>© {new Date().getFullYear()} Employee Portal v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;