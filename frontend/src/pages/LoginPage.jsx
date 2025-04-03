import { Link } from 'react-router-dom';
import Login from '../components/Auth/Login';
import '../styles/Auth.css';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"> </div>
          <h2 className="auth-title">Вход в систему</h2>
          <p className="auth-subtitle">Введите свои учетные данные для бронирования</p>
        </div>
        
        <div className="auth-content">
          <Login />
          
          <div className="auth-redirect">
            У вас нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

