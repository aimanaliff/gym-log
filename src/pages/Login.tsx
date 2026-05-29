import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/auth'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)
    try {
      const { access_token } = await authService.login(email, password)
      localStorage.setItem('token', access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="p-4 min-h-screen flex flex-col justify-center max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back 👋</h1>
      <p className="text-zinc-400 text-sm mb-8">Login to your gym log</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3 outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3 outline-none"
      />

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 text-white font-semibold py-3 rounded-xl mb-4"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-zinc-400 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-400 font-semibold">Sign up</Link>
      </p>
    </div>
  )
}

export default Login