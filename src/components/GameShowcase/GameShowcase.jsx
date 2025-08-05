import React from 'react';

const GameShowcase = () => {
  const videos = [
    {
      title: "Gta V",
      url: "https://www.youtube.com/embed/pK-t9fozT8E?si=T6Jyk7XdmTHEl8oC",
    },
    {
      title: "CS:GO",
      url: "https://www.youtube.com/embed/edYCtaNueQY",
    },
    {
      title: "Fortnite",
      url: "https://www.youtube.com/embed/2gUtfBmw86Y",
    },
    {
      title: "Dota 2",
      url: "https://www.youtube.com/embed/-cSFPIwMEq4",
    },
    {
      title: "PUBG",
      url: "https://www.youtube.com/embed/S0wCM-zNrfM?si=pKCyhoA8u3IJHJQ_",
    },
    {
      title: "Apex Legends",
      url: "https://www.youtube.com/embed/UMJb_mkqynU",
    },
  ];

  // Группируем по 3 видео в ряд
  const grouped = [];
  for (let i = 0; i < videos.length; i += 3) {
    grouped.push(videos.slice(i, i + 3));
  }

  return (
    <div className="p-6">
      {/* Рекламный баннер */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-3xl font-bold">CyberEdu.kz – Обучись игре профессионально!</h2>
        <p className="mt-2">Лучшие гайды и советы для начинающих игроков</p>
      </div>

      {/* Видео блоки */}
      {grouped.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {row.map((video, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl overflow-hidden shadow-md">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 text-center text-white font-semibold">{video.title}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameShowcase;