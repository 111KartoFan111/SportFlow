import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Спорт бронирование</h3>
            <p>
              Удобный сервис для бронирования мест на спортивные мероприятия и секции. 
              Присоединяйтесь к нашему спортивному сообществу!
            </p>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/events">Мероприятия</Link></li>
              <li><Link to="/login">Вход</Link></li>
              <li><Link to="/register">Регистрация</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>г. Астана, ул. Касым Аманжолов, 32/1</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">☎️</span>
              <span>+7 (775) 852-48-91</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>info@sportsbook.kz</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {year} SportFlow. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

