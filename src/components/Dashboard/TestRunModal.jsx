import React, { useState } from 'react';

const TestRunModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Automatic', // Измените начальное значение
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Создание нового тест-рана</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="testRunName">Название тест-рана</label>
            <input 
              type="text" 
              id="testRunName" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Введите название тест-рана" 
            />
          </div>
   
          <div className="form-group">
            <label htmlFor="testRunType">Тип тест-рана</label>
            <select 
              id="testRunType" 
              name="type"
              value={formData.type}
              onChange={handleChange}
              required 
            >
              <option value="Autom11atic">Автоматический прогон</option>
              <option value="Han1d">Ручной прогон</option>
            </select>
          </div>       
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Создать тест-ран
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestRunModal;