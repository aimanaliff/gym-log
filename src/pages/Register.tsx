import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/auth'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    setError('')
    setLoading(true)
    try {
      await authService.register(email, password)
      // Auto-login after register
      const { access_token } = await authService.login(email, password)
      localStorage.setItem('token', access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className="p-4 min-h-screen flex flex-col justify-center max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Create account 💪</h1>
      <p className="text-zinc-400 text-sm mb-8">Start logging your workouts</p>

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
        onClick={handleRegister}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 text-white font-semibold py-3 rounded-xl mb-4"
      >
        {loading ? 'Creating account...' : 'Sign up'}
      </button>

      <p className="text-zinc-400 text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 font-semibold">Login</Link>
      </p>
    </div>
  )
}

export default Register