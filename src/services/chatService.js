import api from './api'
import { detectContext, getContextualResponse } from './conversationFlows'

export const chatService = {
  async sendMessage(userId, message) {
    try {
      const chatMessage = {
        id: Date.now(),
        userId,
        ...message,
        createdAt: new Date().toISOString()
      }

      const { data } = await api.post('/chat-messages', chatMessage)
      return data
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      throw new Error('Erro ao enviar mensagem')
    }
  },

  async getUserMessages(userId) {
    try {
      const { data } = await api.get(`/chat-messages?userId=${userId}`)
      return data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error)
      return []
    }
  },

  async getAutoResponse(message, userRole = 'client') {
    try {
      const context = detectContext(message, userRole)
      const response = getContextualResponse(context, message, userRole)
      
      if (response) {
        return response
      }
      
      const defaultResponses = [
        'Obrigado pela sua mensagem! Como posso te ajudar hoje?',
        'Estou aqui para ajudar! Precisa agendar, alterar ou tirar alguma dúvida?',
        'Oi! Em que posso te auxiliar? Agendamento, pagamento ou suporte?'
      ]
      
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
    } catch (error) {
      console.error('Erro ao gerar resposta:', error)
      return 'Desculpe, tive um problema técnico. Pode repetir sua pergunta?'
    }
  },

  async markAsRead(userId) {
    try {
      await api.patch(`/chat-messages?userId=${userId}`, { read: true })
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }
}