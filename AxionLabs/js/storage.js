// Управление пользователями
const Storage = {
    // Сохранение пользователя
    saveUser: (user) => {
        localStorage.setItem('AxionLabsUser', JSON.stringify(user));
        localStorage.setItem('AxionLabsAuth', 'true');
    },
    
    // Получение текущего пользователя
    getUser: () => {
        const user = localStorage.getItem('AxionLabsUser');
        return user ? JSON.parse(user) : null;
    },
    
    // Проверка авторизации
    isAuthenticated: () => {
        return localStorage.getItem('AxionLabsAuth') === 'true';
    },
    
    // Выход из системы
    logout: () => {
        localStorage.removeItem('AxionLabsUser');
        localStorage.removeItem('AxionLabsAuth');
        window.location.href = 'index.html';
    },
    
    // Сохранение темы
    saveTheme: (theme) => {
        localStorage.setItem('AxionLabsTheme', theme);
    },
    
    // Получение темы
    getTheme: () => {
        return localStorage.getItem('AxionLabsTheme') || 'dark';
    },
    
    // Сохранение проектов
    saveProjects: (projects) => {
        localStorage.setItem('AxionLabsProjects', JSON.stringify(projects));
    },
    
    // Получение проектов
    getProjects: () => {
        const projects = localStorage.getItem('AxionLabsProjects');
        return projects ? JSON.parse(projects) : [];
    },
    
    // Сохранение тест-кейсов
    saveTestCases: (testCases) => {
        localStorage.setItem('AxionLabsTestCases', JSON.stringify(testCases));
    },
    
    // Получение тест-кейсов
    getTestCases: () => {
        const testCases = localStorage.getItem('AxionLabsTestCases');
        return testCases ? JSON.parse(testCases) : [];
    }
};

export default Storage;