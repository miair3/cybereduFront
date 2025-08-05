// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import GameShowcase from './components/GameShowcase/GameShowcase';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/ProfilePage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';
import GamesPage from './pages/Games/GamesPage.jsx';
import GameDetails from './pages/Games/GameDetails.jsx';
import MinecraftPage from './pages/Games/MinecraftPage.jsx';
import FortnitePage from './pages/Games/FortnitePage.jsx';
import PubgPage from './pages/Games/PubgPage.jsx';
import GtaVPage from './pages/Games/GtaVPage.jsx';
import Cs16Page from './pages/Games/Cs16Page.jsx';
import Cs2Page from './pages/Games/Cs2Page.jsx';
import ValorantPage from './pages/Games/ValorantPage.jsx';
import RobloxPage from './pages/Games/RobloxPage.jsx';
import CallOfDutyPage from './pages/Games/CallOfDutyPage.jsx';
import LeagueOfLegendsPage from './pages/Games/LeagueOfLegendsPage.jsx';
import Dota2Page from './pages/Games/Dota2Page.jsx';
import ApexLegendsPage from './pages/Games/ApexLegendsPage.jsx';
import OverwatchPage from './pages/Games/OverwatchPage.jsx';
import FreeFirePage from './pages/Games/FreeFirePage.jsx';
import BrawlStarsPage from './pages/Games/BrawlStarsPage.jsx';
import MobileLegendsPage from './pages/Games/MobileLegendsPage.jsx';
import AmongUsPage from './pages/Games/AmongUsPage.jsx';
import RustPage from './pages/Games/RustPage.jsx';
import Fifa23Page from './pages/Games/Fifa23Page.jsx';
import RocketLeaguePage from './pages/Games/RocketLeaguePage.jsx';

import './App.css';

function HomePage() {
  return (
    <>
      <GameShowcase />
      <main className="p-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Добро пожаловать в CyberEdu.kz</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Обучаем начинающих игроков киберспорту: стратегии, тактике и командной игре.
        </p>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/MinecraftPage" element={<MinecraftPage />} />
        <Route path="/games/FortnitePage" element={<FortnitePage />} />
        <Route path="/games/PubgPage" element={<PubgPage />} />
        <Route path="/games/GtaVPage" element={<GtaVPage />} />
        <Route path="/games/Cs16Page" element={<Cs16Page />} />
        <Route path="/games/Cs2Page" element={<Cs2Page />} />
        <Route path="/games/ValorantPage" element={<ValorantPage />} />
        <Route path="/games/RobloxPage" element={<RobloxPage />} />
        <Route path="/games/CallOfDutyPage" element={<CallOfDutyPage />} />
        <Route path="/games/LeagueOfLegendsPage" element={<LeagueOfLegendsPage />} />
        <Route path="/games/Dota2Page" element={<Dota2Page />} />
        <Route path="/games/ApexLegendsPage" element={<ApexLegendsPage />} />
        <Route path="/games/OverwatchPage" element={<OverwatchPage />} />
        <Route path="/games/FreeFirePage" element={<FreeFirePage />} />
        <Route path="/games/BrawlStarsPage" element={<BrawlStarsPage />} />
        <Route path="/games/MobileLegendsPage" element={<MobileLegendsPage/>} />
        <Route path="/games/AmongUsPage" element={<AmongUsPage />} />
        <Route path="/games/RustPage" element={<RustPage />} />
        <Route path="/games/Fifa23Page" element={<Fifa23Page />} />
        <Route path="/games/RocketLeaguePage" element={<RocketLeaguePage />} />
        <Route path="/games/games/:gameId" element={<GameDetails />} />
      </Routes>
    </div>
  );
}

export default App;
