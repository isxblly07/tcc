import api from './api'

export const serviceService = {
  async getServices(category = '') {
    try {
      const { data } = await api.get('/services')
      return category ? data.filter(service => service.category === category) : data
    } catch (error) {
      throw new Error('Erro ao buscar serviços')
    }
  },

  async getService(id) {
    try {
      const { data } = await api.get(`/services/${id}`)
      return data
    } catch (error) {
      throw new Error('Erro ao buscar serviço')
    }
  },

  async getProfessionals() {
    try {
      const { data } = await api.get('/professionals')
      return data
    } catch (error) {
      throw new Error('Erro ao buscar profissionais')
    }
  }
}