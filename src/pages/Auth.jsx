
import React, { useState } from 'react';
import '../styles/auth.css';

const AuthPage = ({ onLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLegalEntity, setIsLegalEntity] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.elements.registerName.value;
    const email = e.target.elements.registerEmail.value;
    const password = e.target.elements.registerPassword.value;
    const confirmPassword = e.target.elements.registerConfirmPassword.value;
    const company = isLegalEntity
      ? e.target.elements.registerCompany.value
      : "физ. лицо";

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (users.some(u => u.email === email)) {
      alert('Пользователь с таким email уже зарегистрирован');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      company,
      createdAt: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    onLogin({ id: newUser.id, name: newUser.name, email: newUser.email, company: newUser.company });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.loginEmail.value;
    const password = e.target.elements.loginPassword.value;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Неверный email или пароль');
      return;
    }
    onLogin(user);
  };

return (
  <div className="welcome-page">
    <div className="welcome-container">
      <a href="/" className="back-button">
        <i className="fas fa-arrow-left"></i> На главную
      </a>
      
      <div className="welcome-logo">
        <i className="fas fa-bug"></i>
      </div>
      <h1 className="welcome-title">Добро пожаловать в AxionLabs</h1>
      <p className="welcome-subtitle">Платформа для управления тестированием</p>
      
      {/* Форма входа */}
      <form 
        className={`auth-form ${isLoginForm ? 'active' : ''}`} 
        id="loginForm"
        onSubmit={handleLogin}
      >
        <h2 className='loginFormTitle'>Вход</h2>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail" required placeholder="Введите ваш email" />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Пароль</label>
          <input type="password" id="loginPassword" required placeholder="Введите ваш пароль" />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Войти</button>
        <div className="form-switcher">
          Нет аккаунта? <span onClick={() => setIsLoginForm(false)}>Зарегистрироваться</span>
        </div>
      </form>
      
      {/* Форма регистрации */}
      <form 
        className={`auth-form ${!isLoginForm ? 'active' : ''}`} 
        id="registerForm"
        onSubmit={handleRegister}
      >
        <h2 className='regiterFormTitle'>Регистрация</h2>
        
        <div className="form-group">
          <label>Тип пользователя</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
              className='radio-input'
                type="radio"
                name="userType"
                value="individual"
                checked={!isLegalEntity}
                onChange={() => setIsLegalEntity(false)}
              /> 
              <span className="radio-text">Физ. лицо</span>
            </label>
            <label className="radio-label">
              <input
              className='radio-input'
                type="radio"
                name="userType"
                value="legal"
                checked={isLegalEntity}
                onChange={() => setIsLegalEntity(true)}
              /> 
              <span className="radio-text">Юр. лицо</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="registerName">Имя</label>
          <input type="text" id="registerName" required placeholder="Введите ваше имя" />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">Email</label>
          <input type="email" id="registerEmail" required placeholder="Введите ваш email" />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Пароль</label>
          <input type="password" id="registerPassword" required placeholder="Придумайте пароль" />
        </div>
        <div className="form-group">
          <label htmlFor="registerConfirmPassword">Подтверждение пароля</label>
          <input type="password" id="registerConfirmPassword" required placeholder="Повторите пароль" />
        </div>

        {isLegalEntity && (
          <div className="form-group">
            <label htmlFor="registerCompany">Название компании</label>
            <input type="text" id="registerCompany" required placeholder="Введите название компании" />
          </div>
        )}
        
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Зарегистрироваться</button>
        <div className="form-switcher">
          Уже есть аккаунт? <span onClick={() => setIsLoginForm(true)}>Войти</span>
        </div>
      </form>
    </div>
  </div>
);
}
export default AuthPage;