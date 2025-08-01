import api from './api'

export const appointmentService = {
  async createAppointment(appointmentData) {
    try {
      const newAppointment = {
        ...appointmentData,
        id: Date.now(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      const { data } = await api.post('/appointments', newAppointment)
      return data
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      throw new Error(error.response?.data?.message || 'Erro ao criar agendamento')
    }
  },

  async getUserAppointments(userId) {
    try {
      const { data } = await api.get(`/appointments?userId=${userId}`)
      return data
    } catch (error) {
      console.error('Erro ao buscar agendamentos do usuário:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar agendamentos')
    }
  },

  async getAllAppointments() {
    try {
      const { data } = await api.get('/appointments')
      return data
    } catch (error) {
      console.error('Erro ao buscar todos agendamentos:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar agendamentos')
    }
  },

  async updateAppointment(id, updates) {
    try {
      const { data } = await api.patch(`/appointments/${id}`, updates)
      return data
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar agendamento')
    }
  },

  async deleteAppointment(id) {
    try {
      await api.delete(`/appointments/${id}`)
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error)
      throw new Error(error.response?.data?.message || 'Erro ao cancelar agendamento')
    }
  }
}