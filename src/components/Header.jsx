import React from 'react';
import '../styles/global.css';
import '../styles/header.css';

const Header = ({ 
  currentUser, 
  onLogout, 
  theme, 
  toggleTheme, 
  projects, 
  currentProjectId, 
  setCurrentProjectId, 
  setShowProjectModal 
}) => {
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <a href="/dashboard" className="logo">
            <i className="fas fa-bug"></i> AxionLabs
          </a>
          
          <div className="auth-buttons">
            <button className="theme-toggle" onClick={toggleTheme}>
              <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
            <div className="project-selector">
              <select 
                value={currentProjectId} 
                onChange={(e) => setCurrentProjectId(parseInt(e.target.value))}
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowProjectModal(true)}
            >
              <i className="fas fa-plus"></i> Новый проект
            </button>
          </div>
          
          {/* Исправленное отображение информации о пользователе */}
          <div className="user-info">
            {currentUser && (
              <div className='profile'>
                <p className="NameCompany">
                  <span><strong>{currentUser.username || currentUser.name}</strong></span>
                </p>
                <p className="Nikname">
                  <span><strong>{currentUser.company}</strong></span>
                </p>
              </div>
            )}
          </div>
          
          <button className="btn btn-header btn-outline" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Выйти
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
