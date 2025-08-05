import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center animate-fade-in">
          ℹ️ О нашей кибер-школе
        </h1>

        {/* Основной блок */}
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-700 animate-slide-up">
          <p className="text-lg mb-4 leading-relaxed">
            <span className="text-cyan-300 font-semibold">CyberEdu.kz</span> — это современная онлайн кибер-школа,
            созданная энтузиастом игр и разработчиком{" "}
            <span className="text-yellow-300 font-semibold">Бердимуратом Айтмуратовым</span> в 2025 году.
            <br />
            <br />
            Наша цель — научить игроков становиться профессионалами в любимых играх и готовить будущих киберспортсменов
            к турнирам и соревнованиям. В нашей школе вы найдёте:
          </p>

          <ul className="list-disc list-inside text-gray-300 text-base space-y-2 mb-6">
            <li>🎮 Видеоуроки по популярным играм (Minecraft, CS 2, Valorant, Fortnite и др.)</li>
            <li>👍 Систему лайков, дизлайков и комментариев для общения с сообществом</li>
            <li>👤 Личный кабинет с прогрессом и достижениями</li>
            <li>💬 Возможность задать вопрос учителю или пожаловаться на урок</li>
            <li>🌐 Дружное комьюнити для совместного развития</li>
          </ul>

          <p className="text-lg leading-relaxed">
            <span className="text-cyan-300 font-semibold">CyberEdu.kz</span> — это не просто сайт.  
            Это место, где каждый игрок может стать профессионалом в своей любимой игре.  
            Наш девиз:
          </p>

          <blockquote className="mt-6 border-l-4 border-cyan-400 pl-4 italic text-cyan-200 text-lg">
            «Играй. Учись. Становись профессионалом!»
          </blockquote>
        </div>

        {/* Кнопки навигации */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/games"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white text-sm transition"
          >
            ← Вернуться к играм
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-black text-sm font-semibold transition"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
