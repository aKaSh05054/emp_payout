import React, { useState, useEffect } from 'react';

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
          style={{
            ...styles.calendarDay,
            ...styles.emptyDay
          }}
        />
      );
    }
    
    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedAttendanceMonth}-${day.toString().padStart(2, '0')}`;
      const attendance = currentData.dailyData[dateStr];
      
      const dayStyle = {
        ...styles.calendarDay,
        ...(attendance ? styles[attendance.status] : {}),
        ...(showAnimation && {
          animation: 'fadeIn 0.5s ease-out forwards',
          animationDelay: `${day * 0.02}s`,
          opacity: 0
        })
      };
      
      days.push(
        <div 
          key={day} 
          style={dayStyle}
          onMouseEnter={() => handleDateHover(day)}
          onMouseLeave={() => setSelectedDate(null)}
          title={attendance ? `Status: ${attendance.status}\nCheck-in: ${attendance.checkIn}\nCheck-out: ${attendance.checkOut}` : 'No data'}
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

  // Enhanced Styles object with animations
  const styles = {
    // Main container styles
    dashboardContainer: {
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    },
    
    // Header styles
    dashboardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      borderBottom: '1px solid #eaeaea',
      animation: 'slideDown 0.5s ease-out'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    companyInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoCircle: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#667eea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.5rem',
      animation: 'pulse 2s infinite'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    calendarBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f0f2f5',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#555',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    calendarBtnHover: {
      backgroundColor: '#667eea',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    calendarIcon: {
      animation: 'calendarPulse 2s infinite'
    },
    logoutBtn: {
      padding: '0.5rem 1.5rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      animation: 'fadeIn 0.8s ease-out'
    },
    
    // Content layout
    dashboardContent: {
      display: 'flex',
      minHeight: 'calc(100vh - 80px)'
    },
    
    // Sidebar styles
    sidebar: {
      width: '280px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #eaeaea',
      padding: '1.5rem',
      animation: 'slideInLeft 0.5s ease-out'
    },
    profileCard: {
      textAlign: 'center',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #eaeaea',
      marginBottom: '1.5rem',
      animation: 'fadeIn 0.6s ease-out'
    },
    profileAvatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      animation: 'bounceIn 0.8s ease-out'
    },
    employeeRole: {
      color: '#667eea',
      fontWeight: '600',
      marginBottom: '0.25rem',
      animation: 'fadeIn 0.8s ease-out 0.2s both'
    },
    employeeDept: {
      color: '#666',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      animation: 'fadeIn 0.8s ease-out 0.3s both'
    },
    employeeIdDisplay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      backgroundColor: '#f8f9fa',
      padding: '0.5rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      color: '#555',
      animation: 'fadeIn 0.8s ease-out 0.4s both'
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    navBtn: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backgroundColor: 'transparent',
      color: '#555',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      transform: 'translateX(0)',
      animation: 'slideInLeft 0.5s ease-out'
    },
    navBtnHover: {
      transform: 'translateX(10px)',
      backgroundColor: '#667eea',
      color: 'white',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    navBtnActive: {
      backgroundColor: '#667eea',
      color: 'white',
      transform: 'translateX(10px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    statsSummary: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '1rem',
      animation: 'fadeIn 0.8s ease-out 0.5s both'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      transition: 'transform 0.3s ease'
    },
    statItemHover: {
      transform: 'translateY(-2px)'
    },
    statusActive: {
      color: '#4CAF50',
      fontWeight: '600'
    },
    
    // Main content styles
    mainContent: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto',
      animation: 'fadeIn 0.5s ease-out'
    },
    pageHeader: {
      marginBottom: '2rem',
      animation: 'slideUp 0.6s ease-out'
    },
    
    // Overview view styles - UPDATED SECTION
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      animation: 'fadeInUp 0.6s ease-out'
    },
    statCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    statIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      transition: 'transform 0.3s ease'
    },
    statIconHover: {
      transform: 'scale(1.1) rotate(5deg)'
    },
    primaryIcon: {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea'
    },
    successIcon: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      color: '#4CAF50'
    },
    warningIcon: {
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      color: '#FFC107'
    },
    infoIcon: {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      color: '#2196F3'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0.25rem 0',
      transition: 'transform 0.3s ease'
    },
    statDesc: {
      color: '#666',
      fontSize: '0.9rem'
    },
    recentSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      animation: 'fadeIn 0.8s ease-out'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    viewAllBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f0f2f5',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    viewAllBtnHover: {
      backgroundColor: '#667eea',
      color: 'white',
      transform: 'translateX(5px)'
    },
    payslipGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1rem'
    },
    payslipCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid #eaeaea',
      transition: 'all 0.3s ease',
      animation: 'slideUp 0.5s ease-out'
    },
    payslipCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    payslipHeader: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    monthBadge: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    yearTag: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem'
    },
    payslipBody: {
      padding: '1rem'
    },
    amount: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0.5rem 0',
      color: '#4CAF50'
    },
    payslipFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem'
    },
    status: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    paidStatus: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    downloadBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      border: '1px solid #667eea',
      borderRadius: '6px',
      cursor: 'pointer',
      color: '#667eea',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    downloadBtnHover: {
      backgroundColor: '#667eea',
      color: 'white',
      transform: 'scale(1.05)'
    },
    
    // Payslips view styles
    controlsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      animation: 'slideUp 0.5s ease-out'
    },
    yearFilter: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    select: {
      padding: '0.5rem 1rem',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease'
    },
    selectFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
    },
    summaryBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backgroundColor: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    },
    summaryBoxHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    payslipsTableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      marginBottom: '1.5rem',
      animation: 'fadeInUp 0.6s ease-out'
    },
    payslipsTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      textAlign: 'left',
      padding: '1rem',
      fontWeight: '600',
      color: '#555',
      borderBottom: '1px solid #eaeaea'
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #eaeaea',
      transition: 'background-color 0.3s ease'
    },
    tableRowHover: {
      backgroundColor: '#f8f9fa'
    },
    monthCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    monthIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#f0f2f5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#667eea',
      transition: 'all 0.3s ease'
    },
    monthIconHover: {
      backgroundColor: '#667eea',
      color: 'white',
      transform: 'scale(1.1) rotate(10deg)'
    },
    amountCell: {
      fontWeight: 'bold',
      color: '#667eea'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: 'transform 0.3s ease'
    },
    statusBadgeHover: {
      transform: 'scale(1.05)'
    },
    paidBadge: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      color: '#4CAF50'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    btnView: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f0f2f5',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnViewHover: {
      backgroundColor: '#2196F3',
      color: 'white',
      transform: 'scale(1.05)'
    },
    btnDownload: {
      padding: '0.5rem 1rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnDownloadHover: {
      backgroundColor: '#4CAF50',
      transform: 'scale(1.05)'
    },
    payslipSummary: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      animation: 'fadeInUp 0.8s ease-out'
    },
    summaryCard: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    summaryStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1.5rem',
      marginTop: '1rem'
    },
    summaryStat: {
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    summaryStatHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    
    // Profile view styles
    profileCardLarge: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      animation: 'zoomIn 0.6s ease-out'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '2rem'
    },
    profileAvatarLarge: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      animation: 'bounceIn 1s ease-out',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    profileTitle: {
      flex: 1
    },
    profilePosition: {
      color: '#667eea',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    profileTags: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    tag: {
      padding: '0.25rem 0.75rem',
      backgroundColor: '#f0f2f5',
      borderRadius: '20px',
      fontSize: '0.85rem',
      transition: 'all 0.3s ease'
    },
    tagHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    statusTag: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      color: '#4CAF50'
    },
    editProfileBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    editProfileBtnHover: {
      backgroundColor: '#4CAF50',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
    },
    profileDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    detailCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      animation: 'fadeInUp 0.5s ease-out'
    },
    detailCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    detailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      color: '#667eea'
    },
    detailContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #eaeaea',
      transition: 'all 0.3s ease'
    },
    infoRowHover: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      paddingLeft: '10px',
      borderLeft: '3px solid #667eea'
    },
    label: {
      color: '#666',
      fontSize: '0.9rem'
    },
    value: {
      fontWeight: '500'
    },
    salary: {
      color: '#4CAF50',
      fontWeight: 'bold'
    },
    
    // Documents view styles
    documentsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      animation: 'fadeIn 0.6s ease-out'
    },
    documentCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      animation: 'slideUp 0.5s ease-out'
    },
    documentCardHover: {
      transform: 'translateY(-8px) rotateX(5deg)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    documentHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem'
    },
    documentIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    documentIconHover: {
      transform: 'scale(1.1) rotate(10deg)'
    },
    documentTitle: {
      flex: 1
    },
    documentBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    documentContent: {
      marginBottom: '1.5rem'
    },
    documentRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #f0f0f0'
    },
    documentActions: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'flex-end'
    },
    btnPreview: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f0f2f5',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnPreviewHover: {
      backgroundColor: '#2196F3',
      color: 'white',
      transform: 'scale(1.05)'
    },
    btnDownloadDoc: {
      padding: '0.5rem 1rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnDownloadDocHover: {
      backgroundColor: '#4CAF50',
      transform: 'scale(1.05)'
    },
    
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      animation: 'fadeIn 0.3s ease-out'
    },
    payslipModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflowY: 'auto',
      animation: 'zoomIn 0.4s ease-out'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      borderBottom: '1px solid #eaeaea'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '1.25rem',
      cursor: 'pointer',
      color: '#666',
      transition: 'all 0.3s ease'
    },
    closeBtnHover: {
      color: '#f44336',
      transform: 'rotate(90deg)'
    },
    
    // Calendar styles
    calendarModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '90vh',
      overflowY: 'auto',
      animation: 'slideUp 0.5s ease-out'
    },
    calendarContainer: {
      padding: '1.5rem'
    },
    calendarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    monthSelector: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    monthSelect: {
      padding: '0.5rem 1rem',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: 'white',
      minWidth: '180px'
    },
    legend: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem'
    },
    colorBox: {
      width: '15px',
      height: '15px',
      borderRadius: '3px'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    calendarWeekday: {
      textAlign: 'center',
      fontWeight: '600',
      color: '#555',
      padding: '0.5rem',
      animation: 'fadeIn 0.5s ease-out'
    },
    calendarDay: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    calendarDayHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    emptyDay: {
      backgroundColor: 'transparent',
      cursor: 'default'
    },
    present: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    absent: {
      backgroundColor: '#f44336',
      color: 'white'
    },
    weekOff: {
      backgroundColor: '#2196F3',
      color: 'white'
    },
    leave: {
      backgroundColor: '#FF9800',
      color: 'white'
    },
    late: {
      backgroundColor: '#FFC107',
      color: '#333'
    },
    attendanceDetail: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      padding: '1rem',
      marginBottom: '1.5rem',
      animation: 'fadeIn 0.5s ease-out'
    },
    attendanceStats: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      border: '1px solid #eaeaea',
      animation: 'fadeInUp 0.6s ease-out'
    },
    statsContainer: {
      display: 'flex',
      gap: '2rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    },
    pieChartContainer: {
      flex: 1,
      minWidth: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    pieChart: {
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      position: 'relative',
      margin: '0 auto',
      background: 'conic-gradient(#4CAF50 0% 62.5%, #2196F3 62.5% 87.5%, #f44336 87.5% 93.75%, #FF9800 93.75% 96.875%, #FFC107 96.875% 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      animation: 'fadeIn 1s ease-out'
    },
    pieChartLabel: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 2
    },
    pieChartTotal: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    pieChartText: {
      fontSize: '0.9rem',
      color: '#666',
      margin: '0.25rem 0 0 0'
    },
    pieChartSegment: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      clipPath: 'inset(0 0 0 50%)',
      transformOrigin: 'center'
    },
    statsDetails: {
      flex: 1,
      minWidth: '250px'
    },
    statDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #eaeaea',
      transition: 'all 0.3s ease'
    },
    statDetailHover: {
      transform: 'translateX(10px)',
      backgroundColor: '#f8f9fa',
      paddingLeft: '10px',
      borderRadius: '6px'
    },
    statColor: {
      width: '15px',
      height: '15px',
      borderRadius: '3px'
    },
    statLabel: {
      flex: 1,
      fontSize: '0.9rem'
    },
    statValue: {
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    statTotal: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '2px solid #eaeaea',
      fontWeight: '600'
    },
    percentageBadge: {
      backgroundColor: '#f0f2f5',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#555'
    },
    
    // Modal footer
    modalFooter: {
      padding: '1.5rem',
      borderTop: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem'
    },
    btnClose: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#f0f2f5',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    btnCloseHover: {
      backgroundColor: '#f44336',
      color: 'white',
      transform: 'translateY(-2px)'
    },
    btnPrint: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnPrintHover: {
      backgroundColor: '#2196F3',
      transform: 'translateY(-2px)'
    },
    btnDownloadModal: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    btnDownloadModalHover: {
      backgroundColor: '#FF9800',
      transform: 'translateY(-2px)'
    },
    
    // Footer styles
    dashboardFooter: {
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #eaeaea',
      marginTop: 'auto',
      animation: 'fadeIn 0.8s ease-out'
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.9rem'
    },
    footerRight: {
      color: '#666',
      fontSize: '0.9rem'
    }
  };

  // State for hover effects
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
    calendarDays: Array(31).fill(false)
  });

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

  // Animation styles as inline style tag
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideDown {
      from { 
        opacity: 0; 
        transform: translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0; 
        transform: translateX(-20px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes zoomIn {
      from { 
        opacity: 0; 
        transform: scale(0.9); 
      }
      to { 
        opacity: 1; 
        transform: scale(1); 
      }
    }
    
    @keyframes bounceIn {
      0% { 
        opacity: 0; 
        transform: scale(0.3); 
      }
      50% { 
        opacity: 1; 
        transform: scale(1.05); 
      }
      70% { 
        transform: scale(0.9); 
      }
      100% { 
        transform: scale(1); 
      }
    }
    
    @keyframes pulse {
      0% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); 
      }
      70% { 
        transform: scale(1.05); 
        box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); 
      }
      100% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); 
      }
    }
    
    @keyframes calendarPulse {
      0% { 
        transform: scale(1); 
      }
      50% { 
        transform: scale(1.2) rotate(10deg); 
      }
      100% { 
        transform: scale(1); 
      }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `;

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

  // Get percentage text for pie chart
  const getPieChartPercentageText = () => {
    const percentages = calculateAttendancePercentages();
    if (!percentages) return 'No data';
    
    return percentages.map(stat => 
      `${stat.label}: ${stat.percentage}%`
    ).join('\n');
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.dashboardContainer}>
        {/* Header */}
        <header style={styles.dashboardHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.companyInfo}>
              <div style={styles.logoCircle} className="animate-float">
                <i className="fas fa-briefcase"></i>
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>Employee Portal</h1>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Access your professional information securely</p>
              </div>
            </div>
          </div>
          <div style={styles.headerRight}>
            <button 
              style={{
                ...styles.calendarBtn,
                ...(hoverStates.calendarBtn && styles.calendarBtnHover)
              }}
              onClick={() => setShowCalendar(true)}
              onMouseEnter={() => handleMouseEnter('calendarBtn')}
              onMouseLeave={() => handleMouseLeave('calendarBtn')}
              title="View Attendance Calendar"
            >
              <i 
                className="fas fa-calendar-alt" 
                style={hoverStates.calendarBtn ? styles.calendarIcon : {}}
              ></i>
              <span>Calendar</span>
            </button>
            <button 
              onClick={onLogout} 
              style={styles.logoutBtn}
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

        <div style={styles.dashboardContent}>
          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <div style={styles.profileCard}>
              <div 
                style={{...styles.profileAvatar, background: employeeData.avatarColor || '#667eea'}}
              >
                {employeeData.name.charAt(0)}
              </div>
              <h3 style={{ margin: '0.5rem 0', color: '#333' }}>{employeeData.name}</h3>
              <p style={styles.employeeRole}>{employeeData.position}</p>
              <p style={styles.employeeDept}>{employeeData.department}</p>
              <div style={styles.employeeIdDisplay}>
                <i className="fas fa-id-badge"></i>
                <span>{employeeData.id}</span>
              </div>
            </div>

            <nav style={styles.sidebarNav}>
              <button 
                style={{
                  ...styles.navBtn,
                  ...(currentView === 'overview' && styles.navBtnActive),
                  ...(hoverStates.navOverview && styles.navBtnHover)
                }}
                onClick={() => onViewChange('overview')}
                onMouseEnter={() => handleMouseEnter('navOverview')}
                onMouseLeave={() => handleMouseLeave('navOverview')}
              >
                <i className="fas fa-tachometer-alt"></i> Overview
              </button>
              <button 
                style={{
                  ...styles.navBtn,
                  ...(currentView === 'payslips' && styles.navBtnActive),
                  ...(hoverStates.navPayslips && styles.navBtnHover)
                }}
                onClick={() => onViewChange('payslips')}
                onMouseEnter={() => handleMouseEnter('navPayslips')}
                onMouseLeave={() => handleMouseLeave('navPayslips')}
              >
                <i className="fas fa-file-invoice-dollar"></i> Payslips
              </button>
              <button 
                style={{
                  ...styles.navBtn,
                  ...(currentView === 'profile' && styles.navBtnActive),
                  ...(hoverStates.navProfile && styles.navBtnHover)
                }}
                onClick={() => onViewChange('profile')}
                onMouseEnter={() => handleMouseEnter('navProfile')}
                onMouseLeave={() => handleMouseLeave('navProfile')}
              >
                <i className="fas fa-user-circle"></i> Profile
              </button>
              <button 
                style={{
                  ...styles.navBtn,
                  ...(currentView === 'documents' && styles.navBtnActive),
                  ...(hoverStates.navDocuments && styles.navBtnHover)
                }}
                onClick={() => onViewChange('documents')}
                onMouseEnter={() => handleMouseEnter('navDocuments')}
                onMouseLeave={() => handleMouseLeave('navDocuments')}
              >
                <i className="fas fa-folder"></i> Documents
              </button>
            </nav>

            <div style={styles.statsSummary}>
              <div 
                style={{
                  ...styles.statItem,
                  ...(hoverStates.statItem && styles.statItemHover)
                }}
                onMouseEnter={() => handleMouseEnter('statItem')}
                onMouseLeave={() => handleMouseLeave('statItem')}
              >
                <i className="fas fa-calendar-alt" style={{ color: '#667eea' }}></i>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Service</h4>
                  <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>{calculateYearsOfService()}</p>
                </div>
              </div>
              <div 
                style={{
                  ...styles.statItem,
                  ...(hoverStates.statItem && styles.statItemHover)
                }}
                onMouseEnter={() => handleMouseEnter('statItem')}
                onMouseLeave={() => handleMouseLeave('statItem')}
              >
                <i className="fas fa-money-check-alt" style={{ color: '#4CAF50' }}></i>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Monthly</h4>
                  <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>{formatCurrency(employeeData.salary / 12)}</p>
                </div>
              </div>
              <div 
                style={{
                  ...styles.statItem,
                  ...(hoverStates.statItem && styles.statItemHover)
                }}
                onMouseEnter={() => handleMouseEnter('statItem')}
                onMouseLeave={() => handleMouseLeave('statItem')}
              >
                <i className="fas fa-star" style={{ color: '#FFC107' }}></i>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Status</h4>
                  <p style={{ margin: 0, ...styles.statusActive }}>Active</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main style={styles.mainContent}>
            {currentView === 'overview' && (
              <div>
                <div style={styles.pageHeader}>
                  <h2 style={{ margin: '0 0 0.5rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-tachometer-alt"></i> Dashboard Overview
                  </h2>
                  <p style={{ margin: 0, color: '#666' }}>Welcome back, {employeeData.name.split(' ')[0]}! Here's your summary.</p>
                </div>
                
                {/* UPDATED STATS GRID WITH EMOJI ICONS */}
                <div style={styles.statsGrid}>
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
                      style={{
                        ...styles.statCard,
                        ...(hoverStates.statCards[index] && styles.statCardHover)
                      }}
                      onMouseEnter={() => handleMouseEnter('statCards', index)}
                      onMouseLeave={() => handleMouseLeave('statCards', index)}
                    >
                      <div 
                        style={{
                          ...styles.statIcon,
                          ...styles[`${stat.type}Icon`],
                          ...(hoverStates.statCards[index] && styles.statIconHover)
                        }}
                      >
                        <span style={{ fontSize: '1.8rem' }}>{stat.icon}</span>
                      </div>
                      <div style={styles.statContent}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#555' }}>{stat.title}</h3>
                        <p style={styles.statValue}>{stat.value}</p>
                        <p style={styles.statDesc}>{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.recentSection}>
                  <div style={styles.sectionHeader}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-history"></i> Recent Payslips
                    </h3>
                    <button 
                      style={{
                        ...styles.viewAllBtn,
                        ...(hoverStates.viewAllBtn && styles.viewAllBtnHover)
                      }}
                      onClick={() => onViewChange('payslips')}
                      onMouseEnter={() => handleMouseEnter('viewAllBtn')}
                      onMouseLeave={() => handleMouseLeave('viewAllBtn')}
                    >
                      View All <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                  <div style={styles.payslipGrid}>
                    {dummyPayslips.slice(0, 3).map((payslip, index) => (
                      <div 
                        key={payslip.id} 
                        style={{
                          ...styles.payslipCard,
                          ...(hoverStates.payslipCards[index] && styles.payslipCardHover)
                        }}
                        onMouseEnter={() => handleMouseEnter('payslipCards', index)}
                        onMouseLeave={() => handleMouseLeave('payslipCards', index)}
                      >
                        <div style={styles.payslipHeader}>
                          <div style={styles.monthBadge}>
                            {payslip.month.substring(0, 3)}
                          </div>
                          <span style={styles.yearTag}>{payslip.year}</span>
                        </div>
                        <div style={styles.payslipBody}>
                          <h4 style={{ margin: '0 0 0.5rem', color: '#333' }}>{payslip.month} {payslip.year}</h4>
                          <p style={styles.amount}>{formatCurrency(payslip.amount)}</p>
                          <div style={styles.payslipFooter}>
                            <span style={{...styles.status, ...styles.paidStatus}}>
                              {payslip.status}
                            </span>
                            <button 
                              style={{
                                ...styles.downloadBtn,
                                ...(hoverStates.btnView[index] && styles.downloadBtnHover)
                              }}
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
                <div style={styles.pageHeader}>
                  <h2 style={{ margin: '0 0 0.5rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-file-invoice-dollar"></i> Payslip History
                  </h2>
                  <p style={{ margin: 0, color: '#666' }}>View and download your monthly payslips</p>
                </div>

                <div style={styles.controlsBar}>
                  <div style={styles.yearFilter}>
                    <label htmlFor="yearSelect" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-filter"></i> Filter by Year:
                    </label>
                    <select 
                      id="yearSelect"
                      style={styles.select}
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
                    style={{
                      ...styles.summaryBox,
                      ...(hoverStates.summaryBox && styles.summaryBoxHover)
                    }}
                    onMouseEnter={() => handleMouseEnter('summaryBox')}
                    onMouseLeave={() => handleMouseLeave('summaryBox')}
                  >
                    <i className="fas fa-chart-pie" style={{ color: '#667eea' }}></i>
                    <div>
                      <small style={{ color: '#666', fontSize: '0.85rem' }}>Filtered Total</small>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                        {formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={styles.payslipsTableContainer}>
                  <table style={styles.payslipsTable}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Month & Year</th>
                        <th style={styles.tableHeader}>Amount</th>
                        <th style={styles.tableHeader}>Status</th>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayslips.map((payslip, index) => (
                        <tr 
                          key={payslip.id}
                          style={{
                            ...(hoverStates.tableRows[index] && styles.tableRowHover)
                          }}
                          onMouseEnter={() => handleMouseEnter('tableRows', index)}
                          onMouseLeave={() => handleMouseLeave('tableRows', index)}
                        >
                          <td style={styles.tableCell}>
                            <div style={styles.monthCell}>
                              <div 
                                style={{
                                  ...styles.monthIcon,
                                  ...(hoverStates.tableRows[index] && styles.monthIconHover)
                                }}
                              >
                                {payslip.month.charAt(0)}
                              </div>
                              <div>
                                <strong>{payslip.month} {payslip.year}</strong>
                                <br />
                                <small style={{ color: '#666' }}>Monthly Salary</small>
                              </div>
                            </div>
                          </td>
                          <td style={{...styles.tableCell, ...styles.amountCell}}>
                            <strong>{formatCurrency(payslip.amount)}</strong>
                          </td>
                          <td style={styles.tableCell}>
                            <span 
                              style={{
                                ...styles.statusBadge,
                                ...styles.paidBadge,
                                ...(hoverStates.tableRows[index] && styles.statusBadgeHover)
                              }}
                            >
                              <i className="fas fa-check-circle"></i> {payslip.status}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            {new Date(payslip.date).toLocaleDateString()}
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.actionButtons}>
                              <button 
                                style={{
                                  ...styles.btnView,
                                  ...(hoverStates.btnView[index] && styles.btnViewHover)
                                }}
                                onClick={() => handleViewPayslip(payslip)}
                                onMouseEnter={() => handleMouseEnter('btnView', index)}
                                onMouseLeave={() => handleMouseLeave('btnView', index)}
                              >
                                <i className="fas fa-eye"></i> View
                              </button>
                              <button 
                                style={{
                                  ...styles.btnDownload,
                                  ...(hoverStates.btnDownload[index] && styles.btnDownloadHover)
                                }}
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

                <div style={styles.payslipSummary}>
                  <div style={styles.summaryCard}>
                    <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-chart-line"></i> Earnings Summary
                    </h4>
                    <div style={styles.summaryStats}>
                      {[
                        { label: `This Year (${selectedYear || 'All'})`, value: formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0)) },
                        { label: 'Average Monthly', value: formatCurrency(filteredPayslips.reduce((sum, p) => sum + p.amount, 0) / (filteredPayslips.length || 1)) },
                        { label: 'Total Payslips', value: filteredPayslips.length }
                      ].map((stat, index) => (
                        <div 
                          key={index}
                          style={{
                            ...styles.summaryStat,
                            ...(hoverStates.summaryStat && styles.summaryStatHover)
                          }}
                          onMouseEnter={() => handleMouseEnter('summaryStat')}
                          onMouseLeave={() => handleMouseLeave('summaryStat')}
                        >
                          <small style={{ color: '#666' }}>{stat.label}</small>
                          <p style={{ margin: '0.5rem 0 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'profile' && (
              <div>
                <div style={styles.pageHeader}>
                  <h2 style={{ margin: '0 0 0.5rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-user-circle"></i> My Profile
                  </h2>
                  <p style={{ margin: 0, color: '#666' }}>Manage your personal information</p>
                </div>

                <div style={styles.profileContent}>
                  <div style={styles.profileCardLarge}>
                    <div style={styles.profileHeader}>
                      <div 
                        style={{...styles.profileAvatarLarge, background: employeeData.avatarColor || '#667eea'}}
                      >
                        {employeeData.name.charAt(0)}
                      </div>
                      <div style={styles.profileTitle}>
                        <h3 style={{ margin: 0, fontSize: '1.75rem', color: '#333' }}>{employeeData.name}</h3>
                        <p style={styles.profilePosition}>{employeeData.position}</p>
                        <div style={styles.profileTags}>
                          <span 
                            style={{
                              ...styles.tag,
                              ...(hoverStates.tag && styles.tagHover)
                            }}
                            onMouseEnter={() => handleMouseEnter('tag')}
                            onMouseLeave={() => handleMouseLeave('tag')}
                          >
                            {employeeData.department}
                          </span>
                          <span 
                            style={{
                              ...styles.tag,
                              ...styles.statusTag,
                              ...(hoverStates.tag && styles.tagHover)
                            }}
                            onMouseEnter={() => handleMouseEnter('tag')}
                            onMouseLeave={() => handleMouseLeave('tag')}
                          >
                            Active
                          </span>
                          <span 
                            style={{
                              ...styles.tag,
                              ...(hoverStates.tag && styles.tagHover)
                            }}
                            onMouseEnter={() => handleMouseEnter('tag')}
                            onMouseLeave={() => handleMouseLeave('tag')}
                          >
                            {employeeData.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.profileDetailsGrid}>
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
                          style={{
                            ...styles.detailCard,
                            ...(hoverStates.detailCards[index] && styles.detailCardHover)
                          }}
                          onMouseEnter={() => handleMouseEnter('detailCards', index)}
                          onMouseLeave={() => handleMouseLeave('detailCards', index)}
                        >
                          <div style={styles.detailHeader}>
                            <i className={`fas fa-${section.icon}`}></i>
                            <h4 style={{ margin: 0 }}>{section.title}</h4>
                          </div>
                          <div style={styles.detailContent}>
                            {section.items.map((item, itemIndex) => (
                              <div 
                                key={itemIndex}
                                style={{
                                  ...styles.infoRow,
                                  ...(hoverStates.infoRow && styles.infoRowHover)
                                }}
                                onMouseEnter={() => handleMouseEnter('infoRow')}
                                onMouseLeave={() => handleMouseLeave('infoRow')}
                              >
                                <span style={styles.label}>{item.label}</span>
                                <span style={{
                                  ...styles.value,
                                  ...(item.isSalary && styles.salary),
                                  ...(item.isStatus && styles.statusActive)
                                }}>
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
                <div style={styles.pageHeader}>
                  <h2 style={{ margin: '0 0 0.5rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-folder"></i> My Documents
                  </h2>
                  <p style={{ margin: 0, color: '#666' }}>Access and manage your employment documents</p>
                </div>

                <div style={styles.documentsGrid}>
                  {dummyDocuments.map((document, index) => (
                    <div 
                      key={document.id}
                      style={{
                        ...styles.documentCard,
                        ...(hoverStates.documentCards[index] && styles.documentCardHover)
                      }}
                      onMouseEnter={() => handleMouseEnter('documentCards', index)}
                      onMouseLeave={() => handleMouseLeave('documentCards', index)}
                    >
                      <div style={styles.documentHeader}>
                        <div 
                          style={{
                            ...styles.documentIcon,
                            backgroundColor: getDocumentIconColor(document.type),
                            ...(hoverStates.documentCards[index] && styles.documentIconHover)
                          }}
                        >
                          <i className={getDocumentIcon(document.type)}></i>
                        </div>
                        <div style={styles.documentTitle}>
                          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>{document.title}</h3>
                          <p style={{ margin: '0.25rem 0 0', color: '#666', fontSize: '0.9rem' }}>
                            {document.description}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        ...styles.documentBadge,
                        backgroundColor: getStatusColor(document.status) + '20',
                        color: getStatusColor(document.status)
                      }}>
                        {document.status.toUpperCase()}
                      </div>

                      <div style={styles.documentContent}>
                        <div style={styles.documentRow}>
                          <span style={styles.label}>Document No.</span>
                          <span style={{...styles.value, fontFamily: 'monospace'}}>{document.documentNumber}</span>
                        </div>
                        <div style={styles.documentRow}>
                          <span style={styles.label}>Issue Date</span>
                          <span style={styles.value}>{new Date(document.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div style={styles.documentRow}>
                          <span style={styles.label}>Expiry Date</span>
                          <span style={styles.value}>{document.expiryDate}</span>
                        </div>
                        <div style={styles.documentRow}>
                          <span style={styles.label}>File Size</span>
                          <span style={styles.value}>{document.fileSize}</span>
                        </div>
                        <div style={styles.documentRow}>
                          <span style={styles.label}>Format</span>
                          <span style={styles.value}>{document.format}</span>
                        </div>
                      </div>

                      <div style={styles.documentActions}>
                        <button 
                          style={{
                            ...styles.btnPreview,
                            ...(hoverStates.btnPreview[index] && styles.btnPreviewHover)
                          }}
                          onMouseEnter={() => handleMouseEnter('btnPreview', index)}
                          onMouseLeave={() => handleMouseLeave('btnPreview', index)}
                          onClick={() => alert(`Previewing ${document.title}`)}
                        >
                          <i className="fas fa-eye"></i> Preview
                        </button>
                        <button 
                          style={{
                            ...styles.btnDownloadDoc,
                            ...(hoverStates.btnDownloadDoc[index] && styles.btnDownloadDocHover)
                          }}
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
          <div style={styles.modalOverlay}>
            <div style={styles.payslipModal}>
              <div style={styles.modalHeader}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-file-invoice-dollar"></i> Payslip Details
                </h3>
                <button 
                  style={{
                    ...styles.closeBtn,
                    ...(hoverStates.closeBtn && styles.closeBtnHover)
                  }}
                  onClick={handleClosePayslip}
                  onMouseEnter={() => handleMouseEnter('closeBtn')}
                  onMouseLeave={() => handleMouseLeave('closeBtn')}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      backgroundColor: '#667eea', 
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      animation: 'pulse 2s infinite'
                    }}>
                      <i className="fas fa-building"></i>
                    </div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{employeeData.company || 'Company Name'}</h2>
                      <p style={{ margin: 0, color: '#666' }}>Employee Payslip</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h3 style={{ margin: 0 }}>{selectedPayslip.month} {selectedPayslip.year}</h3>
                    <p style={{ margin: 0, color: '#666' }}>Payment Date: {new Date(selectedPayslip.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 1rem', color: '#555' }}>Employee Information</h4>
                    <p><strong>Name:</strong> {employeeData.name}</p>
                    <p><strong>ID:</strong> {employeeData.id}</p>
                    <p><strong>Department:</strong> {employeeData.department}</p>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 1rem', color: '#555' }}>Payment Details</h4>
                    <p><strong>Status:</strong> <span style={{ color: '#4CAF50', fontWeight: '600' }}>{selectedPayslip.status}</span></p>
                    <p><strong>Account Period:</strong> {selectedPayslip.month} 1 - {selectedPayslip.month} 31</p>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-plus-circle" style={{ color: '#4CAF50' }}></i> Earnings
                    </h4>
                    {[
                      { label: 'Basic Salary', value: selectedPayslip.details.basic },
                      { label: 'House Rent Allowance (HRA)', value: selectedPayslip.details.hra },
                      { label: 'Conveyance Allowance', value: selectedPayslip.details.conveyance },
                      { label: 'Medical Allowance', value: selectedPayslip.details.medical },
                      { label: 'Bonus', value: selectedPayslip.details.bonus }
                    ].map((item, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eaeaea' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.label}</span>
                          <span>{formatCurrency(item.value)}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #eaeaea' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
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
                    <h4 style={{ margin: '0 0 1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-minus-circle" style={{ color: '#f44336' }}></i> Deductions
                    </h4>
                    {[
                      { label: 'Tax Deduction', value: selectedPayslip.details.tax },
                      { label: 'Provident Fund', value: selectedPayslip.details.pf }
                    ].map((item, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eaeaea' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.label}</span>
                          <span>{formatCurrency(item.value)}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #eaeaea' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Total Deductions</span>
                        <span>{formatCurrency(selectedPayslip.details.tax + selectedPayslip.details.pf)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '10px', 
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#555' }}>Net Salary</h3>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', margin: '0.5rem 0 0' }}>
                        {formatCurrency(selectedPayslip.amount)}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 0.5rem' }}><strong>Payment Method:</strong> Direct Deposit</p>
                      <p style={{ margin: 0 }}><strong>Payment Status:</strong> <span style={{ color: '#4CAF50', fontWeight: '600' }}>Completed</span></p>
                    </div>
                  </div>
                </div>

                <div style={styles.modalFooter}>
                  <button 
                    style={{
                      ...styles.btnPrint,
                      ...(hoverStates.btnPrint && styles.btnPrintHover)
                    }}
                    onClick={() => window.print()}
                    onMouseEnter={() => handleMouseEnter('btnPrint')}
                    onMouseLeave={() => handleMouseLeave('btnPrint')}
                  >
                    <i className="fas fa-print"></i> Print
                  </button>
                  <button 
                    style={{
                      ...styles.btnDownloadModal,
                      ...(hoverStates.btnDownloadModal && styles.btnDownloadModalHover)
                    }}
                    onClick={() => handleDownload(selectedPayslip)}
                    onMouseEnter={() => handleMouseEnter('btnDownloadModal')}
                    onMouseLeave={() => handleMouseLeave('btnDownloadModal')}
                  >
                    <i className="fas fa-download"></i> Download as Text
                  </button>
                  <button 
                    style={{
                      ...styles.btnClose,
                      ...(hoverStates.btnClose && styles.btnCloseHover)
                    }}
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
          <div style={styles.modalOverlay}>
            <div style={styles.calendarModal}>
              <div style={styles.modalHeader}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-calendar-alt"></i> Attendance Calendar
                </h3>
                <button 
                  style={{
                    ...styles.closeBtn,
                    ...(hoverStates.closeBtn && styles.closeBtnHover)
                  }}
                  onClick={() => setShowCalendar(false)}
                  onMouseEnter={() => handleMouseEnter('closeBtn')}
                  onMouseLeave={() => handleMouseLeave('closeBtn')}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={styles.calendarContainer}>
                  <div style={styles.calendarHeader}>
                    <div style={styles.monthSelector}>
                      <select 
                        value={selectedAttendanceMonth}
                        onChange={(e) => setSelectedAttendanceMonth(e.target.value)}
                        style={styles.monthSelect}
                      >
                        {attendanceMonths.map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={styles.legend}>
                      {[
                        { label: 'Present', color: '#4CAF50' },
                        { label: 'Absent', color: '#f44336' },
                        { label: 'Week Off', color: '#2196F3' },
                        { label: 'Leave', color: '#FF9800' },
                        { label: 'Late', color: '#FFC107' }
                      ].map(item => (
                        <div key={item.label} style={styles.legendItem}>
                          <div style={{...styles.colorBox, backgroundColor: item.color}}></div>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.calendarGrid}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} style={styles.calendarWeekday}>{day}</div>
                    ))}
                    {renderCalendar()}
                  </div>

                  {selectedDate && (
                    <div style={styles.attendanceDetail}>
                      <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="fas fa-info-circle"></i> Attendance Details
                      </h4>
                      <div>
                        <p><strong>Date:</strong> {new Date(selectedDate.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Status:</strong> <span style={{ 
                          color: selectedDate.status === 'present' ? '#4CAF50' : 
                                 selectedDate.status === 'absent' ? '#f44336' :
                                 selectedDate.status === 'weekOff' ? '#2196F3' :
                                 selectedDate.status === 'leave' ? '#FF9800' : 
                                 selectedDate.status === 'late' ? '#FFC107' : '#666',
                          fontWeight: '600'
                        }}>{selectedDate.status.charAt(0).toUpperCase() + selectedDate.status.slice(1)}</span></p>
                        <p><strong>Check In:</strong> {selectedDate.checkIn}</p>
                        <p><strong>Check Out:</strong> {selectedDate.checkOut}</p>
                      </div>
                    </div>
                  )}

                  <div style={styles.attendanceStats}>
                    <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-chart-pie"></i> Monthly Attendance Summary - {attendanceData[selectedAttendanceMonth]?.monthName}
                                          </h4>
                    
                    <div style={styles.statsContainer}>
                      <div style={styles.pieChartContainer}>
                        <div style={{
                          ...styles.pieChart,
                          background: getPieChartGradient()
                        }}>
                          <div style={styles.pieChartLabel}>
                            <p style={styles.pieChartTotal}>
                              {attendanceData[selectedAttendanceMonth]?.totalDays || 0}
                            </p>
                            <p style={styles.pieChartText}>Total Days</p>
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.statsDetails}>
                        {calculateAttendanceStats()?.map((stat, index) => {
                          const percentage = attendanceData[selectedAttendanceMonth] ? 
                            (stat.value / attendanceData[selectedAttendanceMonth].totalDays * 100).toFixed(1) : '0.0';
                          
                          return (
                            <div 
                              key={stat.label}
                              style={{
                                ...styles.statDetail,
                                ...(hoverStates.statDetailItems[index] && styles.statDetailHover)
                              }}
                              onMouseEnter={() => handleMouseEnter('statDetailItems', index)}
                              onMouseLeave={() => handleMouseLeave('statDetailItems', index)}
                            >
                              <div style={{...styles.statColor, backgroundColor: stat.color}}></div>
                              <div style={styles.statLabel}>{stat.label}</div>
                              <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
                              <div style={styles.percentageBadge}>{percentage}%</div>
                            </div>
                          );
                        })}
                        
                        {attendanceData[selectedAttendanceMonth] && (
                          <div style={styles.statTotal}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Total Days:</span>
                              <span>{attendanceData[selectedAttendanceMonth].totalDays}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={styles.modalFooter}>
                <button 
                  style={{
                    ...styles.btnClose,
                    ...(hoverStates.btnClose && styles.btnCloseHover)
                  }}
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
        <footer style={styles.dashboardFooter}>
          <div style={styles.footerContent}>
            <div style={styles.footerLeft}>
              <i className="fas fa-shield-alt" style={{ color: '#667eea' }}></i>
              <span>Secure Employee Portal v1.0</span>
            </div>
            <div style={styles.footerRight}>
              <span>{employeeData.company || 'Your Company'} © {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </>
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