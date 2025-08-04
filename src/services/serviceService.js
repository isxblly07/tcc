import api from './api'

export const serviceService = {
  async getServices() {
    try {
      const { data } = await api.get('/services')
      return data
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar serviços')
    }
  },

  async getService(id) {
    try {
      const services = await this.getServices()
      const service = services.find(s => s.id == id)
      if (!service) throw new Error('Serviço não encontrado')
      return service
    } catch (error) {
      console.error('Erro ao buscar serviço:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar serviço')
    }
  },

  async getServicesByCategory(category) {
    try {
      const { data } = await api.get(`/services?category=${category}`)
      return data
    } catch (error) {
      console.error('Erro ao buscar serviços por categoria:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar serviços')
    }
  },

  async getProfessionals() {
    try {
      const { data } = await api.get('/professionals')
      return data
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar profissionais')
    }
  },

  async getProfessional(id) {
    try {
      const { data } = await api.get(`/professionals/${id}`)
      return data
    } catch (error) {
      console.error('Erro ao buscar profissional:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar profissional')
    }
  },

  async createService(serviceData) {
    try {
      const newService = {
        ...serviceData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      const { data } = await api.post('/services', newService)
      return data
    } catch (error) {
      console.error('Erro ao criar serviço:', error)
      throw new Error(error.response?.data?.message || 'Erro ao criar serviço')
    }
  },

  async updateService(id, updates) {
    try {
      const { data } = await api.patch(`/services/${id}`, updates)
      return data
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar serviço')
    }
  },

  async deleteService(id) {
    try {
      await api.delete(`/services/${id}`)
    } catch (error) {
      console.error('Erro ao deletar serviço:', error)
      throw new Error(error.response?.data?.message || 'Erro ao deletar serviço')
    }
  }
}