import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import apiService from '../services/api';
import '../styles/EventDetail.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState(1);
  const [booking, setBooking] = useState({ status: null, message: '' });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await apiService.getEvent(id);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки события. Попробуйте позже.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (seats < 1 || seats > event.available_seats) {
      setBooking({
        status: 'error',
        message: `Выберите количество мест от 1 до ${event.available_seats}`
      });
      return;
    }
    
    try {
      const response = await apiService.createBooking({
        user_id: user.id,
        event_id: event.id,
        seats: seats
      });
      
      if (response.success) {
        setBooking({
          status: 'success',
          message: 'Бронирование успешно создано!'
        });
        
        const updatedEvent = await apiService.getEvent(id);
        setEvent(updatedEvent);
        
        setSeats(1);
      } else {
        setBooking({
          status: 'error',
          message: response.message || 'Ошибка создания бронирования'
        });
      }
    } catch (err) {
      setBooking({
        status: 'error',
        message: 'Ошибка создания бронирования. Попробуйте позже.'
      });
    }
  };

  if (loading) {
    return <div className="container text-center mt-5">Загрузка...</div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  if (!event) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Событие не найдено</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="event-detail-card">
        <div className="event-header">
          <div className="event-header-content">
            <span className="event-type">{event.type}</span>
            <h1 className="event-title">{event.title}</h1>
            <div className="event-location">
              <span className="event-location-icon">📍</span>
              <span>{event.venue_name}, {event.venue_address}</span>
            </div>
            <div className="event-datetime">
              <span className="event-datetime-icon">📅</span>
              <span>{formatDate(event.date)}, {event.time} ({event.duration} минут)</span>
            </div>
          </div>
        </div>
        <div className="event-content">
          <div className="event-detail-grid">
            <div className="event-main">
              <div className="event-info-section">
                <h3 className="event-info-title">Описание</h3>
                <p className="event-description">{event.description || 'Описание отсутствует'}</p>
              </div>
              
              <div className="event-meta">
                <div className="event-meta-item">
                  <span className="meta-label">Дата проведения</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">📅</span>
                    {formatDate(event.date)}
                  </div>
                </div>
                
                <div className="event-meta-item">
                  <span className="meta-label">Время</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">⏰</span>
                    {event.time}
                  </div>
                </div>
                
                <div className="event-meta-item">
                  <span className="meta-label">Длительность</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">⌛</span>
                    {event.duration} минут
                  </div>
                </div>
                
                <div className="event-meta-item">
                  <span className="meta-label">Место проведения</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">📍</span>
                    {event.venue_name}
                  </div>
                </div>
                
                <div className="event-meta-item">
                  <span className="meta-label">Адрес</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">🏢</span>
                    {event.venue_address}
                  </div>
                </div>
                
                <div className="event-meta-item">
                  <span className="meta-label">Свободные места</span>
                  <div className="meta-value">
                    <span className="meta-value-icon">👥</span>
                    <span className="event-seats">
                      {event.available_seats} / {event.total_seats}
                      {event.available_seats < 5 && event.available_seats > 0 ? (
                        <span className="seats-status seats-limited">Мест мало!</span>
                      ) : event.available_seats === 0 ? (
                        <span className="seats-status seats-sold-out">Нет мест</span>
                      ) : (
                        <span className="seats-status seats-available">Доступно</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="event-sidebar">
              <div className="ticket-box">
                <div className="ticket-header">
                  <h3 className="ticket-title">Забронировать место</h3>
                  <p className="ticket-subtitle">Онлайн-бронирование</p>
                </div>
                
                <div className="ticket-content">
                  {booking.status === 'success' ? (
                    <div className="alert alert-success">{booking.message}</div>
                  ) : booking.status === 'error' ? (
                    <div className="alert alert-danger">{booking.message}</div>
                  ) : null}
                  
                  <div className="ticket-price">
                    <span className="price-amount">{event.price} тнг</span>
                    <span className="price-label">за одно место</span>
                  </div>
                  
                  {event.available_seats > 0 ? (
                    <>
                      <div className="ticket-features">
                        <ul className="feature-list">
                          <li className="feature-item">
                            <span className="feature-icon">✓</span>
                            <span className="feature-text">Мгновенное подтверждение</span>
                          </li>
                          <li className="feature-item">
                            <span className="feature-icon">✓</span>
                            <span className="feature-text">Бесплатная отмена за 24 часа</span>
                          </li>
                          <li className="feature-item">
                            <span className="feature-icon">✓</span>
                            <span className="feature-text">Безопасная оплата</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="seats">Количество мест</label>
                        <input
                          type="number"
                          id="seats"
                          className="form-control"
                          min="1"
                          max={event.available_seats}
                          value={seats}
                          onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                        />
                      </div>
                      
                      <div className="ticket-actions">
                        <button 
                          className="book-ticket-btn"
                          onClick={handleBooking}
                        >
                          {user ? 'Забронировать сейчас' : 'Войти для бронирования'}
                        </button>
                        
                        {!user && (
                          <p className="mt-2 text-center">
                            Для бронирования <a href="/login">войдите</a> в систему
                          </p>
                        )}
                        
                        <span className="seats-left">
                          Осталось {event.available_seats} из {event.total_seats} мест
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="alert alert-warning">
                      К сожалению, все места забронированы
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;