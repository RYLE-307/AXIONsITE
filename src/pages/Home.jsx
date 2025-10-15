import React from 'react';
import '../styles/global.css';
import '../styles/home.css';

const LandingPage = ({ theme, toggleTheme }) => {
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
  };
const logoPath = theme === 'dark' ? '/logo_dark.svg' : '/logo_Theme.svg';
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <nav className="landing-nav">
            <a href="#" className="landing-logo">
               <img src={logoPath} alt="AxionLabs Logo" />  AxionLabs
            </a>
            <div className="landing-auth">
              <button className="theme-toggle" onClick={toggleTheme}>
                <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
              </button>
              <a href="/auth?action=login" className="btn btn-outline">Войти</a>
              <a href="/auth?action=register" className="btn btn-primary">Начать работу</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Профессиональная платформа для тестирования</h1>
              <p className="hero-subtitle">Создавайте, запускайте и анализируйте тесты с легкостью</p>
              
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <span>Быстрая настройка и запуск тестов</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <span>Детальная аналитика и отчетность</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <span>Совместная работа над проектами</span>
                </div>
              </div>
              
              <a href="/auth?action=register" className="btn btn-primary">
                <i className="fas fa-play"></i> Начать бесплатно
              </a>
            </div>
            
            <div className="hero-image">
              <div className="hero-image-placeholder">
                NovaTest Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают AxionLabs?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="feature-card-title">Мощный функционал</h3>
              <p className="feature-card-desc">Все необходимые инструменты для создания и управления тест-кейсами в одном месте</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <h3 className="feature-card-title">Высокая производительность</h3>
              <p className="feature-card-desc">Быстрый запуск тестов и мгновенные результаты</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="feature-card-title">Надежность</h3>
              <p className="feature-card-desc">Стабильная работа и защита ваших данных</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Свяжитесь с нами</h2>
          
          <div className="contact-form">
            <h3 className="form-title">Форма обратной связи</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-group">
                <label htmlFor="feedbackName">Имя</label>
                <input type="text" id="feedbackName" required placeholder="Введите ваше имя" />
              </div>
              
              <div className="form-group">
                <label htmlFor="feedbackEmail">Email</label>
                <input type="email" id="feedbackEmail" required placeholder="Введите ваш email" />
              </div>
              
              <div className="form-group">
                <label htmlFor="feedbackMessage">Сообщение</label>
                <textarea id="feedbackMessage" required placeholder="Расскажите о вашем проекте или задайте вопрос"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">AxionLabs</h3>
              <p>Профессиональная платформа для управления тестированием</p>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-title">Контакты</h3>
              <ul className="footer-links">
                <li><i className="fas fa-envelope"></i><a href="mailto:info@NovaTest.ru">info@NovaTest.ru</a></li>
                <li><i className="fas fa-phone"></i> <a href="tel:+7(999)123-45-67">+7 (999) 123-45-67</a></li>
                <li><i className="fas fa-map-marker-alt"></i> Москва, Россия</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-title">Быстрые ссылки</h3>
              <ul className="footer-links">
                <li><a href="#">О нас</a></li>
                <li><a href="#">Документация</a></li>
                <li><a href="#">Поддержка</a></li>
                <li><a href="#">Блог</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 AxionLabs. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;