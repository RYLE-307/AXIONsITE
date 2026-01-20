import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Products from './pages/Products';
import { ToastProvider } from './components/UI/ToastContext';
import './styles/global.css';
import './styles/home.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('AxionLabsTheme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.body.classList.add('light-theme');
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

  return (
    <ToastProvider>
      <Router basename={process.env.NODE_ENV === 'production' ? '/AXIONsITE' : ''}>
        <div className="app">
          <Routes>
            <Route path="/" element={<About theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/products" element={<Products theme={theme} toggleTheme={toggleTheme} />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;