import React, { useState, useEffect } from 'react';

const TestExecutionModal = ({ testRun, onClose, onComplete }) => {
  const [currentTestCaseIndex, setCurrentTestCaseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepResults, setStepResults] = useState({});
  const [testResults, setTestResults] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [stepComment, setStepComment] = useState('');
  const [actualResult, setActualResult] = useState('');
  const testCases = testRun?.tests || [];
  const currentTestCase = testCases[currentTestCaseIndex] || {};
  const steps = currentTestCase?.steps || [];
  const currentStep = steps[currentStepIndex] || {};

 
  useEffect(() => {
    if (testCases.length > 0) {
      const initialResults = {};
      testCases.forEach((testCase, index) => {
        initialResults[testCase.id] = {
          passed: false,
          completed: false,
          stepResults: {}
        };
      });
      setTestResults(initialResults);
    }
  }, [testCases]);

  
  useEffect(() => {
    setStepComment('');
    setActualResult('');
  }, [currentStepIndex, currentTestCaseIndex]);

  const handleStepResult = (passed) => {
    if (!currentTestCase.id) return;

    const newStepResults = {
      ...stepResults,
      [currentStepIndex]: {
        passed,
        step: currentStep.step || `Шаг ${currentStepIndex + 1}`,
        expected: currentStep.expected || '',
        actual: actualResult || (passed ? 'Соответствует ожидаемому' : 'Не соответствует ожидаемому'),
        comment: stepComment,
        timestamp: new Date().toISOString()
      }
    };

    setStepResults(newStepResults);

    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
     
      const allStepsPassed = Object.values(newStepResults).every(step => step.passed);
      
      const newTestResults = {
        ...testResults,
        [currentTestCase.id]: {
          passed: allStepsPassed,
          completed: true,
          stepResults: newStepResults
        }
      };
      
      setTestResults(newTestResults);
      setStepResults({});
      setCurrentStepIndex(0);
      setStepComment('');
      setActualResult('');

     
      if (currentTestCaseIndex < testCases.length - 1) {
        setCurrentTestCaseIndex(currentTestCaseIndex + 1);
      } else {
       
        completeTestRun(newTestResults);
      }
    }
  };

  const completeTestRun = (results) => {
    setIsExecuting(false);
    
    const executionResults = Object.entries(results).map(([testCaseId, result]) => ({
      testCaseId: parseInt(testCaseId),
      passed: result.passed,
      stepResults: result.stepResults
    }));

    onComplete({
      testRunId: testRun.id,
      results: executionResults,
      completed: true
    });
  };

  const skipTestCase = () => {
    if (!currentTestCase.id) return;

    const newTestResults = {
      ...testResults,
      [currentTestCase.id]: {
        passed: false,
        completed: true,
        stepResults: {},
        skipped: true,
        comment: 'Тест-кейс пропущен'
      }
    };

    setTestResults(newTestResults);
    setStepResults({});
    setCurrentStepIndex(0);
    setStepComment('');
    setActualResult('');

    if (currentTestCaseIndex < testCases.length - 1) {
      setCurrentTestCaseIndex(currentTestCaseIndex + 1);
    } else {
      completeTestRun(newTestResults);
    }
  };

  const getProgressPercentage = () => {
    if (testCases.length === 0) return 0;
    
    const completedTests = Object.values(testResults).filter(result => result.completed).length;
    return Math.round((completedTests / testCases.length) * 100);
  };

  const getStepProgressPercentage = () => {
    if (steps.length === 0) return 0;
    return Math.round(((currentStepIndex + 1) / steps.length) * 100);
  };


  if (testCases.length === 0) {
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Выполнение тест-рана</h2>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="test-execution">
            <div className="current-test-case">
              <h3>Нет тест-кейсов для выполнения</h3>
              <p>В этом тест-ране нет тест-кейсов для ручного выполнения.</p>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={onClose}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal active">
      <div className="modal-content modal-content--wide">
        <div className="modal-header">
          <h2 className="modal-title">Ручное выполнение тест-рана</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="test-execution">
          {/* Прогресс выполнения всего тест-рана */}
          <div className="test-run-progress">
            <div className="progress-info">
              Прогресс тест-рана: {getProgressPercentage()}%
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill w-${getProgressPercentage()}`}
              ></div>
            </div>
            <div className="progress-info">
              Тест-кейс {currentTestCaseIndex + 1} из {testCases.length}
            </div>
          </div>

          {/* Текущий тест-кейс */}
          <div className="current-test-case">
            <h3>{currentTestCase.name || `Тест-кейс ${currentTestCaseIndex + 1}`}</h3>
            {currentTestCase.description && (
              <p className="test-case-description">{currentTestCase.description}</p>
            )}
            
            {/* Прогресс шагов текущего тест-кейса */}
            {steps.length > 0 && (
              <div className="steps-progress">
                <div className="progress-info">
                  Шаг {currentStepIndex + 1} из {steps.length} ({getStepProgressPercentage()}%)
                </div>
                <div className="progress-bar">
                    <div
                      className={`progress-fill w-${getStepProgressPercentage()}`}
                    ></div>
                </div>
              </div>
            )}

            {/* Текущий шаг */}
            {steps.length > 0 ? (
              <div className="test-step">
                <div className="step-header">
                  <h4>Шаг {currentStepIndex + 1}: {currentStep.step || 'Действие не указано'}</h4>
                </div>
                
                {currentStep.expected && (
                  <div className="step-expected">
                    <strong>Ожидаемый результат:</strong> {currentStep.expected}
                  </div>
                )}

                <div className="step-execution">
                  {/* Поле для ввода фактического результата */}
                  <div className="form-group">
                    <label htmlFor="actualResult">Фактический результат:</label>
                    <textarea 
                      id="actualResult"
                      value={actualResult}
                      onChange={(e) => setActualResult(e.target.value)}
                      placeholder="Опишите фактический результат выполнения шага..."
                      rows="3"
                      className="full-width-resize"
                    />
                  </div>

                  {/* Поле для комментариев */}
                  <div className="form-group">
                    <label htmlFor="stepComment">Комментарий к шагу (необязательно):</label>
                    <textarea 
                      id="stepComment"
                      value={stepComment}
                      onChange={(e) => setStepComment(e.target.value)}
                      placeholder="Добавьте комментарии, замечания или примечания..."
                      rows="2"
                      className="full-width-resize"
                    />
                  </div>

                  <p>Оцените результат выполнения шага:</p>
                  
                  <div className="step-actions">
                    <button 
                      className="btn btn-success"
                      onClick={() => handleStepResult(true)}
                      disabled={!actualResult.trim()} 
                    >
                      <i className="fas fa-check"></i> Шаг выполнен успешно
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleStepResult(false)}
                      disabled={!actualResult.trim()} 
                    >
                      <i className="fas fa-times"></i> Шаг не выполнен
                    </button>
                  </div>

                  {!actualResult.trim() && (
                    <p className="warning-note">
                      * Пожалуйста, опишите фактический результат перед оценкой шага
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="test-step">
                <p>Этот тест-кейс не содержит детальных шагов.</p>
                
                {/* Поля для тест-кейса без шагов */}
                <div className="form-group">
                  <label htmlFor="actualResult">Фактический результат тестирования:</label>
                  <textarea 
                    id="actualResult"
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                    placeholder="Опишите фактический результат выполнения тест-кейса..."
                    rows="3"
                    className="full-width-resize"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stepComment">Комментарий к тест-кейсу (необязательно):</label>
                  <textarea 
                    id="stepComment"
                    value={stepComment}
                    onChange={(e) => setStepComment(e.target.value)}
                    placeholder="Добавьте комментарии, замечания или примечания..."
                    rows="2"
                    className="full-width-resize"
                  />
                </div>

                <p>Выполните тестирование согласно описанию и оцените результат:</p>
                
                <div className="step-actions">
                  <button 
                    className="btn btn-success"
                    onClick={() => handleStepResult(true)}
                    disabled={!actualResult.trim()}
                  >
                    <i className="fas fa-check"></i> Тест-кейс пройден
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleStepResult(false)}
                    disabled={!actualResult.trim()}
                  >
                    <i className="fas fa-times"></i> Тест-кейс не пройден
                  </button>
                </div>

                {!actualResult.trim() && (
                  <p className="warning-note">
                    * Пожалуйста, опишите фактический результат перед оценкой тест-кейса
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Навигация и управление */}
          <div className="execution-navigation">
            <div className="test-case-completion">
              <button 
                className="btn btn-outline"
                onClick={skipTestCase}
                disabled={currentTestCaseIndex === testCases.length - 1 && steps.length === 0}
              >
                <i className="fas fa-forward"></i> Пропустить тест-кейс
              </button>
            </div>
            
            <div className="completion-actions">
              <button 
                className="btn btn-outline"
                onClick={onClose}
              >
                <i className="fas fa-times"></i> Прервать выполнение
              </button>
            </div>
          </div>

          {/* Обзор выполнения */}
          <div className="execution-overview">
            <h4>Обзор выполнения:</h4>
            <div className="test-cases-overview">
              {testCases.map((testCase, index) => {
                const result = testResults[testCase.id];
                const status = result?.completed 
                  ? (result.passed ? 'passed' : 'failed')
                  : (index === currentTestCaseIndex ? 'current' : 'pending');
                
                return (
                  <div 
                    key={testCase.id} 
                    className={`test-case-overview ${status}`}
                    onClick={() => {
                      if (index < currentTestCaseIndex) {
                        setCurrentTestCaseIndex(index);
                        setCurrentStepIndex(0);
                        setStepResults({});
                        setStepComment('');
                        setActualResult('');
                      }
                    }}
                  >
                    <span>{testCase.name || `Тест-кейс ${index + 1}`}</span>
                    <span className="test-case-status">
                      {status === 'current' && 'Текущий'}
                      {status === 'passed' && 'Пройден'}
                      {status === 'failed' && 'Провален'}
                      {status === 'pending' && 'Ожидание'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* История выполненных шагов текущего тест-кейса */}
          {Object.keys(stepResults).length > 0 && (
            <div className="step-history">
              <h4>Выполненные шаги текущего тест-кейса:</h4>
              <div className="step-history-list">
                {Object.entries(stepResults)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([stepIndex, result]) => (
                    <div key={stepIndex} className={`step-history-item ${result.passed ? 'passed' : 'failed'}`}>
                      <div className="step-history-header">
                        <strong>Шаг {parseInt(stepIndex) + 1}: {result.step}</strong>
                        <span className={`status-badge ${result.passed ? 'status-passed' : 'status-failed'}`}>
                          {result.passed ? 'Успех' : 'Провал'}
                        </span>
                      </div>
                      <div className="step-history-details">
                        <p><strong>Ожидаемый:</strong> {result.expected}</p>
                        <p><strong>Фактический:</strong> {result.actual}</p>
                        {result.comment && (
                          <p><strong>Комментарий:</strong> {result.comment}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestExecutionModal;