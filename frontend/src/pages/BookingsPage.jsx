import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import apiService from '../services/api';

const BookingsPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelStatus, setCancelStatus] = useState({ id: null, status: null, message: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const data = await apiService.getUserBookings(user.id);
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки бронирований. Попробуйте позже.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Функция форматирования даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Функция отмены бронирования
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await apiService.cancelBooking(bookingId, user.id);
      
      if (response.success) {
        // Обновляем локальное состояние бронирования
        const updatedBookings = bookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, status: 'cancelled' };
          }
          return booking;
        });
        
        setBookings(updatedBookings);
        
        setCancelStatus({
          id: bookingId,
          status: 'success',
          message: 'Бронирование успешно отменено'
        });
      } else {
        setCancelStatus({
          id: bookingId,
          status: 'error',
          message: response.message || 'Ошибка отмены бронирования'
        });
      }
    } catch (err) {
      setCancelStatus({
        id: bookingId,
        status: 'error',
        message: 'Ошибка отмены бронирования'
      });
    }
  };

  if (loading) {
    return <div className="container text-center mt-5">Загрузка...</div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  // Группируем бронирования по статусу
  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Мои бронирования</h1>

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          У вас нет бронирований. <a href="/events">Посмотреть доступные мероприятия</a>
        </div>
      ) : (
        <>
          <h2 className="mb-3">Активные бронирования</h2>
          {activeBookings.length === 0 ? (
            <div className="alert alert-info mb-4">У вас нет активных бронирований</div>
          ) : (
            <div className="grid grid-1">
              {activeBookings.map(booking => (
                <div key={booking.id} className="card mb-3">
                  <div className="grid grid-2">
                    <div>
                      <h3>{booking.event_title}</h3>
                      <p><strong>Дата:</strong> {formatDate(booking.event_date)}</p>
                      <p><strong>Время:</strong> {booking.event_time}</p>
                      <p><strong>Место:</strong> {booking.venue_name}</p>
                      <p><strong>Количество мест:</strong> {booking.seats}</p>
                      <p><strong>Стоимость:</strong> {booking.total_price} тг</p>
                      <p><strong>Дата бронирования:</strong> {formatDate(booking.created_at)}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {cancelStatus.id === booking.id && (
                        <div className={`alert ${cancelStatus.status === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                          {cancelStatus.message}
                        </div>
                      )}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Отменить бронирование
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cancelledBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-4">Отмененные бронирования</h2>
              <div className="grid grid-1">
                {cancelledBookings.map(booking => (
                  <div key={booking.id} className="card mb-3" style={{ opacity: 0.7 }}>
                    <h3>{booking.event_title}</h3>
                    <p><strong>Дата:</strong> {formatDate(booking.event_date)}</p>
                    <p><strong>Время:</strong> {booking.event_time}</p>
                    <p><strong>Место:</strong> {booking.venue_name}</p>
                    <p><strong>Количество мест:</strong> {booking.seats}</p>
                    <p><strong>Стоимость:</strong> {booking.total_price} тг</p>
                    <p><strong>Статус:</strong> <span className="badge badge-danger">Отменено</span></p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookingsPage;
