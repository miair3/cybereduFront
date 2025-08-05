import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://cyberedu-kz.onrender.com/api/login', {
        email,
        password
      })

      localStorage.setItem('authToken', response.data.token)
      login(response.data.user)

      setEmail('')
      setPassword('')
      setMessage('Сен успешно кірдің')
      setError('')
      navigate('/profile')
    } catch (e) {
      setError('Сенде ошибка емае')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Вход в CyberEdu.kz</h2>

        {message && (
          <div className="mb-4 text-center text-green-400 font-medium">{message}</div>
        )}
        {error && (
          <div className="mb-4 text-center text-red-400 font-medium">{error}</div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
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
            Войти
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
