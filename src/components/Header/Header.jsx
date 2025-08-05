import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-gray-900 shadow-lg">
      {/* Логотип */}
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        CyberEdu.kz
      </Link>

      {/* Поиск (только на больших экранах) */}
      <div className="hidden md:flex items-center bg-gray-700 rounded-full px-3 py-1">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Поиск..."
          className="bg-transparent outline-none text-white placeholder-gray-400 w-48"
        />
      </div>

      {/* Аватар и кнопка меню */}
      <div className="flex items-center gap-4">
        {user && (
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-9 h-9 rounded-full border-2 border-cyan-400"
          />
        )}

        {/* Кнопка меню */}
        <button onClick={() => setMenuOpen(true)} className="text-white hover:text-cyan-400 transition">
          <FiMenu size={28} />
        </button>
      </div>

      {/* Выезжающее боковое меню */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50 p-6 flex flex-col gap-4 animate-slide-in">
          {/* Закрыть */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-cyan-400">Меню</h2>
            <button onClick={() => setMenuOpen(false)} className="text-white hover:text-red-400">
              <FiX size={26} />
            </button>
          </div>

          {/* Навигация */}
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">🏠 Главная</Link>
          {user && (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">👤 Профиль</Link>
          )}
          <Link to="/games" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">🎮 Игры</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">ℹ️ О школе</Link>

          {/* Кнопка выйти / войти */}
          {user ? (
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-md font-medium"
            >
              Выйти
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 py-2 text-center rounded-md font-medium"
            >
              Войти
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
