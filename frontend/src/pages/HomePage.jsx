import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import EventCard from '../components/Booking/EventCard';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Testimonials.css';

const HomePage = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const events = await apiService.getEvents();
        setRecentEvents(events.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки мероприятий. Пожалуйста, повторите попытку.');
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const testimonials = [
    {
      name: "Александр П.",
      role: "Спортсмен",
      content: "Отличный сервис! Легко находить и бронировать места на мероприятия. Интерфейс понятный и удобный, а поддержка всегда помогает с любыми вопросами.",
      rating: 5,
      image: null
    },
    {
      name: "Елена М.",
      role: "Тренер",
      content: "Удобная платформа для организации тренировок и мероприятий. Благодаря сервису количество участников на моих занятиях увеличилось почти в два раза!",
      rating: 5,
      image: null
    },
    {
      name: "Дмитрий К.",
      role: "Любитель спорта",
      content: "Всегда актуальная информация и быстрое бронирование. Мне особенно нравится возможность отслеживать мои бронирования и получать уведомления.",
      rating: 4,
      image: null
    },
    {
      name: "Анна С.",
      role: "Администратор фитнес-клуба",
      content: "Прекрасный инструмент для управления записями и бронированиями. Значительно упростил нашу работу и сократил количество пропущенных занятий.",
      rating: 5,
      image: null
    },
    {
      name: "Игорь В.",
      role: "Бегун-любитель",
      content: "Нашел отличные беговые мероприятия через этот сервис. Простая регистрация и понятная система оплаты. Очень рекомендую всем спортсменам!",
      rating: 4,
      image: null
    }
  ];

  // Function to render star rating
  const renderStarRating = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span 
        key={index} 
        className="testimonial-rating-star"
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div>
      <section style={{ 
        backgroundImage: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
        color: 'white',
        padding: '5rem 0 6rem',
        marginBottom: '3rem',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '700',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Бронирование спортивных мероприятий
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '2rem',
              opacity: '0.9',
              lineHeight: '1.6'
            }}>
              Наш удобный сервис позволяет найти и забронировать места на спортивные мероприятия и секции
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to="/events" 
                className="btn" 
                style={{ 
                  backgroundColor: 'white', 
                  color: '#1a73e8',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '600',
                  borderRadius: '50px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  fontSize: '1rem'
                }}
              >
                Найти мероприятия
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            fontWeight: '700'
          }}>
            Как это работает
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#78909c',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Наш сервис упрощает процесс бронирования спортивных мероприятий
          </p>
        </div>

        <div className="grid grid-3" style={{ gap: '2rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              color: '#1a73e8',
              marginBottom: '1rem',
              background: 'rgba(26, 115, 232, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              🔍
            </div>
            <h3>1. Найти мероприятие</h3>
            <p style={{ color: '#78909c' }}>
              Просмотрите каталог спортивных мероприятий и секций. Выберите интересующее вас мероприятие.
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              color: '#1a73e8',
              marginBottom: '1rem',
              background: 'rgba(26, 115, 232, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              🎟️
            </div>
            <h3>2. Забронировать место</h3>
            <p style={{ color: '#78909c' }}>
              Выберите количество мест, которое вы хотите забронировать, и подтвердите бронирование.
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              color: '#1a73e8',
              marginBottom: '1rem',
              background: 'rgba(26, 115, 232, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              ✅
            </div>
            <h3>3. Получить подтверждение</h3>
            <p style={{ color: '#78909c' }}>
              После бронирования вы получите подтверждение. Готово!
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-title">
            <h2>Отзывы клиентов</h2>
            <p>Что говорят о нас пользователи</p>
          </div>
          
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-slider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} />
                      ) : (
                        testimonial.name[0]
                      )}
                    </div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="testimonial-content">{testimonial.content}</p>
                  <div className="testimonial-rating">
                    {renderStarRating(testimonial.rating)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>Ближайшие мероприятия</h2>
          <Link to="/events" className="btn btn-outline">Все мероприятия</Link>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="grid grid-3">
            {recentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        
        {!loading && !error && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/events" className="btn btn-primary btn-lg">
              Посмотреть все мероприятия
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;