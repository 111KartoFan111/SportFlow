import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import '../../styles/BookingForm.css';

const BookingForm = ({ event, onBookingSuccess }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [seats, setSeats] = useState(1);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (seats < 1 || seats > event.available_seats) {
      setStatus({
        type: 'error',
        message: `Выберите количество мест от 1 до ${event.available_seats}`
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await apiService.createBooking({
        user_id: user.id,
        event_id: event.id,
        seats: seats
      });
      
      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Бронирование успешно создано!'
        });
        
        // Успешная анимация
        setShowSuccess(true);
        
        // Возврат к начальному состоянию поля ввода
        setSeats(1);
        
        // Вызов функции, если бронирование успешно
        if (onBookingSuccess) {
          onBookingSuccess();
        }
      } else {
        setStatus({
          type: 'error',
          message: response.message || 'Ошибка создания бронирования'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Ошибка создания бронирования. Попробуйте позже.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    if (seats < event.available_seats) {
      setSeats(seats + 1);
    }
  };

  const handleDecrement = () => {
    if (seats > 1) {
      setSeats(seats - 1);
    }
  };
  
  if (showSuccess) {
    return (
      <div className="booking-form">
        <div className="booking-form-header">
          <h3 className="booking-form-title">Бронирование успешно создано!</h3>
          <p className="booking-form-subtitle">Спасибо за ваш заказ</p>
        </div>
        <div className="booking-form-content">
          <div className="success-animation">
            <div className="success-icon"></div>
            <h3 className="success-message">Бронирование создано</h3>
            <p className="success-details">
              Данные о бронировании отправлены на ваш электронный адрес.
              Вы также можете просмотреть свои бронирования в личном кабинете.
            </p>
            <button 
              className="btn btn-primary back-to-events-btn"
              onClick={() => navigate('/bookings')}
            >
              Перейти к своим бронированиям
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="booking-form">
      <div className="booking-form-header">
        <h3 className="booking-form-title">Бронирование мест</h3>
        <p className="booking-form-subtitle">Выберите количество мест</p>
      </div>
      
      <div className="booking-form-content">
        {status.type === 'success' ? (
          <div className="alert alert-success">{status.message}</div>
        ) : status.type === 'error' ? (
          <div className="alert alert-danger">{status.message}</div>
        ) : null}
        
        {event.available_seats > 0 ? (
          <>
            <div className="booking-input-group">
              <label htmlFor="seats">Количество мест</label>
              <div className="seats-input">
                <div className="seats-control">
                  <button 
                    type="button" 
                    className="seats-btn"
                    onClick={handleDecrement}
                    disabled={seats <= 1 || loading}
                    aria-label="Уменьшить количество"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="seats"
                    className="seats-input-field"
                    min="1"
                    max={event.available_seats}
                    value={seats}
                    onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                    disabled={loading}
                    aria-label="Количество мест"
                  />
                  <button 
                    type="button" 
                    className="seats-btn"
                    onClick={handleIncrement}
                    disabled={seats >= event.available_seats || loading}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
                <span className="seats-available-text">
                  Доступно: {event.available_seats}
                </span>
              </div>
            </div>
            
            <div className="price-calculation">
              <div className="price-row">
                <span className="price-label">Цена одного места</span>
                <span className="price-value">{event.price} тг</span>
              </div>
              <div className="price-row">
                <span className="price-label">Количество мест</span>
                <span className="price-value">x {seats}</span>
              </div>
              <div className="price-row total">
                <span className="price-label">Итого</span>
                <span className="price-value">{seats * event.price} тг</span>
              </div>
            </div>
            
            <button 
              className="booking-submit-btn"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? 'Обработка...' : user ? 'Бронировать' : 'Войти для бронирования'}
            </button>
            
            {!user && (
              <p className="login-notice">
                Для бронирования необходимо <Link to="/login">войти</Link> в систему
              </p>
            )}
          </>
        ) : (
          <div className="alert alert-warning">
            К сожалению, все места на это мероприятие уже забронированы
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;