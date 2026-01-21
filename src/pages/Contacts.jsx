import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import emailjs from '@emailjs/browser';

const Contacts = ({ theme, toggleTheme }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setMessageType('');

    try {
      await emailjs.sendForm(
        'service_zgm9uap', // Замените на ваш Service ID из EmailJS
        'template_g1ls0zg', // Замените на ваш Template ID
        e.target,
        'JRXdjzxl5wloLMLHS' // Замените на ваш Public Key
      );
      setSubmitMessage('Спасибо! Ваше сообщение отправлено.');
      setMessageType('success');
      e.target.reset();
    } catch (error) {
      setSubmitMessage('Ошибка отправки. Попробуйте позже.');
      setMessageType('error');
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link to="/portfolio" className="nav-link">Портфолио</Link>
              <Link to="/contacts" className="nav-link active">Контакты</Link>
            </div>
            <div className="landing-auth">
              <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
                <i className="fas fa-circle-half-stroke"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className="contacts-hero-section enhanced-hero">
        <div className="container">
          <h1 className="contacts-title enhanced-title">КОНТАКТЫ</h1>
          <p className="contacts-subtitle enhanced-subtitle">Свяжитесь с нами для обсуждения вашего проекта</p>
        </div>
      </section>

      <section className="contacts-content-section">
        <div className="container">
          <div className="contacts-grid">
            <div className="contact-info">
              <h2>Информация о компании</h2>
              
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:info@AxionLabs.ru">info@AxionLabs.ru</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h3>Телефон</h3>
                    <a href="tel:+7(999)672-67-47">+7 (999) 672-67-47</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3>Адрес</h3>
                    <p>Москва, Россия</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h3>Режим работы</h3>
                    <p>Пн-Пт: 9:00 - 18:00</p>
                    <p>Сб-Вс: выходной</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Мы в социальных сетях</h3>
                <div className="social-icons">
                  <a href="#" className="social-link">
                    <i className="fab fa-telegram"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-vk"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-section enhanced-hero">
              <h2 className="enhanced-title">Напишите нам</h2>
              <p className="enhanced-subtitle">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
              
              <form onSubmit={handleFeedbackSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactName">Имя *</label>
                    <input type="text" id="contactName" name="from_name" required placeholder="Ваше имя" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactCompany">Компания *</label>
                    <input type="text" id="contactCompany" name="company" required placeholder="Название компании" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email *</label>
                    <input type="email" id="contactEmail" name="from_email" required placeholder="ваш@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Номер телефона *</label>
                    <input type="tel" id="contactPhone" name="phone" required placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactMessage">Сообщение *</label>
                  <textarea id="contactMessage" name="message" required placeholder="Опишите ваш проект или задайте вопрос"></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy">Да, я прочитал и согласен с <a href="#privacy">Политикой конфиденциальности</a></label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ СООБЩЕНИЕ'}
                </button>
              </form>
              {submitMessage && <p className={`submit-message ${messageType}`}>{submitMessage}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2>Как нас найти</h2>
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Москва, Россия</p>
            <small>Интерактивная карта будет добавлена позже</small>
          </div>
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
                <li><Link to="/portfolio">Портфолио</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
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

export default Contacts;