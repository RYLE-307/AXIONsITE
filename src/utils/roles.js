export const ROLES = {
  GUEST: 'guest',
  TESTER: 'tester',
  SENIOR_TESTER: 'senior_tester',
  ADMIN: 'admin',
  SENIOR_ADMIN: 'senior_admin'
};


export const PERMISSIONS = {
  [ROLES.GUEST]: {
    viewProjects: true,
    viewTestCases: true,
    viewTestRuns: true,
    viewReports: true,
    createTestRun: false,
    runTestRun: false,
    createTestCase: false,
    createTestPlan: false,
    createProject: false,
    manageUsers: false,
    editAnything: false
  },
  [ROLES.TESTER]: {
    viewProjects: true,
    viewTestCases: true,
    viewTestRuns: true,
    viewReports: true,
    createTestRun: false,
    runTestRun: true,
    createTestCase: false,
    createTestPlan: false,
    createProject: false,
    manageUsers: false,
    editAnything: false
  },
  [ROLES.SENIOR_TESTER]: {
    viewProjects: true,
    viewTestCases: true,
    viewTestRuns: true,
    viewReports: true,
    createTestRun: true,
    runTestRun: true,
    createTestCase: true,
    createTestPlan: false,
    createProject: false,
    manageUsers: false,
    editAnything: false
  },
  [ROLES.ADMIN]: {
    viewProjects: true,
    viewTestCases: true,
    viewTestRuns: true,
    viewReports: true,
    createTestRun: true,
    runTestRun: true,
    createTestCase: true,
    createTestPlan: true,
    createProject: true,
    manageUsers: false,
    editAnything: true
  },
  [ROLES.SENIOR_ADMIN]: {
    viewProjects: true,
    viewTestCases: true,
    viewTestRuns: true,
    viewReports: true,
    createTestRun: true,
    runTestRun: true,
    createTestCase: true,
    createTestPlan: true,
    createProject: true,
    manageUsers: true,
    editAnything: true
  }
};

// Вспомогательная функция для отображения названий ролей
export const getRoleDisplayName = (role) => {
  const roleNames = {
    'guest': 'Гость',
    'tester': 'Тестировщик',
    'senior_tester': 'Старший тестировщик',
    'admin': 'Администратор',
    'senior_admin': 'Старший администратор'
  };
  return roleNames[role] || role;
};

// Функция для проверки прав доступа
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  return PERMISSIONS[user.role]?.[permission] || false;
};
