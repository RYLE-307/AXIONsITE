import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';

const Portfolio = ({ theme, toggleTheme }) => {
  const logoPath = theme === 'dark' ? process.env.PUBLIC_URL + '/logo_dark.svg' : process.env.PUBLIC_URL + '/logo_Theme.svg';

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'AxionTMP - Test Management Platform',
      category: 'ВЕБ-ПРИЛОЖЕНИЯ',
      description: 'Современная платформа для управления процессом тестирования программного обеспечения с комплексным инструментарием.',
      works: ['Design', 'Front-end', 'Back-end', 'Testing'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'React Router DOM', 'Context API'],
      architecture: ['Модульная структура', 'Переиспользуемые UI компоненты', 'Пользовательские хуки для работы с API', 'Адаптивный  Слой для работы с API и данными'],
      image: process.env.PUBLIC_URL + '/img/first.jpg',
      status: 'В разработке'
    },

  ];

  const categories = ['all', 'ВЕБ-ПРИЛОЖЕНИЯ', 'ВЕБ-САЙТЫ', 'МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ', 'ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ'];

  const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

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
              <Link to="/portfolio" className="nav-link active">Портфолио</Link>
              <Link to="/contacts" className="nav-link">Контакты</Link>
            </div>
            <div className="landing-auth">
             
            </div>
          </nav>
        </div>
      </header>

      <section className={`portfolio-hero-section enhanced-hero ${theme}`}>
        <div className="container">
          <h1 className="portfolio-title enhanced-title">Наши проекты</h1>
        
          <p className="portfolio-description enhanced-subtitle">
            Наш опыт и компетенции позволяют разрабатывать проекты высокой сложности и масштаба. 
            Нам важно, чтобы Вы знали, насколько прозрачны алгоритмы нашей работы. 
            Поэтому про самые интересные кейсы AxionLabs мы рассказываем здесь.
          </p>
        </div>
      </section>

      <section className="portfolio-filter-section">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'ВСЕ ПРОЕКТЫ' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-grid-section">
        <div className="container">
          <div className="portfolio-projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="portfolio-project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  {project.status && (
                    <span className="project-status">{project.status}</span>
                  )}
                </div>
                <div className="project-content">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-details">
                    <div className="project-works">
                      <h4>Работы:</h4>
                      <div className="works-tags">
                        {project.works.map(work => (
                          <span key={work} className="work-tag">{work}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-stack">
                      <h4>Архитектура:</h4>
                      <div className="stack-tags">
                        {project.architecture.map(arch => (
                          <span key={arch} className="stack-tag">{arch}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-stack">
                      <h4>Стэк:</h4>
                      <div className="stack-tags">
                        {project.stack.map(tech => (
                          <span key={tech} className="stack-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/portfolio/${project.id}`} className="project-link">
                    Подробнее <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-cta-section">
        <div className="container">
          <h2 className="section-title">ИНДИВИДУАЛЬНАЯ КОНСУЛЬТАЦИЯ</h2>
          <p>МЫ РАБОТАЕМ С БЮДЖЕТАМИ ОТ 50 000 РУБЛЕЙ. ЭТОГО ХВАТАЕТ ДЛЯ РЕАЛИЗАЦИИ БАЗОВОГО ФУНКЦИОНАЛА ПРОДУКТА И ЕГО ДАЛЬНЕЙШЕГО РАЗВИТИЯ</p>
          <Link to="/Contacts" className="btn btn-primary">СВЯЗАТЬСЯ С НАМИ</Link>
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

export default Portfolio;