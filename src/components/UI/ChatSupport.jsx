import React, { useState } from 'react'
import { Button, Modal, Form, ListGroup } from 'react-bootstrap'
import { FaComments, FaPaperPlane, FaRobot } from 'react-icons/fa'

const ChatSupport = () => {
  const [show, setShow] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: '👋 Olá! Sou a assistente virtual do TimeRight. Como posso ajudá-lo hoje?', sender: 'support', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [newMessage, setNewMessage] = useState('')

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Saudações
    if (message.includes('oi') || message.includes('olá') || message.includes('ola') || message.includes('hey')) {
      return '😊 Olá! Que bom te ver por aqui! Em que posso ajudá-lo?'
    }
    
    // Agendamento
    if (message.includes('agendar') || message.includes('marcar') || message.includes('horário')) {
      return '📅 Para agendar um serviço, você pode clicar em "Agendar Agora" ou ir para nossa área de agendamentos. Precisa de ajuda com algum serviço específico?'
    }
    
    // Serviços
    if (message.includes('serviço') || message.includes('cabelo') || message.includes('manicure') || message.includes('maquiagem')) {
      return '💄 Oferecemos serviços de cabelo, manicure, maquiagem e cuidados com a pele. Você pode ver todos os detalhes na nossa página de serviços. Qual te interessa mais?'
    }
    
    // Preços
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto custa')) {
      return '💰 Os preços variam conforme o serviço. Cortes a partir de R$ 35, manicure R$ 25, maquiagem R$ 60. Quer saber sobre algum serviço específico?'
    }
    
    // Horários
    if (message.includes('horário') || message.includes('funciona') || message.includes('aberto')) {
      return '🕐 Funcionamos de segunda a sábado, das 9h às 18h. Nosso sistema de agendamento online está disponível 24h!'
    }
    
    // Localização
    if (message.includes('onde') || message.includes('endereço') || message.includes('localização')) {
      return '📍 Somos uma plataforma online que conecta você aos melhores salões da sua região. Após o agendamento, você receberá o endereço do profissional escolhido.'
    }
    
    // Cancelamento
    if (message.includes('cancelar') || message.includes('desmarcar')) {
      return '❌ Você pode cancelar seu agendamento até 2 horas antes do horário marcado através da sua área de agendamentos. Precisa de ajuda para cancelar?'
    }
    
    // Problemas
    if (message.includes('problema') || message.includes('erro') || message.includes('não funciona')) {
      return '🔧 Sinto muito pelo inconveniente! Pode me contar qual problema está enfrentando? Nossa equipe técnica pode ajudar.'
    }
    
    // Despedidas
    if (message.includes('tchau') || message.includes('obrigad') || message.includes('valeu')) {
      return '😊 Foi um prazer ajudar! Qualquer dúvida, estarei aqui. Tenha um ótimo dia!'
    }
    
    // Resposta padrão
    return '🤔 Entendi! Para melhor atendimento, você pode: \n• Agendar serviços na nossa plataforma\n• Ver nossos preços e horários\n• Entrar em contato pelo WhatsApp\n\nEm que mais posso ajudar?'
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    const messageText = newMessage
    setNewMessage('')

    // Resposta automática inteligente
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'support',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botReply])
    }, 800)
  }

  return (
    <>
      <Button
        className="position-fixed btn-primary-custom"
        style={{ 
          bottom: '20px', 
          right: '20px', 
          borderRadius: '50px', 
          zIndex: 1000,
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(177, 156, 217, 0.4)'
        }}
        onClick={() => setShow(true)}
      >
        <FaRobot size={24} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="sm">
        <Modal.Header closeButton style={{background: 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)', color: 'white'}}>
          <Modal.Title>
            <FaRobot className="me-2" />
            Assistente Virtual
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '300px', overflowY: 'auto' }}>
          <ListGroup variant="flush">
            {messages.map(message => (
              <ListGroup.Item
                key={message.id}
                className={`border-0 ${message.sender === 'user' ? 'text-end' : ''}`}
              >
                <div
                  className="d-inline-block p-2 rounded"
                  style={{ 
                    maxWidth: '80%',
                    background: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)' 
                      : '#f8f9fa',
                    color: message.sender === 'user' ? 'white' : '#6b5b95',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {message.text}
                </div>
                <div className="small text-muted mt-1">
                  {message.time}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="p-2">
          <Form onSubmit={handleSendMessage} className="w-100">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                size="sm"
              />
              <Button type="submit" size="sm" className="ms-2 btn-primary-custom">
                <FaPaperPlane />
              </Button>
            </div>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChatSupport