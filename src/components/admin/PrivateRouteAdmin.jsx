import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRouteAdmin = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default PrivateRouteAdmin