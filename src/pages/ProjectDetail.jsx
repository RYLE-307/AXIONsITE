import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/global.css';
import '../styles/home.css';
import emailjs from '@emailjs/browser';


const ProjectDetail = ({ theme, toggleTheme }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. Получите id из URL параметров
  const { id } = useParams();

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setMessageType('');

    try {
      await emailjs.sendForm(
        'service_zgm9uap',
        'template_g1ls0zg',
        e.target,
        'JRXdjzxl5wloLMLHS'
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

  const projects = [
    {
      id: 'AxionTMP',
      title: 'AxionTMP - Test Management Platform',
      category: 'ВЕБ-ПРИЛОЖЕНИЯ',
      description: 'Современная платформа для управления процессом тестирования программного обеспечения с комплексным инструментарием.',
      fullDescription: '',
      works: ['Исследование', 'Дизайн', 'Frontend разработка', 'Backend разработка', 'Тестирование', 'Документация'],
      stack: ['React 18+', 'Node.js', 'PostgreSQL', 'Docker', 'CSS3'],
      image: process.env.PUBLIC_URL + '/img/first.jpg',
      status: 'В разработке',
      client: 'AxionLabs',
      duration: '5 месяцев',
      team: '5 разработчиков'
    },
   
  ];

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="landing-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h1>Проект не найден</h1>
          <Link to="/portfolio" className="btn btn-primary">Вернуться к портфолио</Link>
        </div>
      </div>
    );
  }

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
              <Link to="/portfolio" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Портфолио</Link>
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

      <section className={`project-hero ${theme}`}>
        <div className="container">
          <div className="project-hero-content">
            <div className="project-hero-text">
              <div className="project-category-tag">{project.category}</div>
              <h1 className="project-hero-title">{project.title}</h1>
              <p className="project-hero-description">{project.description}</p>
              <div className="project-works-tags">
                {project.works.map(work => (
                  <span key={work} className="work-tag">{work}</span>
                ))}
              </div>
            </div>
            <div className="project-hero-image">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="project-content">
        <div className="container">

          {/* ТРЕБОВАНИЯ */}
          <div className="project-section">
            <h2 className="section-title">ТРЕБОВАНИЯ</h2>
            <div className="section-content">
              <p>AxionLabs требовалась современная платформа для управления процессом тестирования программного обеспечения. Ключевые требования включали:</p>
              <ul>
                <li>Комплексный инструментарий для создания, организации и выполнения тестов</li>
                <li>Генерация детальных отчетов и метрик тестирования</li>
                <li>Управление тест-кейсами, прогонами и пользователями</li>
                <li>Интуитивный интерфейс для QA команд</li>
                <li>Масштабируемость и гибкость под различные методологии</li>
              </ul>
            </div>
          </div>

          {/* СТЕК ТЕХНОЛОГИЙ */}
          <div className="project-section">
            <h2 className="section-title">СТЕК ТЕХНОЛОГИЙ</h2>
            <div className="tech-stack-grid">
              {project.stack.map(tech => (
                <span key={tech} className="tech-item">{tech}</span>
              ))}
            </div>
          </div>

          {/* АНАЛИЗ И ПРЕДЛОЖЕНИЕ */}
          <div className="project-section">
            <h2 className="section-title">АНАЛИЗ И ПРЕДЛОЖЕНИЕ</h2>
            <div className="section-content">
              <p>После глубокого анализа рынка и требований клиента, мы предложили создать платформу, которая объединяет все процессы QA в едином инструменте. Основные принципы разработки:</p>
              <ul>
                <li><strong>Интеграция в один инструмент</strong> - Все процессы QA в одном месте</li>
                <li><strong>Удобный интерфейс</strong> - Интуитивный дизайн для быстрого освоения</li>
                <li><strong>Гибкость</strong> - Адаптация под различные методологии тестирования</li>
                <li><strong>Масштабируемость</strong> - Поддержка как малых, так и крупных проектов</li>
                <li><strong>Аналитика</strong> - Детальные отчеты и метрики для улучшения качества</li>
              </ul>
            </div>
          </div>

          {/* ФУНКЦИОНАЛЬНОСТЬ И ДИЗАЙН */}
          <div className="project-section">
            <h2 className="section-title">ФУНКЦИОНАЛЬНОСТЬ И ДИЗАЙН</h2>
            <div className="section-content">
              <div className="project-features">
                <div className="feature-item">
                  <h3>Управление тест-кейсами</h3>
                  <p>Структурированное хранение и категоризация тест-кейсов с поддержкой Drag & Drop, гибкой классификацией и приоритизацией.</p>
                </div>
                <div className="feature-item">
                  <h3>Управление тест-ранами</h3>
                  <p>Автоматические и ручные прогоны с отслеживанием прогресса в реальном времени и историей выполнения.</p>
                </div>
                <div className="feature-item">
                  <h3>Система отчетности</h3>
                  <p>Автоматические и ручные отчеты с визуализацией, экспортом в PDF/CSV и метриками качества.</p>
                </div>
                <div className="feature-item">
                  <h3>Управление пользователями</h3>
                  <p>Ролевая система с детальным распределением прав доступа и управлением командами.</p>
                </div>
              </div>
            </div>
            <div className="project-images">
              <img src={process.env.PUBLIC_URL + '/img/first.jpg'} alt="AxionTMP Dashboard" />
              <img src={process.env.PUBLIC_URL + '/img/fourth.jpg'} alt="Test Management Interface" />
              <img src={process.env.PUBLIC_URL + '/img/third.jpg'} alt="Test Management Interface" />
              <img src={process.env.PUBLIC_URL + '/img/second.jpg'} alt="Test Management Interface" />

            </div>
          </div>

          {/* ЗАКЛЮЧЕНИЕ */}
          <div className="project-section">
            <h2 className="section-title">ЗАКЛЮЧЕНИЕ</h2>
            <div className="section-content">
              <p>AxionTMP успешно объединяет все аспекты управления тестированием в единой платформе. Проект демонстрирует современный подход к разработке QA-инструментов с акцентом на пользовательский опыт и эффективность процессов.</p>
              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-number">{project.duration}</span>
                  <span className="stat-label">Продолжительность</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{project.team}</span>
                  <span className="stat-label">Команда</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{project.status}</span>
                  <span className="stat-label">Статус</span>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      <section className="project-contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">ИНДИВИДУАЛЬНАЯ КОНСУЛЬТАЦИЯ</h2>
            <p>МЫ РАБОТАЕМ С БЮДЖЕТАМИ ОТ 50 000 РУБЛЕЙ. ЭТОГО ХВАТАЕТ ДЛЯ РЕАЛИЗАЦИИ БАЗОВОГО ФУНКЦИОНАЛА ПРОДУКТА И ЕГО ДАЛЬНЕЙШЕГО РАЗВИТИЯ</p>
            
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

export default ProjectDetail;