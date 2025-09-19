// components/ReportModal.js
import React from 'react';

const ReportModal = ({ testRun, onClose }) => {
  // Для демонстрации создадим имитацию данных отчета
  const successRate = testRun.tests.length > 0 
    ? Math.round((testRun.passed / testRun.tests.length) * 100) 
    : 0;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Детальный отчет по тест-рану</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="test-run-report">
          <div className="report-header">
            <h3>{testRun.name}</h3>
            <p><strong>Дата выполнения:</strong> {testRun.date}</p>
          </div>
          
          <div className="report-stats">
            <div className="report-stat">
              <div className="report-stat-value">{testRun.tests.length}</div>
              <div className="report-stat-label">Всего тестов</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value" style={{color: 'var(--success)'}}>
                {testRun.passed}
              </div>
              <div className="report-stat-label">Пройдено</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value" style={{color: 'var(--danger)'}}>
                {testRun.failed}
              </div>
              <div className="report-stat-label">Провалено</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value" style={{color: 'var(--primary)'}}>
                {successRate}%
              </div>
              <div className="report-stat-label">Успешность</div>
            </div>
          </div>
          
          <h4>Детализация по тестам:</h4>
          
          {testRun.tests.map((test, index) => (
            <div key={index} className={`test-case-result ${test.passed ? 'passed' : 'failed'}`}>
              <div className="test-case-header">
                <strong>{index + 1}. {test.name}</strong>
                <span className={`status-badge ${test.passed ? 'status-passed' : 'status-failed'}`}>
                  {test.passed ? 'Пройден' : 'Провален'}
                </span>
              </div>
              <p>{test.description}</p>роиз
              
              {!test.passed && (
                <div className="error-details">
                  <h5>Детали ошибки:</h5>
                  <div className="error-section">
                    <strong>Описание проблемы:</strong>
                    <div className="error-reason">Произошла неизвестная ошибка (демо)</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="form-actions">
            <button className="btn btn-outline" onClick={() => alert('Функция экспорта в PDF будет реализована в полной версии')}>
              <i className="fas fa-file-pdf"></i> Экспорт в PDF
            </button>
            <button className="btn btn-outline" onClick={() => alert('Функция экспорта в CSV будет реализована в полной версии')}>
              <i className="fas fa-file-csv"></i> Экспорт в CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;