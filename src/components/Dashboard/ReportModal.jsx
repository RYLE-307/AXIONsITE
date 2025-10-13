import React from 'react';

const ReportModal = ({ testRun, onClose }) => {

  if (!testRun || !testRun.tests) {
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Ошибка</h2>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="test-run-report">
            <p>Данные отчета недоступны или повреждены.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    );
  }

  const passedTests = testRun.tests.filter(test => test.passed).length;
  const totalTests = testRun.tests.length;
  const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;


  const formatDate = (date) => {
    if (!date) return 'Не указана';
    if (typeof date === 'number') {
      return new Date(date).toLocaleDateString('ru-RU');
    }
    return date;
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Детальный отчет по тест-рану</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="test-run-report">
          <div className="report-header">
            <h3>{testRun.name || 'Без названия'}</h3>
            <p><strong>Дата выполнения:</strong> {formatDate(testRun.date)}</p>
            <p><strong>Тип прогона:</strong> {testRun.type === 'Automatic' ? 'Автоматический' : 'Ручной'}</p>
          </div>
          
          <div className="report-stats">
            <div className="report-stat">
              <div className="report-stat-value">{totalTests}</div>
              <div className="report-stat-label">Всего тестов</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value" style={{color: 'var(--success)'}}>
                {passedTests}
              </div>
              <div className="report-stat-label">Пройдено</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value" style={{color: 'var(--danger)'}}>
                {totalTests - passedTests}
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
                <strong>{index + 1}. {test.name || 'Без названия'}</strong>
                <span className={`status-badge ${test.passed ? 'status-passed' : 'status-failed'}`}>
                  {test.passed ? 'Пройден' : 'Провален'}
                </span>
              </div>
              {test.description && <p>{test.description}</p>}
              
              {!test.passed && test.errorDetails && (
                <div className="error-details">
                  <h5>Детали ошибки:</h5>
                  {test.errorDetails.location && (
                    <div className="error-section">
                      <strong>Местоположение:</strong>
                      <div className="error-reason">{test.errorDetails.location}</div>
                    </div>
                  )}
                  {test.errorDetails.description && (
                    <div className="error-section">
                      <strong>Описание проблемы:</strong>
                      <div className="error-reason">{test.errorDetails.description}</div>
                    </div>
                  )}
                  {test.errorDetails.reason && (
                    <div className="error-section">
                      <strong>Причина:</strong>
                      <div className="error-reason">{test.errorDetails.reason}</div>
                    </div>
                  )}
                  {test.errorDetails.solution && (
                    <div className="error-section">
                      <strong>Решение:</strong>
                      <div className="error-reason">{test.errorDetails.solution}</div>
                    </div>
                  )}
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
            <button className="btn btn-primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;