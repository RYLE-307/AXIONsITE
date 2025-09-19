import React from 'react';

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
            <a className="btn btn-header btn-outline" href="/">
              <i className="fas fa-home"></i> На главную
            </a>
            <button className="btn btn-header btn-outline" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Выйти
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
