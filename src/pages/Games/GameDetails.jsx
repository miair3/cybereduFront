import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaFlag } from "react-icons/fa";

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const [likes, setLikes] = useState(10);
  const [dislikes, setDislikes] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reported, setReported] = useState(false);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);
  const handleReport = () => setReported(true);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([{ text: newComment, id: Date.now() }, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-cyan-400 capitalize">
        Обучение: {gameId.replace(/-/g, " ")}
      </h1>

      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video Tutorial"
          allowFullScreen
        />
      </div>

      <div className="flex items-center gap-6 mb-6">
        <button onClick={handleLike} className="flex items-center gap-2 text-green-400 hover:text-green-300">
          <FaThumbsUp /> {likes}
        </button>
        <button onClick={handleDislike} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <FaThumbsDown /> {dislikes}
        </button>
        <button
          onClick={handleReport}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
          disabled={reported}
        >
          <FaFlag />
          {reported ? "Пожаловано" : "Пожаловаться"}
        </button>
      </div>

      <div className="bg-[#1a1a1a] p-4 rounded-lg mb-8 shadow-inner">
        <h2 className="text-xl font-semibold mb-3">Описание:</h2>
        <p>
          Это видео поможет вам научиться играть в {gameId.replace(/-/g, " ")}. Здесь вы узнаете базовые механики, советы и стратегии.
        </p>
      </div>

      <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Комментарии:</h2>

        <form onSubmit={handleCommentSubmit} className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите комментарий..."
            className="w-full p-2 rounded-md text-black"
          />
        </form>

        {comments.length === 0 ? (
          <p className="text-gray-400">Пока нет комментариев.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="bg-[#2a2a2a] p-2 rounded-md">
                {c.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameDetailsPage;
