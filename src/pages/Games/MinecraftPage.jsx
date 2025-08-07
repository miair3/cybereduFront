import React, { useState, useEffect } from "react";
import axios from "axios";

const videoLessons = [
  { id: 1, title: "Как выжить в Minecraft — Урок №1", url: "https://www.youtube.com/embed/MmB9b5njVbA" },
  { id: 2, title: "Как построить дом — Урок №2", url: "https://www.youtube.com/embed/Mk787BE_LOc?si=sJTBGqH7w0_JQM3o" },
  { id: 3, title: "Как найти алмазы — Урок №3", url: "https://www.youtube.com/embed/AZZGTDdRFzI?si=9xPfvuLWZ8g3vSJT" },
];

const MinecraftPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(videoLessons[0]);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const API = "https://cyberedu-kz.onrender.com/api";

  // Загружаем данные урока + комментарии
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        // Загружаем лайки
        const response = await axios.get(`${API}/lessons/${selectedLesson.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLikesCount(response.data.likesCount);
        setDislikesCount(response.data.dislikesCount);

        // Загружаем реакцию пользователя
        if (token) {
          const userReaction = await axios.get(`${API}/likes/${selectedLesson.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (userReaction.data && userReaction.data.liked !== null) {
            setLikeStatus(userReaction.data.liked ? "like" : "dislike");
          } else {
            setLikeStatus(null);
          }
        }

        // Загружаем комментарии
        const commentsRes = await axios.get(`${API}/comments/${selectedLesson.id}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных урока:", error);
      }
    };

    fetchLessonData();
  }, [selectedLesson.id, token]);

  // Лайк
  const handleLike = async () => {
    try {
      if (likeStatus === "like") {
        await axios.delete(`${API}/likes/${selectedLesson.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikeStatus(null);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(`${API}/likes`, { lessonId: selectedLesson.id, liked: true }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const wasDisliked = likeStatus === "dislike";
        setLikeStatus("like");
        setLikesCount((prev) => prev + 1);
        if (wasDisliked) setDislikesCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Ошибка при лайке:", error);
    }
  };

  // Дизлайк
  const handleDislike = async () => {
    try {
      if (likeStatus === "dislike") {
        await axios.delete(`${API}/likes/${selectedLesson.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikeStatus(null);
        setDislikesCount((prev) => prev - 1);
      } else {
        await axios.post(`${API}/likes`, { lessonId: selectedLesson.id, liked: false }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const wasLiked = likeStatus === "like";
        setLikeStatus("dislike");
        setDislikesCount((prev) => prev + 1);
        if (wasLiked) setLikesCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Ошибка при дизлайке:", error);
    }
  };

  // Отправка комментария в БД
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `${API}/comments`,
        { lessonId: selectedLesson.id, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [response.data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error("Ошибка при добавлении комментария:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Курс по Minecraft</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {videoLessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              selectedLesson.id === lesson.id ? "bg-cyan-500 text-black" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {lesson.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Видео и лайки */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-xl mb-4 border border-cyan-700">
            <iframe
              width="100%"
              height="440"
              src={selectedLesson.url}
              title={selectedLesson.title}
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>

          <h3 className="text-xl font-semibold mb-3">{selectedLesson.title}</h3>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`px-5 py-2 rounded-full text-lg flex items-center gap-2 transition ${
                likeStatus === "like" ? "bg-green-600" : "bg-gray-700"
              }`}
              disabled={!token}
            >
              👍 {likesCount}
            </button>
            <button
              onClick={handleDislike}
              className={`px-5 py-2 rounded-full text-lg flex items-center gap-2 transition ${
                likeStatus === "dislike" ? "bg-red-600" : "bg-gray-700"
              }`}
              disabled={!token}
            >
              👎 {dislikesCount}
            </button>
          </div>
        </div>

        {/* Комментарии */}
        <div className="w-full lg:w-1/3 bg-[#1f1f24] p-4 rounded-xl shadow-lg border border-gray-700">
          <h4 className="text-lg font-bold mb-4 text-cyan-300">Комментарии</h4>

          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white resize-none"
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={token ? "Оставьте комментарий..." : "Войдите, чтобы комментировать"}
              disabled={!token}
            ></textarea>
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded"
              disabled={!token || !commentText.trim()}
            >
              Отправить
            </button>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {comments.length === 0 && <p className="text-gray-400 text-sm">Нет комментариев.</p>}
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800 p-3 rounded text-sm border border-gray-600">
                <p className="text-cyan-400 font-bold">{comment.username}</p>
                <p>{comment.content || comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftPage;
