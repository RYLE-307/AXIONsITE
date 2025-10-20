import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectModal from '../components/Dashboard/ProjectModal';
import ManualReportModal from '../components/Dashboard/ManualReportModal';
import TestRunModal from '../components/Dashboard/TestRunModal';
import ReportModal from '../components/Dashboard/ReportModal';
import TestCaseItemModal from '../components/Dashboard/TestCaseItemModal';
import TestCaseCategoryModal from '../components/Dashboard/TestCaseCategoryModal';
import '../styles/global.css';
import '../styles/dashboard.css';
import '../styles/reports.css';
import TestPlanModal from '../components/Dashboard/TestPlanModal';
import DistributionModal from '../components/Dashboard/DistributionModal';
import TestExecutionModal from '../components/Dashboard/TestExecutionModal';
import UserManagementModal from '../components/Dashboard/UserManagementModal';
import { getRoleDisplayName } from '../utils/roles';
import apiService from '../services/api';
import { useToast } from '../components/UI/ToastContext';

const Dashboard = ({ currentUser, onLogout, theme, toggleTheme, hasPermission }) => {
  // Состояния
  const [activeTab, setActiveTab] = useState('test-cases');
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testRuns, setTestRuns] = useState([]);
  const [testPlans, setTestPlans] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [manualReports, setManualReports] = useState([]);
  const [testCaseCategories, setTestCaseCategories] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  
  // Модальные окна
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTestRunModal, setShowTestRunModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTestRun, setSelectedTestRun] = useState(null);
  const [showTestPlanModal, setShowTestPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [currentExecutingTestRun, setCurrentExecutingTestRun] = useState(null);
  const [showUserManagementModal, setShowUserManagementModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTestCaseItemModal, setShowTestCaseItemModal] = useState(false);
  const [showManualReportModal, setShowManualReportModal] = useState(false);
  
  // UI состояния
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedTestCase, setDraggedTestCase] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [users, setUsers] = useState([]);

  const { addToast } = useToast();

  
  useEffect(() => {
    initializeData();
  }, []);


  useEffect(() => {
    if (currentProjectId) {
      loadProjectData(currentProjectId);
    }
  }, [currentProjectId]);

  const initializeData = async () => {
  try {
    setLoading(true);
    setError(null);
    
   
    await Promise.all([
      loadProjects(),
      loadUsers(),
      loadDistributions()
    ]);
    
   
    if (currentProjectId) {
      await loadProjectData(currentProjectId);
    }
    
  } catch (err) {
    console.error('Failed to initialize data:', err);
    setError('Ошибка загрузки данных. Проверьте подключение к серверу.');
    
    
  addToast('Не удалось загрузить данные. Проверьте подключение к интернету.', 'error');
  } finally {
    setLoading(false);
  }
};

const handleApiError = (err, context) => {
  console.error(`Failed to ${context}:`, err);
  
  if (err.response) {
    switch (err.response.status) {
      case 401:
        return 'Требуется авторизация';
      case 403:
        return `Недостаточно прав для ${context}`;
      case 404:
        return `Ресурс не найден (${context})`;
      case 500:
        return `Ошибка сервера при ${context}`;
      default:
        return `Ошибка ${err.response.status} при ${context}`;
    }
  } else if (err.request) {
    return 'Нет соединения с сервером';
  } else {
    return `Ошибка при ${context}`;
  }
};


  const loadProjects = async () => {
    try {
      const projectsData = await apiService.listProjects();
      setProjects(projectsData);
      
      if (projectsData.length > 0 && !currentProjectId) {
        setCurrentProjectId(projectsData[0].id);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      //Локальные даннные для проекта для демонстрации работы
      setProjects([{
        id: 1, 
        name: "Главный проект", 
        description: "Основной проект для демонстрации",
        environment: "Разработка",
        environment1: "CI/CD",
        createdAt: new Date().toISOString()
      }]);
      setCurrentProjectId(1);
    }
  };

  const loadProjectData = async (projectId) => {
    try {
      await Promise.all([
        loadTestCases(projectId),
        loadTestRuns(projectId),
        loadTestPlans(projectId),
        loadProjectStatuses(projectId)
      ]);
    } catch (err) {
      console.error('Failed to load project data:', err);
    }
  };

const loadTestCases = async (projectId) => {
  try {
  
    
   
      const [testCasesData, categoriesData] = await Promise.all([
      apiService.listTestCases(projectId),
      apiService.listTestCaseCategories(projectId)
    ]);
    
    
    const formattedCategories = categoriesData.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      projectId: category.project_id || projectId,
      planId: category.plan_id || null,
      testCases: []
    }));
    
    
    testCasesData.forEach(testCase => {
      const categoryId = testCase.category_id;
      const category = formattedCategories.find(cat => cat.id === categoryId);
      
      if (category) {
        category.testCases.push({
          id: testCase.id,
          name: testCase.title || testCase.name,
          description: testCase.description || '',
          priority: testCase.priority || 'medium',
          type: testCase.type || 'functional',
          status: testCase.status || 'not-run',
          steps: testCase.steps || [],
          projectId: testCase.project_id || projectId
        });
      }
    });
    
    setTestCaseCategories(formattedCategories);
    
  } catch (err) {
    console.error('Failed to load test cases:', err);
    

  } 
};

const loadTestRuns = async (projectId) => {
  try {
    
    const testRunsData = await apiService.listTestRuns(projectId);
    
    const formattedTestRuns = testRunsData.map(testRun => ({
      id: testRun.id,
      projectId: testRun.project_id || projectId,
      name: testRun.name,
      description: testRun.description || '',
      type: testRun.type || 'Automatic',
      status: testRun.status || 'not-run',
      date: testRun.created_at ? new Date(testRun.created_at).toLocaleString() : new Date().toLocaleString(),
      tests: testRun.test_cases || testRun.tests || [],
      passed: testRun.passed_count || testRun.passed || 0,
      failed: testRun.failed_count || testRun.failed || 0,
      total: testRun.total_tests || testRun.tests?.length || 0,
      startTime: testRun.started_at,
      endTime: testRun.completed_at
    }));
    
    setTestRuns(formattedTestRuns);
    
  } catch (err) {
    console.error('Failed to load test runs:', err);
    

  }
};

const loadTestPlans = async (projectId) => {
  try {
    const testPlansData = await apiService.listTestPlans(projectId);
    
    const formattedTestPlans = testPlansData.map(plan => ({
      id: plan.id,
      projectId: plan.project_id || projectId,
      name: plan.name,
      description: plan.description || '',
      version: plan.version || '1.0',
      status: plan.status || 'active',
      createdAt: plan.created_at || new Date().toISOString(),
      testCaseCount: plan.test_case_count || 0,
      selectedDistributions: plan.selected_distributions || plan.selectedDistributions || []
    }));
    
    setTestPlans(formattedTestPlans);
    
  } catch (err) {
    console.error('Failed to load test plans:', err);
    
  
  }
};

const loadProjectStatuses = async (projectId) => {
  try {
    const statuses = await apiService.listProjectStatuses(projectId);
    
    
    if (statuses && statuses.length > 0) {
      const latestStatus = statuses[statuses.length - 1]; 
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, status: latestStatus.status }
          : project
      ));
    }
    
  } catch (err) {
    console.error('Failed to load project statuses:', err);
  }
};

const loadUsers = async () => {
  try {
    if (!hasPermission(currentUser, 'viewUsers')) {
      setUsers([currentUser]);
      return;
    }
    
    const usersData = await apiService.listUsers();
    
    const formattedUsers = usersData.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedProjects: user.assigned_projects || [],
      isActive: user.is_active !== false,
      lastLogin: user.last_login
    }));
    
    setUsers(formattedUsers);
    
  } catch (err) {
    console.error('Failed to load users:', err);
    setUsers([currentUser]);
  }
};

const loadDistributions = async () => {
  try {
    if (!hasPermission(currentUser, 'viewDistributions')) {
      setDistributions([]);
      return;
    }
    
  const distributionsData = await apiService.listDistributions(currentProjectId);
    
    const formattedDistributions = distributionsData.map(dist => ({
      id: dist.id,
      name: dist.name,
      version: dist.version,
      type: dist.type || 'release',
      status: dist.status || 'stable',
      description: dist.description || '',
      downloadUrl: dist.download_url,
      createdAt: dist.created_at
    }));
    
    setDistributions(formattedDistributions);
    
  } catch (err) {
    console.error('Failed to load distributions:', err);
    

  }
};

  
  const hasAccessToCurrentProject = () => {
    if (!currentUser) return false;
    if (currentUser.role === 'senior_admin') return true;
    if (currentUser.role === 'admin') {
      return currentUser.assignedProjects?.includes(currentProjectId) || true;
    }
    return true;
  };

  const canCreate = (type) => {
    if (!currentUser) return false;
    
    const permissions = {
      'project': hasPermission(currentUser, 'createProject'),
      'testRun': hasPermission(currentUser, 'createTestRun') && hasAccessToCurrentProject(),
      'testCase': hasPermission(currentUser, 'createTestCase') && hasAccessToCurrentProject(),
      'testPlan': hasPermission(currentUser, 'createTestPlan') && hasAccessToCurrentProject(),
    };
    
    return permissions[type] || false;
  };

  const canRun = () => {
    return hasPermission(currentUser, 'runTestRun') && hasAccessToCurrentProject();
  };

  const canManageUsers = () => {
    return hasPermission(currentUser, 'manageUsers');
  };

  
const createProject = async (projectData) => {
  console.log('createProject called with:', projectData); 
  
    if (!canCreate('project')) {
    addToast('У вас нет прав для создания проектов', 'error');
    return;
  }

  try {
    console.log('Sending API request...'); 
    
    const newProject = await apiService.createProject({
      name: projectData.name,
      description: projectData.description,
      environment: projectData.environment,
      environment1: projectData.environment1,
    });

    console.log('API response:', newProject); 

    setProjects(prev => [...prev, newProject]);
    setCurrentProjectId(newProject.id);
  setShowProjectModal(false);
  addToast('Проект успешно создан!', 'success');
  } catch (err) {
    console.error('Failed to create project:', err);
    addToast('Ошибка при создании проекта: ' + (err.message || 'Неизвестная ошибка'), 'error');
  }
};
  const createTestCaseCategory = async (categoryData) => {
    try {
      const payload = {
        name: categoryData.name,
        description: categoryData.description,
        plan_id: categoryData.plan_id ? Number(categoryData.plan_id) : (currentPlanId || null)
      };
      await apiService.createTestCaseCategory(currentProjectId, payload);
      await loadTestCases(currentProjectId);
      setExpandedCategories(prev => ({ ...prev, [payload.id]: true }));
      setShowCategoryModal(false);
    } catch (err) {
      addToast('Ошибка при создании группы', 'error');
      console.error('Failed to create category:', err);
    }
  };

  const createTestCaseInCategory = async (testCaseData) => {
    if (!canCreate('testCase')) {
      addToast('У вас нет прав для создания тест-кейсов', 'error');
      return;
    }

    try {
      const payload = {
        title: testCaseData.name,
        description: testCaseData.description,
        type: testCaseData.type,
        priority: testCaseData.priority,
        expected_result: testCaseData.expectedResult,
        category_id: parseInt(testCaseData.categoryId),
        steps: testCaseData.steps || []
      };
      await apiService.createTestCase(currentProjectId, payload);
      await loadTestCases(currentProjectId);
      setShowTestCaseItemModal(false);
    } catch (err) {
      addToast('Ошибка при создании тест-кейса', 'error');
      console.error('Failed to create test case:', err);
    }
  };

  const createTestRun = async (formData) => {
    if (!canCreate('testRun')) {
      addToast('У вас нет прав для создания тест-ранов', 'error');
      return;
    }

    try {
      const payload = {
        project_id: currentProjectId,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        test_case_ids: formData.selectedTestCases
      };
      await apiService.createRun(payload);
      await loadTestRuns(currentProjectId);
      setShowTestRunModal(false);
    } catch (err) {
      addToast('Ошибка при создании тест-рана', 'error');
      console.error('Failed to create test run:', err);
    }
  };

  const runTestRun = async (testRunId) => {
    if (!canRun()) {
      addToast('У вас нет прав для запуска тест-ранов', 'error');
      return;
    }

    const testRun = testRuns.find(run => run.id === testRunId);
    if (!testRun) return;

    if (testRun.type === "Hand") {
      runManualTestRun(testRunId);
    } else {
      await startAutomatedTestRun(testRunId);
    }
  };

  const runManualTestRun = (testRunId) => {
    const testRun = testRuns.find(run => run.id === testRunId);
    
    if (!testRun || !testRun.tests || testRun.tests.length === 0) {
      addToast('В тест-ране нет тест-кейсов для выполнения', 'error');
      return;
    }

    setTestRuns(prev =>
      prev.map(run =>
        run.id === testRunId
          ? {
              ...run,
              status: "running",
              tests: run.tests.map(test => ({ 
                ...test, 
                status: "not-run",
                passed: false,
                steps: test.steps || [],
                stepResults: test.stepResults || []
              })),
              passed: 0,
              failed: 0,
              startTime: new Date().toISOString()
            }
          : run
      )
    );

    setCurrentExecutingTestRun(testRunId);
    setShowExecutionModal(true);
  };

  const startAutomatedTestRun = async (testRunId) => {
    try {
      setTestRuns(prevRuns =>
        prevRuns.map(run => {
          if (run.id !== testRunId) return run;
          
          const updatedTests = run.tests.map(test => ({
            ...test,
            status: 'running'
          }));
          
          return { ...run, status: 'running', tests: updatedTests };
        })
      );

      
      setTimeout(() => {
        completeAutomatedTestRun(testRunId);
      }, 3000);

    } catch (err) {
      console.error('Failed to start automated test run:', err);
    }
  };

  const completeAutomatedTestRun = (testRunId) => {
    setTestRuns(prevRuns =>
      prevRuns.map(run => {
        if (run.id !== testRunId) return run;
        
        const updatedTests = run.tests.map(test => {
          const passed = Math.random() > 0.3;
          return {
            ...test,
            status: passed ? 'passed' : 'failed',
            passed: passed
          };
        });
        
        const passedCount = updatedTests.filter(t => t.passed).length;
        const failedCount = updatedTests.filter(t => !t.passed).length;
        
        return {
          ...run, 
          status: 'completed', 
          tests: updatedTests,
          passed: passedCount,
          failed: failedCount,
          endTime: new Date().toISOString()
        };
      })
    );
  };

  const handleTestRunExecutionComplete = (executionData) => {
    const { testRunId, results } = executionData;
    
    setTestRuns(prev =>
      prev.map(run => {
        if (run.id !== testRunId) return run;
        
        const updatedTests = run.tests.map(test => {
          const result = results.find(r => r.testCaseId === test.id);
          return result ? { ...test, ...result } : test;
        });
        
        const passedCount = updatedTests.filter(t => t.passed).length;
        const failedCount = updatedTests.filter(t => !t.passed).length;
        
        return {
          ...run,
          tests: updatedTests,
          passed: passedCount,
          failed: failedCount,
          status: 'completed',
          endTime: new Date().toISOString()
        };
      })
    );

  setShowExecutionModal(false);
  setCurrentExecutingTestRun(null);
  addToast('Тест-ран завершен!', 'success');
  };

  const deleteTestRun = (testRunId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот тест-ран?')) return;
    const remove = async () => {
      try {
  await apiService.deleteRun(testRunId);
  await loadTestRuns(currentProjectId);
      } catch (err) {
        console.error('Failed to delete run:', err);
  addToast('Не удалось удалить тест-ран', 'error');
      }
    };
    remove();
  };

  const deleteTestCase = (testCaseId, categoryId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот тест-кейс?')) return;
    const remove = async () => {
      try {
  await apiService.deleteTestCase(testCaseId);
  await loadTestCases(currentProjectId);
      } catch (err) {
        console.error('Failed to delete test case:', err);
  addToast('Не удалось удалить тест-кейс', 'error');
      }
    };
    remove();
  };

  const deleteTestCaseCategory = (categoryId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту группу? Все тест-кейсы внутри нее также будут удалены.')) return;
    const remove = async () => {
      try {
  await apiService.deleteTestCaseCategory(categoryId);
  await loadTestCases(currentProjectId);
      } catch (err) {
        console.error('Failed to delete category:', err);
  addToast('Не удалось удалить группу', 'error');
      }
    };
    remove();
  };

  const saveManualReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      ...reportData,
      projectId: currentProjectId
    };
    setManualReports([...manualReports, newReport]);
  setShowManualReportModal(false);
  addToast('Отчет успешно сохранен!', 'success');
  };

  const createTestPlan = (planData) => {
    const create = async () => {
      try {
        const payload = {
          name: planData.name,
          description: planData.description,
          version: planData.version,
          objective: planData.objective,
          scope: planData.scope,
          selected_distributions: planData.selectedDistributions || []
        };
  await apiService.createTestPlan(currentProjectId, payload);
  await loadTestPlans(currentProjectId);
  setShowTestPlanModal(false);
      } catch (err) {
        console.error('Failed to create test plan:', err);
  addToast('Не удалось создать тест-план', 'error');
      }
    };
    create();
  };

  const updateTestPlan = (planId, planData) => {
    const update = async () => {
      try {
        await apiService.updateTestPlan(planId, {
          name: planData.name,
          description: planData.description,
          selected_distributions: planData.selectedDistributions || []
        });
        await loadTestPlans(currentProjectId);
      } catch (err) {
        console.error('Failed to update test plan:', err);
        addToast('Не удалось обновить тест-план', 'error');
      }
    };
    update();
  };

  const editTestPlan = (plan) => {
    setEditingPlan(plan);
    setShowTestPlanModal(true);
  };

  const deleteTestPlan = (planId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот тест-план?')) return;
    const remove = async () => {
      try {
        await apiService.deleteTestPlan(planId);
        await loadTestPlans(currentProjectId);
        addToast('Тест-план удалён', 'success');
      } catch (err) {
        console.error('Failed to delete test plan:', err);
        addToast('Не удалось удалить тест-план', 'error');
      }
    };
    remove();
  };

  const createDistribution = (distroData) => {
    const create = async () => {
      try {
  const created = await apiService.createDistribution(currentProjectId, distroData);
  setDistributions(prev => [...prev, created]);
  setShowDistributionModal(false);
      } catch (err) {
        console.error('Failed to create distribution:', err);
  addToast('Не удалось создать дистрибутив', 'error');
      }
    };
    create();
  };

  const deleteDistribution = (distroId) => {
    if (!window.confirm('Вы уверены, что хотите удалить дистрибутив?')) return;
    const remove = async () => {
      try {
        await apiService.deleteDistribution(distroId);
        setDistributions(prev => prev.filter(d => d.id !== distroId));
        
        setTestPlans(prev => prev.map(plan => ({
          ...plan,
          selectedDistributions: (plan.selectedDistributions || []).filter(id => id !== distroId)
        })));
      } catch (err) {
        console.error('Failed to delete distribution:', err);
        addToast('Не удалось удалить дистрибутив', 'error');
      }
    };
    remove();
  };

  
  const moveTestCaseToCategory = (testCaseId, fromCategoryId, toCategoryId) => {
    if (fromCategoryId === toCategoryId) return;

    setTestCaseCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      
      const fromCategory = updatedCategories.find(cat => cat.id === fromCategoryId);
      const toCategory = updatedCategories.find(cat => cat.id === toCategoryId);
      
      if (!fromCategory || !toCategory) return prevCategories;

      const testCaseToMove = fromCategory.testCases.find(tc => tc.id === testCaseId);
      if (!testCaseToMove) return prevCategories;

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

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const viewTestRunReport = (testRun) => {
    setSelectedTestRun(testRun);
    setShowReportModal(true);
  };

 
  const currentProject = projects.find(p => p.id === currentProjectId);
  const currentProjectTests = testCaseCategories.flatMap(category => category.testCases);
  const totalTests = currentProjectTests.length;
  const passedTests = currentProjectTests.filter(test => test.status === 'passed').length;
  const failedTests = currentProjectTests.filter(test => test.status === 'failed').length;
  const inProgressTests = currentProjectTests.filter(test => test.status === 'running').length;

  
  const filteredCategories = currentPlanId
    ? testCaseCategories.filter(cat => cat.planId === currentPlanId)
    : testCaseCategories.filter(cat => !cat.planId);

  const visibleTests = filteredCategories.flatMap(cat => cat.testCases);
  const visibleTotalTests = visibleTests.length;
  const visiblePassedTests = visibleTests.filter(t => t.status === 'passed').length;
  const visibleFailedTests = visibleTests.filter(t => t.status === 'failed').length;
  const visibleInProgressTests = visibleTests.filter(t => t.status === 'running').length;

  const currentProjectRuns = testRuns.filter(run => run.projectId === currentProjectId);
  const totalRuns = currentProjectRuns.length;
  const completedRuns = currentProjectRuns.filter(run => run.status === 'completed').length;
  const runningRuns = currentProjectRuns.filter(run => run.status === 'running').length;
  const notRunRuns = currentProjectRuns.filter(run => run.status === 'not-run').length;

  
  const mockLoadTestCases = async (projectId) => {
    return [];
  };

  const mockLoadTestRuns = async (projectId) => {
    return [];
  };

  const mockLoadTestPlans = async (projectId) => {
    return [];
  };

  if (loading) {
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
          canCreateProject={canCreate('project')}
        />
        <div className="container">
          <div className="loading">
            <h3>Загрузка данных...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccessToCurrentProject()) {
    return (
      <div className="main-content">
        <Header 
          currentUser={currentUser} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme}
          projects={projects.filter(project => 
            currentUser.role === 'senior_admin' || 
            currentUser.assignedProjects?.includes(project.id)
          )}
          currentProjectId={currentProjectId}
          setCurrentProjectId={setCurrentProjectId}
          setShowProjectModal={setShowProjectModal}
          canCreateProject={canCreate('project')}
        />
        <div className="container">
          <div className="access-denied">
            <h2>Доступ запрещен</h2>
            <p>У вас нет доступа к выбранному проекту.</p>
            <p>Пожалуйста, выберите другой проект или обратитесь к администратору.</p>
          </div>
        </div>
      </div>
    );
  }

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
        canCreateProject={canCreate('project')}
      />

      {/* Баннер с информацией о роли */}
      <div className="role-banner">
        <div className="container">
          <div className='role-banner-container'>
            <span>
              <strong>Роль:</strong> {getRoleDisplayName(currentUser.role)} | 
              <strong> Проект:</strong> {currentProject?.name || 'Не выбран'}
            </span>
            {canManageUsers() && (
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowUserManagementModal(true)}
              >
                <i className="fas fa-users"></i> Управление пользователями
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <div className='container_title'>
            <h1>Платформа для управления тестированием</h1>
            <p>Создавайте, запускайте и анализируйте тесты для ваших проектов</p>
            <h1>Проект: {currentProject?.name || 'Проект не найден'}</h1>
            <p>{currentProject?.description || 'Описание отсутствует'}</p>
            <p>Среда: {currentProject?.environment || 'Не указана'}</p>
            <p>Тип тестирования: {currentProject?.environment1 || 'Не указан'}</p>
          </div>         
           
          <div className="hero-buttons">
            <button className="btn btn-outline" onClick={() => setActiveTab('reports')}>
              Посмотреть отчеты
            </button>
          </div>


      <section className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Панель управления</h1>
          </div>
                    {/* Селектор тест-плана */}
          <div className="plan-selector plan-selector--boxed">
            <label className="plan-selector__label">Тест-план:</label>
            <select 
              value={currentPlanId || ''} 
              onChange={(e) => setCurrentPlanId(e.target.value ? parseInt(e.target.value) : null)}
              className="plan-selector__select"
            >
              <option value="">-- Без плана --</option>
              {testPlans
                .filter(plan => plan.projectId === currentProjectId)
                .map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} {plan.version ? `v${plan.version}` : ''}
                  </option>
                ))
              }
            </select>
            
            {canCreate('testPlan') && (
              <button 
                className="btn btn-outline btn-new-plan btn--ml"
                onClick={() => setShowTestPlanModal(true)}
              >
                <i className="fas fa-plus"></i> Новый план
              </button>
            )}
             {canCreate('project') && (
                  <button className="btn btn-outline" onClick={() => setShowDistributionModal(true)}>
                    <i className="fas fa-server"></i> Управление дистрибутивами
                  </button>
                )}
          </div>
          {/* Список планов с действиями */}
          <div className="plan-list">
            {testPlans.filter(plan => plan.projectId === currentProjectId).length === 0 ? (
              <p className="no-plans">Нет тест-планов для этого проекта.</p>
            ) : (
              <div className="plan-items">
                {testPlans.filter(plan => plan.projectId === currentProjectId).map(plan => (
                  <div key={plan.id} className="plan-item">
                    <div className="plan-info">
                      <strong>{plan.name}</strong> {plan.version ? `v${plan.version}` : ''}
                      <div className="plan-desc">{plan.description}</div>
                    </div>
                    <div className="plan-actions">
                      <button className="btn btn-sm btn-outline" onClick={() => editTestPlan(plan)}>Редактировать</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteTestPlan(plan.id)}>Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

          {/* Статистика */}
              <div className="stats">
            <div className="stat-card">
                  <h3>Всего тест-кейсов</h3>
                  <div className="number">{visibleTotalTests}</div>
            </div>
            <div className="stat-card">
              <h3>Всего тест-ранов</h3>
              <div className="number">{totalRuns}</div>
            </div>
            <div className="stat-card">
              <h3>В процессе</h3>
                  <div className="number">{visibleInProgressTests}</div>
            </div>
            <div className="stat-card">
              <h3>Завершено</h3>
                  <div className="number">{visiblePassedTests}</div>
            </div>
            <div className="stat-card">
              <h3>В ожидании</h3>
                  <div className="number">{visibleFailedTests}</div>
            </div>
          </div>
          
          {/* Табы */}
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
          
          {/* Контент табов */}
          {activeTab === 'test-cases' && (
            <div className="tab-content active" id="test-cases-content">
              <div className="dashboard-header">
                <h2>Управление тест-кейсами</h2>
              </div>
              <p>Создавайте группы и управляйте тест-кейсами:</p>
              
              <div className="category-controls">
               
               
                
                {canCreate('testCase') && (
                  <>
                    <button className="btn btn-primary" onClick={() => setShowCategoryModal(true)}>
                      <i className="fas fa-folder-plus"></i> Создать группу кейсов
                    </button>
                    <button className="btn btn-outline" onClick={() => setShowTestCaseItemModal(true)}>
                      <i className="fas fa-plus"></i> Создать тест-кейс
                    </button>
                  </>
                )}
              </div>

              {/* Рендер групп тест-кейсов */}
              <div className="test-case-categories">
                {filteredCategories.length === 0 ? (
                  <div className="empty-state">
                    <h3>Нет групп тест-кейсов</h3>
                    <p>Создайте первую группу для организации тест-кейсов</p>
                    {canCreate('testCase') && (
                      <button 
                        className="btn btn-primary btn-test-group"
                        onClick={() => setShowCategoryModal(true)}>
                        Создать группу
                      </button>
                    )}
                  </div>
                ) : (
                  filteredCategories.map(category => (
                    <div 
                      key={category.id} 
                      className="test-case-category"
                      onDragOver={(e) => handleDragOver(e, category.id)}
                      onDrop={(e) => handleDrop(e, category.id)}
                    >
                      <div className="category-header">
                        <div 
                          className="category-info category-info--clickable"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <div className="category-title-wrapper">
                            <i 
                              className={`fas fa-chevron-${expandedCategories[category.id] ? 'down' : 'right'} chev-icon`}
                            ></i>
                            <h3>{category.name}</h3>
                          </div>
                          {category.description && <p>{category.description}</p>}
                          <span className="category-stats">
                            {category.testCases.length} тест-кейсов
                          </span>
                        </div>
                        <div className="category-actions">
                          {canCreate('testCase') && (
                            <button 
                              className="btn btn-sm btn-outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTestCaseItemModal(true);
                              }}
                            >
                              <i className="fas fa-plus"></i> Добавить тест-кейс
                            </button>
                          )}
                          {canCreate('testCase') && (
                            <button 
                              className="btn btn-sm btn-danger" 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTestCaseCategory(category.id);
                              }}
                            >
                              <i className="fas fa-trash"></i> Удалить группу
                            </button>
                          )}
                        </div>
                      </div>

                      {expandedCategories[category.id] && (
                        <div className="category-test-cases">
                          {category.testCases.length === 0 ? (
                            <div className="empty-category">
                              <p>Нет тест-кейсов в этой группе</p>
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
                                  {canCreate('testCase') && (
                                    <button 
                                      className="btn btn-sm btn-danger" 
                                      onClick={() => deleteTestCase(testCase.id, category.id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  )}
                                  <span className="drag-handle">
                                    <i className="fas fa-grip-vertical"></i>
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'test-runs' && (
            <div className="tab-content active" id="test-runs-content">
              <h2>Управление тест-ранами</h2>
              <p>Создавайте и запускайте тест-раны для ваших проектов:</p>
              
              <div className="controls">
                {canCreate('testRun') && (
                  <button className="btn btn-new-run btn-primary" onClick={() => setShowTestRunModal(true)}>
                    <i className="fas fa-plus"></i> Создать тест-ран
                  </button>
                )}
              </div>
              
              <div id="testRunsList">
                {currentProjectRuns.length === 0 ? (
                  <div className="empty-state">
                    <h3>Нет тест-ранов</h3>
                    <p>Создайте первый тест-ран для запуска тестирования</p>
                    {canCreate('testRun') && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowTestRunModal(true)}
                      >
                        Создать тест-ран
                      </button>
                    )}
                  </div>
                ) : (
                  currentProjectRuns.map(testRun => (
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
                            {testRun.status === 'completed' ? 'Завершен' : 
                             testRun.status === 'running' ? 'Выполняется' : 'Не запущен'}
                          </div>
                          <div className="test-run-stat-label">Статус</div>
                        </div>
                      </div>
                      <div className="test-actions">
                        {testRun.status !== 'running' ? (
                          <button 
                            className="btn btn-sm btn-outline" 
                            onClick={() => runTestRun(testRun.id)}
                            disabled={!canRun()}
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

                        {canCreate('testRun') && (
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => deleteTestRun(testRun.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="tab-content active" id="reports-content">
              <h2>История запусков тестирования</h2>
              <p>Анализируйте результаты тестирования с помощью детальных отчетов:</p>
              
              <div className="test-results">
                <h3>История запусков</h3>
                <div className="result-content" id="historyOutput">
                  {currentProjectRuns.length === 0 ? (
                    <div className="result-line result-success">Нет данных о запусках</div>
                  ) : (
                    currentProjectRuns
                      .slice(0, 10)
                      .map(run => (
                        <div key={run.id} className={`result-line ${
                          run.status === 'completed' ? 'result-success' : 
                          run.status === 'running' ? 'result-warning' : 'result-error'
                        }`}>
                          {run.date} - {run.name} ({run.passed}/{run.tests.length} пройдено) - {run.status}
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Ручные отчеты */}
              {manualReports.filter(report => report.projectId === currentProjectId).length > 0 && (
                <div className="manual-reports">
                  <h3>Ручные отчеты</h3>
                  <div className="reports-list">
                    {manualReports
                      .filter(report => report.projectId === currentProjectId)
                      .map(report => (
                        <div key={report.id} className="report-item">
                          <h4>{report.title}</h4>
                          <p>{report.date} - {report.status}</p>
                          <p>{report.summary}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
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

      {showCategoryModal && (
        <TestCaseCategoryModal 
          onClose={() => setShowCategoryModal(false)} 
          onCreate={createTestCaseCategory}
          testPlans={testPlans}
          currentProjectId={currentProjectId}
        />
      )}

      {showTestCaseItemModal && (
        <TestCaseItemModal 
          onClose={() => setShowTestCaseItemModal(false)} 
          onCreate={createTestCaseInCategory}
          categories={filteredCategories}
        />
      )}

      {showTestRunModal && (
        <TestRunModal 
          onClose={() => setShowTestRunModal(false)} 
          onCreate={createTestRun}
          categories={filteredCategories}
        />
      )}

      {showManualReportModal && selectedTestRun && (
        <ManualReportModal 
          testRun={selectedTestRun}
          onClose={() => setShowManualReportModal(false)}
          onSave={saveManualReport}
        />
      )}

      {showTestPlanModal && (
        <TestPlanModal 
          onClose={() => { setShowTestPlanModal(false); setEditingPlan(null); }} 
          onCreate={createTestPlan}
          onSave={updateTestPlan}
          distributions={distributions}
          currentProjectId={currentProjectId}
          initialData={editingPlan}
        />
      )}

      {showDistributionModal && (
        <DistributionModal 
          onClose={() => setShowDistributionModal(false)} 
          onCreate={createDistribution}
          onDelete={deleteDistribution}
          distributions={distributions}
          currentProjectId={currentProjectId}
        />
      )}

      {showExecutionModal && currentExecutingTestRun && (
        <TestExecutionModal 
          testRun={testRuns.find(run => run.id === currentExecutingTestRun)}
          onClose={() => {
            setShowExecutionModal(false);
            setCurrentExecutingTestRun(null);
          }}
          onComplete={handleTestRunExecutionComplete}
        />
      )}

      {showUserManagementModal && (
        <UserManagementModal 
          onClose={() => setShowUserManagementModal(false)}
          users={users}
          projects={projects}
          currentUser={currentUser}
          onUpdateUser={(userId, updates) => {
            // Реализация обновления пользователя
            console.log('Update user:', userId, updates);
          }}
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