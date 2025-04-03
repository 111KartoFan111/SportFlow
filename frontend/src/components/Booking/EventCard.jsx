import { Link } from 'react-router-dom';
import '../../styles/EventCard.css';

const EventCard = ({ event }) => {
  // Функция форматирования даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Определение класса для статуса мест
  const getSeatsStatusClass = () => {
    if (event.available_seats === 0) return 'seats-sold-out';
    if (event.available_seats < 5) return 'seats-limited';
    return 'seats-available';
  };

  // Определение текста для статуса мест
  const getSeatsStatusText = () => {
    if (event.available_seats === 0) return 'Мест нет';
    if (event.available_seats < 5) return `Осталось: ${event.available_seats}`;
    return `Доступно: ${event.available_seats}`;
  };

  return (
    <div className="event-card">
      {event.available_seats < 5 && event.available_seats > 0 && (
        <div className="limited-badge">Осталось мало мест!</div>
      )}
      
      <div className="event-card-header">
        <div className="event-card-header-bg"></div>
        <div className="event-card-header-overlay"></div>
        <div className="event-card-header-content">
          <h3 className="event-card-title">{event.title}</h3>
          <span className="event-type-badge">{event.type}</span>
        </div>
      </div>
      
      <div className="event-card-content">
        <div className="event-info">
          <div className="event-info-item">
            <span className="event-info-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="event-info-item">
            <span className="event-info-icon">⏰</span>
            <span>{event.time}</span>
          </div>
          
          <div className="event-info-item">
            <span className="event-info-icon">📍</span>
            <span>{event.venue_name}</span>
          </div>
        </div>
        
        <div className="event-price-seats">
          <div className="event-price">{event.price} тг</div>
          <div className="event-seats">
            <span className={getSeatsStatusClass()}>
              {getSeatsStatusText()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="event-card-footer">
        <Link to={`/events/${event.id}`} className="view-details-btn">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default EventCard;