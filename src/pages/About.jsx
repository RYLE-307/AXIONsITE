import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import emailjs from '@emailjs/browser';

const About = ({ theme, toggleTheme }) => {
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
            <div className="landing-auth">
              <Link to="/products" className="btn btn-primary">Продукты</Link>
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
              <div className="hero-header-row">
                <div className="hero-header-text">
                  <h1 className="hero-title">AxionLabs - Разработка программного обеспечения</h1>
                  <p className="hero-subtitle">Инновационные решения для вашего бизнеса</p>
                </div>

                <div className="hero-image">
                  <div className="hero-image-placeholder">
                    AxionLabs
                  </div>
                </div>
              </div>

              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <span>Разработка веб-приложений</span>
                </div>
               
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <span>Облачные решения</span>
                </div>

              

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-flask"></i>
                  </div>
                  <span>Тестирование ПО</span>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-palette"></i>
                  </div>
                  <span>UI/UX дизайн</span>
                </div>

                              </div>

              <a href="#contact" className="btn btn-primary">
                <i className="fas fa-envelope"></i> Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title">О компании AxionLabs</h2>
          <p className="about-description">
            AxionLabs - это команда профессионалов, специализирующихся на разработке современного программного обеспечения.
            Мы создаем инновационные решения, которые помогают бизнесу расти и развиваться в цифровую эпоху.
          </p>
          <p className="about-description">
            Наша экспертиза включает разработку веб-приложений, мобильных приложений, облачных решений и систем управления тестированием.
            Мы стремимся к качеству, инновациям и удовлетворению потребностей наших клиентов.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Наши услуги</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="feature-card-title">Веб-разработка</h3>
              <p className="feature-card-desc">Создание современных веб-приложений с использованием передовых технологий</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="feature-card-title">Мобильная разработка</h3>
              <p className="feature-card-desc">Разработка нативных и кросс-платформенных мобильных приложений</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="feature-card-title">Облачные решения</h3>
              <p className="feature-card-desc">Миграция и разработка приложений в облачной среде</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-flask"></i>
              </div>
              <h3 className="feature-card-title">Тестирование ПО</h3>
              <p className="feature-card-desc">Комплексное тестирование и управление качеством программного обеспечения</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3 className="feature-card-title">UI/UX дизайн</h3>
              <p className="feature-card-desc">Создание интуитивного и привлекательного пользовательского интерфейса</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="feature-card-title">DevOps</h3>
              <p className="feature-card-desc">Автоматизация процессов разработки и развертывания приложений</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="feature-card-title">Аналитика и BI</h3>
              <p className="feature-card-desc">Разработка систем аналитики и бизнес-интеллекта для принятия решений</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="feature-card-title">Кибербезопасность</h3>
              <p className="feature-card-desc">Защита приложений и данных от киберугроз и уязвимостей</p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3 className="feature-card-title">Консалтинг и аудит</h3>
              <p className="feature-card-desc">Профессиональные консультации и анализ существующих систем</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Свяжитесь с нами</h2>

          <div className="contact-form">
            <h3 className="form-title">Форма обратной связи</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-group">
                <label htmlFor="feedbackName">Имя</label>
                <input type="text" id="feedbackName" name="from_name" required placeholder="Введите ваше имя" />
              </div>

              <div className="form-group">
                <label htmlFor="feedbackEmail">Email</label>
                <input type="email" id="feedbackEmail" name="from_email" required placeholder="Введите ваш email" />
              </div>

              <div className="form-group">
                <label htmlFor="feedbackMessage">Сообщение</label>
                <textarea id="feedbackMessage" name="message" required placeholder="Расскажите о вашем проекте или задайте вопрос"></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
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

export default About;