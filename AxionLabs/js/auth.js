import Storage from './storage.js';

document.addEventListener('DOMContentLoaded', function() {
    // Если пользователь уже авторизован, перенаправляем в dashboard
    if (Storage.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Переключение между формами входа и регистрации
    document.getElementById('showRegister').addEventListener('click', () => {
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('registerForm').classList.add('active');
    });
    
    document.getElementById('showLogin').addEventListener('click', () => {
        document.getElementById('registerForm').classList.remove('active');
        document.getElementById('loginForm').classList.add('active');
    });
    
    // Обработка формы входа
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Получаем всех пользователей
        const users = JSON.parse(localStorage.getItem('AxionLabsUsers') || '[]');
        
        // Проверяем существование пользователя
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Сохраняем информацию о входе
            Storage.saveUser({
                id: user.id,
                name: user.name,
                email: user.email
            });
            
            // Перенаправляем в dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Неверный email или пароль');
        }
    });
    
    // Обработка формы регистрации
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        
        // Получаем всех пользователей
        const users = JSON.parse(localStorage.getItem('AxionLabsUsers') || '[]');
        
        // Проверяем, не зарегистрирован ли уже email
        if (users.some(u => u.email === email)) {
            alert('Пользователь с таким email уже зарегистрирован');
            return;
        }
        
        // Создаем нового пользователя
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        // Сохраняем пользователя
        users.push(newUser);
        localStorage.setItem('AxionLabsUsers', JSON.stringify(users));
        
        // Автоматически входим
        Storage.saveUser({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
        
        // Перенаправляем в dashboard
        window.location.href = 'dashboard.html';
    });
});