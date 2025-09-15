// Управление темой приложения
const Theme = {
    // Инициализация темы
    init: function() {
        this.applySavedTheme();
        this.setupThemeToggle();
    },
    
    // Применение сохраненной темы
    applySavedTheme: function() {
        const savedTheme = localStorage.getItem('AxionLabsTheme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        this.updateThemeIcon();
    },
    
    // Настройка переключателя темы
    setupThemeToggle: function() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    },
    
    // Переключение темы
    toggleTheme: function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('AxionLabsTheme', 'light');
        } else {
            localStorage.setItem('AxionLabsTheme', 'dark');
        }
        
        this.updateThemeIcon();
    },
    
    // Обновление иконки темы
    updateThemeIcon: function() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            if (document.body.classList.contains('light-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    },
    
    // Получение текущей темы
    getCurrentTheme: function() {
        return document.body.classList.contains('light-theme') ? 'light' : 'dark';
    }
};

// Инициализация темы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    Theme.init();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Theme;
}