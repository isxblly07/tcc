import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import authService from '../services/authService'

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
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    if (response.success) {
      setUser(response.user)
    }
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    if (response.success) {
      setUser(response.user)
    }
    return response
  }

  const adminLogin = async (email, password) => {
    const response = await authService.adminLogin(email, password)
    if (response.success) {
      setUser(response.user)
    }
    return response
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    login,
    register,
    adminLogin,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}