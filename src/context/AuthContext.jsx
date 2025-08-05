import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаём контекст
const AuthContext = createContext();

// Провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Загружаем пользователя из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Функция входа
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ✅ Обновление аватарки
  const updateAvatar = (avatarBase64) => {
    const updatedUser = { ...user, avatar: avatarBase64 };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
