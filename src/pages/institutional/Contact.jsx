import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', message: 'Olá! Como posso ajudá-lo hoje?', time: '14:30' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: 'bot',
          message: 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-primary" size={24} />,
      title: 'E-mail',
      info: 'contato@timeright.com',
      description: 'Resposta em até 24h'
    },
    {
      icon: <FaPhone className="text-primary" size={24} />,
      title: 'Telefone',
      info: '(11) 9999-9999',
      description: 'Seg à Sex, 9h às 18h'
    },
    {
      icon: <FaMapMarkerAlt className="text-primary" size={24} />,
      title: 'Endereço',
      info: 'São Paulo, SP',
      description: 'Atendimento online'
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona o agendamento?',
      answer: 'É simples! Escolha o serviço, profissional, data e horário disponível. Você receberá confirmação por e-mail e SMS.'
    },
    {
      question: 'Posso cancelar meu agendamento?',
      answer: 'Sim, você pode cancelar até 2 horas antes do horário agendado através da plataforma ou entrando em contato conosco.'
    },
    {
      question: 'Como escolho o profissional?',
      answer: 'Na página de agendamento, você pode ver todos os profissionais disponíveis com suas especialidades e escolher o de sua preferência.'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Contato & Suporte</h1>
                <p className="hero-subtitle">
                  Estamos aqui para ajudar! Entre em contato conosco e tire todas as suas dúvidas
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/app" className="btn-primary-custom me-3">
                    Ir para App
                  </Button>
                  <Button as={Link} to="/sobre" variant="outline-primary">
                    Sobre Nós
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Atendimento" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Como nos Encontrar</h2>
              <p className="section-subtitle">Escolha a melhor forma de entrar em contato</p>
            </Col>
          </Row>
          <Row>
            {contactInfo.map((contact, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <div className="service-icon">
                    {contact.icon}
                  </div>
                  <h5>{contact.title}</h5>
                  <p className="fs-6 mb-2" style={{color: '#6b5b95', fontWeight: '600'}}>{contact.info}</p>
                  <small>{contact.description}</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Forms */}
      <section className="services-preview py-5">
        <Container>
          <Row>
            <Col lg={6} className="mb-5">
              <div className="service-preview-card h-100">
                <h4 className="mb-4" style={{color: '#6b5b95'}}>
                  <FaEnvelope className="me-2" />
                  Envie uma Mensagem
                </h4>
                  
                  {showAlert && (
                    <Alert variant="success">
                      Mensagem enviada com sucesso! Retornaremos em breve.
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                    </Row>
                    
                    <div className="mb-3">
                      <Form.Label>Assunto</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida sobre agendamento</option>
                        <option value="problema">Problema técnico</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="outro">Outro</option>
                      </Form.Select>
                    </div>
                    
                    <div className="mb-3">
                      <Form.Label>Mensagem</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="btn-primary-custom w-100">
                      Enviar Mensagem
                    </Button>
                  </Form>
                </div>
            </Col>
            
            <Col lg={6}>
              <div className="service-preview-card h-100">
                <h4 className="mb-4" style={{color: '#6b5b95'}}>
                  <FaComments className="me-2" />
                  Chat de Suporte
                </h4>
                  
                  <div className="chat-container" style={{ height: '300px', overflowY: 'auto', background: 'rgba(250, 247, 255, 0.5)', borderRadius: '15px', padding: '1rem' }}>
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`mb-3 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`p-3 rounded-3`} style={{ 
                          maxWidth: '80%',
                          background: msg.sender === 'user' ? 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)' : '#ffffff',
                          color: msg.sender === 'user' ? 'white' : '#6b5b95',
                          boxShadow: '0 2px 10px rgba(177, 156, 217, 0.2)'
                        }}>
                          <p className="mb-1">{msg.message}</p>
                          <small style={{opacity: 0.8}}>
                            <FaClock className="me-1" size={12} />
                            {msg.time}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Form onSubmit={handleSendMessage} className="mt-3">
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="me-2"
                      />
                      <Button type="submit" className="btn-primary-custom">
                        Enviar
                      </Button>
                    </div>
                  </Form>
                </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Perguntas Frequentes</h2>
              <p className="section-subtitle">Tire suas dúvidas mais comuns</p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="service-preview-card mb-3">
                  <h6 style={{color: '#6b5b95', fontWeight: 'bold'}} className="mb-2">{item.question}</h6>
                  <p className="mb-0">{item.answer}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="cta-title">Ainda tem dúvidas?</h3>
              <p className="cta-subtitle">Nossa equipe está pronta para ajudar você</p>
              <Button as={Link} to="/app" size="lg" className="btn-primary-custom">
                Falar Conosco
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;