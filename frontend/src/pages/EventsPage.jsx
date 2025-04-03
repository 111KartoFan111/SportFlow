import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiService.getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить мероприятия. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Функция форматирования даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Фильтрация мероприятий
  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                         event.venue_name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Получение уникальных типов мероприятий для фильтра
  const eventTypes = [...new Set(events.map(event => event.type))];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Спортивные мероприятия и секции</h1>
      
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="card p-3 mb-4">
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="search">Поиск по названию или месту</label>
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Введите текст для поиска..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="filter">Фильтр по типу</label>
                <select
                  id="filter"
                  className="form-control"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Все типы</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <p className="text-center">Загрузка...</p>
          ) : filteredEvents.length === 0 ? (
            <div className="alert alert-warning">
              По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredEvents.map(event => (
                <div key={event.id} className="card">
                  <div className="badge-container" style={{ marginBottom: '10px' }}>
                    <span className="badge badge-primary">{event.type}</span>
                    {event.available_seats < 5 && (
                      <span className="badge badge-danger" style={{ marginLeft: '5px' }}>
                        Осталось мест: {event.available_seats}
                      </span>
                    )}
                  </div>
                  <h3>{event.title}</h3>
                  <p><strong>Дата:</strong> {formatDate(event.date)}</p>
                  <p><strong>Время:</strong> {event.time}</p>
                  <p><strong>Место:</strong> {event.venue_name}</p>
                  <p><strong>Цена:</strong> {event.price} тг</p>
                  <p>
                    <strong>Свободные места:</strong> {event.available_seats} / {event.total_seats}
                  </p>
                  <div className="mt-3">
                    <Link to={`/events/${event.id}`} className="btn btn-primary">
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;

