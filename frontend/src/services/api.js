// Базовый URL API
const API_URL = '/api';

// Вспомогательная функция для проверки ответа от сервера
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Если ответ не успешный, генерируем ошибку с сообщением от сервера
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  
  return data;
};

// Сервис для работы с API
const apiService = {
  // Авторизация
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },
  
  // Регистрация
  register: async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return handleResponse(response);
  },
  
  // Получение всех мероприятий
  getEvents: async () => {
    const response = await fetch(`${API_URL}/events`);
    return handleResponse(response);
  },
  
  // Получение информации о конкретном мероприятии
  getEvent: async (eventId) => {
    const response = await fetch(`${API_URL}/events/${eventId}`);
    return handleResponse(response);
  },
  
  // Создание мероприятия (требует прав администратора)
  createEvent: async (eventData, token) => {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  },
  
  // Бронирование места на мероприятии
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return handleResponse(response);
  },
  
  // Получение всех бронирований пользователя
  getUserBookings: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}/bookings`);
    return handleResponse(response);
  },
  
  // Отмена бронирования
  cancelBooking: async (bookingId, userId) => {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    return handleResponse(response);
  },
  
  // Получение всех спортивных объектов
  getVenues: async () => {
    const response = await fetch(`${API_URL}/venues`);
    return handleResponse(response);
  }
};

export default apiService;