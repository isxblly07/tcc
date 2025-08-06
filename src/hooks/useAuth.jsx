import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      // Verificar se token é válido
      api.get('/auth/verify')
        .then(response => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha })
    const { token, user } = response.data
    
    localStorage.setItem('token', token)
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(user)
    
    return user
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.Authorization
    setUser(null)
  }

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}