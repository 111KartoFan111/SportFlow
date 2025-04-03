import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

// Валидация электронной почты
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (!username || !email || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Введите правильный адрес электронной почты');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await apiService.register(username, email, password);
      
      if (response.success) {
        setSuccess(true);
// После успешной регистрации, перенаправляем на страницу входа
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Ошибка при регистрации');
      }
    } catch (err) {
      setError('Такое имя пользователя или адрес электронной почты уже зарегистрированы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4">
        <h1 className="text-center mb-4">Регистрация</h1>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Регистрация завершена успешно! Теперь вы будете перенаправлены на страницу входа.
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading || success}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || success}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердить пароль</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || success}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            style={{ width: '100%' }}
            disabled={loading || success}
          >
            {loading ? 'Регистрация...' : 'Регистрация'}
          </button>
        </form>
        
        <p className="text-center mt-3">
        У вас есть аккаунт? <Link to="/login">Вход</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
