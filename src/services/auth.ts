import api from './api'

export type AuthResponse = {
  access_token: string
  token_type: string
}

export const authService = {
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password })
    return response.data
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    // /auth/login expects form-data, not JSON (OAuth2 spec)
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },
}