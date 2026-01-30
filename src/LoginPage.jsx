import React, { useState, useEffect } from 'react';

const LoginPage = ({ onLogin }) => {
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [formData, setFormData] = useState({
    empId: '',
    email: '',
    otp: ''
  });
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Dummy employee data with Indian names and phone numbers
  const dummyEmployees = [
    {
      id: 'EMP001',
      email: 'rajesh.kumar@company.in',
      name: 'Rajesh Kumar',
      position: 'Senior Developer',
      department: 'IT',
      joinDate: '2020-06-15',
      totalExperience: '3 years 8 months',
      salary: 1200000, // Annual salary in INR
      contact: '+91 98765 43210',
      avatarColor: '#667eea'
    },
    {
      id: 'EMP002',
      email: 'priya.sharma@company.in',
      name: 'Priya Sharma',
      position: 'HR Manager',
      department: 'HR',
      joinDate: '2019-03-10',
      totalExperience: '4 years 11 months',
      salary: 1000000, // Annual salary in INR
      contact: '+91 87654 32109',
      avatarColor: '#764ba2'
    },
    {
      id: 'EMP003',
      email: 'amit.patel@company.in',
      name: 'Amit Patel',
      position: 'Finance Manager',
      department: 'Finance',
      joinDate: '2021-01-20',
      totalExperience: '2 years 2 months',
      salary: 900000, // Annual salary in INR
      contact: '+91 76543 21098',
      avatarColor: '#f56565'
    },
    {
      id: 'EMP004',
      email: 'sneha.reddy@company.in',
      name: 'Sneha Reddy',
      position: 'Marketing Head',
      department: 'Marketing',
      joinDate: '2018-08-05',
      totalExperience: '5 years 6 months',
      salary: 1100000, // Annual salary in INR
      contact: '+91 65432 10987',
      avatarColor: '#48bb78'
    }
  ];

  // Timer for OTP
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find employee
    const employee = dummyEmployees.find(
      emp => emp.id === formData.empId && emp.email === formData.email
    );

    if (employee) {
      setSelectedEmployee(employee);
      // Generate OTP (in real app, this comes from backend)
      const generatedOTP = '123456';
      console.log(`OTP for ${employee.name}: ${generatedOTP}`);
      
      setIsTimerActive(true);
      setTimer(60);
      setStep(2);
      setError('');
    } else {
      setError('Invalid Employee ID or Email. Please try again.');
    }
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify OTP (in real app, verify with backend)
    if (formData.otp === '123456') {
      // Success - pass employee data to parent component
      onLogin(selectedEmployee);
    } else {
      setError('Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  const resendOTP = () => {
    setIsTimerActive(true);
    setTimer(60);
    console.log('Resending OTP to:', selectedEmployee?.email);
    // In real app, call backend to resend OTP
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleDemoLogin = (empId, email) => {
    setFormData({
      empId,
      email,
      otp: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="company-logo">
            <i className="fas fa-briefcase"></i>
            <span>Employee Portal</span>
          </div>
          <h2>{step === 1 ? 'Employee Login' : 'OTP Verification'}</h2>
          <p className="login-subtitle">
            {step === 1 
              ? 'Enter your credentials to access your dashboard' 
              : 'Enter the OTP sent to your registered email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCredentialsSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="empId">
                <i className="fas fa-id-card"></i> Employee ID
              </label>
              <input
                type="text"
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={handleInputChange}
                placeholder="Enter your Employee ID"
                required
              />
              <small className="form-hint">Try: EMP001, EMP002, EMP003, or EMP004</small>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your company email"
                required
              />
              <small className="form-hint">Use company email ID ending with @company.in</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Continue to OTP
                </>
              )}
            </button>

            <div className="demo-section">
              <h4><i className="fas fa-flask"></i> Quick Test Logins</h4>
              <div className="demo-buttons">
                <button 
                  type="button"
                  className="demo-btn"
                  onClick={() => handleDemoLogin('EMP001', 'rajesh.kumar@company.in')}
                  style={{ background: '#667eea' }}
                >
                  Rajesh Kumar
                </button>
                <button 
                  type="button"
                  className="demo-btn"
                  onClick={() => handleDemoLogin('EMP002', 'priya.sharma@company.in')}
                  style={{ background: '#764ba2' }}
                >
                  Priya Sharma
                </button>
                <button 
                  type="button"
                  className="demo-btn"
                  onClick={() => handleDemoLogin('EMP003', 'amit.patel@company.in')}
                  style={{ background: '#f56565' }}
                >
                  Amit Patel
                </button>
                <button 
                  type="button"
                  className="demo-btn"
                  onClick={() => handleDemoLogin('EMP004', 'sneha.reddy@company.in')}
                  style={{ background: '#48bb78' }}
                >
                  Sneha Reddy
                </button>
              </div>
              <p className="otp-note">Use <strong>123456</strong> as OTP for all accounts</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="otp-form">
            {selectedEmployee && (
              <div className="employee-preview">
                <div 
                  className="preview-avatar"
                  style={{ background: selectedEmployee.avatarColor }}
                >
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div className="preview-info">
                  <h4>{selectedEmployee.name}</h4>
                  <p>{selectedEmployee.position}</p>
                  <p className="employee-department">{selectedEmployee.department}</p>
                  <small>{selectedEmployee.email}</small>
                </div>
              </div>
            )}

            <div className="otp-info">
              <i className="fas fa-shield-alt"></i>
              <p>OTP sent to <strong>{selectedEmployee?.email}</strong></p>
              <small className="otp-message">Check your email inbox or spam folder</small>
            </div>

            <div className="form-group">
              <label htmlFor="otp">
                <i className="fas fa-key"></i> Enter 6-digit OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                pattern="[0-9]{6}"
                required
              />
              <small className="form-hint">Enter the 6-digit OTP sent to your registered mobile: {selectedEmployee?.contact}</small>
            </div>

            <div className="timer-section">
              <div className="timer-info">
                <p>
                  <i className="fas fa-clock"></i> 
                  OTP expires in: <span className="timer">{formatTime(timer)}</span>
                </p>
                <small className="timer-note">The OTP is valid for 1 minute only</small>
              </div>
              <button 
                type="button" 
                className="resend-btn"
                onClick={resendOTP}
                disabled={isTimerActive || loading}
              >
                <i className="fas fa-redo"></i> {isTimerActive ? 'Wait for Resend' : 'Resend OTP'}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button 
                type="button" 
                className="back-btn"
                onClick={() => {
                  setStep(1);
                  setError('');
                  setSelectedEmployee(null);
                }}
                disabled={loading}
              >
                <i className="fas fa-arrow-left"></i> Back to Login
              </button>
              <button 
                type="submit" 
                className="verify-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i> Verify & Login
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="login-footer">
          <p>
            <i className="fas fa-info-circle"></i>
            For security reasons, your session will expire after 30 minutes of inactivity.
          </p>
          <p className="support-contact">
            <i className="fas fa-headset"></i>
            Need help? Contact IT Support: <strong>it-support@company.in</strong> or call: <strong>+91 1800 123 4567</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;