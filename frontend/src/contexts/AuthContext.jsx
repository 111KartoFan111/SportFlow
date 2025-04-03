import { createContext } from 'react';

// Создаем контекст для авторизации
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

// Пример обновления функции login в вашем AuthContext
const login = (userData) => {
  // Сохраняем данные пользователя
  setUser(userData);
  // Сохраняем токен, если он есть в ответе
  if (userData.token) {
    localStorage.setItem('authToken', userData.token);
  }
  setIsAuthenticated(true);
};