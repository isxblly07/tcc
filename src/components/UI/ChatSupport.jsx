import React, { useState } from 'react'
import { Button, Offcanvas, Form } from 'react-bootstrap'
import { FaComments, FaPaperPlane } from 'react-icons/fa'

const ChatSupport = () => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como posso ajudá-lo?', sender: 'support', time: new Date() }
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simular resposta automática
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.',
        sender: 'support',
        time: new Date()
      }
      setMessages(prev => [...prev, autoReply])
    }, 1000)
  }

  return (
    <>
      <Button
        variant="primary"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle"
        style={{ width: '60px', height: '60px', zIndex: 1050 }}
        onClick={() => setShow(true)}
      >
        <FaComments size={24} />
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Suporte</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <div className="flex-grow-1 mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}
              >
                <div
                  className={`d-inline-block p-2 rounded ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  {msg.text}
                </div>
                <div className="small text-muted">
                  {msg.time.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          
          <Form onSubmit={handleSend}>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="primary">
                <FaPaperPlane />
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default ChatSupport