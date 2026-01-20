import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useToast } from '../components/UI/ToastContext';
const firstImg = '/img/first.jpg';
const secondImg = '/img/second.jpg';
const thirdImg = '/img/third.jpg';
const fourthImg = '/img/fourth.jpg';


const Products = ({ theme, toggleTheme }) => {
  const { addToast } = useToast();
  const logoPath = theme === 'dark' ? '/logo_dark.svg' : '/logo_Theme.svg';
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (src) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <nav className="landing-nav">
            <a href="/" className="landing-logo">
              <img className='logo home_logo' src={logoPath} alt="AxionLabs Logo" />
            </a>
            <div className="landing-auth">
              <a href="/products" className="btn btn-primary">Продукты</a>
              <button className="theme-toggle" onClick={toggleTheme}>
                <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
              </button>

            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Наши продукты</h1>
              <p className="hero-subtitle">Инновационные решения для управления тестированием</p>

              
            </div>

            <div className="hero-image">
              <div className="hero-image-placeholder">
                AxionLabs Products
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">AxionLabs TMP (Test Management Platform) <span className="status-badge">В разработке</span></h2>
          <p className="product-description">
           Axion TMP - это современное веб-приложение от компании AxionLabs для управления процессом тестирования программного обеспечения. Платформа предоставляет комплексный инструментарий для создания, организации и выполнения тестов, а также генерации детальных отчетов. 
          </p>
          <p className="product-description">
            Организация тестов - Структурированное хранение и категоризация тест-кейсов
          </p>
          <ul className="product-list">
            <li><strong>Управление проектами</strong> - Создание и настройка отдельных проектов тестирования</li>
            <li><strong>Управление командой</strong> - Распределение ролей и прав доступа пользователей</li>
            <li><strong>Автоматизация процессов</strong> - Запуск автоматических и ручных тестов</li>
            <li><strong>Анализ результатов</strong> - Генерация отчетов и метрик тестирования</li>
            <li><strong>Отслеживание дефектов</strong> - Ведение истории найденных ошибок и их статусов</li>
          </ul>

          <div className="product-features">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span>Управление тест-кейсами</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <span>Командная работа</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <span>Аналитика и отчеты</span>
            </div>
          </div>

          <div className="screenshots-section">
            <h3>Скриншоты</h3>
            <div className="screenshots-scroll">
               <div className="screenshot-placeholder">
                <img src={firstImg} alt="Скриншот 1" onClick={() => openModal(firstImg)} style={{ cursor: 'pointer' }} />
              </div>
              <div className="screenshot-placeholder">
                <img src={secondImg} alt="Скриншот 2" onClick={() => openModal(secondImg)} style={{ cursor: 'pointer' }} />
              </div>
               <div className="screenshot-placeholder">
                <img src={thirdImg} alt="Скриншот 3" onClick={() => openModal(thirdImg)} style={{ cursor: 'pointer' }} />
              </div>
               <div className="screenshot-placeholder">
                <img src={fourthImg} alt="Скриншот 4" onClick={() => openModal(fourthImg)} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">AxionLabs</h3>
              <p>Профессиональная разработка программного обеспечения</p>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Контакты</h3>
              <ul className="footer-links">
                <li><i className="fas fa-envelope"></i><a href="mailto:info@AxionLabs.ru">info@AxionLabs.ru</a></li>
                <li><i className="fas fa-phone"></i> <a href="tel:+7(999)123-45-67">+7 (999) 123-45-67</a></li>
                <li><i className="fas fa-map-marker-alt"></i> Москва, Россия</li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Быстрые ссылки</h3>
              <ul className="footer-links">
                <li><a href="/">Главная</a></li>
                <li><a href="/products">Продукты</a></li>
               
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 AxionLabs. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <img src={selectedImage} alt="Увеличенное изображение" className="modal-img" />
        </div>
      )}
    </div>
  );
};

export default Products;