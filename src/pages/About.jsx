import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import emailjs from '@emailjs/browser';

const BaseAltLogo = process.env.PUBLIC_URL + '/Basealt_logo_inv.svg';
const VegaLogo = process.env.PUBLIC_URL + '/logo_vega.svg';



const About = ({ theme, toggleTheme }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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
            <div className={`landing-nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Главная</Link>
              <Link to="/portfolio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Портфолио</Link>
              <Link to="/contacts" className="nav-link" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
            </div>
            <div className="landing-auth">
              <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className={`hero-section enhanced-hero ${theme}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title enhanced-title">СОЗДАЕМ ЛУЧШИЕ ЦИФРОВЫЕ РЕШЕНИЯ ДЛЯ БИЗНЕСА</h1>
            <p className="hero-subtitle enhanced-subtitle">РУССКОЯЗЫЧНАЯ КОМПАНИЯ ДЛЯ ИННОВАЦИОННЫХ IT-РЕШЕНИЙ</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">лет опыта</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">сотрудников</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">клиентов</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">80%</div>
                <div className="stat-label">повторных заказов</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">выполненных проектов</div>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary hero-cta">
              <i className="fas fa-calculator"></i> РАССЧИТАТЬ СТОИМОСТЬ ПРОЕКТА
            </a>
          </div>
        </div>
      </section>

      <section className="unique-solutions-section">
        <div className="container">
          <h2 className="section-title">УНИКАЛЬНЫЕ РЕШЕНИЯ</h2>
          
          <div className="solutions-content">
            <div className="solution-text">
              <h3>ВАЖНОЕ ПРЕИМУЩЕСТВО ПРИ РАБОТЕ С НАМИ</h3>
              <p>При работе с нами, Вы получаете исключительное право собственности на продукт. Мы не станем повторять Ваш программный код в других проектах. Для нас каждый проект уникален, а Вы - его владелец.</p>
              
              <h3>ДЛЯ ОБЕСПЕЧЕНИЯ ВЫСОКОЙ ПРОИЗВОДИТЕЛЬНОСТИ ВЫБИРАЕМ:</h3>
              <ul className="tech-stack">
                <li>React.js для современных веб-приложений</li>
                <li>Node.js для backend-разработки</li>
                <li>Python для аналитики и AI</li>
                <li>Облачные платформы (AWS, Azure)</li>
                <li>Современные базы данных</li>
              </ul>
              
              <p>Развивающемуся бизнесу часто становится мало готовых сервис-решений, и требуется индивидуальная система, способная покрыть все действующие потребности.</p>
              <p>Мы обеспечиваем полный цикл разработки от архитектурных решений до регулярных релизов и поддержки.</p>
            </div>
            
            <div className="solution-image">
              <div className="placeholder-image">
                <i className="fas fa-code"></i>
                <span>Инновационные технологии</span>
              </div>
            </div>
          </div>
        </div>
      </section>

          <section className="clients-section">
        <div className="container">
          <h2 className="section-title">НАМ ДОВЕРЯЮТ</h2>
          <p className="clients-subtitle">Мы работаем с компаниями различных масштабов и отраслей</p>
              <div className="clients-grid">
                        <div className="client-logo">
              <div className="client-placeholder">
                 <a href="http://basealt.ru/" target="_blank" rel="noopener noreferrer" className="client-logo">
              <img className='client-logo-img' src={BaseAltLogo} alt="BaseAlt Logo" />
                 </a>
                  <a href="https://vega-absolute.ru/" target="_blank" rel="noopener noreferrer" className="client-logo">
              <img className='client-logo-img' src={VegaLogo} alt="Vega Logo" />
                 </a>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      <section id="contact" className={`contact-section enhanced-hero ${theme}`}>
        <div className="container">
          <h2 className="section-title enhanced-title">ИНДИВИДУАЛЬНАЯ КОНСУЛЬТАЦИЯ</h2>
          <p className="contact-subtitle enhanced-subtitle">Запишитесь на консультацию. Доверьте Вашу задачу профессионалам</p>

          <div className="contact-form">
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="feedbackName">Имя *</label>
                  <input type="text" id="feedbackName" name="from_name" required placeholder="Ваше имя" />
                </div>
                <div className="form-group">
                  <label htmlFor="feedbackCompany">Компания *</label>
                  <input type="text" id="feedbackCompany" name="company" required placeholder="Название компании" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="feedbackEmail">Email *</label>
                  <input type="email" id="feedbackEmail" name="from_email" required placeholder="ваш@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="feedbackPhone">Номер телефона *</label>
                  <input type="tel" id="feedbackPhone" name="phone" required placeholder="+7 (999) 123-45-67" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="feedbackMessage">Несколько слов о Вашем проекте *</label>
                <textarea id="feedbackMessage" name="message" required placeholder="Опишите ваш проект, удобный способ связи или другие важные детали"></textarea>
              </div>

              <div className="form-group checkbox-group">
                <input type="checkbox" className='checkbox-input' id="privacy" required />
                <label htmlFor="privacy">Да, я прочитал и согласен с <a href="#privacy">Политикой конфиденциальности</a></label>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ'}
              </button>
            </form>
            {submitMessage && <p className={`submit-message ${messageType}`}>{submitMessage}</p>}
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

export default About;