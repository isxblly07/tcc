// Fluxos de conversação avançados para o TimeRight
export const conversationFlows = {
  // Boas-vindas personalizadas
  welcome: {
    variations: [
      'Oi, posso te ajudar a reservar um serviço rapidinho?',
      'Bem-vindo de volta! Deseja repetir seu último agendamento?',
      'Olá! Quer saber promoções do dia ou já agendar?',
      'Tudo certo? Precisa de ajuda com seu histórico ou novo agendamento?',
      'Oi! Sou o assistente do TimeRight. Você quer agendar, pagar ou alterar algo?'
    ]
  },

  // Cadastro/Login
  auth: {
    variations: [
      'Você já tem uma conta? Posso te ajudar a criar uma rapidinho!',
      'Vamos entrar? Pode usar e-mail, telefone ou Google.',
      'Digite seu e-mail e senha. Esqueceu a senha? Posso te ajudar!',
      'Não achou sua conta? Vamos criar uma nova com seus dados.',
      'Deseja usar login social? Temos Google e Facebook!'
    ]
  },

  // Busca por serviços
  serviceSearch: {
    variations: [
      'Corte de cabelo? Você prefere feminino, masculino ou infantil?',
      'Quer um salão ou barbearia perto de você?',
      'Vai organizar um evento? Temos buffets e salões disponíveis!',
      'Oficina mecânica? Posso buscar por troca de óleo, revisão ou funilaria.',
      'Qual categoria? Temos: 💇 Cabeleireiro, ✂️ Barbearia, 🎉 Salões, 🍽️ Buffet, 🔧 Oficina.',
      'Deseja filtrar por localização, preço ou profissional?',
      'Procura por profissional específico?',
      'Deseja ver avaliações antes de escolher?'
    ]
  },

  // Agendamento
  booking: {
    variations: [
      'Escolha o serviço, o profissional e o horário mais conveniente.',
      'Juliana está livre na terça às 14h. Confirmar?',
      'Este profissional é o mais bem avaliado. Deseja escolhê-lo?',
      'Atenção: esse horário está quase cheio!',
      'Prefere agendar com antecedência ou para hoje?',
      'Quer adicionar mais de um serviço no mesmo horário?',
      'Deseja repetir o agendamento da semana passada?',
      'Deseja salvar esse agendamento como favorito?',
      'Deseja receber lembrete 1h antes por SMS?',
      'Já quer deixar agendado para os próximos 3 meses?'
    ]
  },

  // Pagamento
  payment: {
    variations: [
      'Aceitamos: PIX, Cartão, Mercado Pago e PayPal.',
      'Vai pagar agora ou prefere pagar na hora?',
      'Deseja dividir o valor no cartão?',
      'Você tem um cupom de desconto?',
      'Pagamento aprovado! Deseja o comprovante por e-mail?'
    ]
  },

  // Histórico e reagendamento
  history: {
    variations: [
      'Seu último serviço foi há 15 dias. Deseja repetir?',
      'Aqui está seu histórico de agendamentos. Deseja reprogramar algum?',
      'Esse serviço pode ser feito a cada 30 dias. Agendar nova sessão?',
      'Você cancelou esse serviço no mês passado. Deseja tentar novamente?'
    ]
  },

  // Avaliações
  reviews: {
    variations: [
      'Como foi seu atendimento com o profissional Juliana?',
      'Avalie de 1 a 5 estrelas e deixe um comentário, se quiser.',
      'Obrigado pelo feedback! Ele ajuda outros clientes a escolherem melhor.'
    ]
  },

  // Cancelamento e reagendamento
  reschedule: {
    variations: [
      'Deseja cancelar ou apenas reagendar?',
      'O serviço está marcado para amanhã. Deseja mudar o horário?',
      'Cancelamentos com menos de 24h podem ter taxa. Deseja prosseguir?',
      'Novo horário desejado?',
      'Tudo certo. Seu agendamento foi alterado com sucesso.'
    ]
  },

  // Admin - Painel de controle
  adminPanel: {
    variations: [
      'Hoje temos 24 agendamentos confirmados.',
      'Deseja exportar o relatório em Excel ou PDF?',
      'Serviço mais agendado: Escova. Deseja promover esse serviço?',
      '2 profissionais têm horários vagos hoje. Deseja preencher com promoções?'
    ]
  },

  // Admin - Gerenciar usuários
  adminUsers: {
    variations: [
      'Deseja adicionar um novo atendente?',
      'Esse usuário pode visualizar relatórios ou só agendamentos?',
      'Permissão concedida para edição de catálogo.'
    ]
  },

  // Admin - Catálogo
  adminCatalog: {
    variations: [
      'Deseja adicionar uma nova categoria ou apenas um novo serviço?',
      'Serviço "Hidratação capilar" foi editado com sucesso.',
      'Esse serviço está com baixa procura. Deseja ocultar temporariamente?'
    ]
  },

  // Admin - Promoções
  adminPromotions: {
    variations: [
      'Criar promoção para horários vazios?',
      'A campanha "Desconto de sexta" teve 15 agendamentos.',
      'Deseja agendar disparo automático da promoção via e-mail e push?'
    ]
  },

  // Suporte - Problemas técnicos
  techSupport: {
    variations: [
      'Está tendo problemas para acessar?',
      'Seu navegador é compatível com o TimeRight.',
      'Tente limpar o cache e atualizar a página.',
      'Descreva o problema que está enfrentando.',
      'Um técnico entrará em contato em até 1h.',
      'Esse problema já foi relatado por outros usuários. Estamos resolvendo.'
    ]
  },

  // Suporte - Pagamento
  paymentSupport: {
    variations: [
      'Verifique se os dados estão corretos e tente novamente.',
      'Se o pagamento caiu e o sistema não confirmou, posso forçar a sincronização?'
    ]
  },

  // Fidelização
  loyalty: {
    variations: [
      'Parabéns, você ganhou um agendamento grátis!',
      'Indique 3 amigos e ganhe R$ 10 de crédito.'
    ]
  },

  // Notificações
  notifications: {
    variations: [
      'Lembrete ativado para 2h antes do agendamento.',
      'Deseja receber lembretes no WhatsApp também?'
    ]
  },

  // Erro/Falha
  error: {
    variations: [
      'Poxa! Algo deu errado. Tente novamente mais tarde ou chame o suporte.'
    ]
  }
}

// Função para obter resposta contextual
export const getContextualResponse = (context, userMessage, userRole = 'client') => {
  const flows = conversationFlows[context]
  if (!flows || !flows.variations) return null
  
  // Seleciona uma variação aleatória
  const randomIndex = Math.floor(Math.random() * flows.variations.length)
  return flows.variations[randomIndex]
}

// Função para detectar contexto da mensagem
export const detectContext = (message, userRole = 'client') => {
  const lowerMessage = message.toLowerCase()
  
  // Contextos baseados em palavras-chave
  const contextMap = {
    'oi|olá|ola|bem-vindo': 'welcome',
    'login|cadastro|conta|entrar': 'auth',
    'corte|cabelo|serviço|categoria': 'serviceSearch',
    'agendar|marcar|reservar': 'booking',
    'pagar|pagamento|cartão|pix': 'payment',
    'histórico|último|anterior': 'history',
    'avaliar|avaliação|estrelas': 'reviews',
    'cancelar|reagendar|alterar': 'reschedule',
    'problema|erro|bug|falha': 'techSupport',
    'desconto|promoção|cupom': 'loyalty',
    'lembrete|notificação': 'notifications'
  }
  
  // Contextos específicos para admin
  if (userRole === 'admin') {
    const adminContextMap = {
      'painel|dashboard|relatório': 'adminPanel',
      'usuário|atendente|permissão': 'adminUsers',
      'catálogo|serviço|categoria': 'adminCatalog',
      'promoção|campanha|desconto': 'adminPromotions'
    }
    
    for (const [keywords, context] of Object.entries(adminContextMap)) {
      if (new RegExp(keywords).test(lowerMessage)) {
        return context
      }
    }
  }
  
  // Verifica contextos gerais
  for (const [keywords, context] of Object.entries(contextMap)) {
    if (new RegExp(keywords).test(lowerMessage)) {
      return context
    }
  }
  
  return 'welcome' // Contexto padrão
}