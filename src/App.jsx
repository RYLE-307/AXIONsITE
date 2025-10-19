import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/home.css';
import './styles/reports.css';


import { ROLES, hasPermission } from './utils/roles';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('AxionLabsTheme');
    const savedUser = localStorage.getItem('AxionLabsUser');
    
    if (savedTheme === 'light') {
      setTheme('light');
      document.body.classList.add('light-theme');
    }
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
      localStorage.setItem('AxionLabsTheme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('AxionLabsTheme', 'dark');
    }
  };

  const handleLogin = (user) => {
    
    const userWithRole = {
      ...user,
      role: user.role || ROLES.TESTER,
      assignedProjects: user.assignedProjects || [] 
    };
    
    setCurrentUser(userWithRole);
    localStorage.setItem('AxionLabsUser', JSON.stringify(userWithRole));
    localStorage.setItem('AxionLabsAuth', 'true');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('AxionLabsUser');
    localStorage.removeItem('AxionLabsAuth');
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={<Home theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/auth" 
            element={
              currentUser ? 
              <Navigate to="/dashboard" replace /> : 
              <Auth onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              currentUser ? 
              <Dashboard 
                currentUser={currentUser} 
                onLogout={handleLogout} 
                theme={theme} 
                toggleTheme={toggleTheme} 
                hasPermission={hasPermission}
              /> : 
              <Navigate to="/auth" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;