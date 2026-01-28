import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import emailjs from '@emailjs/browser';
import PrivacyPolicy from '../components/UI/PrivacyPolicy';

const BaseAltLogo = import.meta.env.BASE_URL + 'Basealt_logo_inv.svg';
const VegaLogo = import.meta.env.BASE_URL + 'logo_vega.svg';

const React_icon = import.meta.env.BASE_URL + 'react1.svg';
const python = import.meta.env.BASE_URL + 'python1.svg';
const mysql = import.meta.env.BASE_URL + 'mysql1.svg';
const go = import.meta.env.BASE_URL + 'go1.svg';
const database = import.meta.env.BASE_URL + 'database1.svg';
const PostgreSQL = import.meta.env.BASE_URL + 'postgresql1.svg';
const docker = import.meta.env.BASE_URL + 'docker1.svg';
const github = import.meta.env.BASE_URL + 'github1.svg';
const aws = import.meta.env.BASE_URL + 'aws1.svg';
const javascript = import.meta.env.BASE_URL + 'javascript1.svg';
const Typescript = import.meta.env.BASE_URL + 'Typescript1.svg';
const Rust = import.meta.env.BASE_URL + 'Rust1.svg';
const next = import.meta.env.BASE_URL + 'next1.svg';
const redis = import.meta.env.BASE_URL + 'redis1.svg';




const About = ({ theme, toggleTheme }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const whyChooseUs = [
    {
      icon: 'fa-rocket',
      title: 'Быстрая разработка',
      description: 'Оптимизированные процессы позволяют нам быстро воплощать идеи в жизнь без потери качества'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Гарантия качества',
      description: 'Полный цикл тестирования и контроля качества на каждом этапе разработки'
    },
    {
      icon: 'fa-headset',
      title: 'Поддержка 24/7',
      description: 'Наша команда всегда готова помочь и решить любые возникающие проблемы'
    },
    {
      icon: 'fa-expand',
      title: 'Масштабируемость',
      description: 'Архитектура, которая растет вместе с вашим бизнесом и адаптируется к изменениям'
    },
    {
      icon: 'fa-handshake',
      title: 'Прозрачность',
      description: 'Открытая коммуникация и регулярные отчеты о ходе разработки проекта'
    },
    {
      icon: 'fa-chart-line',
      title: 'ROI ориентированность',
      description: 'Каждое решение разработано для максимизации возврата инвестиций'
    }
  ];

  const faqItems = [
    {
      question: 'Сколько времени занимает разработка проекта?',
      answer: 'Время разработки зависит от сложности и объема проекта. Простые проекты могут быть реализованы за 2-4 недели, а сложные системы требуют 3-6 месяцев. Мы предоставляем детальную оценку после анализа требований.'
    },
    {
      question: 'Какова стоимость разработки?',
      answer: 'Стоимость зависит от функциональности, технологий и сложности проекта. Мы работаем с бюджетами от 50 000 рублей. Предлагаем гибкие модели сотрудничества: фиксированная цена, время и материалы, или выделенная команда.'
    },
    {
      question: 'Предоставляете ли вы поддержку после запуска?',
      answer: 'Да, мы предоставляем полную техническую поддержку после запуска. Это включает исправление ошибок, оптимизацию производительности, добавление новых функций и мониторинг системы.'
    },
    {
      question: 'Какие технологии вы используете?',
      answer: 'Мы используем современный стек: React, Vue.js, Angular для фронтенда; Node.js, Python, Go, Rust для бэкенда; PostgreSQL, MySQL для БД; Docker, Kubernetes для DevOps. Выбор технологий зависит от требований проекта.'
    },
    {
      question: 'Можете ли вы работать с существующим кодом?',
      answer: 'Конечно! Мы часто работаем с унаследованным кодом, проводим его рефакторинг, оптимизацию и добавляем новые функции. Предварительно проводим аудит кода для оценки состояния.'
    },
    {
      question: 'Как происходит процесс разработки?',
      answer: 'Процесс включает: 1) Анализ требований и планирование, 2) Дизайн архитектуры, 3) Разработка спринтами, 4) Тестирование, 5) Деплой и запуск, 6) Поддержка. Мы используем Agile методологию с еженедельными встречами.'
    },
    {
      question: 'Подписываете ли вы NDA?',
      answer: 'Да, мы готовы подписать соглашение о конфиденциальности (NDA) для защиты вашей интеллектуальной собственности и коммерческой информации.'
    },
    {
      question: 'Как начать сотрудничество?',
      answer: 'Свяжитесь с нами через форму обратной связи или напрямую по телефону/email. Мы проведем консультацию, обсудим ваши требования, предоставим смету и предложим оптимальный вариант сотрудничества.'
    }
  ];


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

  const logoPath = theme === 'dark' ? import.meta.env.BASE_URL + 'logo_dark.svg' : import.meta.env.BASE_URL + 'logo_Theme.svg';

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
            <p className="hero-subtitle enhanced-subtitle">Наша компания специализируется на разработке программного обеспечения под заказ,
ориентируясь на потребности и цели каждого клиента. Мы не используем шаблонные
решения — каждый проект создается с нуля, с учетом специфики бизнеса, особенностей
процессов и желаемого результата. Индивидуальный подход позволяет нам разрабатывать
продукты, которые действительно работают эффективно и приносят пользу заказчику</p>
            
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

           
          </div>
        </div>
      </section>


<section className="unique-solutions-section">
  <div className="container">
    <h2 className="section-title">НАШИ УСЛУГИ</h2>
    
    <div className="solution-text">
      <p className="intro-text">Мы создаем комплексные IT-решения, которые помогают бизнесу оптимизировать процессы, повысить эффективность и получить конкурентное преимущество. Каждое решение разрабатывается с учетом специфики вашей отрасли и бизнес-задач.</p>
      
      <ul className="tech-stack">
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Корпоративное ПО и автоматизация</h3>
            <p className="service-description">Разработка специализированного программного обеспечения для внутренних бизнес-процессов: системы управления ресурсами, инструменты анализа данных, платформы для автоматизации рутинных операций. Интеграция с существующей инфраструктурой компании.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Веб-разработка</h3>
            <p className="service-description">Создание современных веб-приложений, интернет-магазинов, корпоративных порталов и SaaS-платформ. Используем передовые технологии (React, Vue.js, Angular) для быстрых, отзывчивых и безопасных решений с удобным интерфейсом.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Мобильные приложения</h3>
            <p className="service-description">Разработка нативных (iOS/Android) и кроссплатформенных мобильных приложений. От прототипирования и дизайна до публикации в магазинах приложений и последующей поддержки. Фокус на UX и производительности.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">AI/ML для бизнеса</h3>
            <p className="service-description">Внедрение искусственного интеллекта и машинного обучения для решения бизнес-задач: прогнозная аналитика, обработка естественного языка, компьютерное зрение, рекомендательные системы и автоматизация принятия решений.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">QA-сопровождение разработки</h3>
            <p className="service-description">Полный цикл тестирования на всех этапах разработки: от планирования тестовой стратегии до выполнения тестов и отчетности. Гарантируем качество и надежность вашего продукта через автоматизированное и ручное тестирование.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">CRM, ЭДО, интеграции и API</h3>
            <p className="service-description">Разработка и внедрение систем управления взаимоотношениями с клиентами (CRM), электронного документооборота (ЭДО). Создание API для интеграции с внешними сервисами, платежными системами и партнерскими платформами.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Порталы и сервисы</h3>
            <p className="service-description">Создание комплексных портальных решений для клиентов, сотрудников и партнеров: личные кабинеты, системы самообслуживания, биллинговые платформы, образовательные порталы и корпоративные социальные сети.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">iOS/Android и кроссплатформенные решения</h3>
            <p className="service-description">Разработка нативных мобильных приложений с использованием Swift/Kotlin или кроссплатформенных решений на Flutter/React Native. Оптимальный подход в зависимости от требований к производительности, бюджету и времени выхода на рынок.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">LLM, RAG, чат-боты</h3>
            <p className="service-description">Создание интеллектуальных чат-ботов и систем на основе больших языковых моделей (LLM) с использованием Retrieval-Augmented Generation (RAG) для точных ответов на основе ваших данных. Внедрение AI-ассистентов для поддержки клиентов и сотрудников.</p>
          </div>
        </li>
        
        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Авто/ручное/нагрузочное тестирование</h3>
            <p className="service-description">Комплексное тестирование программного обеспечения: автоматизированное тестирование для регрессии, ручное тестирование UX/UI, нагрузочное тестирование для проверки стабильности под высокой нагрузкой, безопасность и тестирование производительности.</p>
          </div>
        </li>

        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Консультирование и аудит</h3>
            <p className="service-description">Стратегическое консультирование по выбору технологий, архитектуре системы и оптимизации процессов разработки. Проведение аудита существующего кода, инфраструктуры и процессов для выявления узких мест и рекомендаций по улучшению.</p>
          </div>
        </li>

        <li className='tech_li'>
          <div className="service-item">
            <h3 className="service-title">Поддержка и развитие проектов</h3>
            <p className="service-description">Долгосрочная техническая поддержка, исправление ошибок, оптимизация производительности и добавление новых функций. Мониторинг системы, управление версиями и планирование развития продукта в соответствии с потребностями бизнеса.</p>
          </div>
        </li>
      </ul>
      
      <div className="conclusion-text">
        <p>Развивающемуся бизнесу часто становится мало готовых сервис-решений, и требуется индивидуальная система, способная покрыть все действующие потребности.</p>
        <p>Мы обеспечиваем полный цикл разработки от архитектурных решений до регулярных релизов и поддержки. Наши решения масштабируются вместе с вашим бизнесом и адаптируются к меняющимся требованиям рынка.</p>
      </div>
    </div>
  </div>
  
  <a href="#contacts" className="btn btn-primary hero-cta">
    <i className="fas fa-calculator"></i> РАССЧИТАТЬ СТОИМОСТЬ ПРОЕКТА
  </a>
</section>


       <section className="unique-solutions-section">
        <div className="container">
          <h2 className="section-title">УНИКАЛЬНЫЕ РЕШЕНИЯ</h2>
          
         
           
            <div className="solution-text">
              
              <h3>ДЛЯ ОБЕСПЕЧЕНИЯ ВЫСОКОЙ ПРОИЗВОДИТЕЛЬНОСТИ ВЫБИРАЕМ:</h3>
              <ul className="tech-stack">
                <li className='tech_li'><p>React.js для современных веб-приложений </p> <img className='icon_stack' src={React_icon} alt=""/></li> 
                <li className='tech_li' ><p>JavaScript (ES6+) — фундамент веб-разработки. </p> <img className='icon_stack' src={javascript} alt=""/></li>
                <li className='tech_li' ><p>TypeScript — для повышения надежности, поддерживаемости и масштабируемости кода. </p> <img className='icon_stack' src={Typescript} alt=""/></li>
                <li className='tech_li' ><p>Rust — для системного программирования, где критичны безопасность памяти и производительность. </p> <img className='icon_stack' src={Rust} alt=""/></li>
                <li className='tech_li' ><p> Go для backend-разработки </p> <img className='icon_stack' src={go} alt=""/></li>
                <li className='tech_li' ><p>Docker — создание контейнеров для унификации окружения. </p> <img className='icon_stack' src={docker} alt=""/></li>
                <li className='tech_li' ><p>Python для аналитики и AI </p> <img className='icon_stack' src={python} alt=""/></li>
                <li className='tech_li' ><p>Облачные платформы (AWS, Azure) </p> <img className='icon_stack' src={aws} alt=""/></li>
                <li className='tech_li' ><p>GitHub Actions, GitLab CI, Jenkins — автоматизация процессов сборки, тестирования и развертывания. </p> <img className='icon_stack' src={github} alt=""/></li>
                <li className='tech_li'>
                  <div>
                    <p>Современные базы данных</p>
                    <ul>
                      <li className='tech_li tech_li_bd'><p>PostgreSQL</p> <img className='icon_stack'  src={PostgreSQL} alt=""/></li>
                      <li className='tech_li tech_li_bd'><p>MySQL</p> <img className='icon_stack' src={mysql} alt=""/></li>
                    </ul>
                  </div>
                  <img className='icon_stack' src={database} alt=""/>
                </li>
                <li className='tech_li'><p>Next.js — full-stack фреймворк для React с рендерингом на стороне сервера, маршрутизацией и API-роутами.</p><img className='icon_stack' src={next} alt="Next.js"/></li>
                <li className='tech_li'><p>Redis — кэширование и работа со структурами данных в памяти для высокой производительности приложений.</p><img className='icon_stack' src={redis} alt="Redis"/></li>
              </ul>
              
              <p>Развивающемуся бизнесу часто становится мало готовых сервис-решений, и требуется индивидуальная система, способная покрыть все действующие потребности.</p>
              <p>Мы обеспечиваем полный цикл разработки от архитектурных решений до регулярных релизов и поддержки.</p>
            </div>
            
           

              </div>
      
      </section>

      <section className="why-choose-us-section">
        <div className="container">
          <h2 className="section-title">ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
          <p className="section-subtitle">Мы предлагаем не просто услуги, а полное решение для вашего бизнеса</p>
          
          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-choose-card">
                <div className="why-choose-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-description">{item.description}</p>
              </div>
            ))}
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

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
          <p className="section-subtitle">Ответы на популярные вопросы о нашей работе</p>
          
          <div className="faq-container">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${expandedFAQ === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <i className={`fas fa-chevron-down ${expandedFAQ === index ? 'rotated' : ''}`}></i>
                </button>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
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
                <label htmlFor="privacy">Да, я прочитал и согласен с <a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }}>Политикой конфиденциальности</a></label>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ'}
              </button>
            </form>
            {submitMessage && <p className={`submit-message ${messageType}`}>{submitMessage}</p>}
          </div>
        </div>
      </section>

      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

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