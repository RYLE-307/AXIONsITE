import React, { useState } from 'react';

const ProjectModal = ({ onClose, onCreate, distributions = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    environment: 'разработка',
    environment1: 'OpenQA'
  });
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); 
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
              name="name" 
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
              name="description" 
              placeholder="Опишите цель проекта"
              value={formData.description}
              onChange={handleChange} 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="projectEnvironment">Тестовая среда</label>
            <select 
              id="environment" 
              name="environment" 
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
              name="environment1" 
              value={formData.environment1}
              onChange={handleChange} 
            >
              <option value="OpenQA">OpenQA</option>
              <option value="CI/CD">CI/CD</option>
            </select>
          </div>

         
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Создание...' : 'Создать проект'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;