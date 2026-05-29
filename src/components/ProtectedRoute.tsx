import { Navigate } from 'react-router-dom'
import { authService } from '../services/auth'

type Props = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute