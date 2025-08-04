import api from './api'

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro na autenticação')
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro no registro')
    }
  },

  async enable2FA(userId) {
    try {
      const secret = `SECRET_${userId}_${Date.now()}`
      const qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
      const backupCodes = Array.from({length: 10}, () => 
        Math.random().toString(36).substr(2, 8).toUpperCase()
      )
      
      return { secret, qrCode, backupCodes }
    } catch (error) {
      throw new Error('Erro ao ativar 2FA')
    }
  },

  async verify2FA(userId, code) {
    try {
      // Simular verificação
      if (code === '123456') {
        return { success: true }
      }
      throw new Error('Código inválido')
    } catch (error) {
      throw new Error('Código inválido')
    }
  },

  async disable2FA(userId) {
    try {
      return { success: true }
    } catch (error) {
      throw new Error('Erro ao desativar 2FA')
    }
  }
}