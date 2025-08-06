import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateAvatar, logout } = useAuth();
  const [error, setError] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const navigate = useNavigate();

  // Загружаем заметки из localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
    setNotes(savedNotes);
  }, []);

  // Сохраняем заметки в localStorage
  useEffect(() => {
    localStorage.setItem('userNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      updateAvatar(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote = { id: Date.now(), text: noteText };
    setNotes([newNote, ...notes]);
    setNoteText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  if (!user) {
    return <div className="text-center mt-10 text-red-500 text-xl font-semibold">Вы не авторизованы.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6 py-12 bg-gradient-to-br from-[#1e1f26] to-[#2c2f36] rounded-3xl shadow-2xl text-white animate-fade-in">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-cyan-400 drop-shadow-lg">Кибер-Профиль</h2>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Аватар */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg hover:scale-105 transition-transform duration-300">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Аватар"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300">
                Нет фото
              </div>
            )}
          </div>
          <label className="mt-4 text-cyan-300 cursor-pointer hover:underline text-sm">
            Изменить аватар
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Информация */}
        <div className="flex-1 bg-[#3a3d44] rounded-xl p-8 border border-cyan-600 space-y-6 shadow-inner">
          <p className="text-2xl">
            <span className="text-cyan-300 font-bold">Имя пользователя:</span>{' '}
            {user.username}
          </p>
          <p className="text-2xl">
            <span className="text-cyan-300 font-bold">Email:</span>{' '}
            {user.email}
          </p>
          <p className="text-xl text-gray-400 italic">
            Добро пожаловать в кибер-школу! Здесь ты можешь прокачать свои скиллы и стать чемпионом.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Выйти
            </button>
            <button
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg text-white transition duration-300"
              onClick={() => alert('Функция скоро будет')}
            >
              Изменить данные
            </button>
          </div>
        </div>
      </div>

      {/* Раздел заметок */}
      <div className="mt-12 bg-[#2a2d34] p-6 rounded-xl border border-cyan-700 shadow-md">
        <h3 className="text-2xl text-cyan-300 mb-4">Заметки:</h3>

        <textarea
          rows="3"
          placeholder="Напиши новую заметку..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />

        <button
          onClick={addNote}
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg text-white transition duration-300"
        >
          ➕ Добавить заметку
        </button>

        {/* Список заметок */}
        <div className="mt-6 space-y-4">
          {notes.length === 0 ? (
            <p className="text-gray-400 text-sm">Нет заметок.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600 flex justify-between items-center"
              >
                <span>{note.text}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-4 text-red-400 hover:text-red-600"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {error && <div className="text-red-400 mt-6 text-center">{error}</div>}
    </div>
  );
};

export default Profile;
