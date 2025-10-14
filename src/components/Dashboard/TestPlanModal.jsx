import React, { useState } from 'react';

const TestPlanModal = ({ onClose, onCreate, distributions, currentProjectId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '1.0',
    objective: '',
    scope: '',
    selectedDistributions: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      id: Date.now(),
      ...formData,
      projectId: currentProjectId, // Привязываем к проекту
      createdAt: new Date().toISOString(),
      testCaseCategories: []
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Создание тест-плана</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="testPlanName">Название тест-плана</label>
            <input 
              type="text" 
              id="testPlanName" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Введите название тест-плана" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="testPlanDescription">Описание тест-плана</label>
            <textarea 
              id="testPlanDescription" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Краткое описание тест-плана" 
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testPlanObjective">Цели тестирования</label>
            <textarea 
              id="testPlanObjective" 
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              placeholder="Опишите основные цели тестирования" 
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testPlanScope">Область тестирования</label>
            <textarea 
              id="testPlanScope" 
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              placeholder="Опишите что входит в область тестирования" 
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="testPlanVersion">Версия</label>
            <input 
              type="text" 
              id="testPlanVersion" 
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="Версия тест-плана" 
            />
          </div>

          {/* Выбор дистрибутивов */}
          <div className="form-group">
            <label>Целевые дистрибутивы</label>
            <div className="distributions-selection">
              {distributions.filter(d => d.projectId === currentProjectId).length === 0 ? (
                <p className="no-distributions">
                  Нет доступных дистрибутивов для этого проекта. Сначала добавьте дистрибутивы в настройках проекта.
                </p>
              ) : (
                distributions
                  .filter(d => d.projectId === currentProjectId)
                  .map(distro => (
                    <div key={distro.id} className="distribution-checkbox">
                      <input
                        type="checkbox"
                        id={`distro-${distro.id}`}
                        checked={formData.selectedDistributions.includes(distro.id)}
                        onChange={() => handleDistributionChange(distro.id)}
                      />
                      <label htmlFor={`distro-${distro.id}`}>
                        <strong>{distro.name} {distro.version}</strong> 
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                          ({distro.type}) {distro.description && `- ${distro.description}`}
                        </span>
                      </label>
                    </div>
                  ))
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Создать тест-план
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPlanModal;