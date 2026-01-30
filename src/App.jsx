import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import EmployeeDashboard from './EmployeeDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [currentView, setCurrentView] = useState('overview');

  // Check if user is already logged in (for session persistence)
  useEffect(() => {
    const savedLogin = localStorage.getItem('employeeLoggedIn');
    const savedEmployeeData = localStorage.getItem('employeeData');
    
    if (savedLogin === 'true' && savedEmployeeData) {
      setIsLoggedIn(true);
      setEmployeeData(JSON.parse(savedEmployeeData));
    }
  }, []);

  // Handle login
  const handleLogin = (employee) => {
    setIsLoggedIn(true);
    setEmployeeData(employee);
    setCurrentView('overview');
    
    // Save to localStorage for session persistence
    localStorage.setItem('employeeLoggedIn', 'true');
    localStorage.setItem('employeeData', JSON.stringify(employee));
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeData(null);
    
    // Clear localStorage on logout
    localStorage.removeItem('employeeLoggedIn');
    localStorage.removeItem('employeeData');
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginPage 
          onLogin={handleLogin}
        />
      ) : (
        <EmployeeDashboard 
          employeeData={employeeData}
          onLogout={handleLogout}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}
    </div>
  );
}

export default App;