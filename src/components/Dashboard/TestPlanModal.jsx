import React, { useState } from 'react';

const TestPlanModal = ({ onClose, onCreate, onSave, distributions = [], currentProjectId, initialData = null }) => {
  const [formData, setFormData] = useState(initialData ? {
    name: initialData.name || '',
    description: initialData.description || '',
    version: initialData.version || '1.0',
    objective: initialData.objective || '',
    scope: initialData.scope || '',
    selectedDistributions: initialData.selectedDistributions || []
  } : {
    name: '',
    description: '',
    version: '1.0',
    objective: '',
    scope: '',
    selectedDistributions: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      selectedDistributions: formData.selectedDistributions
    };
    if (initialData && onSave) {
      onSave(initialData.id, payload);
    } else if (onCreate) {
      onCreate(payload);
    }
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

  const removeDistributionChip = (distroId) => {
    setFormData(prev => ({ ...prev, selectedDistributions: prev.selectedDistributions.filter(id => id !== distroId) }));
  };

  return (
    <div className="modal active">
      <div className="modal-content modal-content--narrow">
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
                <div className="dist-cards dist-cards--selectable">
                  {distributions
                    .filter(d => d.projectId === currentProjectId)
                    .map(distro => (
                      <label key={distro.id} className="dist-card dist-card--selectable">
                        <input
                          type="checkbox"
                          id={`distro-${distro.id}`}
                          checked={formData.selectedDistributions.includes(distro.id)}
                          onChange={() => handleDistributionChange(distro.id)}
                        />
                        <div className="dist-main">
                          <div className="dist-name">{distro.name} <span className="dist-version">{distro.version}</span></div>
                          <div className="dist-type muted">{distro.type}</div>
                          {distro.description && <div className="dist-desc muted">{distro.description}</div>}
                        </div>
                      </label>
                    ))}
                </div>
              )}
            </div>
            {formData.selectedDistributions && formData.selectedDistributions.length > 0 && (
              <div className="selected-distributions">
                {formData.selectedDistributions.map(id => {
                  const d = distributions.find(x => x.id === id);
                  if (!d) return null;
                  return (
                    <div key={id} className="dist-chip">
                      <span className="dist-chip-name">{d.name} <small className="muted">{d.version}</small></span>
                      <button type="button" className="btn btn-icon" onClick={() => removeDistributionChip(id)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Сохранить изменения' : 'Создать тест-план'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPlanModal;