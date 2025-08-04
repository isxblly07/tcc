import api from '../api'

export const adminService = {
  // Autenticação
  async login(credentials) {
    try {
      const response = await api.post('/admin/login', credentials)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro no login')
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/admin/register', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro no cadastro')
    }
  },

  // Dashboard
  async getStats() {
    try {
      const response = await api.get('/admin/stats')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar estatísticas')
    }
  },

  // Usuários
  async getUsers() {
    try {
      const response = await api.get('/admin/users')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar usuários')
    }
  },

  // Promoções
  async getPromotions() {
    try {
      const response = await api.get('/admin/promotions')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar promoções')
    }
  },

  async createPromotion(promotionData) {
    try {
      const response = await api.post('/admin/promotions', promotionData)
      return response.data
    } catch (error) {
      throw new Error('Erro ao criar promoção')
    }
  }
}