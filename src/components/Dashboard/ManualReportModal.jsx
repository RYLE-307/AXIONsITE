import React, { useState } from 'react';

const ManualReportModal = ({ testRun, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: testRun?.name || '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    environment: 'Разработка',
    tester: '',
    summary: '',
    recommendations: '',
    status: 'passed'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      testRunId: testRun?.id,
      createdAt: new Date().toISOString()
    });
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
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Создание ручного отчета</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reportTitle">Название отчета</label>
            <input 
              type="text" 
              id="reportTitle" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required 
              placeholder="Введите название отчета" 
            />
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="reportDate">Дата отчета</label>
              <input 
                type="date" 
                id="reportDate" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="reportEnvironment">Среда тестирования</label>
              <select 
                id="reportEnvironment" 
                name="environment"
                value={formData.environment}
                onChange={handleChange}
              >
                <option value="Разработка">Разработка</option>
                <option value="Стейджинг">Стейджинг</option>
                <option value="Продакшен">Продакшен</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="reportStatus">Общий статус</label>
              <select 
                id="reportStatus" 
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="passed">Успешно</option>
                <option value="failed">С ошибками</option>
                <option value="partial">Частично успешно</option>
              </select>
            </div>
          </div>

        
          
          <div className="form-group">
            <label htmlFor="reportDescription">Описание тестирования</label>
            <textarea 
              id="reportDescription" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опишите что было протестировано" 
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reportSummary">Результаты тестирования</label>
            <textarea 
              id="reportSummary" 
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Опишите детальные результаты тестирования" 
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reportRecommendations">Рекомендации и замечания</label>
            <textarea 
              id="reportRecommendations" 
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              placeholder="Опишите рекомендации по улучшению" 
              rows="4"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i> Сохранить отчет
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualReportModal;