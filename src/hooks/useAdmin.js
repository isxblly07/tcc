import { useState, useEffect } from 'react'
import { adminService } from '../services/admin/adminService'

export const useAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const executeAction = async (action, ...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await action(...args)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    executeAction,
    // Métodos específicos
    login: (credentials) => executeAction(adminService.login, credentials),
    register: (userData) => executeAction(adminService.register, userData),
    getStats: () => executeAction(adminService.getStats),
    getUsers: () => executeAction(adminService.getUsers),
    getPromotions: () => executeAction(adminService.getPromotions),
    createPromotion: (data) => executeAction(adminService.createPromotion, data)
  }
}