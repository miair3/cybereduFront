import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const games = [
  { name: "Minecraft", path: "/games/MinecraftPage" },
  { name: "Fortnite", path: "/games/FortnitePage" },
  { name: "PUBG", path: "/games/PubgPage" },
  { name: "GTA V", path: "/games/GtaVPage" },
  { name: "CS 1.6", path: "/games/Cs16Page" },
  { name: "CS 2", path: "/games/Cs2Page" },
  { name: "Valorant", path: "/games/ValorantPage" },
  { name: "Roblox", path: "/games/RobloxPage" },
  { name: "Call of Duty", path: "/games/CallOfDutyPage" },
  { name: "League of Legends", path: "/games/LeagueOfLegendsPage" },
  { name: "Dota 2", path: "/games/Dota2Page" },
  { name: "Apex Legends", path: "/games/ApexLegendsPage" },
  { name: "Overwatch", path: "/games/OverwatchPage" },
  { name: "Free Fire", path: "/games/FreeFirePage" },
  { name: "Brawl Stars", path: "/games/BrawlStarsPage" },
  { name: "Mobile Legends", path: "/games/MobileLegendsPage" },
  { name: "Among Us", path: "/games/AmongUsPage" },
  { name: "Rust", path: "/games/RustPage" },
  { name: "FIFA 23", path: "/games/FIFA23Page" },
  { name: "Rocket League", path: "/games/RocketLeaguePage" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      setFilteredGames([]);
    } else {
      setFilteredGames(
        games.filter((game) =>
          game.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectGame = (game) => {
    setSearch("");
    setFilteredGames([]);
    navigate(game.path);
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-gray-900 shadow-lg">
      {/* Логотип */}
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        CyberEdu.kz
      </Link>

      {/* Поиск */}
      <div className="relative hidden md:flex items-center bg-gray-700 rounded-full px-3 py-1">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Поиск игр..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-400 w-48"
        />

        {/* Выпадающий список */}
        {filteredGames.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredGames.map((game) => (
              <li
                key={game.name}
                onClick={() => handleSelectGame(game)}
                className="px-4 py-2 cursor-pointer hover:bg-cyan-600 transition"
              >
                {game.name}
              </li>
            ))}
          </ul>
        )}
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
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white hover:text-cyan-400 transition"
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* Выезжающее боковое меню */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50 p-6 flex flex-col gap-4 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-cyan-400">Меню</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-red-400"
            >
              <FiX size={26} />
            </button>
          </div>

          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">🏠 Главная</Link>
          {user && (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">👤 Профиль</Link>
          )}
          <Link to="/games" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">🎮 Игры</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">ℹ️ О школе</Link>

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
