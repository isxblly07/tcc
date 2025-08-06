import api from './api'

class PaymentService {
  // Processar pagamento PIX
  async processPixPayment(appointmentId, amount) {
    try {
      const response = await api.post('/payments/pix', {
        appointmentId,
        amount,
        method: 'pix'
      })
      return {
        success: true,
        data: response.data,
        qrCode: response.data.qrCode,
        pixKey: response.data.pixKey
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao processar pagamento PIX'
      }
    }
  }

  // Processar pagamento com cartão
  async processCardPayment(appointmentId, amount, cardData) {
    try {
      const response = await api.post('/payments/card', {
        appointmentId,
        amount,
        method: 'credit_card',
        cardData: {
          number: cardData.number,
          holderName: cardData.holderName,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          cvv: cardData.cvv
        }
      })
      return {
        success: true,
        data: response.data,
        transactionId: response.data.transactionId
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao processar pagamento'
      }
    }
  }

  // Verificar status do pagamento
  async checkPaymentStatus(paymentId) {
    try {
      const response = await api.get(`/payments/${paymentId}/status`)
      return {
        success: true,
        status: response.data.status,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao verificar status do pagamento'
      }
    }
  }

  // Aplicar cupom de desconto
  async applyCoupon(code, appointmentId) {
    try {
      const response = await api.post('/payments/coupon', {
        code,
        appointmentId
      })
      return {
        success: true,
        discount: response.data.discount,
        newAmount: response.data.newAmount
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cupom inválido'
      }
    }
  }

  // Solicitar reembolso
  async requestRefund(paymentId, reason) {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        reason
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao solicitar reembolso'
      }
    }
  }

  // Obter histórico de pagamentos
  async getPaymentHistory() {
    try {
      const response = await api.get('/payments/history')
      return {
        success: true,
        payments: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao carregar histórico de pagamentos'
      }
    }
  }

  // Validar dados do cartão
  validateCardData(cardData) {
    const errors = {}

    // Validar número do cartão
    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
      errors.number = 'Número do cartão inválido'
    }

    // Validar nome do portador
    if (!cardData.holderName || cardData.holderName.trim().length < 3) {
      errors.holderName = 'Nome do portador é obrigatório'
    }

    // Validar mês de expiração
    const month = parseInt(cardData.expiryMonth)
    if (!month || month < 1 || month > 12) {
      errors.expiryMonth = 'Mês inválido'
    }

    // Validar ano de expiração
    const year = parseInt(cardData.expiryYear)
    const currentYear = new Date().getFullYear()
    if (!year || year < currentYear || year > currentYear + 10) {
      errors.expiryYear = 'Ano inválido'
    }

    // Validar CVV
    if (!cardData.cvv || cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      errors.cvv = 'CVV inválido'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  // Formatar número do cartão
  formatCardNumber(number) {
    return number.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  // Detectar bandeira do cartão
  detectCardBrand(number) {
    const cleanNumber = number.replace(/\s/g, '')
    
    if (/^4/.test(cleanNumber)) return 'visa'
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard'
    if (/^3[47]/.test(cleanNumber)) return 'amex'
    if (/^6/.test(cleanNumber)) return 'discover'
    if (/^35(2[89]|[3-8][0-9])/.test(cleanNumber)) return 'jcb'
    
    return 'unknown'
  }
}

export default new PaymentService()