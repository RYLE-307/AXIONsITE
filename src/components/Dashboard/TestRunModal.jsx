import React, { useState } from 'react';

const TestRunModal = ({ onClose, onCreate, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Automatic',
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedTestCases, setSelectedTestCases] = useState([]);

 
  const currentCategoryTestCases = selectedCategoryId 
    ? categories.find(cat => cat.id === parseInt(selectedCategoryId))?.testCases || []
    : [];

  
  const allTestCases = categories.flatMap(category => category.testCases);

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

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    setSelectedTestCases([]);
  };

  const handleTestCaseSelection = (testCaseId) => {
    if (selectedTestCases.includes(testCaseId)) {
      setSelectedTestCases(selectedTestCases.filter(id => id !== testCaseId));
    } else {
      setSelectedTestCases([...selectedTestCases, testCaseId]);
    }
  };

  const selectAllTestCases = () => {
    if (selectedTestCases.length === allTestCases.length) {
      setSelectedTestCases([]);
    } else {
      setSelectedTestCases(allTestCases.map(test => test.id));
    }
  };

  const selectAllInCategory = () => {
    if (selectedCategoryId) {
      const categoryTestCaseIds = currentCategoryTestCases.map(test => test.id);
      const allSelected = categoryTestCaseIds.every(id => selectedTestCases.includes(id));
      
      if (allSelected) {
      
        setSelectedTestCases(selectedTestCases.filter(id => !categoryTestCaseIds.includes(id)));
      } else {
   
        const newSelection = [...new Set([...selectedTestCases, ...categoryTestCaseIds])];
        setSelectedTestCases(newSelection);
      }
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
            <label htmlFor="testRunCategory">Выберите категорию</label>
            <select 
              id="testRunCategory" 
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.testCases.length} тестов)
                </option>
              ))}
            </select>
          </div>

          {selectedCategoryId && (
            <div className="form-group">
              <label>Выберите тест-кейсы из категории "{categories.find(c => c.id === parseInt(selectedCategoryId))?.name}":</label>
              <div className="test-cases-selection">
                <div className="select-all">
                  <input
                    type="checkbox"
                    id="selectAllCategory"
                    className='checkbox-run'
                    checked={currentCategoryTestCases.length > 0 && 
                             currentCategoryTestCases.every(test => selectedTestCases.includes(test.id))}
                    onChange={selectAllInCategory}
                  />
                  <label htmlFor="selectAllCategory">Выбрать все в категории</label>
                </div>
                
                {currentCategoryTestCases.map(testCase => (
                  <div key={testCase.id} className="test-case-checkbox">
                    <input
                      type="checkbox"
                      className='checkbox-run'
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
          )}

          <div className="form-group">
            <label>Всего выбрано тест-кейсов: {selectedTestCases.length}</label>
            <div className="select-all">
              <input
                type="checkbox"
                id="selectAll"
                className='checkbox-run'
                checked={selectedTestCases.length === allTestCases.length}
                onChange={selectAllTestCases}
              />
              <label htmlFor="selectAll">Выбрать все тест-кейсы из всех категорий</label>
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