import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
const firstImg = process.env.PUBLIC_URL + '/img/first.jpg';
const secondImg = process.env.PUBLIC_URL + '/img/second.jpg';
const thirdImg = process.env.PUBLIC_URL + '/img/third.jpg';
const fourthImg = process.env.PUBLIC_URL + '/img/fourth.jpg';


const Products = ({ theme, toggleTheme }) => {
  const logoPath = theme === 'dark' ? process.env.PUBLIC_URL + '/logo_dark.svg' : process.env.PUBLIC_URL + '/logo_Theme.svg';

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <nav className="landing-nav">
            <Link to="/" className="landing-logo">
              <img className='logo home_logo' src={logoPath} alt="AxionLabs Logo" />
            </Link>
            <div className="landing-nav-links">
              <Link to="/" className="nav-link">Главная</Link>
              <Link to="/products" className="nav-link">Продукты</Link>
              <Link to="/portfolio" className="nav-link">Портфолио</Link>
              <Link to="/contacts" className="nav-link">Контакты</Link>
            </div>
            <div className="landing-auth">
              <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
                <i className="fas fa-circle-half-stroke"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Наши продукты</h1>
            <p className="hero-subtitle">Инновационные решения для управления тестированием и разработки ПО</p>
          </div>
        </div>
      </section>

<section className="product-detail-section">
        <div className="container">
          <div className="product-header">
            <h2 className="section-title">AxionTMP (Test Management Platform)</h2>
            <span className="status-badge status-developing">
              <i className="fas fa-tools"></i> В разработке
            </span>
          </div>
          
          <p className="status-description">
            <strong>Статус проекта:</strong> Активная разработка. Мы работаем над созданием полнофункциональной платформы для управления тестированием. 
            Ожидаемый релиз: 2026 год. Следите за обновлениями!
          </p>
          
          <div className="product-overview">
            <div className="product-text">
              <p className="product-description">
                AxionTMP - это современное веб-приложение от компании AxionLabs для управления процессом тестирования программного обеспечения. 
                Платформа предоставляет комплексный инструментарий для создания, организации и выполнения тестов, а также генерации детальных отчетов.
              </p>
              
              <h3>Ключевые возможности</h3>
              <div className="features-details">
                <div className="feature-detail">
                  <h4><i className="fas fa-clipboard-list"></i> Управление тест-кейсами</h4>
                  <p>Категории тест-кейсов, Drag & Drop, гибкая классификация, приоритизация и теги для быстрого поиска.</p>
                </div>

                <div className="feature-detail">
                  <h4><i className="fas fa-play-circle"></i> Тестовые прогоны</h4>
                  <p>Автоматические и ручные прогоны, интеллектуальный выбор тестов, отслеживание прогресса и история прогонов.</p>
                </div>

                <div className="feature-detail">
                  <h4><i className="fas fa-chart-bar"></i> Отчетность и аналитика</h4>
                  <p>Автоматические и ручные отчеты, визуализация данных, экспорт в PDF/CSV и метрики качества.</p>
                </div>

                <div className="feature-detail">
                  <h4><i className="fas fa-users"></i> Управление пользователями и ролями</h4>
                  <p>Роли пользователей, детальное распределение прав, приглашение членов команды и профили пользователей.</p>
                </div>

                <div className="feature-detail">
                  <h4><i className="fas fa-folder-open"></i> Управление проектами</h4>
                  <p>Создание проектов, иерархия плана тестирования, распределение ответственности и версионирование.</p>
                </div>
              </div>
            </div>
            
            <div className="product-image">
              <img src={process.env.PUBLIC_URL + '/img/first.jpg'} alt="AxionTMP Screenshot" />
            </div>
          </div>

          <div className="screenshots-section">
            <h3>Скриншоты интерфейса</h3>
            <div className="screenshots-grid">
              <img src={process.env.PUBLIC_URL + '/img/first.jpg'} alt="Скриншот 1" />
              <img src={process.env.PUBLIC_URL + '/img/second.jpg'} alt="Скриншот 2" />
              <img src={process.env.PUBLIC_URL + '/img/third.jpg'} alt="Скриншот 3" />
              <img src={process.env.PUBLIC_URL + '/img/fourth.jpg'} alt="Скриншот 4" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Готовы начать проект?</h2>
          <p>Свяжитесь с нами для консультации и оценки вашего проекта</p>
          <Link to="/#contact" className="btn btn-primary">Связаться с нами</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">AxionLabs</h3>
              <p>Профессиональная разработка программного обеспечения</p>
                <img src={logoPath} alt="AxionLabs Logo" className="footer-logo" />
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Контакты</h3>
              <ul className="footer-links">
                <li><i className="fas fa-envelope"></i><a href="mailto:info@AxionLabs.ru">info@AxionLabs.ru</a></li>
                <li><i className="fas fa-phone"></i> <a href="tel:+7(999)672-67-47">+7 (999) 672-67-47</a></li>
                <li><i className="fas fa-map-marker-alt"></i> Москва, Россия</li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Быстрые ссылки</h3>
              <ul className="footer-links">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/products">Продукты</Link></li>
               
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 AxionLabs. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;