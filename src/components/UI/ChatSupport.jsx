import React, { useState } from 'react'
import { Button, Modal, Form, ListGroup } from 'react-bootstrap'
import { FaComments, FaPaperPlane } from 'react-icons/fa'

const ChatSupport = () => {
  const [show, setShow] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como posso ajudá-lo?', sender: 'support', time: '10:00' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simular resposta automática
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: 'Obrigado pela sua mensagem! Nossa equipe responderá em breve.',
        sender: 'support',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, autoReply])
    }, 1000)
  }

  return (
    <>
      <Button
        variant="primary"
        className="position-fixed"
        style={{ bottom: '20px', right: '20px', borderRadius: '50px', zIndex: 1000 }}
        onClick={() => setShow(true)}
      >
        <FaComments size={20} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Suporte</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '300px', overflowY: 'auto' }}>
          <ListGroup variant="flush">
            {messages.map(message => (
              <ListGroup.Item
                key={message.id}
                className={`border-0 ${message.sender === 'user' ? 'text-end' : ''}`}
              >
                <div
                  className={`d-inline-block p-2 rounded ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light'
                  }`}
                  style={{ maxWidth: '80%' }}
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
              <Button type="submit" variant="primary" size="sm" className="ms-2">
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