import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LogWorkout from './pages/LogWorkout'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import BottomNav from './components/BottomNav'
import ProtectedRoute from './components/ProtectedRoute'

function AppLayout() {
  const location = useLocation()
  const hideNav = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/log" element={<ProtectedRoute><LogWorkout /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App