import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css';

const EmployeeDashboard = ({ employeeData, onLogout, currentView, onViewChange }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [selectedAttendanceMonth, setSelectedAttendanceMonth] = useState('2024-01');
  const [hoverStates, setHoverStates] = useState({
    calendarBtn: false,
    navOverview: false,
    navPayslips: false,
    navProfile: false,
    navDocuments: false,
    statCards: Array(4).fill(false),
    payslipCards: Array(3).fill(false),
    viewAllBtn: false,
    summaryBox: false,
    tableRows: Array(3).fill(false),
    detailCards: Array(3).fill(false),
    documentCards: Array(6).fill(false),
    editProfileBtn: false,
    closeBtn: false,
    btnPrint: false,
    btnDownloadModal: false,
    btnClose: false,
    btnView: Array(3).fill(false),
    btnDownload: Array(3).fill(false),
    btnPreview: Array(6).fill(false),
    btnDownloadDoc: Array(6).fill(false),
    statDetailItems: Array(5).fill(false),
    calendarDays: Array(31).fill(false),
    statItem: false,
    tag: false,
    infoRow: false,
    summaryStat: false
  });

  // Dummy payslip data
  const dummyPayslips = [
    { id: 1, month: 'January', year: 2024, amount: 7500, status: 'Paid', date: '2024-01-31', 
      details: {
        basic: 4500,
        hra: 1800,
        conveyance: 800,
        medical: 400,
        bonus: 0,
        tax: 750,
        pf: 550,
        net: 7500
      }
    },
    { id: 2, month: 'December', year: 2023, amount: 7500, status: 'Paid', date: '2023-12-31',
      details: {
        basic: 4500,
        hra: 1800,
        conveyance: 800,
        medical: 400,
        bonus: 500,
        tax: 800,
        pf: 550,
        net: 7500
      }
    },
    { id: 3, month: 'November', year: 2023, amount: 7500, status: 'Paid', date: '2023-11-30',
      details: {
        basic: 4500,
        hra: 1800,
        conveyance: 800,
        medical: 400,
        bonus: 0,
        tax: 750,
        pf: 550,
        net: 7500
      }
    },
  ];

  // Dummy attendance data for multiple months
  const attendanceData = {
    '2024-01': {
      monthName: 'January 2024',
      present: 20,
      absent: 2,
      weekOff: 8,
      leave: 1,
      late: 1,
      totalDays: 32,
      dailyData: {
        '2024-01-01': { status: 'present', checkIn: '09:05', checkOut: '18:00' },
        '2024-01-02': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2024-01-03': { status: 'present', checkIn: '09:10', checkOut: '18:00' },
        '2024-01-04': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2024-01-05': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2024-01-06': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2024-01-07': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2024-01-08': { status: 'late', checkIn: '10:30', checkOut: '18:30' },
        '2024-01-09': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2024-01-10': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2024-01-12': { status: 'absent', checkIn: '--', checkOut: '--' },
        '2024-01-15': { status: 'leave', checkIn: '--', checkOut: '--' },
      }
    },
    '2023-12': {
      monthName: 'December 2023',
      present: 22,
      absent: 0,
      weekOff: 8,
      leave: 1,
      late: 0,
      totalDays: 31,
      dailyData: {
        '2023-12-01': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-02': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-03': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-04': { status: 'present', checkIn: '09:05', checkOut: '18:00' },
        '2023-12-05': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-06': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-07': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-08': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-09': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-10': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-11': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-12': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-13': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-14': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-15': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-18': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-19': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-20': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-21': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-22': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-25': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-26': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-27': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-28': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-29': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-12-23': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-24': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-30': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-31': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-16': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-12-17': { status: 'weekOff', checkIn: '--', checkOut: '--' }
      }
    },
    '2023-11': {
      monthName: 'November 2023',
      present: 21,
      absent: 1,
      weekOff: 8,
      leave: 0,
      late: 0,
      totalDays: 30,
      dailyData: {
        '2023-11-01': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-02': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-03': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-04': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-05': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-06': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-07': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-08': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-09': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-10': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-11': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-12': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-13': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-14': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-15': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-16': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-17': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-18': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-19': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-20': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-21': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-22': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-23': { status: 'absent', checkIn: '--', checkOut: '--' },
        '2023-11-24': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-25': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-26': { status: 'weekOff', checkIn: '--', checkOut: '--' },
        '2023-11-27': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-28': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-29': { status: 'present', checkIn: '09:00', checkOut: '18:00' },
        '2023-11-30': { status: 'present', checkIn: '09:00', checkOut: '18:00' }
      }
    }
  };

  // Available months for attendance calendar
  const attendanceMonths = Object.keys(attendanceData).map(key => ({
    value: key,
    label: attendanceData[key].monthName
  })).sort((a, b) => b.value.localeCompare(a.value));

  // Dummy documents data
  const dummyDocuments = [
    {
      id: 1,
      type: 'aadhar',
      title: 'Aadhar Card',
      description: 'Government issued identity proof',
      documentNumber: 'XXXX-XXXX-XXXX-7890',
      issueDate: '2022-05-15',
      expiryDate: 'Permanent',
      status: 'verified',
      fileSize: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      type: 'pan',
      title: 'PAN Card',
      description: 'Permanent Account Number',
      documentNumber: 'ABCDE1234F',
      issueDate: '2021-08-20',
      expiryDate: 'Permanent',
      status: 'verified',
      fileSize: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      type: 'bank',
      title: 'Bank Account Details',
      description: 'Salary Account Information',
      documentNumber: 'Account No: 1234567890',
      issueDate: '2020-01-10',
      expiryDate: 'N/A',
      status: 'active',
      fileSize: '1.2 MB',
      format: 'PDF'
    },
    {
      id: 4,
      type: 'passport',
      title: 'Passport',
      description: 'International Travel Document',
      documentNumber: 'A12345678',
      issueDate: '2023-03-10',
      expiryDate: '2033-03-09',
      status: 'verified',
      fileSize: '3.5 MB',
      format: 'PDF'
    },
    {
      id: 5,
      type: 'degree',
      title: 'Degree Certificate',
      description: 'Bachelor of Technology',
      documentNumber: 'BTech/2020/12345',
      issueDate: '2020-06-25',
      expiryDate: 'N/A',
      status: 'verified',
      fileSize: '4.2 MB',
      format: 'PDF'
    },
    {
      id: 6,
      type: 'experience',
      title: 'Experience Letter',
      description: 'Previous Employment Proof',
      documentNumber: 'EXP/HR/2022/456',
      issueDate: '2022-12-01',
      expiryDate: 'N/A',
      status: 'verified',
      fileSize: '2.1 MB',
      format: 'PDF'
    }
  ];

  useEffect(() => {
    // Extract unique years from payslips
    const uniqueYears = [...new Set(dummyPayslips.map(p => p.year))].sort((a, b) => b - a);
    setYears(uniqueYears);
    
    // Animation timeout
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredPayslips = selectedYear 
    ? dummyPayslips.filter(p => p.year === selectedYear)
    : dummyPayslips;

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
  };

  const handleClosePayslip = () => {
    setSelectedPayslip(null);
  };

  const handleDownload = async (item, type = 'payslip') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let content = '';
    let filename = '';
    
    if (type === 'payslip') {
      content = `
        PAYSLIP
        ================
        Employee: ${employeeData.name}
        Employee ID: ${employeeData.id}
        Month: ${item.month} ${item.year}
        
        Earnings:
        ---------
        Basic Salary: $${item.details.basic}
        HRA: $${item.details.hra}
        Conveyance: $${item.details.conveyance}
        Medical: $${item.details.medical}
        Bonus: $${item.details.bonus}
        
        Deductions:
        -----------
        Tax: $${item.details.tax}
        Provident Fund: $${item.details.pf}
        
        Net Salary: $${item.amount}
        Status: ${item.status}
        Payment Date: ${item.date}
        
        ---
        ${employeeData.company || 'Company Name'}
        Employee Portal System
      `;
      filename = `payslip-${item.month.toLowerCase()}-${item.year}.txt`;
    } else if (type === 'document') {
      content = `
        ${item.title.toUpperCase()}
        =========================
        Employee: ${employeeData.name}
        Employee ID: ${employeeData.id}
        
        Document Details:
        -----------------
        Document Type: ${item.title}
        Description: ${item.description}
        Document Number: ${item.documentNumber}
        Issue Date: ${new Date(item.issueDate).toLocaleDateString()}
        Expiry Date: ${item.expiryDate === 'N/A' || item.expiryDate === 'Permanent' ? item.expiryDate : new Date(item.expiryDate).toLocaleDateString()}
        Status: ${item.status.toUpperCase()}
        File Size: ${item.fileSize}
        Format: ${item.format}
        
        ---
        Verified by HR Department
        ${employeeData.company || 'Company Name'}
        Downloaded on: ${new Date().toLocaleDateString()}
      `;
      filename = `${item.type}-${employeeData.id}.txt`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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

  const handleDateHover = (date) => {
    const currentData = attendanceData[selectedAttendanceMonth];
    if (!currentData) return;
    
    const yearMonth = selectedAttendanceMonth;
    const dateStr = `${yearMonth}-${date.toString().padStart(2, '0')}`;
    
    if (currentData.dailyData && currentData.dailyData[dateStr]) {
      setSelectedDate({
        date: dateStr,
        ...currentData.dailyData[dateStr]
      });
    } else {
      setSelectedDate({
        date: dateStr,
        status: 'no-data',
        checkIn: '--',
        checkOut: '--'
      });
    }
  };

  const renderCalendar = () => {
    const currentData = attendanceData[selectedAttendanceMonth];
    if (!currentData) return null;
    
    const [year, month] = selectedAttendanceMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="calendar-day empty-day"
        />
      );
    }
    
    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedAttendanceMonth}-${day.toString().padStart(2, '0')}`;
      const attendance = currentData.dailyData[dateStr];
      
      const dayClass = `calendar-day ${attendance ? attendance.status : ''} ${showAnimation ? 'fade-in' : ''}`;
      
      days.push(
        <div 
          key={day} 
          className={dayClass}
          onMouseEnter={() => handleDateHover(day)}
          onMouseLeave={() => setSelectedDate(null)}
          title={attendance ? `Status: ${attendance.status}\nCheck-in: ${attendance.checkIn}\nCheck-out: ${attendance.checkOut}` : 'No data'}
          style={showAnimation ? { animationDelay: `${day * 0.02}s` } : {}}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const calculateAttendanceStats = () => {
    const currentData = attendanceData[selectedAttendanceMonth];
    if (!currentData) return null;
    
    const stats = [
      { label: 'Present', value: currentData.present, color: '#4CAF50' },
      { label: 'Week Off', value: currentData.weekOff, color: '#2196F3' },
      { label: 'Absent', value: currentData.absent, color: '#f44336' },
      { label: 'Leave', value: currentData.leave, color: '#FF9800' },
      { label: 'Late', value: currentData.late, color: '#FFC107' }
    ];
    
    return stats;
  };

  const calculateAttendancePercentages = () => {
    const currentData = attendanceData[selectedAttendanceMonth];
    if (!currentData) return null;
    
    const stats = calculateAttendanceStats();
    const total = currentData.totalDays;
    
    const percentages = stats.map(stat => {
      const percentage = (stat.value / total) * 100;
      return {
        ...stat,
        percentage: percentage.toFixed(1)
      };
    });
    
    return percentages;
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'aadhar': return 'fas fa-id-card';
      case 'pan': return 'fas fa-file-invoice';
      case 'bank': return 'fas fa-university';
      case 'passport': return 'fas fa-passport';
      case 'degree': return 'fas fa-graduation-cap';
      case 'experience': return 'fas fa-briefcase';
      default: return 'fas fa-file-alt';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return '#4CAF50';
      case 'active': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'expired': return '#f44336';
      default: return '#666';
    }
  };

  const handleMouseEnter = (key, index = null) => {
    setHoverStates(prev => {
      if (index !== null) {
        const newArray = [...prev[key]];
        newArray[index] = true;
        return { ...prev, [key]: newArray };
      }
      return { ...prev, [key]: true };
    });
  };

  const handleMouseLeave = (key, index = null) => {
    setHoverStates(prev => {
      if (index !== null) {
        const newArray = [...prev[key]];
        newArray[index] = false;
        return { ...prev, [key]: newArray };
      }
      return { ...prev, [key]: false };
    });
  };

  // Get document icon background color
  const getDocumentIconColor = (type) => {
    switch(type) {
      case 'aadhar': return '#FF5722';
      case 'pan': return '#2196F3';
      case 'bank': return '#4CAF50';
      case 'passport': return '#9C27B0';
      case 'degree': return '#FF9800';
      case 'experience': return '#607D8B';
      default: return '#667eea';
    }
  };

  // Get pie chart gradient based on current month data
  const getPieChartGradient = () => {
    const percentages = calculateAttendancePercentages();
    if (!percentages) return 'conic-gradient(#f0f2f5 0% 100%)';
    
    let gradient = 'conic-gradient(';
    let currentPercentage = 0;
    
    percentages.forEach((stat, index) => {
      const percentage = (stat.value / attendanceData[selectedAttendanceMonth].totalDays) * 100;
      gradient += `${stat.color} ${currentPercentage}% ${currentPercentage + percentage}%`;
      if (index < percentages.length - 1) {
        gradient += ', ';
      }
      currentPercentage += percentage;
    });
    
    gradient += ')';
    return gradient;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="company-info">
            <div className="logo-circle animate-float">
              <i className="fas fa-briefcase"></i>
            </div>
            <div>
              <h1>Employee Portal</h1>
              <p>Access your professional information securely</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <button 
            className={`calendar-btn ${hoverStates.calendarBtn ? 'hover' : ''}`}
            onClick={() => setShowCalendar(true)}
            onMouseEnter={() => handleMouseEnter('calendarBtn')}
            onMouseLeave={() => handleMouseLeave('calendarBtn')}
            title="View Attendance Calendar"
          >
            <i 
              className="fas fa-calendar-alt" 
            ></i>
            <span>Calendar</span>
          </button>
          <button 
            onClick={onLogout} 
            className="logout-btn"
            disabled={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f44336';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#667eea';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
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
              className={`nav-btn ${currentView === 'overview' ? 'active' : ''} ${hoverStates.navOverview ? 'hover' : ''}`}
              onClick={() => onViewChange('overview')}
              onMouseEnter={() => handleMouseEnter('navOverview')}
              onMouseLeave={() => handleMouseLeave('navOverview')}
            >
              <i className="fas fa-tachometer-alt"></i> Overview
            </button>
            <button 
              className={`nav-btn ${currentView === 'payslips' ? 'active' : ''} ${hoverStates.navPayslips ? 'hover' : ''}`}
              onClick={() => onViewChange('payslips')}
              onMouseEnter={() => handleMouseEnter('navPayslips')}
              onMouseLeave={() => handleMouseLeave('navPayslips')}
            >
              <i className="fas fa-file-invoice-dollar"></i> Payslips
            </button>
            <button 
              className={`nav-btn ${currentView === 'profile' ? 'active' : ''} ${hoverStates.navProfile ? 'hover' : ''}`}
              onClick={() => onViewChange('profile')}
              onMouseEnter={() => handleMouseEnter('navProfile')}
              onMouseLeave={() => handleMouseLeave('navProfile')}
            >
              <i className="fas fa-user-circle"></i> Profile
            </button>
            <button 
              className={`nav-btn ${currentView === 'documents' ? 'active' : ''} ${hoverStates.navDocuments ? 'hover' : ''}`}
              onClick={() => onViewChange('documents')}
              onMouseEnter={() => handleMouseEnter('navDocuments')}
              onMouseLeave={() => handleMouseLeave('navDocuments')}
            >
              <i className="fas fa-folder"></i> Documents
            </button>
          </nav>

          <div className="stats-summary">
            <div 
              className={`stat-item ${hoverStates.statItem ? 'hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('statItem')}
              onMouseLeave={() => handleMouseLeave('statItem')}
            >
              <i className="fas fa-calendar-alt" style={{ color: '#667eea' }}></i>
              <div>
                <h4>Service</h4>
                <p>{calculateYearsOfService()}</p>
              </div>
            </div>
            <div 
              className={`stat-item ${hoverStates.statItem ? 'hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('statItem')}
              onMouseLeave={() => handleMouseLeave('statItem')}
            >
              <i className="fas fa-money-check-alt" style={{ color: '#4CAF50' }}></i>
              <div>
                <h4>Monthly</h4>
                <p>{formatCurrency(employeeData.salary / 12)}</p>
              </div>
            </div>
            <div 
              className={`stat-item ${hoverStates.statItem ? 'hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('statItem')}
              onMouseLeave={() => handleMouseLeave('statItem')}
            >
              <i className="fas fa-star" style={{ color: '#FFC107' }}></i>
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
            <div>
              <div className="page-header">
                <h2>
                  <i className="fas fa-tachometer-alt"></i> Dashboard Overview
                </h2>
                <p>Welcome back, {employeeData.name.split(' ')[0]}! Here's your summary.</p>
              </div>
              
              {/* UPDATED STATS GRID WITH EMOJI ICONS */}
              <div className="stats-grid">
                {[
                  { 
                    icon: '💰', 
                    title: 'Total Earnings', 
                    value: formatCurrency(calculateTotalEarnings()), 
                    desc: 'Lifetime income', 
                    type: 'primary' 
                  },
                  { 
                    icon: '📄', 
                    title: 'Total Payslips', 
                    value: dummyPayslips.length, 
                    desc: 'Monthly records', 
                    type: 'success' 
                  },
                  { 
                    icon: '⏳', 
                    title: 'Years of Service', 
                    value: calculateYearsOfService(), 
                    desc: 'With company', 
                    type: 'warning' 
                  },
                  { 
                    icon: '🏢', 
                    title: 'Department', 
                    value: employeeData.department, 
                    desc: employeeData.position, 
                    type: 'info' 
                  }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`stat-card ${hoverStates.statCards[index] ? 'hover' : ''}`}
                    onMouseEnter={() => handleMouseEnter('statCards', index)}
                    onMouseLeave={() => handleMouseLeave('statCards', index)}
                  >
                    <div 
                      className={`stat-icon ${stat.type}-icon ${hoverStates.statCards[index] ? 'hover' : ''}`}
                    >
                      <span className="stat-emoji">{stat.icon}</span>
                    </div>
                    <div className="stat-content">
                      <h3>{stat.title}</h3>
                      <p className="stat-value">{stat.value}</p>
                      <p className="stat-desc">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="recent-section">
                <div className="section-header">
                  <h3>
                    <i className="fas fa-history"></i> Recent Payslips
                  </h3>
                  <button 
                    className={`view-all-btn ${hoverStates.viewAllBtn ? 'hover' : ''}`}
                    onClick={() => onViewChange('payslips')}
                    onMouseEnter={() => handleMouseEnter('viewAllBtn')}
                    onMouseLeave={() => handleMouseLeave('viewAllBtn')}
                  >
                    View All <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="payslip-grid">
                  {dummyPayslips.slice(0, 3).map((payslip, index) => (
                    <div 
                      key={payslip.id} 
                      className={`payslip-card ${hoverStates.payslipCards[index] ? 'hover' : ''}`}
                      onMouseEnter={() => handleMouseEnter('payslipCards', index)}
                      onMouseLeave={() => handleMouseLeave('payslipCards', index)}
                    >
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
                          <span className="status paid-status">
                            {payslip.status}
                          </span>
                          <button 
                            className={`download-btn ${hoverStates.btnView[index] ? 'hover' : ''}`}
                            onClick={() => handleViewPayslip(payslip)}
                            disabled={loading}
                            onMouseEnter={() => handleMouseEnter('btnView', index)}
                            onMouseLeave={() => handleMouseLeave('btnView', index)}
                          >
                            <i className="fas fa-eye"></i> View
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
            <div>
              <div className="page-header">
                <h2>
                  <i className="fas fa-file-invoice-dollar"></i> Payslip History
                </h2>
                <p>View and download your monthly payslips</p>
              </div>

              <div className="controls-bar">
                <div className="year-filter">
                  <label htmlFor="yearSelect">
                    <i className="fas fa-filter"></i> Filter by Year:
                  </label>
                  <select 
                    id="yearSelect"
                    className="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div 
                  className={`summary-box ${hoverStates.summaryBox ? 'hover' : ''}`}
                  onMouseEnter={() => handleMouseEnter('summaryBox')}
                  onMouseLeave={() => handleMouseLeave('summaryBox')}
                >
                  <i className="fas fa-chart-pie" style={{ color: '#667eea' }}></i>
                  <div>
                    <small>Filtered Total</small>
                    <p>
                      {formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="payslips-table-container">
                <table className="payslips-table">
                  <thead>
                    <tr>
                      <th className="table-header">Month & Year</th>
                      <th className="table-header">Amount</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Date</th>
                      <th className="table-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayslips.map((payslip, index) => (
                      <tr 
                        key={payslip.id}
                        className={`${hoverStates.tableRows[index] ? 'hover' : ''}`}
                        onMouseEnter={() => handleMouseEnter('tableRows', index)}
                        onMouseLeave={() => handleMouseLeave('tableRows', index)}
                      >
                        <td className="table-cell">
                          <div className="month-cell">
                            <div 
                              className={`month-icon ${hoverStates.tableRows[index] ? 'hover' : ''}`}
                            >
                              {payslip.month.charAt(0)}
                            </div>
                            <div>
                              <strong>{payslip.month} {payslip.year}</strong>
                              <br />
                              <small>Monthly Salary</small>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell amount-cell">
                          <strong>{formatCurrency(payslip.amount)}</strong>
                        </td>
                        <td className="table-cell">
                          <span 
                            className={`status-badge paid-badge ${hoverStates.tableRows[index] ? 'hover' : ''}`}
                          >
                            <i className="fas fa-check-circle"></i> {payslip.status}
                          </span>
                        </td>
                        <td className="table-cell">
                          {new Date(payslip.date).toLocaleDateString()}
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            <button 
                              className={`btn-view ${hoverStates.btnView[index] ? 'hover' : ''}`}
                              onClick={() => handleViewPayslip(payslip)}
                              onMouseEnter={() => handleMouseEnter('btnView', index)}
                              onMouseLeave={() => handleMouseLeave('btnView', index)}
                            >
                              <i className="fas fa-eye"></i> View
                            </button>
                            <button 
                              className={`btn-download ${hoverStates.btnDownload[index] ? 'hover' : ''}`}
                              onClick={() => handleDownload(payslip)}
                              disabled={loading}
                              onMouseEnter={() => handleMouseEnter('btnDownload', index)}
                              onMouseLeave={() => handleMouseLeave('btnDownload', index)}
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
                  <h4>
                    <i className="fas fa-chart-line"></i> Earnings Summary
                  </h4>
                  <div className="summary-stats">
                    {[
                      { label: `This Year (${selectedYear || 'All'})`, value: formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0)) },
                      { label: 'Average Monthly', value: formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0) / (filteredPayslips.length || 1)) },
                      { label: 'Total Payslips', value: filteredPayslips.length }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className={`summary-stat ${hoverStates.summaryStat ? 'hover' : ''}`}
                        onMouseEnter={() => handleMouseEnter('summaryStat')}
                        onMouseLeave={() => handleMouseLeave('summaryStat')}
                      >
                        <small>{stat.label}</small>
                        <p>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div>
              <div className="page-header">
                <h2>
                  <i className="fas fa-user-circle"></i> My Profile
                </h2>
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
                        <span 
                          className={`tag ${hoverStates.tag ? 'hover' : ''}`}
                          onMouseEnter={() => handleMouseEnter('tag')}
                          onMouseLeave={() => handleMouseLeave('tag')}
                        >
                          {employeeData.department}
                        </span>
                        <span 
                          className={`tag status-tag ${hoverStates.tag ? 'hover' : ''}`}
                          onMouseEnter={() => handleMouseEnter('tag')}
                          onMouseLeave={() => handleMouseLeave('tag')}
                        >
                          Active
                        </span>
                        <span 
                          className={`tag ${hoverStates.tag ? 'hover' : ''}`}
                          onMouseEnter={() => handleMouseEnter('tag')}
                          onMouseLeave={() => handleMouseLeave('tag')}
                        >
                          {employeeData.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-details-grid">
                    {[
                      {
                        icon: 'info-circle',
                        title: 'Basic Information',
                        items: [
                          { label: 'Full Name', value: employeeData.name },
                          { label: 'Employee ID', value: employeeData.id },
                          { label: 'Joining Date', value: new Date(employeeData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                          { label: 'Service Period', value: calculateYearsOfService() }
                        ]
                      },
                      {
                        icon: 'briefcase',
                        title: 'Employment Details',
                        items: [
                          { label: 'Position', value: employeeData.position },
                          { label: 'Department', value: employeeData.department },
                          { label: 'Annual Salary', value: formatCurrency(employeeData.salary), isSalary: true },
                          { label: 'Monthly', value: formatCurrency(employeeData.salary / 12) }
                        ]
                      },
                      {
                        icon: 'address-card',
                        title: 'Contact Information',
                        items: [
                          { label: 'Email', value: employeeData.email },
                          { label: 'Contact Number', value: employeeData.contact },
                          { label: 'Work Status', value: 'Currently Active', isStatus: true }
                        ]
                      }
                    ].map((section, index) => (
                      <div 
                        key={index}
                        className={`detail-card ${hoverStates.detailCards[index] ? 'hover' : ''}`}
                        onMouseEnter={() => handleMouseEnter('detailCards', index)}
                        onMouseLeave={() => handleMouseLeave('detailCards', index)}
                      >
                        <div className="detail-header">
                          <i className={`fas fa-${section.icon}`}></i>
                          <h4>{section.title}</h4>
                        </div>
                        <div className="detail-content">
                          {section.items.map((item, itemIndex) => (
                            <div 
                              key={itemIndex}
                              className={`info-row ${hoverStates.infoRow ? 'hover' : ''}`}
                              onMouseEnter={() => handleMouseEnter('infoRow')}
                              onMouseLeave={() => handleMouseLeave('infoRow')}
                            >
                              <span className="label">{item.label}</span>
                              <span className={`value ${item.isSalary ? 'salary' : ''} ${item.isStatus ? 'status-active' : ''}`}>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'documents' && (
            <div>
              <div className="page-header">
                <h2>
                  <i className="fas fa-folder"></i> My Documents
                </h2>
                <p>Access and manage your employment documents</p>
              </div>

              <div className="documents-grid">
                {dummyDocuments.map((document, index) => (
                  <div 
                    key={document.id}
                    className={`document-card ${hoverStates.documentCards[index] ? 'hover' : ''}`}
                    onMouseEnter={() => handleMouseEnter('documentCards', index)}
                    onMouseLeave={() => handleMouseLeave('documentCards', index)}
                  >
                    <div className="document-header">
                      <div 
                        className={`document-icon ${hoverStates.documentCards[index] ? 'hover' : ''}`}
                        style={{ backgroundColor: getDocumentIconColor(document.type) }}
                      >
                        <i className={getDocumentIcon(document.type)}></i>
                      </div>
                      <div className="document-title">
                        <h3>{document.title}</h3>
                        <p>
                          {document.description}
                        </p>
                      </div>
                    </div>
                    
                    <div 
                      className="document-badge"
                      style={{
                        backgroundColor: getStatusColor(document.status) + '20',
                        color: getStatusColor(document.status)
                      }}
                    >
                      {document.status.toUpperCase()}
                    </div>

                    <div className="document-content">
                      <div className="document-row">
                        <span className="label">Document No.</span>
                        <span className="value monospace">{document.documentNumber}</span>
                      </div>
                      <div className="document-row">
                        <span className="label">Issue Date</span>
                        <span className="value">{new Date(document.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="document-row">
                        <span className="label">Expiry Date</span>
                        <span className="value">{document.expiryDate}</span>
                      </div>
                      <div className="document-row">
                        <span className="label">File Size</span>
                        <span className="value">{document.fileSize}</span>
                      </div>
                      <div className="document-row">
                        <span className="label">Format</span>
                        <span className="value">{document.format}</span>
                      </div>
                    </div>

                    <div className="document-actions">
                      <button 
                        className={`btn-preview ${hoverStates.btnPreview[index] ? 'hover' : ''}`}
                        onMouseEnter={() => handleMouseEnter('btnPreview', index)}
                        onMouseLeave={() => handleMouseLeave('btnPreview', index)}
                        onClick={() => alert(`Previewing ${document.title}`)}
                      >
                        <i className="fas fa-eye"></i> Preview
                      </button>
                      <button 
                        className={`btn-download-doc ${hoverStates.btnDownloadDoc[index] ? 'hover' : ''}`}
                        onMouseEnter={() => handleMouseEnter('btnDownloadDoc', index)}
                        onMouseLeave={() => handleMouseLeave('btnDownloadDoc', index)}
                        onClick={() => handleDownload(document, 'document')}
                        disabled={loading}
                      >
                        {loading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-download"></i>
                        )} Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Payslip View Modal */}
      {selectedPayslip && (
        <div className="modal-overlay">
          <div className="payslip-modal">
            <div className="modal-header">
              <h3>
                <i className="fas fa-file-invoice-dollar"></i> Payslip Details
              </h3>
              <button 
                className={`close-btn ${hoverStates.closeBtn ? 'hover' : ''}`}
                onClick={handleClosePayslip}
                onMouseEnter={() => handleMouseEnter('closeBtn')}
                onMouseLeave={() => handleMouseLeave('closeBtn')}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="payslip-header">
                <div className="company-info">
                  <div className="company-logo">
                    <i className="fas fa-building"></i>
                  </div>
                  <div>
                    <h2>{employeeData.company || 'Company Name'}</h2>
                    <p>Employee Payslip</p>
                  </div>
                </div>
                <div className="payslip-date">
                  <h3>{selectedPayslip.month} {selectedPayslip.year}</h3>
                  <p>Payment Date: {new Date(selectedPayslip.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="info-grid">
                <div>
                  <h4>Employee Information</h4>
                  <p><strong>Name:</strong> {employeeData.name}</p>
                  <p><strong>ID:</strong> {employeeData.id}</p>
                  <p><strong>Department:</strong> {employeeData.department}</p>
                </div>
                <div>
                  <h4>Payment Details</h4>
                  <p><strong>Status:</strong> <span className="status-text">{selectedPayslip.status}</span></p>
                  <p><strong>Account Period:</strong> {selectedPayslip.month} 1 - {selectedPayslip.month} 31</p>
                </div>
              </div>

              <div className="earnings-deductions-grid">
                <div>
                  <h4>
                    <i className="fas fa-plus-circle"></i> Earnings
                  </h4>
                  {[
                    { label: 'Basic Salary', value: selectedPayslip.details.basic },
                    { label: 'House Rent Allowance (HRA)', value: selectedPayslip.details.hra },
                    { label: 'Conveyance Allowance', value: selectedPayslip.details.conveyance },
                    { label: 'Medical Allowance', value: selectedPayslip.details.medical },
                    { label: 'Bonus', value: selectedPayslip.details.bonus }
                  ].map((item, index) => (
                    <div key={index} className="earnings-row">
                      <div>
                        <span>{item.label}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="total-earnings">
                    <div>
                      <span>Total Earnings</span>
                      <span>{formatCurrency(
                        selectedPayslip.details.basic +
                        selectedPayslip.details.hra +
                        selectedPayslip.details.conveyance +
                        selectedPayslip.details.medical +
                        selectedPayslip.details.bonus
                      )}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4>
                    <i className="fas fa-minus-circle"></i> Deductions
                  </h4>
                  {[
                    { label: 'Tax Deduction', value: selectedPayslip.details.tax },
                    { label: 'Provident Fund', value: selectedPayslip.details.pf }
                  ].map((item, index) => (
                    <div key={index} className="deductions-row">
                      <div>
                        <span>{item.label}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="total-deductions">
                    <div>
                      <span>Total Deductions</span>
                      <span>{formatCurrency(selectedPayslip.details.tax + selectedPayslip.details.pf)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="net-salary-section">
                <div>
                  <h3>Net Salary</h3>
                  <p className="net-amount">
                    {formatCurrency(selectedPayslip.amount)}
                  </p>
                </div>
                <div>
                  <p><strong>Payment Method:</strong> Direct Deposit</p>
                  <p><strong>Payment Status:</strong> <span className="status-text">Completed</span></p>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className={`btn-print ${hoverStates.btnPrint ? 'hover' : ''}`}
                  onClick={() => window.print()}
                  onMouseEnter={() => handleMouseEnter('btnPrint')}
                  onMouseLeave={() => handleMouseLeave('btnPrint')}
                >
                  <i className="fas fa-print"></i> Print
                </button>
                <button 
                  className={`btn-download-modal ${hoverStates.btnDownloadModal ? 'hover' : ''}`}
                  onClick={() => handleDownload(selectedPayslip)}
                  onMouseEnter={() => handleMouseEnter('btnDownloadModal')}
                  onMouseLeave={() => handleMouseLeave('btnDownloadModal')}
                >
                  <i className="fas fa-download"></i> Download as Text
                </button>
                <button 
                  className={`btn-close ${hoverStates.btnClose ? 'hover' : ''}`}
                  onClick={handleClosePayslip}
                  onMouseEnter={() => handleMouseEnter('btnClose')}
                  onMouseLeave={() => handleMouseLeave('btnClose')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar/Attendance Modal */}
      {showCalendar && (
        <div className="modal-overlay">
          <div className="calendar-modal">
            <div className="modal-header">
              <h3>
                <i className="fas fa-calendar-alt"></i> Attendance Calendar
              </h3>
              <button 
                className={`close-btn ${hoverStates.closeBtn ? 'hover' : ''}`}
                onClick={() => setShowCalendar(false)}
                onMouseEnter={() => handleMouseEnter('closeBtn')}
                onMouseLeave={() => handleMouseLeave('closeBtn')}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="calendar-container">
              <div className="calendar-header">
                <div className="month-selector">
                  <select 
                    value={selectedAttendanceMonth}
                    onChange={(e) => setSelectedAttendanceMonth(e.target.value)}
                    className="month-select"
                  >
                    {attendanceMonths.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="legend">
                  {[
                    { label: 'Present', color: '#4CAF50' },
                    { label: 'Absent', color: '#f44336' },
                    { label: 'Week Off', color: '#2196F3' },
                    { label: 'Leave', color: '#FF9800' },
                    { label: 'Late', color: '#FFC107' }
                  ].map(item => (
                    <div key={item.label} className="legend-item">
                      <div className="color-box" style={{ backgroundColor: item.color }}></div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}
                {renderCalendar()}
              </div>

              {selectedDate && (
                <div className="attendance-detail">
                  <h4>
                    <i className="fas fa-info-circle"></i> Attendance Details
                  </h4>
                  <div>
                    <p><strong>Date:</strong> {new Date(selectedDate.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Status:</strong> <span className={`status-${selectedDate.status}`}>
                      {selectedDate.status.charAt(0).toUpperCase() + selectedDate.status.slice(1)}
                    </span></p>
                    <p><strong>Check In:</strong> {selectedDate.checkIn}</p>
                    <p><strong>Check Out:</strong> {selectedDate.checkOut}</p>
                  </div>
                </div>
              )}

              <div className="attendance-stats">
                <h4>
                  <i className="fas fa-chart-pie"></i> Monthly Attendance Summary - {attendanceData[selectedAttendanceMonth]?.monthName}
                </h4>
                
                <div className="stats-container">
                  <div className="pie-chart-container">
                    <div 
                      className="pie-chart"
                      style={{ background: getPieChartGradient() }}
                    >
                      <div className="pie-chart-label">
                        <p className="pie-chart-total">
                          {attendanceData[selectedAttendanceMonth]?.totalDays || 0}
                        </p>
                        <p className="pie-chart-text">Total Days</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="stats-details">
                    {calculateAttendanceStats()?.map((stat, index) => {
                      const percentage = attendanceData[selectedAttendanceMonth] ? 
                        (stat.value / attendanceData[selectedAttendanceMonth].totalDays * 100).toFixed(1) : '0.0';
                      
                      return (
                        <div 
                          key={stat.label}
                          className={`stat-detail ${hoverStates.statDetailItems[index] ? 'hover' : ''}`}
                          onMouseEnter={() => handleMouseEnter('statDetailItems', index)}
                          onMouseLeave={() => handleMouseLeave('statDetailItems', index)}
                        >
                          <div className="stat-color" style={{ backgroundColor: stat.color }}></div>
                          <div className="stat-label">{stat.label}</div>
                          <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                          <div className="percentage-badge">{percentage}%</div>
                        </div>
                      );
                    })}
                    
                    {attendanceData[selectedAttendanceMonth] && (
                      <div className="stat-total">
                        <div>
                          <span>Total Days:</span>
                          <span>{attendanceData[selectedAttendanceMonth].totalDays}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className={`btn-close ${hoverStates.btnClose ? 'hover' : ''}`}
                onClick={() => setShowCalendar(false)}
                onMouseEnter={() => handleMouseEnter('btnClose')}
                onMouseLeave={() => handleMouseLeave('btnClose')}
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <i className="fas fa-shield-alt"></i>
            <span>Secure Employee Portal v1.0</span>
          </div>
          <div className="footer-right">
            <span>{employeeData.company || 'Your Company'} © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Default props
EmployeeDashboard.defaultProps = {
  employeeData: {
    name: 'John Doe',
    id: 'EMP-001',
    position: 'Software Engineer',
    department: 'Engineering',
    joinDate: '2020-03-15',
    salary: 90000,
    email: 'john.doe@company.com',
    contact: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    avatarColor: '#667eea'
  },
  currentView: 'overview',
  onViewChange: () => {},
  onLogout: () => console.log('Logout clicked')
};

export default EmployeeDashboard;