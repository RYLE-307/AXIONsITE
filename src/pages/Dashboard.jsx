import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectModal from '../components/Dashboard/ProjectModal';
import TestCaseModal from '../components/Dashboard/TestCaseModal';
import TestRunModal from '../components/Dashboard/TestRunModal';
import ReportModal from '../components/Dashboard/ReportModal';
import TestCaseItem from '../components/Dashboard/TestCaseItem';



const Dashboard = ({ currentUser, onLogout, theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('test-cases');
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: "Главный проект", 
      description: "Основной проект для демонстрации",
      environment: "development",
      createdAt: new Date().toISOString()
    }
  ]);
  const [currentProjectId, setCurrentProjectId] = useState(1);
  const [testCases, setTestCases] = useState([]);
  const [testRuns, setTestRuns] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTestCaseModal, setShowTestCaseModal] = useState(false);
  const [showTestRunModal, setShowTestRunModal] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTestRun, setSelectedTestRun] = useState(null);

  // База данных ошибок для каждого теста
  const errorDatabase = {
    1: {
      location: "Страница входа, форма аутентификации",
      description: "Неверные учетные данные не вызывают ожидаемую ошибку",
      reason: "Отсутствует валидация на стороне клиента для некорректных данных",
      solution: "Добавить проверку введенных данных перед отправкой на сервер",
      stackTrace: "Error: Expected status code 401 but got 200\n    at AuthTest.validateErrorResponse (auth-test.js:45:15)\n    at AuthTest.run (auth-test.js:23:7)",
      logs: [
        { time: "14:30:12", level: "INFO", message: "Запуск теста аутентификации" },
        { time: "14:30:13", level: "INFO", message: "Ввод корректных учетных данных" },
        { time: "14:30:14", level: "SUCCESS", message: "Успешный вход в систему" },
        { time: "14:30:15", level: "INFO", message: "Ввод некорректных учетных данных" },
        { time: "14:30:16", level: "ERROR", message: "Ожидалась ошибка 401, но получен код 200" }
      ]
    },
    2: {
      location: "Страница регистрации, форма создания аккаунта",
      description: "Поле 'Email' принимает некорректные форматы email-адресов",
      reason: "Регулярное выражение для валидации email содержит ошибку",
      solution: "Исправить регулярное выражение на /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",
      stackTrace: "Error: Invalid email format was accepted\n    at RegistrationTest.validateEmailField (registration-test.js:67:22)\n    at RegistrationTest.run (registration-test.js:31:9)",
      logs: [
        { time: "14:31:05", level: "INFO", message: "Запуск теста регистрации" },
        { time: "14:31:06", level: "INFO", message: "Ввод валидных данных" },
        { time: "14:31:07", level: "SUCCESS", message: "Успешная регистрация" },
        { time: "14:31:08", level: "INFO", message: "Ввод email 'invalid-email'" },
        { time: "14:31:09", level: "ERROR", message: "Некорректный email был принят системой" }
      ]
    }
  };

  // Статистика
  const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
  const totalTests = currentProjectTests.length;
  const passedTests = currentProjectTests.filter(test => test.status === 'passed').length;
  const failedTests = currentProjectTests.filter(test => test.status === 'failed').length;
  const inProgressTests = currentProjectTests.filter(test => test.status === 'running').length;

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      createdAt: new Date().toISOString()
    };
    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
    setShowProjectModal(false);
  };

  const createTestCase = (testCaseData) => {
  console.log('Creating test case:', testCaseData); // Для отладки
  
  const newTestCase = {
    id: Date.now(),
    projectId: currentProjectId,
    status: "not-run",
    passed: false,
    errorDetails: null,
    name: testCaseData.name || 'Без названия',
    description: testCaseData.description || '',
    type: testCaseData.type || 'functional',
    priority: testCaseData.priority || 'medium',
    expectedResult: testCaseData.expectedResult || ''
  };
  
  setTestCases(prevTestCases => [...prevTestCases, newTestCase]);
  setShowTestCaseModal(false);
  
  console.log('Test case created:', newTestCase); // Для отладки
};

  const runTest = (testId) => {
    setTestCases(testCases.map(test => {
      if (test.id === testId) {
        return { ...test, status: 'running' };
      }
      return test;
    }));

    // Имитация выполнения теста
    setTimeout(() => {
      const success = Math.random() > 0.3;
      
      setTestCases(testCases.map(test => {
        if (test.id === testId) {
          return { 
            ...test, 
            status: success ? 'passed' : 'failed', 
            passed: success,
            errorDetails: !success ? errorDatabase[testId] || {
              location: "Неизвестно",
              description: "Произошла неизвестная ошибка",
              reason: "Причина не определена",
              solution: "Проверить логи приложения",
              stackTrace: "Стек вызовов недоступен",
              logs: []
            } : null
          };
        }
        return test;
      }));
    }, Math.random() * 3000 + 1000);
  };

  const deleteTestCase = (testId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот тест-кейс?')) {
      setTestCases(testCases.filter(test => test.id !== testId));
    }
  };

// И замените её на эту:
const createTestRun = (formData) => {
  console.log('Creating test run with data:', formData); // Для отладки
  
  const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
  const currentProject = projects.find(p => p.id === currentProjectId);
  
  if (currentProjectTests.length === 0) {
    alert('Нет тест-кейсов для создания тест-рана');
    return;
  }
  
  const newTestRun = {
    id: Date.now(),
    projectId: currentProjectId,
    name: formData.name || `Тест-ран #${Date.now()} - ${currentProject.name}`,
    description: formData.description,
    type: formData.type, // Добавляем тип из формы
    date: new Date().toLocaleString(),
    tests: JSON.parse(JSON.stringify(currentProjectTests)),
    status: 'not-run',
    passed: 0,
    failed: 0
  };
  
  setTestRuns([...testRuns, newTestRun]);
  setShowTestRunModal(false);
};

  const runTestRun = (testRunId) => {
    const updatedTestRuns = testRuns.map(run => {
      if (run.id === testRunId) {
        return { ...run, status: 'running' };
      }
      return run;
    });
    
    setTestRuns(updatedTestRuns);
    
    // Имитация выполнения тест-рана
    setTimeout(() => {
      const successCount = Math.floor(Math.random() * updatedTestRuns.find(r => r.id === testRunId).tests.length);
      const failedCount = updatedTestRuns.find(r => r.id === testRunId).tests.length - successCount;
      
      setTestRuns(testRuns.map(run => {
        if (run.id === testRunId) {
          return { 
            ...run, 
            status: 'completed', 
            passed: successCount, 
            failed: failedCount 
          };
        }
        return run;
      }));
    }, 3000);
  };

  const deleteTestRun = (testRunId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот тест-ран?')) {
      setTestRuns(testRuns.filter(run => run.id !== testRunId));
    }
  };

  const viewTestRunReport = (testRun) => {
    setSelectedTestRun(testRun);
    setShowReportModal(true);
  };

  return (
    <div className="main-content">
      <Header 
        currentUser={currentUser} 
        onLogout={onLogout} 
        theme={theme} 
        toggleTheme={toggleTheme}
        projects={projects}
        currentProjectId={currentProjectId}
        setCurrentProjectId={setCurrentProjectId}
        setShowProjectModal={setShowProjectModal}
      />

      <section className="hero">
        <div className="container">
          <h1>Платформа для управления тестированием</h1>
          <p>Создавайте, запускайте и анализируйте тесты для ваших проектов</p>
          <div className="hero-buttons">
            <button className="btn btn-outline" onClick={() => setActiveTab('reports')}>
              Посмотреть отчеты
            </button>
          </div>
        </div>
      </section>

      <section className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">
              Панель управления: 
            </h1>
            
          </div>
        
          <div className="stats">
            <div className="stat-card">
              <h3>Всего тест-кейсов</h3>
              <div className="number">{totalTests}</div>
            </div>
            <div className="stat-card">
              <h3>Успешно пройдено</h3>
              <div className="number">{passedTests}</div>
            </div>
            <div className="stat-card">
              <h3>Провалено</h3>
              <div className="number">{failedTests}</div>
            </div>
            <div className="stat-card">
              <h3>В процессе</h3>
              <div className="number">{inProgressTests}</div>
            </div>
          </div>
          
          <div className="tabs">
            <div 
              className={`tab nav-tab ${activeTab === 'test-cases' ? 'active' : ''}`} 
              onClick={() => setActiveTab('test-cases')}
            >
              Тест-кейсы
            </div>
            <div 
              className={`tab nav-tab ${activeTab === 'test-runs' ? 'active' : ''}`} 
              onClick={() => setActiveTab('test-runs')}
            >
              Тест-раны
            </div>
            <div 
              className={`tab nav-tab ${activeTab === 'reports' ? 'active' : ''}`} 
              onClick={() => setActiveTab('reports')}
            >
              Отчеты
            </div>
          </div>
          
        {activeTab === 'test-cases' && (
  <div className="tab-content active" id="test-cases-content">
    <div className="dashboard-header">
      <h2>Управление тест-кейсами</h2>
    </div>
    <p>Создавайте и управляйте тест-кейсами для ваших проектов:</p>
    <button className="btn btn-primary hero-buttons btn-add-test" onClick={() => setShowTestCaseModal(true)}>
              <i className="fas fa-plus"></i> Создать тест-кейс
            </button>
    {/* === ВСТАВЬТЕ РЕНДЕР ТЕСТ-КЕЙСОВ ЗДЕСЬ === */}
    <div className="test-cases" id="testCasesList">
      {currentProjectTests.length === 0 ? (
        <div className="test-case">
          <div className="test-info">
            <h3>Нет тест-кейсов</h3>
            <p>Создайте свой первый тест-кейс для этого проекта</p>
          </div>
        </div>
      ) : (
        currentProjectTests.map(testCase => (
          <div key={testCase.id} className="test-case">
            <div className="test-info">
              <h3>{testCase.name}</h3>
              <p><strong>Описание:</strong> {testCase.description}</p>
              <p><strong>Ожидаемы результат:</strong> {testCase.expectedResult}</p>
              <div className="test-meta">
                <span>
                  <i className={`fas ${
                    testCase.type === 'api' ? 'fa-code' : 
                    testCase.type === 'performance' ? 'fa-tachometer-alt' : 
                    testCase.type === 'ui' ? 'fa-desktop' : 'fa-cog'
                  }`}></i> 
                  {testCase.type === 'functional' ? 'Функциональный' : 
                   testCase.type === 'api' ? 'API' : 
                   testCase.type === 'performance' ? 'Производительность' : 'UI'}
                </span>
                <span style={{
                  color: testCase.priority === 'high' ? 'var(--danger)' : 
                         testCase.priority === 'medium' ? 'var(--warning)' : 'var(--text-secondary)'
                }}>
                  <i className="fas fa-exclamation-circle"></i> 
                  {testCase.priority === 'high' ? 'Высокий' : 
                   testCase.priority === 'medium' ? 'Средний' : 'Низкий'}
                </span>
              </div>
            </div>

            <div className="test-actions">
              <button 
                className="btn btn-sm btn-danger" 
                onClick={() => deleteTestCase(testCase.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    {/* === КОНЕЦ РЕНДЕРА ТЕСТ-КЕЙСОВ === */}
    
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{width: `${totalTests > 0 ? ((passedTests + failedTests) / totalTests) * 100 : 0}%`}}
      ></div>
    </div>
  </div>
)}
          
          {/* Контент вкладки "Тест-раны" */}
          {activeTab === 'test-runs' && (
            <div className="tab-content active" id="test-runs-content">
              <h2>Управление тест-ранами</h2>
              <p>Создавайте и запускайте тест-раны для ваших проектов:</p>
              
              <div className="controls">
                <button className="btn btn-new-run btn-primary" onClick={() => setShowTestRunModal(true)}>
                   <i className="fas fa-plus"></i> Создать тест-ран
                </button>
                {}
              </div>
              
              <div id="testRunsList">
                {testRuns.filter(run => run.projectId === currentProjectId).length === 0 ? (
                  <p>Нет тест-ранов для этого проекта</p>
                ) : (
                  testRuns.filter(run => run.projectId === currentProjectId).map(testRun => (
                    <div key={testRun.id} className="test-run">
                      <div className="test-run-header">
                        <div className="test-run-title">{testRun.name}</div>
                        <div className="test-run-date">{testRun.date}</div>
                        <div className="test-meta">
             <span>  
  {testRun.type === 'Automatic' ? 'Автоматический прогон' : 
   testRun.type === 'Hand' ? 'Ручной прогон' : `Неизвестный тип: ${testRun.type}`}
</span>
              </div>
                      </div>
                      <div className="test-run-stats">
                        <div className="test-run-stat">
                          <div className="test-run-stat-value">{testRun.tests.length}</div>
                          <div className="test-run-stat-label">Всего тестов</div>
                        </div>
                        <div className="test-run-stat">
                          <div className="test-run-stat-value">{testRun.passed}</div>
                          <div className="test-run-stat-label">Пройдено</div>
                        </div>
                        <div className="test-run-stat">
                          <div className="test-run-stat-value">{testRun.failed}</div>
                          <div className="test-run-stat-label">Провалено</div>
                        </div>
                        <div className="test-run-stat">
                          <div className="test-run-stat-value">
                            {testRun.status === 'completed' ? 'Завершен' : 'Не запущен'}
                          </div>
                          <div className="test-run-stat-label">Статус</div>
                        </div>
                      </div>
                      <div className="test-actions">
                        {testRun.status !== 'running' ? (
                          <button 
                            className="btn btn-sm btn-outline" 
                            onClick={() => runTestRun(testRun.id)}
                          >
                            Запустить
                          </button>
                        ) : (
                          <button className="btn btn-sm btn-outline" disabled>
                            Выполняется...
                          </button>
                        )}
                        {testRun.status === 'completed' && (
                          <button 
                            className="btn btn-show-log btn-sm btn-primary" 
                            onClick={() => viewTestRunReport(testRun)}
                          >
                            Просмотр отчета
                          </button>
                        )}
                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => deleteTestRun(testRun.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* Контент вкладки "Отчеты" */}
          {activeTab === 'reports' && (
            <div className="tab-content active" id="reports-content">
              <h2>Отчеты о тестировании</h2>
              <p>Анализируйте результаты тестирования с помощью детальных отчетов:</p>
              
              <div className="stats">
                <div className="stat-card">
                  <h3>Общая статистика</h3>
                  <div className="number">{totalTests}</div>
                  <p>Всего тестов</p>
                </div>
                <div className="stat-card">
                  <h3>Успешность</h3>
                  <div className="number">
                    {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
                  </div>
                  <p>Процент успеха</p>
                </div>
                <div className="stat-card">
                  <h3>Найдено багов</h3>
                  <div className="number">{failedTests}</div>
                  <p>За все время</p>
                </div>
              </div>
              
              <div className="test-results">
                <h3>История запусков</h3>
                <div className="result-content" id="historyOutput">
                  {testRuns.filter(run => run.projectId === currentProjectId).length === 0 ? (
                    <div className="result-line result-success">Нет данных о запусках</div>
                  ) : (
                    testRuns
                      .filter(run => run.projectId === currentProjectId)
                      .slice(0, 5)
                      .map(run => (
                        <div key={run.id} className={`result-line ${
                          run.status === 'completed' ? 'result-success' : 'result-warning'
                        }`}>
                          {run.date} - {run.name} ({run.passed}/{run.tests.length} пройдено)
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Модальные окна */}
      {showProjectModal && (
        <ProjectModal 
          onClose={() => setShowProjectModal(false)} 
          onCreate={createProject} 
        />
      )}
      
      {showTestCaseModal && (
        <TestCaseModal 
          onClose={() => setShowTestCaseModal(false)} 
          onCreate={createTestCase} 
        />
      )}
      
{showTestRunModal && (
        <TestRunModal 
          onClose={() => setShowTestRunModal(false)} 
          onCreate={createTestRun} 
        />
      )}

      {showReportModal && selectedTestRun && (
        <ReportModal 
          testRun={selectedTestRun} 
          onClose={() => setShowReportModal(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;