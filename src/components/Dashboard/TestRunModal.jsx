import React, { useState } from 'react';

const TestRunModal = ({ onClose, onCreate, testCases }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Automatic',
  });
  const [selectedTestCases, setSelectedTestCases] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTestCases.length === 0) {
      alert('Выберите хотя бы один тест-кейс для запуска');
      return;
    }
    onCreate({ ...formData, selectedTestCases });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTestCaseSelection = (testCaseId) => {
    if (selectedTestCases.includes(testCaseId)) {
      setSelectedTestCases(selectedTestCases.filter(id => id !== testCaseId));
    } else {
      setSelectedTestCases([...selectedTestCases, testCaseId]);
    }
  };

  const selectAllTestCases = () => {
    if (selectedTestCases.length === testCases.length) {
      setSelectedTestCases([]);
    } else {
      setSelectedTestCases(testCases.map(test => test.id));
    }
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
              <option value="Automatic">Автоматический прогон</option>
              <option value="Hand">Ручной прогон</option>
            </select>
          </div>

          <div className="form-group">
            <label>Выберите тест-кейсы для запуска:</label>
            <div className="test-cases-selection">
              <div className="select-all">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectedTestCases.length === testCases.length}
                  onChange={selectAllTestCases}
                />
                <label htmlFor="selectAll">Выбрать все</label>
              </div>
              
              {testCases.map(testCase => (
                <div key={testCase.id} className="test-case-checkbox">
                  <input
                    type="checkbox"
                    id={`testCase-${testCase.id}`}
                    checked={selectedTestCases.includes(testCase.id)}
                    onChange={() => handleTestCaseSelection(testCase.id)}
                  />
                  <label htmlFor={`testCase-${testCase.id}`}>
                    {testCase.name} ({testCase.type})
                  </label>
                </div>
              ))}
            </div>
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