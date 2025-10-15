import React from 'react';
import '../styles/global.css';
import '../styles/header.css';
import { getRoleDisplayName } from '../utils/roles';

const Header = ({ 
  currentUser, 
  onLogout, 
  theme, 
  toggleTheme, 
  projects, 
  currentProjectId, 
  setCurrentProjectId, 
  setShowProjectModal,
  canCreateProject 
}) => {
  const logoPath = theme === 'dark' ? '/logo_dark.svg' : '/logo_Theme.svg';

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Логотип и название */}
          <a href="/dashboard" className="logo">
            <img src={logoPath} alt="AxionLabs Logo" className="logo__image" />
            <span className="logo__text">AxionLabs</span>
          </a>
          
          {/* Элементы управления */}
          <div className="navbar__controls">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
              <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
            
            {/* Селектор проектов */}
            {projects && projects.length > 0 && (
              <div className="project-selector">
                <select 
                  value={currentProjectId || ''} 
                  onChange={(e) => setCurrentProjectId(parseInt(e.target.value))}
                  className="project-selector__dropdown"
                >
                  <option value="">Выберите проект</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Кнопка создания проекта */}
            {canCreateProject && (
              <button 
                className="btn btn--primary" 
                onClick={() => setShowProjectModal(true)}
              >
                <i className="fas fa-plus"></i>
                <span>Новый проект</span>
              </button>
            )}
          </div>
          
          {/* Информация о пользователе */}
          <div className="user-info">
            {currentUser && (
              <div className="user-profile">
                <div className="user-profile__main">
                  <span className="user-profile__name">
                    {currentUser.username || currentUser.name}
                  </span>
                  <span className="user-profile__company">
                    {currentUser.company}
                  </span>
                </div>
                <div className="user-profile__role">
                  {getRoleDisplayName(currentUser.role)}
                </div>
              </div>
            )}
            
            {/* Кнопка выхода */}
            <button className="btn btn--outline" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Выйти</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;