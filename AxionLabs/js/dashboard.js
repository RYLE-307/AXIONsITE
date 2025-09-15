  // Состояние приложения
        let isLoggedIn = false;
        let currentUser = null;
        let projects = [];
        let currentProjectId = 1;
        let testCases = [];
        let testRuns = [];
        let totalTests = 0;
        let passedTests = 0;
        let failedTests = 0;
        let inProgressTests = 0;
        let testRunCounter = 1;
        let testCaseCounter = 0;
        let projectCounter = 0;

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

        // Инициализация
        document.addEventListener('DOMContentLoaded', function() {
            // Проверяем, авторизован ли пользователь
            const savedUser = localStorage.getItem('AxionLabsUser');
            const savedTheme = localStorage.getItem('AxionLabsTheme');
            
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                isLoggedIn = true;
                showMainContent();
            } else {
                window.location.href = 'auth.html';
                return;
            }
            
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            // Инициализация обработчиков событий
            initEventListeners();
            
            // Инициализация данных по умолчанию
            initDefaultData();
            
            // Обновление интерфейса
            updateUI();
        });

        // Инициализация данных по умолчанию
        function initDefaultData() {
            // Загружаем данные из localStorage или устанавливаем значения по умолчанию
            const savedProjects = localStorage.getItem('AxionLabsProjects');
            const savedTestCases = localStorage.getItem('AxionLabsTestCases');
            const savedTestRuns = localStorage.getItem('AxionLabsTestRuns');
            
            projects = savedProjects ? JSON.parse(savedProjects) : [
                { 
                    id: 1, 
                    name: "Главный проект", 
                    description: "Основной проект для демонстрации",
                    environment: "development",
                    createdAt: new Date().toISOString()
                }
            ];
            
            testCases = savedTestCases ? JSON.parse(savedTestCases) : [
                {
                    id: 1,
                    projectId: 1,
                    name: "Тест аутентификации",
                    description: "Проверка входа в систему с корректными и некорректными данными",
                    type: "functional",
                    priority: "high",
                    expectedResult: "Система должна принимать только корректные учетные данные",
                    status: "not-run",
                    passed: false,
                    errorDetails: null
                },
                {
                    id: 2,
                    projectId: 1,
                    name: "Тест регистрации",
                    description: "Проверка создания нового аккаунта",
                    type: "functional",
                    priority: "medium",
                    expectedResult: "Новый пользователь должен быть успешно создан",
                    status: "not-run",
                    passed: false,
                    errorDetails: null
                }
            ];
            
            testRuns = savedTestRuns ? JSON.parse(savedTestRuns) : [];
            
            // Обновляем счетчики
            projectCounter = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
            testCaseCounter = testCases.length > 0 ? Math.max(...testCases.map(t => t.id)) : 0;
            testRunCounter = testRuns.length > 0 ? Math.max(...testRuns.map(r => r.id)) + 1 : 1;
            
            // Сохраняем данные в localStorage
            saveData();
        }

        // Сохранение данных в localStorage
        function saveData() {
            localStorage.setItem('AxionLabsProjects', JSON.stringify(projects));
            localStorage.setItem('AxionLabsTestCases', JSON.stringify(testCases));
            localStorage.setItem('AxionLabsTestRuns', JSON.stringify(testRuns));
        }

        // Инициализация обработчиков событий
        function initEventListeners() {
            // Выход из системы
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('AxionLabsUser');
                localStorage.removeItem('AxionLabsAuth');
                window.location.href = 'index.html';
            });
            
            // Переключение темы
            document.getElementById('themeToggle').addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                if (document.body.classList.contains('light-theme')) {
                    localStorage.setItem('AxionLabsTheme', 'light');
                    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    localStorage.setItem('AxionLabsTheme', 'dark');
                    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
                }
            });
            
            // Навигация по вкладкам
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    switchTab(tab.getAttribute('data-tab'));
                });
            });
            
            // Навигация через меню
            document.querySelectorAll('.nav-tab').forEach(navTab => {
                navTab.addEventListener('click', (e) => {
                    e.preventDefault();
                    switchTab(navTab.getAttribute('data-tab'));
                });
            });
            
            // Запуск всех тестов
            document.getElementById('runAllTests').addEventListener('click', () => {
                runAllTests();
            });
            
            // Сброс результатов
            document.getElementById('resetTests').addEventListener('click', () => {
                resetTests();
            });
            
            // Просмотр отчетов
            document.getElementById('viewReports').addEventListener('click', () => {
                switchTab('reports');
            });
            
            // Создание тест-рана
            document.getElementById('createTestRun').addEventListener('click', () => {
                createTestRun();
            });
            
            // Создание тест-кейса
            document.getElementById('createTestCaseBtn').addEventListener('click', () => {
                document.getElementById('createTestCaseModal').classList.add('active');
            });
            
            // Закрытие модального окна создания тест-кейса
            document.getElementById('closeTestCaseModal').addEventListener('click', () => {
                document.getElementById('createTestCaseModal').classList.remove('active');
            });
            
            // Отмена создания тест-кейса
            document.getElementById('cancelTestCase').addEventListener('click', () => {
                document.getElementById('createTestCaseModal').classList.remove('active');
            });
            
            // Обработка формы создания тест-кейса
            document.getElementById('testCaseForm').addEventListener('submit', (e) => {
                e.preventDefault();
                createTestCase();
            });
            
            // Создание нового проекта
            document.getElementById('newProjectBtn').addEventListener('click', () => {
                document.getElementById('createProjectModal').classList.add('active');
            });
            
            // Закрытие модального окна создания проекта
            document.getElementById('closeProjectModal').addEventListener('click', () => {
                document.getElementById('createProjectModal').classList.remove('active');
            });
            
            // Отмена создания проекта
            document.getElementById('cancelProject').addEventListener('click', () => {
                document.getElementById('createProjectModal').classList.remove('active');
            });
            
            // Обработка формы создания проекта
            document.getElementById('projectForm').addEventListener('submit', (e) => {
                e.preventDefault();
                createProject();
            });
            
            // Переключение между проектами
            document.getElementById('projectSelect').addEventListener('change', (e) => {
                switchProject(parseInt(e.target.value));
            });
            
            // Закрытие модального окна отчета
            document.getElementById('closeModal').addEventListener('click', () => {
                document.getElementById('reportModal').classList.remove('active');
            });
        }

        // Переключение вкладки
        function switchTab(tabId) {
            // Обновляем навигационное меню
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`.nav-tab[data-tab="${tabId}"]`).classList.add('active');
            
            // Обновляем табы
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
            
            // Обновляем контент
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabId + '-content').classList.add('active');
            
            // Если переключились на отчеты, обновляем их
            if (tabId === 'reports') {
                updateReports();
            }
        }

        // Обновление интерфейса
        function updateUI() {
            renderProjectSelector();
            updateStats();
            renderTestCases();
            renderTestRuns();
        }

        // Показать основной контент
        function showMainContent() {
            document.getElementById('mainContent').style.display = 'block';
            renderProjectSelector();
            updateStats();
            renderTestCases();
        }

        // Создание нового проекта
        function createProject() {
            const name = document.getElementById('projectName').value;
            const description = document.getElementById('projectDescription').value;
            const environment = document.getElementById('projectEnvironment').value;
            
            // Создаем новый проект
            projectCounter++;
            const newProject = {
                id: projectCounter,
                name,
                description,
                environment,
                createdAt: new Date().toISOString()
            };
            
            projects.push(newProject);
            saveData();
            
            // Обновляем селектор проектов
            renderProjectSelector();
            
            // Переключаемся на новый проект
            switchProject(projectCounter);
            
            // Закрываем модальное окно и сбрасываем форму
            document.getElementById('createProjectModal').classList.remove('active');
            document.getElementById('projectForm').reset();
            
            addResultLine(`Создан новый проект: ${name}`, 'success');
        }

        // Отображение селектора проектов
        function renderProjectSelector() {
            const projectSelect = document.getElementById('projectSelect');
            projectSelect.innerHTML = '';
            
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.name;
                option.selected = project.id === currentProjectId;
                projectSelect.appendChild(option);
            });
        }

        // Переключение между проектами
        function switchProject(projectId) {
            currentProjectId = projectId;
            const currentProject = projects.find(p => p.id === projectId);
            
            // Обновляем заголовок
            document.getElementById('dashboardTitle').textContent = `Панель управления: ${currentProject.name}`;
            
            // Обновляем статистику
            updateStats();
            
            // Перерисовываем тест-кейсы
            renderTestCases();
            
            // Перерисовываем тест-раны
            renderTestRuns();
            
            addResultLine(`Переключен на проект: ${currentProject.name}`, 'warning');
        }

        // Создание нового тест-кейса
        function createTestCase() {
            const name = document.getElementById('testCaseName').value;
            const description = document.getElementById('testCaseDescription').value;
            const type = document.getElementById('testCaseType').value;
            const priority = document.getElementById('testCasePriority').value;
            const expectedResult = document.getElementById('testCaseExpected').value;
            
            // Создаем новый тест-кейс
            testCaseCounter++;
            const newTestCase = {
                id: testCaseCounter,
                projectId: currentProjectId,
                name,
                description,
                type,
                priority,
                expectedResult,
                status: "not-run",
                passed: false,
                errorDetails: null
            };
            
            testCases.push(newTestCase);
            saveData();
            
            // Обновляем отображение
            updateStats();
            renderTestCases();
            
            // Закрываем модальное окно и сбрасываем форму
            document.getElementById('createTestCaseModal').classList.remove('active');
            document.getElementById('testCaseForm').reset();
            
            addResultLine(`Создан новый тест-кейс: ${name}`, 'success');
        }

        // Отображение тест-кейсов
        function renderTestCases() {
            const testCasesList = document.getElementById('testCasesList');
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            
            testCasesList.innerHTML = '';
            
            if (currentProjectTests.length === 0) {
                testCasesList.innerHTML = `
                    <div class="test-case">
                        <div class="test-info">
                            <h3>Нет тест-кейсов</h3>
                            <p>Создайте свой первый тест-кейс для этого проекта</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            currentProjectTests.forEach(testCase => {
                const testCaseElement = document.createElement('div');
                testCaseElement.className = 'test-case';
                
                // Определяем иконку в зависимости от типа тест-кейса
                let icon = 'fa-cog';
                if (testCase.type === 'api') icon = 'fa-code';
                if (testCase.type === 'performance') icon = 'fa-tachometer-alt';
                if (testCase.type === 'ui') icon = 'fa-desktop';
                
                // Определяем цвет приоритета
                let priorityColor = 'var(--text-secondary)';
                if (testCase.priority === 'high') priorityColor = 'var(--danger)';
                if (testCase.priority === 'medium') priorityColor = 'var(--warning)';
                
                testCaseElement.innerHTML = `
                    <div class="test-info">
                        <h3>${testCase.name}</h3>
                        <p>${testCase.description}</p>
                        <div class="test-meta">
                            <span><i class="fas ${icon}"></i> ${getTypeName(testCase.type)}</span>
                            <span style="color: ${priorityColor}"><i class="fas fa-exclamation-circle"></i> ${getPriorityName(testCase.priority)}</span>
                        </div>
                    </div>
                    <div class="test-status">
                        <span class="status-badge ${getStatusClass(testCase.status)}" id="test${testCase.id}Status">${getStatusName(testCase.status)}</span>
                    </div>
                    <div class="test-actions">
                        <button class="btn btn-sm btn-outline" onclick="runTest(${testCase.id})">Запустить</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTestCase(${testCase.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                testCasesList.appendChild(testCaseElement);
            });
        }

        // Получение имени типа тест-кейса
        function getTypeName(type) {
            const types = {
                'functional': 'Функциональный',
                'api': 'API',
                'performance': 'Производительность',
                'ui': 'UI'
            };
            return types[type] || type;
        }

        // Получение имени приоритета
        function getPriorityName(priority) {
            const priorities = {
                'high': 'Высокий',
                'medium': 'Средний',
                'low': 'Низкий'
            };
            return priorities[priority] || priority;
        }

        // Получение класса статуса
        function getStatusClass(status) {
            const statuses = {
                'not-run': 'status-not-run',
                'passed': 'status-passed',
                'failed': 'status-failed',
                'running': 'status-running'
            };
            return statuses[status] || 'status-not-run';
        }

        // Получение имени статуса
        function getStatusName(status) {
            const statuses = {
                'not-run': 'Не запущен',
                'passed': 'Пройден',
                'failed': 'Провален',
                'running': 'Выполняется'
            };
            return statuses[status] || status;
        }

        // Удаление тест-кейса
        function deleteTestCase(testId) {
            if (confirm('Вы уверены, что хотите удалить этот тест-кейс?')) {
                testCases = testCases.filter(test => test.id !== testId);
                saveData();
                updateStats();
                renderTestCases();
                addResultLine(`Тест-кейс удален`, 'warning');
            }
        }

          // Удаление тест-рана
        function deleteTestRun(testRunId) {
    if (confirm('Вы уверены, что хотите удалить этот тест-ран?')) {
        testRuns = testRuns.filter(testRun => testRun.id !== testRunId);
        saveData();
        updateStats();
        renderTestRuns();
        addResultLine(`Тест-ран удален`, 'warning');
            }
        }
        
        // Создание нового тест-рана
        function createTestRun() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            
            if (currentProjectTests.length === 0) {
                alert('Нет тест-кейсов для создания тест-рана');
                return;
            }
            
            const testRunId = testRunCounter++;
            const currentProject = projects.find(p => p.id === currentProjectId);
            
            const testRun = {
                id: testRunId,
                projectId: currentProjectId,
                name: `Тест-ран #${testRunId} - ${currentProject.name}`,
                date: new Date().toLocaleString(),
                tests: JSON.parse(JSON.stringify(currentProjectTests)),
                status: 'not-run',
                passed: 0,
                failed: 0
            };
            
            testRuns.push(testRun);
            saveData();
            renderTestRuns();
            
            addResultLine(`Создан новый тест-ран: ${testRun.name}`, 'warning');
        }

        

        // Отображение тест-ранов
        function renderTestRuns() {
            const testRunsList = document.getElementById('testRunsList');
            const currentProjectRuns = testRuns.filter(run => run.projectId === currentProjectId);
            
            testRunsList.innerHTML = '';
            
            if (currentProjectRuns.length === 0) {
                testRunsList.innerHTML = '<p>Нет тест-ранов для этого проекта</p>';
                return;
            }
            
            currentProjectRuns.forEach(testRun => {
                const testRunElement = document.createElement('div');
                testRunElement.className = 'test-run';
                
                testRunElement.innerHTML = `
                    <div class="test-run-header">
                        <div class="test-run-title">${testRun.name}</div>
                        <div class="test-run-date">${testRun.date}</div>
                    </div>
                    <div class="test-run-stats">
                        <div class="test-run-stat">
                            <div class="test-run-stat-value">${testRun.tests.length}</div>
                            <div class="test-run-stat-label">Всего тестов</div>
                        </div>
                        <div class="test-run-stat">
                            <div class="test-run-stat-value">${testRun.passed}</div>
                            <div class="test-run-stat-label">Пройдено</div>
                        </div>
                        <div class="test-run-stat">
                            <div class="test-run-stat-value">${testRun.failed}</div>
                            <div class="test-run-stat-label">Провалено</div>
                        </div>
                        <div class="test-run-stat">
                            <div class="test-run-stat-value">${testRun.status === 'completed' ? 'Завершен' : 'Не запущен'}</div>
                            <div class="test-run-stat-label">Статус</div>
                        </div>
                    </div>
                    <div class="test-actions">
                    
                        ${testRun.status !== 'running' ? 
                            
                            `<button class="btn btn-sm btn-outline" onclick="runTestRun(${testRun.id})">Запустить</button>` : 
                            `<button class="btn btn-sm btn-outline" disabled>Выполняется...</button>`
                            
                        }
                        ${testRun.status === 'completed' ? 
                            `<button class="btn btn-sm btn-primary" onclick="viewTestRunReport(${testRun.id})">Просмотр отчета</button>` : 
                            ''
                            
                        }
                   
                         <button class="btn btn-sm btn-danger" onclick="deleteTestRun(${testRun.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        
                    
                `;
                
                testRunsList.appendChild(testRunElement);
            });
        }

        // Запуск тест-рана
        function runTestRun(testRunId) {
            const testRun = testRuns.find(run => run.id === testRunId);
            if (!testRun || testRun.status === 'running') return;
            
            testRun.status = 'running';
            saveData();
            renderTestRuns();
            
            addResultLine(`Запуск тест-рана: ${testRun.name}`, 'warning');
            
            // Запускаем все тесты в тест-ране
            testRun.tests.forEach(test => {
                runTestInTestRun(test.id, testRunId);
            });
        }

        // Запуск теста в тест-ране
        function runTestInTestRun(testId, testRunId) {
            const testRun = testRuns.find(run => run.id === testRunId);
            const testCase = testRun.tests.find(t => t.id === testId);
            
            if (!testCase || testCase.status === 'running') return;
            
            // Обновляем статус
            testCase.status = 'running';
            saveData();
            
            // Обновляем статус в основном массиве тестов
            const mainTestCase = testCases.find(t => t.id === testId);
            if (mainTestCase) {
                mainTestCase.status = 'running';
                saveData();
            }
            
            inProgressTests++;
            updateStats();
            renderTestCases();
            
          
            // Имитация выполнения теста
            const duration = Math.random() * 3000 + 1000; // 1-4 секунды
            const success = Math.random() > 0.3; // 70% успешных тестов
            
            setTimeout(() => {
                // Завершение теста
                testCase.status = success ? 'passed' : 'failed';
                testCase.passed = success;
                
                // Обновляем статус в основном массиве тестов
                if (mainTestCase) {
                    mainTestCase.status = success ? 'passed' : 'failed';
                    mainTestCase.passed = success;
                    
                    if (!success) {
                        mainTestCase.errorDetails = errorDatabase[testId] || {
                            location: "Неизвестно",
                            description: "Произошла неизвестная ошибка",
                            reason: "Причина не определена",
                            solution: "Проверить логи приложения",
                            stackTrace: "Стек вызовов недоступен",
                            logs: []
                        };
                    }
                    saveData();
                }
                
                if (success) {
                    testRun.passed++;
                    passedTests++;
                } else {
                    testRun.failed++;
                    failedTests++;
                    // Сохраняем детали ошибки
                    testCase.errorDetails = errorDatabase[testId] || {
                        location: "Неизвестно",
                        description: "Произошла неизвестная ошибка",
                        reason: "Причина не определена",
                        solution: "Проверить логи приложения",
                        stackTrace: "Стек вызовов недоступен",
                        logs: []
                    };
                }
                
                inProgressTests--;
                
                // Проверяем, все ли тесты завершены
                const allTestsCompleted = testRun.tests.every(test => test.status !== 'running' && test.status !== 'not-run');
                if (allTestsCompleted) {
                    testRun.status = 'completed';
                    addResultLine(`Тест-ран "${testRun.name}" завершен: ${testRun.passed}/${testRun.tests.length} тестов пройдено`, 'success');
                }
                
                saveData();
                updateStats();
                updateProgress();
                renderTestCases();
                renderTestRuns();
            }, duration);
        }

       // Просмотр отчета по тест-рану
        function viewTestRunReport(testRunId) {
            const testRun = testRuns.find(run => run.id === testRunId);
            if (!testRun) return;
            
            const modalContent = document.getElementById('modalReportContent');
            
             // Формируем детальный отчет
            let reportHTML = `
                <div class="test-run-report">
                    <div class="report-header">
                        <h3>${testRun.name}</h3>
                        <p><strong>Дата выполнения:</strong> ${testRun.date}</p>
                        <p><strong>Проект:</strong> ${projects.find(p => p.id === testRun.projectId)?.name || 'Неизвестно'}</p>
                    </div>
                    
                    <div class="report-stats">
                        <div class="report-stat">
                            <div class="report-stat-value">${testRun.tests.length}</div>
                            <div class="report-stat-label">Всего тестов</div>
                        </div>
                        <div class="report-stat">
                            <div class="report-stat-value" style="color: var(--success)">${testRun.passed}</div>
                            <div class="report-stat-label">Пройдено</div>
                        </div>
                        <div class="report-stat">
                            <div class="report-stat-value" style="color: var(--danger)">${testRun.failed}</div>
                            <div class="report-stat-label">Провалено</div>
                        </div>
                        <div class="report-stat">
                            <div class="report-stat-value" style="color: var(--primary)">${Math.round((testRun.passed / testRun.tests.length) * 100)}%</div>
                            <div class="report-stat-label">Успешность</div>
                        </div>
                    </div>
                    
                    <h4>Детализация по тестам:</h4>
            `;
            
            // Добавляем информацию по каждому тесту
            testRun.tests.forEach((test, index) => {
                reportHTML += `
                    <div class="test-case-result ${test.passed ? 'passed' : 'failed'}">
                        <div class="test-case-header">
                            <strong>${index + 1}. ${test.name}</strong>
                            <span class="status-badge ${getStatusClass(test.status)}">${getStatusName(test.status)}</span>
                        </div>
                        <p>${test.description}</p>
                `;
                
                // Добавляем детали ошибки для проваленных тестов
                if (!test.passed && test.errorDetails) {
                    const error = test.errorDetails;
                    reportHTML += `
                        <div class="error-details">
                            <h5>Детали ошибки:</h5>
                            
                            <div class="error-section">
                                <strong>Местоположение:</strong>
                                <div class="error-location">${error.location}</div>
                            </div>
                            
                            <div class="error-section">
                                <strong>Описание проблемы:</strong>
                                <div class="error-reason">${error.description}</div>
                            </div>
                            
                            <div class="error-section">
                                <strong>Возможная причина:</strong>
                                <div class="error-reason">${error.reason}</div>
                            </div>
                            
                            <div class="error-section">
                                <strong>Решение:</strong>
                                <div class="error-solution">${error.solution}</div>
                            </div>
                            
                            <div class="error-section">
                                <strong>Стек вызовов:</strong>
                                <div class="error-stack">${error.stackTrace}</div>
                            </div>
                            
                            <div class="error-section">
                                <h5>Логи выполнения:</h5>
                                <div class="log-container">
                                    ${error.logs.map(log => `
                                        <div class="log-entry">
                                            <span class="log-time">${log.time}</span>
                                            <span class="log-level log-level-${log.level.toLowerCase()}">${log.level}</span>
                                            <span class="log-message">${log.message}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="screenshot">
                                <h5>Скриншот ошибки:</h5>
                                <div class="screenshot-placeholder">
                                    <i class="fas fa-camera"></i> Изображение недоступно в демо-режиме
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                reportHTML += `</div>`;
            });
            
            reportHTML += `
                    <div class="additional-info">
                        <h4>Дополнительная информация:</h4>
                        <p><strong>Время выполнения:</strong> ~${Math.round(testRun.tests.length * 2.5)} секунд</p>
                        <p><strong>Дата формирования отчета:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Сгенерировано пользователем:</strong> ${currentUser?.name || 'Неизвестно'}</p>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-outline" onclick="exportToPDF()">
                            <i class="fas fa-file-pdf"></i> Экспорт в PDF
                        </button>
                        <button class="btn btn-outline" onclick="exportToCSV()">
                            <i class="fas fa-file-csv"></i> Экспорт в CSV
                        </button>
                    </div>
                </div>
            `;
            
            modalContent.innerHTML = reportHTML;
            document.getElementById('reportModal').classList.add('active');
        }
        

        // Запуск одного теста
        function runTest(testId) {
            const testCase = testCases.find(t => t.id === testId);
            if (!testCase || testCase.status === 'running') return;
            
            // Обновляем статус
            testCase.status = 'running';
            saveData();
            
            inProgressTests++;
            updateStats();
            renderTestCases();
            
            addResultLine(`Запуск теста: ${testCase.name}`, 'warning');
            
            // Имитация выполнения теста
            const duration = Math.random() * 3000 + 1000; // 1-4 секунды
            const success = Math.random() > 0.3; // 70% успешных тестов
            
            setTimeout(() => {
                // Завершение теста
                testCase.status = success ? 'passed' : 'failed';
                testCase.passed = success;
                
                inProgressTests--;
                if (success) {
                    passedTests++;
                    addResultLine(`Тест "${testCase.name}" успешно пройден`, 'success');
                } else {
                    failedTests++;
                    // Сохраняем детали ошибки
                    testCase.errorDetails = errorDatabase[testId] || {
                        location: "Неизвестно",
                        description: "Произошла неизвестная ошибка",
                        reason: "Причина не определена",
                        solution: "Проверить логи приложения",
                        stackTrace: "Стек вызовов недоступен",
                        logs: []
                    };
                    addResultLine(`Тест "${testCase.name}" провален: ${testCase.errorDetails.description}`, 'error');
                }
                
                saveData();
                updateStats();
                updateProgress();
                renderTestCases();
            }, duration);
        }

        // Запуск всех тестов
        function runAllTests() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            
            if (currentProjectTests.length === 0) {
                addResultLine('Нет тестов для запуска в текущем проекте', 'warning');
                return;
            }
            
            addResultLine('Запуск всех тестов...', 'warning');
            currentProjectTests.forEach(testCase => {
                if (testCase.status !== 'running') {
                    runTest(testCase.id);
                }
            });
        }

        // Сброс результатов тестов
        function resetTests() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            
            currentProjectTests.forEach(testCase => {
                testCase.status = 'not-run';
                testCase.passed = false;
                testCase.errorDetails = null;
            });
            
            // Сброс тест-ранов для текущего проекта
            testRuns = testRuns.filter(run => run.projectId !== currentProjectId);
            saveData();
            
            passedTests = 0;
            failedTests = 0;
            inProgressTests = 0;
            
            saveData();
            updateStats();
            updateProgress();
            renderTestCases();
            renderTestRuns();
            
            document.getElementById('resultOutput').innerHTML = '<div class="result-line">Готов к запуску тестов...</div>';
        }

        // Обновление статистики
        function updateStats() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            
            totalTests = currentProjectTests.length;
            passedTests = currentProjectTests.filter(test => test.status === 'passed').length;
            failedTests = currentProjectTests.filter(test => test.status === 'failed').length;
            inProgressTests = currentProjectTests.filter(test => test.status === 'running').length;
            
            document.getElementById('totalTests').textContent = totalTests;
            document.getElementById('passedTests').textContent = passedTests;
            document.getElementById('failedTests').textContent = failedTests;
            document.getElementById('inProgressTests').textContent = inProgressTests;
        }

        // Обновление прогресса
        function updateProgress() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            const completed = passedTests + failedTests;
            const progress = totalTests > 0 ? (completed / totalTests) * 100 : 0;
            document.getElementById('testProgress').style.width = `${progress}%`;
        }

        // Добавление строки в результаты
        function addResultLine(text, type) {
            const resultLine = document.createElement('div');
            resultLine.className = `result-line result-${type}`;
            resultLine.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
            
            document.getElementById('resultOutput').prepend(resultLine);
        }

        // Обновление отчетов
        function updateReports() {
            const currentProjectTests = testCases.filter(test => test.projectId === currentProjectId);
            const currentProjectRuns = testRuns.filter(run => run.projectId === currentProjectId);
            
            document.getElementById('totalStats').textContent = currentProjectTests.length;
            
            const successRate = currentProjectTests.length > 0 ? 
                Math.round((passedTests / currentProjectTests.length) * 100) : 0;
            document.getElementById('successRate').textContent = `${successRate}%`;
            
            const bugsFound = currentProjectTests.filter(test => test.status === 'failed').length;
            document.getElementById('bugsFound').textContent = bugsFound;
            
            // Обновляем историю запусков
            const historyOutput = document.getElementById('historyOutput');
            historyOutput.innerHTML = '';
            
            if (currentProjectRuns.length === 0) {
                historyOutput.innerHTML = '<div class="result-line result-success">Нет данных о запусках</div>';
                return;
            }
            
            currentProjectRuns.slice(0, 5).forEach(run => {
                const historyLine = document.createElement('div');
                historyLine.className = `result-line ${run.status === 'completed' ? 'result-success' : 'result-warning'}`;
                historyLine.textContent = `${run.date} - ${run.name} (${run.passed}/${run.tests.length} пройдено)`;
                historyOutput.appendChild(historyLine);
            });
        }

        // Экспорт в PDF
        function exportToPDF(testRunId) {
            alert('Функция экспорта в PDF будет реализована в полной версии');
        }

        // Экспорт в CSV
        function exportToCSV(testRunId) {
            alert('Функция экспорта в CSV будет реализована в полной версии');
        }

        // Показ главной страницы (заглушка)
        function showLandingPage() {
            window.location.href = 'index.html';
        }

        // Делаем функции глобальными для использования в HTML
        window.runTest = runTest;
        window.deleteTestCase = deleteTestCase;
        window.runTestRun = runTestRun;
        window.viewTestRunReport = viewTestRunReport;
        window.exportToPDF = exportToPDF;
        window.exportToCSV = exportToCSV;
        window.deleteTestRun = deleteTestRun;