import EventCard from './EventCard';
import '../../styles/EventList.css';

const EventList = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="events-loading">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (!events || events.length === 0) {
    return (
      <div className="events-empty">
        <div className="events-empty-icon">🔍</div>
        <h3 className="events-empty-text">Мероприятия не найдены</h3>
        <p>Попробуйте изменить параметры поиска или проверьте позже</p>
      </div>
    );
  }
  
  return (
    <div className="events-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;