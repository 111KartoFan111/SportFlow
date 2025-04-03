import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import '../../styles/Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Простая валидация
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await apiService.login(username, password);
      
      if (response.success) {
        login(response.user);
        navigate('/');
      } else {
        setError(response.message || 'Ошибка при входе');
      }
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label htmlFor="username">Логин</label>
          <span className="auth-input-icon">👤</span>
          <input
            type="text"
            id="username"
            className="auth-input-field"
            placeholder="Введите ваш логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="auth-input-group">
          <label htmlFor="password">Пароль</label>
          <span className="auth-input-icon">🔒</span>
          <input
            type="password"
            id="password"
            className="auth-input-field"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <a href="#" className="forgot-password">Забыли пароль?</a>
        
        <button 
          type="submit" 
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;

