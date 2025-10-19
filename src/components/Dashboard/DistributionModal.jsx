import React, { useState } from 'react';

const DistributionModal = ({ onClose, onCreate, distributions = [], onDelete, currentProjectId }) => {
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    type: 'linux',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      id: Date.now(),
      ...formData,
      projectId: currentProjectId,
      createdAt: new Date().toISOString()
    });
    setFormData({ name: '', version: '', type: 'linux', description: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить дистрибутив? Это действие нельзя отменить.')) {
      onDelete(id);
    }
  };

  return (
    <div className="modal active">
  <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Управление дистрибутивами</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

  <div className="dist-list-wrapper">
          <h3>Существующие дистрибутивы</h3>
          {distributions.length === 0 ? (
            <p className="no-distributions">Нет дистрибутивов для этого проекта.</p>
          ) : (
            <div className="dist-cards">
              {distributions
                .filter(d => d.projectId === currentProjectId)
                .map(d => (
                <div key={d.id} className="dist-card">
                  <div className="dist-main">
                    <div className="dist-name">{d.name} <span className="dist-version">{d.version}</span></div>
                    <div className="dist-type">{d.type}</div>
                    {d.description && <div className="dist-desc">{d.description}</div>}
                  </div>
                  <div className="dist-actions">
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d.id)}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="distroName">Название дистрибутива</label>
            <input 
              type="text" 
              id="distroName" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Например: Ubuntu, Windows, macOS" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="distroVersion">Версия</label>
            <input 
              type="text" 
              id="distroVersion" 
              name="version"
              value={formData.version}
              onChange={handleChange}
              required 
              placeholder="Например: 22.04, 11, 14.0" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="distroType">Тип ОС</label>
            <select 
              id="distroType" 
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="linux">Linux</option>
              <option value="windows">Windows</option>
              <option value="macos">macOS</option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="other">Другая</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="distroDescription">Описание</label>
            <textarea 
              id="distroDescription" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Дополнительная информация о дистрибутиве" 
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Закрыть
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить дистрибутив
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributionModal;