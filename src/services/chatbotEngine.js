// Motor de IA do TimeBot com reconhecimento de intenções
export class ChatbotEngine {
  constructor() {
    this.context = null
    this.userProfile = null
    this.conversationHistory = []
  }

  // Processa mensagem do usuário
  async processMessage(message, userRole = 'client', userProfile = null) {
    this.userProfile = userProfile
    
    const intent = this.detectIntent(message)
    const context = this.detectContext(message, userRole)
    const response = await this.generateResponse(intent, context, message)
    
    this.conversationHistory.push({
      user: message,
      bot: response,
      timestamp: new Date(),
      intent,
      context
    })
    
    return {
      response,
      intent,
      context,
      actions: this.getActions(intent, context)
    }
  }

  // Detecta intenção do usuário
  detectIntent(message) {
    const intents = {
      greeting: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite'],
      booking: ['agendar', 'marcar', 'reservar', 'horário'],
      rescheduling: ['reagendar', 'remarcar', 'mudar', 'alterar'],
      cancellation: ['cancelar', 'desmarcar', 'desistir'],
      payment: ['pagar', 'pagamento', 'preço', 'valor', 'cartão', 'pix'],
      info: ['informação', 'horário', 'endereço', 'telefone'],
      help: ['ajuda', 'suporte', 'problema', 'erro'],
      farewell: ['tchau', 'obrigado', 'até logo', 'bye']
    }

    const lowerMessage = message.toLowerCase()
    
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }
    
    return 'unknown'
  }

  // Detecta contexto da conversa
  detectContext(message, userRole) {
    const adminContexts = ['dashboard', 'relatório', 'usuários', 'promoções']
    const lowerMessage = message.toLowerCase()
    
    if (userRole === 'admin' && adminContexts.some(ctx => lowerMessage.includes(ctx))) {
      return 'admin'
    }
    
    return 'client'
  }

  // Gera resposta baseada em IA
  async generateResponse(intent, context, message) {
    const responses = {
      greeting: [
        'Olá! Sou o TimeBot 🤖 Como posso ajudar você hoje?',
        'Oi! Bem-vindo ao TimeRight! Em que posso ajudá-lo?',
        'Olá! Estou aqui para facilitar seu agendamento. O que precisa?'
      ],
      
      booking: [
        'Perfeito! Vou te ajudar a agendar. Que tipo de serviço você gostaria?',
        'Vamos agendar seu horário! Qual serviço você precisa?',
        'Ótimo! Posso mostrar os horários disponíveis. Qual serviço te interessa?'
      ],
      
      rescheduling: [
        'Sem problemas! Posso te ajudar a reagendar. Qual o número do seu agendamento?',
        'Claro! Para reagendar, preciso verificar seu agendamento atual.',
        'Vou te ajudar com isso! Me informe seu email ou telefone cadastrado.'
      ],
      
      cancellation: [
        'Entendo que precisa cancelar. Lembre-se que cancelamentos devem ser feitos com 24h de antecedência.',
        'Posso te ajudar com o cancelamento. Qual o número do seu agendamento?',
        'Sem problema! Vou processar seu cancelamento. Preciso de alguns dados.'
      ],
      
      payment: [
        'Aceitamos PIX, cartão e carteira digital. O pagamento é feito após a confirmação do agendamento.',
        'Nossos preços variam por serviço. Qual serviço te interessa para eu informar o valor?',
        'Temos várias opções de pagamento! PIX tem desconto de 5%. Quer saber mais?'
      ],
      
      info: [
        'Funcionamos de segunda a sábado, das 8h às 18h. Domingos apenas com agendamento especial.',
        'Estamos localizados no centro da cidade. Posso enviar o endereço completo!',
        'Nosso telefone é (11) 99999-9999. Também atendemos pelo WhatsApp!'
      ],
      
      help: [
        'Estou aqui para ajudar! Pode me descrever o problema que está enfrentando?',
        'Sinto muito pelo inconveniente! Qual dificuldade você está tendo?',
        'Vou te ajudar a resolver isso! Me conte mais detalhes do problema.'
      ],
      
      farewell: [
        'Foi um prazer ajudar! Volte sempre que precisar. Até logo! 👋',
        'Obrigado por usar o TimeRight! Tenha um ótimo dia! ✨',
        'Até a próxima! Estou sempre aqui quando precisar. 😊'
      ],
      
      unknown: [
        'Desculpe, não entendi bem. Pode reformular sua pergunta?',
        'Hmm, não tenho certeza sobre isso. Pode ser mais específico?',
        'Não compreendi. Você pode me explicar de outra forma?'
      ]
    }

    const intentResponses = responses[intent] || responses.unknown
    const randomIndex = Math.floor(Math.random() * intentResponses.length)
    
    return intentResponses[randomIndex]
  }

  // Retorna ações sugeridas baseadas na intenção
  getActions(intent, context) {
    const actions = {
      greeting: [
        { text: '📅 Agendar Serviço', action: 'navigate', target: '/services' },
        { text: '📋 Meus Agendamentos', action: 'navigate', target: '/appointments' },
        { text: '💬 Falar com Atendente', action: 'human_support' }
      ],
      
      booking: [
        { text: '💇 Ver Serviços', action: 'navigate', target: '/services' },
        { text: '📅 Escolher Data', action: 'open_calendar' },
        { text: '👨‍💼 Ver Profissionais', action: 'show_professionals' }
      ],
      
      payment: [
        { text: '💳 Formas de Pagamento', action: 'show_payment_methods' },
        { text: '💰 Ver Preços', action: 'show_prices' },
        { text: '🎫 Cupons de Desconto', action: 'show_coupons' }
      ],
      
      help: [
        { text: '📞 Falar com Suporte', action: 'human_support' },
        { text: '❓ Perguntas Frequentes', action: 'show_faq' },
        { text: '📧 Enviar Email', action: 'send_email' }
      ]
    }

    return actions[intent] || []
  }

  // Obtém histórico da conversa
  getHistory() {
    return this.conversationHistory
  }

  // Limpa histórico
  clearHistory() {
    this.conversationHistory = []
    this.context = null
  }
}