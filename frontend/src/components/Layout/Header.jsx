import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'П';
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">&#9829;</span>
            &nbsp;SportFlow
          </Link>
        </div>

        <div className="nav-container">
          <button 
            ref={buttonRef}
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Открыть навигационное меню"
          >
            &#9776;
          </button>

          <ul 
            ref={menuRef}
            className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}
          >
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/events">Мероприятия</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/bookings">Мои бронирования</Link>
                </li>
                <li className="user-info">
                  <div className="user-avatar">
                    {getInitial(user.username)}
                  </div>
                  <span className="user-name">{user.username}</span>
                  <button onClick={handleLogout}>
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Войти</Link>
                </li>
                <li>
                  <Link to="/register">Зарегистрироваться</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;