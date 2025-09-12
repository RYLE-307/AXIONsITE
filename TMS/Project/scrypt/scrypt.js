 document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab');
                    
                    // Деактивируем все вкладки и контент
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(tc => tc.classList.remove('active'));
                    
                    // Активируем выбранную вкладку и контент
                    tab.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Имитация входа в систему (для демонстрации)
            document.querySelector('.btn-primary').addEventListener('click', function() {
                if (this.textContent === 'Регистрация') {
                    document.querySelector('.hero').style.display = 'none';
                    document.querySelector('.features').style.display = 'none';
                    document.querySelector('.dashboard').style.display = 'block';
                }
            });
            
            // Имитация открытия проекта
            document.querySelectorAll('.project-item .btn-secondary').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelector('.dashboard').style.display = 'none';
                    document.querySelector('.project-page').style.display = 'block';
                });
            });
            
            // Обработка изменения статуса тест-кейса
            document.querySelectorAll('.status-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const parent = this.parentElement;
                    parent.querySelectorAll('.status-btn').forEach(b => {
                        b.style.fontWeight = 'normal';
                        b.style.border = 'none';
                    });
                    
                    this.style.fontWeight = 'bold';
                    this.style.border = '2px solid currentColor';
                    
                    // Если выбран статус Failed, можно показать форму создания баг-репорта
                    if (this.classList.contains('status-failed')) {
                        alert('Открытие формы создания баг-репорта...');
                    }
                });
            });
        });