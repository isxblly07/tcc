import api from './api'

export const paymentService = {
  async processPayment(paymentData) {
    try {
      const payment = {
        id: Date.now(),
        ...paymentData,
        status: 'completed',
        transactionId: `TXN_${Date.now()}`,
        createdAt: new Date().toISOString()
      }

      // Simular processamento baseado no método
      if (paymentData.method === 'pix') {
        payment.pixCode = `00020126580014BR.GOV.BCB.PIX0136${Date.now()}5204000053039865802BR5925TimeRight6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`
        payment.qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
      }

      const { data } = await api.post('/payments', payment)
      return data
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      throw new Error(error.response?.data?.message || 'Erro ao processar pagamento')
    }
  },

  async getPayment(id) {
    try {
      const { data } = await api.get(`/payments/${id}`)
      return data
    } catch (error) {
      console.error('Erro ao buscar pagamento:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar pagamento')
    }
  },

  async getUserPayments(userId) {
    try {
      const { data } = await api.get(`/payments?userId=${userId}`)
      return data
    } catch (error) {
      console.error('Erro ao buscar pagamentos do usuário:', error)
      throw new Error(error.response?.data?.message || 'Erro ao buscar pagamentos')
    }
  },

  async refundPayment(paymentId, reason) {
    try {
      const refund = {
        id: Date.now(),
        paymentId,
        reason,
        status: 'completed',
        refundedAt: new Date().toISOString()
      }

      const { data } = await api.post('/refunds', refund)
      
      // Atualizar status do pagamento
      await api.patch(`/payments/${paymentId}`, { status: 'refunded' })
      
      return data
    } catch (error) {
      console.error('Erro ao processar reembolso:', error)
      throw new Error(error.response?.data?.message || 'Erro ao processar reembolso')
    }
  }
}