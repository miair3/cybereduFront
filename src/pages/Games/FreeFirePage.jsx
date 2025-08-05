import React, { useState, useEffect } from "react";
import axios from "axios";

const videoLessons = [
  {
    id: 1,
    title: "Основы Free Fire — Урок №1",
    url: "https://www.youtube.com/embed/4Qz0Z8bcnj0", // примерное видео
  },
  {
    id: 2,
    title: "Как правильно стрелять — Урок №2",
    url: "https://www.youtube.com/embed/4Gpo5qX6HT4",
  },
  {
    id: 3,
    title: "Тактика выживания — Урок №3",
    url: "https://www.youtube.com/embed/IV5ElJ-A9e8",
  },
];

const FreeFirePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(videoLessons[0]);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axios.get(
          `https://cyberedu-kz.onrender.com/api/lessons/${selectedLesson.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setLikesCount(response.data.likesCount);
        setDislikesCount(response.data.dislikesCount);

        const userReaction = await axios.get(
          `https://cyberedu-kz.onrender.com/api/likes/${selectedLesson.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (userReaction.data) {
          setLikeStatus(userReaction.data.liked ? "like" : "dislike");
        } else {
          setLikeStatus(null);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных урока:", error);
      }
    };

    if (token) {
      fetchLessonData();
    }
  }, [selectedLesson.id, token]);

  const handleLike = async () => {
    try {
      if (likeStatus === "like") {
        await axios.delete(
          `https://cyberedu-kz.onrender.com/api/likes/${selectedLesson.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikeStatus(null);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(
          "https://cyberedu-kz.onrender.com/api/likes",
          { lessonId: selectedLesson.id, liked: true },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const wasDisliked = likeStatus === "dislike";
        setLikeStatus("like");
        setLikesCount((prev) => prev + 1);
        if (wasDisliked) {
          setDislikesCount((prev) => prev - 1);
        }
      }
    } catch (error) {
      console.error("Ошибка при лайке:", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (likeStatus === "dislike") {
        await axios.delete(
          `https://cyberedu-kz.onrender.com/api/likes/${selectedLesson.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikeStatus(null);
        setDislikesCount((prev) => prev - 1);
      } else {
        await axios.post(
          "https://cyberedu-kz.onrender.com/api/likes",
          { lessonId: selectedLesson.id, liked: false },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const wasLiked = likeStatus === "like";
        setLikeStatus("dislike");
        setDislikesCount((prev) => prev + 1);
        if (wasLiked) {
          setLikesCount((prev) => prev - 1);
        }
      }
    } catch (error) {
      console.error("Ошибка при дизлайке:", error);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([{ text: commentText, id: Date.now() }, ...comments]);
      setCommentText("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        Курс по Free Fire
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {videoLessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              selectedLesson.id === lesson.id
                ? "bg-cyan-500 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {lesson.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
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

        <div className="w-full lg:w-1/3 bg-[#1f1f24] p-4 rounded-xl shadow-lg border border-gray-700">
          <h4 className="text-lg font-bold mb-4 text-cyan-300">Комментарии</h4>

          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white resize-none"
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Оставьте комментарий..."
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
            {comments.length === 0 && (
              <p className="text-gray-400 text-sm">Нет комментариев.</p>
            )}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 p-3 rounded text-sm border border-gray-600"
              >
                {comment.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-wrap justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm">
          Задать вопрос тренеру
        </button>
        <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white text-sm">
          Пожаловаться на урок
        </button>
        <a
          href="/games"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white text-sm"
        >
          ← Вернуться к играм
        </a>
      </div>
    </div>
  );
};

export default FreeFirePage;
