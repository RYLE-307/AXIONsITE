import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectModal from '../components/Dashboard/ProjectModal';
import ManualReportModal from '../components/Dashboard/ManualReportModal';
import TestRunModal from '../components/Dashboard/TestRunModal';
import ReportModal from '../components/Dashboard/ReportModal';
import TestCaseItemModal from '../components/Dashboard/TestCaseItemModal';
import TestCaseCategoryModal from '../components/Dashboard/TestCaseCategoryModal';



const Dashboard = ({ currentUser, onLogout, theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('test-cases');
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: "Главный проект", 
      description: "Основной проект для демонстрации",
      environment: "Разработка",
      environment1: "CI/CD",
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
setTestCases(prevTestCases => {
  return prevTestCases.map(testCase => {
    const updatedTest = updatedTests.find(t => t.id === testCase.id);
    if (updatedTest) {
      return {
        ...testCase,
        status: updatedTest.status,
        passed: updatedTest.passed,
        errorDetails: updatedTest.errorDetails
      };
    }
    return testCase;
  });
});

  // Имитация выполнения теста
  setTimeout(() => {
    const success = Math.random() > 0.3;
    setTestCases(prevTestCases => 
      prevTestCases.map(test => {
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
      })
    );
  }, Math.random() * 3000 + 1000);
};
const deleteTestCase = (testCaseId, categoryId) => {
  if (window.confirm('Вы уверены, что хотите удалить этот тест-кейс?')) {
    setTestCaseCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              testCases: category.testCases.filter(test => test.id !== testCaseId)
            }
          : category
      )
    );
  }
};

const deleteTestCaseCategory = (categoryId) => {
  if (window.confirm('Вы уверены, что хотите удалить эту категорию? Все тест-кейсы внутри нее также будут удалены.')) {
    setTestCaseCategories(prevCategories => 
      prevCategories.filter(category => category.id !== categoryId)
    );
  }
};


const createTestRun = (formData) => {
  console.log('Creating test run with data:', formData);
  
  const { selectedTestCases, ...runData } = formData;
  
  // Получаем все тест-кейсы из всех категорий
  const allTestCasesFromCategories = testCaseCategories.flatMap(category => category.testCases);
  
  // Получаем выбранные тест-кейсы с ВСЕМИ полями
  const selectedTests = allTestCasesFromCategories.filter(test => 
    selectedTestCases.includes(test.id)
  ).map(test => ({
    ...test,
    // Убедимся, что все необходимые поля присутствуют
    errorDetails: test.errorDetails || null,
    passed: test.passed || false,
    status: test.status || 'not-run'
  }));
  
  const currentProject = projects.find(p => p.id === currentProjectId);
  
  if (selectedTests.length === 0) {
    alert('Нет выбранных тест-кейсов для создания тест-рана');
    return;
  }
  
  const newTestRun = {
    id: Date.now(),
    projectId: currentProjectId,
    name: runData.name || `Тест-ран #${Date.now()} - ${currentProject.name}`,
    description: runData.description,
    type: runData.type,
    date: new Date().toLocaleString(),
    tests: selectedTests, // Используем подготовленные тесты
    status: 'not-run',
    passed: 0,
    failed: 0
  };
  
  setTestRuns([...testRuns, newTestRun]);
  setShowTestRunModal(false);
};

const updateTestResult = (testRunId, testId, passed) => {
  setTestRuns(prev =>
    prev.map(run => {
      if (run.id === testRunId) {
        const updatedTests = run.tests.map(test =>
          test.id === testId
            ? { ...test, status: "completed", passed }
            : test
        );
        
        const passedCount = updatedTests.filter(t => t.passed).length;
        const failedCount = updatedTests.filter(t => t.status === "completed" && !t.passed).length;
        
        // Также обновляем тест-кейс в категориях
        setTestCaseCategories(prevCategories =>
          prevCategories.map(category => ({
            ...category,
            testCases: category.testCases.map(tc =>
              tc.id === testId
                ? { ...tc, status: "completed", passed, errorDetails: passed ? null : (tc.errorDetails || {}) }
                : tc
            )
          }))
        );

        return {
          ...run,
          tests: updatedTests,
          passed: passedCount,
          failed: failedCount,
          status: updatedTests.every(t => t.status === "completed") ? "completed" : "running"
        };
      }
      return run;
    })
  );
};
// Статистика по тест-ранам
const currentProjectRuns = testRuns.filter(run => run.projectId === currentProjectId);
const totalRuns = currentProjectRuns.length;
const completedRuns = currentProjectRuns.filter(run => run.status === 'completed').length;
const runningRuns = currentProjectRuns.filter(run => run.status === 'running').length;
const notRunRuns = currentProjectRuns.filter(run => run.status === 'not-run').length;

 
const [testCaseCategories, setTestCaseCategories] = useState([
 
]);

const [showCategoryModal, setShowCategoryModal] = useState(false);
const [showTestCaseItemModal, setShowTestCaseItemModal] = useState(false);
const [draggedTestCase, setDraggedTestCase] = useState(null);

// Функция создания категории
const createTestCaseCategory = (categoryData) => {
  const newCategory = {
    id: Date.now(),
    ...categoryData,
    testCases: []
  };
  setTestCaseCategories([...testCaseCategories, newCategory]);
  setShowCategoryModal(false);
};

// Функция создания тест-кейса внутри категории
const createTestCaseInCategory = (testCaseData) => {
  const { categoryId, ...testCase } = testCaseData;
  
  const newTestCase = {
    id: Date.now(),
    projectId: currentProjectId,
    status: "not-run",
    passed: false,
    errorDetails: null,
    ...testCase
  };

  setTestCaseCategories(prevCategories =>
    prevCategories.map(category =>
      category.id === parseInt(categoryId)
        ? { ...category, testCases: [...category.testCases, newTestCase] }
        : category
    )
  );
  setShowTestCaseItemModal(false);
};

// Функция перемещения тест-кейса между категориями
const moveTestCaseToCategory = (testCaseId, fromCategoryId, toCategoryId) => {
  if (fromCategoryId === toCategoryId) return;

  setTestCaseCategories(prevCategories => {
    const updatedCategories = [...prevCategories];
    
    // Находим исходную категорию и тест-кейс
    const fromCategory = updatedCategories.find(cat => cat.id === fromCategoryId);
    const toCategory = updatedCategories.find(cat => cat.id === toCategoryId);
    
    if (!fromCategory || !toCategory) return prevCategories;

    const testCaseToMove = fromCategory.testCases.find(tc => tc.id === testCaseId);
    if (!testCaseToMove) return prevCategories;

    // Удаляем из исходной категории и добавляем в целевую
    return updatedCategories.map(category => {
      if (category.id === fromCategoryId) {
        return {
          ...category,
          testCases: category.testCases.filter(tc => tc.id !== testCaseId)
        };
      }
      if (category.id === toCategoryId) {
        return {
          ...category,
          testCases: [...category.testCases, testCaseToMove]
        };
      }
      return category;
    });
  });
};

// Drag and Drop handlers
const handleDragStart = (e, testCase, categoryId) => {
  setDraggedTestCase({ ...testCase, sourceCategoryId: categoryId });
  e.dataTransfer.effectAllowed = 'move';
};

const handleDragOver = (e, categoryId) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const handleDrop = (e, targetCategoryId) => {
  e.preventDefault();
  if (draggedTestCase && draggedTestCase.sourceCategoryId !== targetCategoryId) {
    moveTestCaseToCategory(draggedTestCase.id, draggedTestCase.sourceCategoryId, targetCategoryId);
  }
  setDraggedTestCase(null);
};

const runTestRun = (testRunId) => {
  // Находим тест-ран по ID
  const testRun = testRuns.find(run => run.id === testRunId);
  if (!testRun) return;

  if (testRun.type === "Hand") {
    // Для ручного режима меняем статус на running и сбрасываем результаты
    setTestRuns(prev =>
      prev.map(run =>
        run.id === testRunId
          ? {
              ...run,
              status: "running",
              tests: run.tests.map(test => ({ ...test, status: "not-run" })),
              passed: 0,
              failed: 0
            }
          : run
      )
    );
  } else {
    // Для автоматического режима
    setTestRuns(prevRuns =>
      prevRuns.map(run => {
        if (run.id !== testRunId) return run;
        
        // Запускаем тест-ран
        const updatedTests = run.tests.map(test => ({
          ...test,
          status: 'running'
        }));
        
        return { ...run, status: 'running', tests: updatedTests };
      })
    );

    // Имитация автоматической проверки
    setTimeout(() => {
      setTestRuns(prevRuns =>
        prevRuns.map(run => {
          if (run.id !== testRunId) return run;
          
          // Генерируем случайные результаты с деталями ошибок
          const updatedTests = run.tests.map(test => {
            const passed = Math.random() > 0.5;
            
            return {
              ...test,
              status: passed ? 'passed' : 'failed',
              passed: passed,
              // Добавляем детали ошибок для неудачных тестов
              ...(!passed && {
                errorDetails: errorDatabase[test.id] || {
                  location: "Неизвестно",
                  description: "Произошла неизвестная ошибка",
                  reason: "Причина не определена",
                  solution: "Проверить логи приложения",
                  stackTrace: "Стек вызовов недоступен",
                  logs: []
                }
              })
            };
          });
          
          const passedCount = updatedTests.filter(t => t.passed).length;
          const failedCount = updatedTests.filter(t => !t.passed).length;
          
          return {
            ...run, 
            status: 'completed', 
            tests: updatedTests,
            passed: passedCount,
            failed: failedCount
          };
        })
      );
    }, 2000);
  }
};
//setTimeout(() => {
    // const successCount = Math.floor(Math.random() * test.status(r => r.id === testRunId).tests.length);
     //  const failedCount = test.status(r => r.id === testRunId).tests.length - successCount;})
               
  const deleteTestRun = (testRunId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот тест-ран?')) {
      setTestRuns(testRuns.filter(run => run.id !== testRunId));
    }
  };

  const viewTestRunReport = (testRun) => {
    setSelectedTestRun(testRun);
    setShowReportModal(true);
  };


const [showManualReportModal, setShowManualReportModal] = useState(false);
const [manualReports, setManualReports] = useState([]);

// Функция сохранения ручного отчета
const saveManualReport = (reportData) => {
  const newReport = {
    id: Date.now(),
    ...reportData,
    projectId: currentProjectId
  };
  setManualReports([...manualReports, newReport]);
  setShowManualReportModal(false);
  alert('Отчет успешно сохранен!');
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
        <h1>Проект {projects.find(proj => proj.id === currentProjectId)?.name || 'Проект не найден'}</h1>
        <p>{projects.find(proj => proj.id === currentProjectId)?.description || 'Проект не найден'}</p>
        <p>{projects.find(proj => proj.id === currentProjectId)?.environment || 'Проект не найден'}</p>
        <p>{projects.find(proj => proj.id === currentProjectId)?.environment1 || 'Проект не найден'}</p>

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
    <h3>Всего тест-ранов</h3>
    <div className="number">{totalRuns}</div>
  </div>
  <div className="stat-card">
    <h3>В процессе</h3>
    <div className="number">{runningRuns}</div>
  </div>
  <div className="stat-card">
    <h3>Завершено</h3>
    <div className="number">{completedRuns}</div>
  </div>
  <div className="stat-card">
    <h3>В ожидании</h3>
    <div className="number">{notRunRuns}</div>
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
              История
            </div>
          </div>
          
    {activeTab === 'test-cases' && (
  <div className="tab-content active" id="test-cases-content">
    <div className="dashboard-header">
      <h2>Управление тест-кейсами</h2>
    </div>
    <p>Создавайте категории и управляйте тест-кейсами:</p>
    
    <div className="category-controls">
      <button className="btn btn-primary" onClick={() => setShowCategoryModal(true)}>
        <i className="fas fa-folder-plus"></i> Создать группу кейсов
      </button>
      <button className="btn btn-outline" onClick={() => setShowTestCaseItemModal(true)}>
        <i className="fas fa-plus"></i> Создать тест-кейс
      </button>
    </div>

    {/* Рендер категорий */}
    <div className="test-case-categories">
      {testCaseCategories.map(category => (
        <div 
          key={category.id} 
          className="test-case-category"
          onDragOver={(e) => handleDragOver(e, category.id)}
          onDrop={(e) => handleDrop(e, category.id)}
        >
        <div className="category-header">
  <div className="category-info">
    <h3>{category.name}</h3>
    {category.description && <p>{category.description}</p>}
    <span className="category-stats">
      {category.testCases.length} тест-кейсов
    </span>
  </div>
  <div className="category-actions">
    <button 
      className="btn btn-sm btn-outline"
      onClick={() => {
        setShowTestCaseItemModal(true);
      }}
    >
      <i className="fas fa-plus"></i> Добавить тест-кейс
    </button>
    <button 
      className="btn btn-sm btn-danger" 
      onClick={() => deleteTestCaseCategory(category.id)}
    >
      <i className="fas fa-trash"></i> Удалить категорию
    </button>
  </div>
</div>

          {/* Рендер тест-кейсов в категории */}
          <div className="category-test-cases">
            {category.testCases.length === 0 ? (
              <div className="empty-category">
                <p>Нет тест-кейсов в этой категории</p>
                <p className="drop-hint">Перетащите тест-кейсы сюда</p>
              </div>
            ) : (
              category.testCases.map(testCase => (
                <div 
                  key={testCase.id} 
                  className="test-case-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, testCase, category.id)}
                >
                  <div className="test-case-content">
                    <h4>{testCase.name}</h4>
                    <p>{testCase.description}</p>
                    <div className="test-case-meta">
                      <span className={`priority-${testCase.priority}`}>
                        {testCase.priority === 'high' ? 'Высокий' : 
                         testCase.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
                      </span>
                      <span className={`type-${testCase.type}`}>
                        {testCase.type === 'functional' ? 'Функциональный' : 
                         testCase.type === 'api' ? 'API' : 
                         testCase.type === 'performance' ? 'Производительность' : 'UI'}
                      </span>
                    </div>
                  </div>
                  <div className="test-case-actions">
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => deleteTestCase(testCase.id, category.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <span className="drag-handle">
                      <i className="fas fa-grip-vertical"></i>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          
          {/* вкладкa Тест-раны */}
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
                            Просмотр авто-отчета
                          </button>
                        )}

                       
{testRun.status === 'completed' && (
  <button 
    className="btn btn-show-log btn-careateReport btn-primary" 
    onClick={() => {
      setSelectedTestRun(testRun);
      setShowManualReportModal(true);
    }}
  >
    <i className="fas fa-edit"></i> Создать отчет
  </button>
)}

                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => deleteTestRun(testRun.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      {testRun.status === "running" && testRun.type === "Hand" && (
                          <div className="manual-controls">
                            <h4>Ручное управление:</h4>
                            {testRun.tests.map(test => (
                              <div key={test.id} className="manual-test">
                                <span>{test.name} - {test.status === "completed" ? "Завершен" : "Ожидание"}</span>
                                {test.status !== "completed" ? (
                                  <>
                                    <button onClick={() => updateTestResult(testRun.id, test.id, true)}>
                                         Пройден
                                    </button>
                                    <button onClick={() => updateTestResult(testRun.id, test.id, false)}>
                                      Провален
                                    </button>
                                  </>
                               ) : (
                                  <span style={test.passed ? {} : { color: 'red' }}>Результат: {test.passed ? "Пройден" : "Провален"}</span>
                                )}
                             </div>
                           ))}
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* вкладкa История */}
          {activeTab === 'reports' && (
            <div className="tab-content active" id="reports-content">
              <h2>История запусков тестирования</h2>
              <p>Анализируйте результаты тестирования с помощью детальных отчетов:</p>
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
// В секции модальных окон Dashboard.jsx добавьте:

{showProjectModal && (
  <ProjectModal 
    onClose={() => setShowProjectModal(false)} 
    onCreate={createProject} 
  />
)}

{showCategoryModal && (
  <TestCaseCategoryModal 
    onClose={() => setShowCategoryModal(false)} 
    onCreate={createTestCaseCategory} 
  />
)}

{showTestCaseItemModal && (
  <TestCaseItemModal 
    onClose={() => setShowTestCaseItemModal(false)} 
    onCreate={createTestCaseInCategory}
    categories={testCaseCategories}
  />
)}

{showTestRunModal && (
  <TestRunModal 
    onClose={() => setShowTestRunModal(false)} 
    onCreate={createTestRun}
    categories={testCaseCategories}
  />
)}


{showManualReportModal && selectedTestRun && (
  <ManualReportModal 
    testRun={selectedTestRun}
    onClose={() => setShowManualReportModal(false)}
    onSave={saveManualReport}
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