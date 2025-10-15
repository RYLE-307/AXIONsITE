import React, { useState } from 'react';

const ProjectModal = ({ onClose, onCreate, distributions = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    environment: 'разработка',
    environment1: 'QWA',
    selectedDistributions: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onCreate(formData);
    } catch (err) {
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDistributionChange = (distroId) => {
    setFormData(prev => {
      const isSelected = prev.selectedDistributions.includes(distroId);
      return {
        ...prev,
        selectedDistributions: isSelected
          ? prev.selectedDistributions.filter(id => id !== distroId)
          : [...prev.selectedDistributions, distroId]
      };
    });
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Создание нового проекта</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Название проекта</label>
            <input 
              type="text" 
              id="name" 
              required 
              placeholder="Введите название проекта"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectDescription">Описание проекта</label>
            <textarea 
              id="description" 
              placeholder="Опишите цель проекта"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="projectEnvironment">Тестовая среда</label>
            <select 
              id="environment" 
              value={formData.environment}
              onChange={handleChange}
            >
              <option value="Разработка">Разработка</option>
              <option value="Стейджинг">Стейджинг</option>
              <option value="Продакшен">Продакшен</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="projectEnvironment1">Вид тестировки</label>
            <select 
              id="environment1" 
              value={formData.environment1}
              onChange={handleChange}
            >
              <option value="QWA">кваква</option>
              <option value="CI/CD">CI/CD</option>
              <option value="что-то">что-то</option>
            </select>
          </div>

          {/* Секция выбора дистрибутивов */}
          <div className="form-group">
            <label>Выберите дистрибутивы для тестирования</label>
            <div className="distributions-selection">
              {distributions.length === 0 ? (
                <p className="no-distributions">Нет доступных дистрибутивов. Сначала добавьте дистрибутивы.</p>
              ) : (
                distributions.map(distro => (
                  <div key={distro.id} className="distribution-checkbox">
                    <input
                      type="checkbox"
                      id={`distro-${distro.id}`}
                      checked={formData.selectedDistributions.includes(distro.id)}
                      onChange={() => handleDistributionChange(distro.id)}
                    />
                    <label htmlFor={`distro-${distro.id}`}>
                      {distro.name} {distro.version} ({distro.type})
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary">Создать проект</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;