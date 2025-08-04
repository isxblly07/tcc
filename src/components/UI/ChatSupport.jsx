import React, { useState, useEffect, useRef } from 'react'
import { Card, Form, Button, Badge } from 'react-bootstrap'
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaRobot } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { chatService } from '../../services/chatService'

const ChatSupport = () => {
  const { user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadMessages()
    }
  }, [isOpen, isAuthenticated])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      const chatMessages = await chatService.getUserMessages(user.id)
      setMessages(chatMessages)
      setUnreadCount(0)
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(true)

    try {
      await chatService.sendMessage(user.id, message)
      
      // Simular resposta automática
      setTimeout(async () => {
        const response = await chatService.getAutoResponse(newMessage, user?.role)
        setMessages(prev => [...prev, {
          text: response,
          sender: 'support',
          timestamp: new Date().toISOString()
        }])
        setIsTyping(false)
      }, 1500)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setIsTyping(false)
    }
  }

  const quickResponses = [
    '💇 Agendar serviço',
    '💳 Formas de pagamento', 
    '📅 Reagendar/Cancelar',
    '🕐 Horários de funcionamento',
    '🎁 Promoções do dia',
    '📱 Criar conta'
  ]

  const handleQuickResponse = (text) => {
    setNewMessage(text)
  }

  if (!isAuthenticated) return null

  return (
    <>
      {/* Botão Flutuante */}
      <div 
        className="position-fixed"
        style={{ 
          bottom: '20px', 
          right: '20px', 
          zIndex: 1050,
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="position-relative">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#6f42c1',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
          </div>
          {unreadCount > 0 && (
            <Badge 
              bg="danger" 
              pill 
              className="position-absolute top-0 start-100 translate-middle"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card 
          className="position-fixed"
          style={{
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: 1040,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <strong>Suporte TimeRight</strong>
              <div style={{ fontSize: '0.8rem' }}>
                Online • Resposta rápida
              </div>
            </div>
            <Button 
              variant="link" 
              className="text-white p-0"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </Button>
          </Card.Header>

          <Card.Body 
            className="p-0 d-flex flex-column"
            style={{ height: '400px' }}
          >
            {/* Mensagens */}
            <div 
              className="flex-grow-1 p-3"
              style={{ 
                overflowY: 'auto',
                maxHeight: '300px'
              }}
            >
              {messages.length === 0 && (
                <div className="text-center text-muted py-4">
                  <FaRobot size={40} className="mb-2" />
                  <div>Olá! Como posso ajudar você hoje?</div>
                </div>
              )}

              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`d-flex mb-3 ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div 
                    className={`d-flex align-items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    style={{ maxWidth: '80%' }}
                  >
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center me-2 ms-2`}
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: message.sender === 'user' ? '#6f42c1' : '#28a745',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}
                    >
                      {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                    </div>
                    <div 
                      className={`p-2 rounded ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-light'
                      }`}
                    >
                      {message.text}
                      <div 
                        className={`small mt-1 ${
                          message.sender === 'user' ? 'text-white-50' : 'text-muted'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#28a745',
                        color: 'white'
                      }}
                    >
                      <FaRobot />
                    </div>
                    <div className="bg-light p-2 rounded">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Respostas Rápidas */}
            {messages.length === 0 && (
              <div className="px-3 pb-2">
                <div className="small text-muted mb-2">Perguntas frequentes:</div>
                <div className="d-flex flex-wrap gap-1">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleQuickResponse(response)}
                      style={{ fontSize: '0.7rem' }}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-top">
              <Form onSubmit={sendMessage}>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={!newMessage.trim() || isTyping}
                  >
                    <FaPaperPlane />
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      )}

      <style jsx>{`
        .typing-indicator {
          display: flex;
          gap: 3px;
        }
        
        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #999;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}

export default ChatSupport