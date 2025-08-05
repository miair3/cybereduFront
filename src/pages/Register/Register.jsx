import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  

  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3030/api/register', {
        username,
        email,
        password
      })

      const user = {
        username, 
        email,
        password
      }

      setEmail('')
      setPassword('')
      setUsername('')
      setMessage(response.data.message || 'Вы успешно зарегались')
      navigate('/login')

      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.log(error.message)
    }
  }

  const user = localStorage.getItem('user')
  console.log(user)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Регистрация в CyberEdu.kz</h2>

        <form className="space-y-5" onSubmit={registerHandler}>
          <div>
            <label className="block text-gray-300 mb-1">Имя пользователя</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Введите имя"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Введите email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Уже есть аккаунт? <a href="/login" className="text-indigo-400 hover:underline">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
