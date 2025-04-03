import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/events">События</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/bookings">Мои бронирования</Link>
            </li>
            <li>
              <button 
                onClick={logout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
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
    </nav>
  );
};

export default Navbar;

