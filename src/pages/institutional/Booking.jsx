import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap'
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUserTie } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Booking = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    professional: '',
    date: '',
    time: ''
  });

  const services = [
    { id: 1, name: 'Corte Feminino', price: 'R$ 45,00' },
    { id: 2, name: 'Coloração', price: 'R$ 80,00' },
    { id: 3, name: 'Manicure', price: 'R$ 25,00' },
    { id: 4, name: 'Maquiagem Social', price: 'R$ 60,00' }
  ];

  const professionals = [
    { id: 1, name: 'Ana Silva', specialty: 'Cabelo' },
    { id: 2, name: 'Maria Santos', specialty: 'Unhas' },
    { id: 3, name: 'Julia Costa', specialty: 'Maquiagem' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Agendar Serviço</h1>
                <p className="hero-subtitle">
                  Preencha os dados abaixo e garante seu horário com os melhores profissionais
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/app" className="btn-primary-custom me-3">
                    Ir para App
                  </Button>
                  <Button as={Link} to="/servicos" variant="outline-primary">
                    Ver Serviços
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Agendamento" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Booking Form */}
      <section className="services-preview py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="service-preview-card">
                {/* Progress Steps */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    {[1, 2, 3].map(num => (
                      <div key={num} className="d-flex align-items-center">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                          step >= num ? 'text-white' : 'text-muted'
                        }`} style={{
                          width: '40px', 
                          height: '40px',
                          background: step >= num ? 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)' : '#f8f9fa'
                        }}>
                          {num}
                        </div>
                        <span className={`ms-2 ${step >= num ? '' : ''}`} style={{
                          color: step >= num ? '#6b5b95' : '#8a7ca8'
                        }}>
                          {num === 1 ? 'Dados' : num === 2 ? 'Serviço' : 'Confirmação'}
                        </span>
                        {num < 3 && <div className="flex-grow-1 mx-3" style={{borderTop: '1px solid #dee2e6'}}></div>}
                      </div>
                    ))}
                  </div>
                </div>

                  <Form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Data */}
                    {step === 1 && (
                      <div>
                        <h4 className="mb-4">
                          <FaUser className="me-2 text-primary" />
                          Dados Pessoais
                        </h4>
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label>Nome Completo</Form.Label>
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
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-end">
                          <Button className="btn-primary-custom" onClick={nextStep}>
                            Próximo
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Service Selection */}
                    {step === 2 && (
                      <div>
                        <h4 className="mb-4">
                          <FaCalendarAlt className="me-2 text-primary" />
                          Escolha do Serviço
                        </h4>
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label>Serviço</Form.Label>
                            <Form.Select
                              name="service"
                              value={formData.service}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecione um serviço</option>
                              {services.map(service => (
                                <option key={service.id} value={service.name}>
                                  {service.name} - {service.price}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label>Profissional</Form.Label>
                            <Form.Select
                              name="professional"
                              value={formData.professional}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecione um profissional</option>
                              {professionals.map(prof => (
                                <option key={prof.id} value={prof.name}>
                                  {prof.name} - {prof.specialty}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label>Horário</Form.Label>
                            <Form.Select
                              name="time"
                              value={formData.time}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecione um horário</option>
                              {timeSlots.map(time => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-between">
                          <Button variant="outline-secondary" onClick={prevStep}>
                            Voltar
                          </Button>
                          <Button className="btn-primary-custom" onClick={nextStep}>
                            Próximo
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                      <div>
                        <h4 className="mb-4">
                          <FaClock className="me-2 text-primary" />
                          Confirmação do Agendamento
                        </h4>
                        
                        <Alert variant="info">
                          <h6>Resumo do seu agendamento:</h6>
                          <ul className="mb-0">
                            <li><strong>Nome:</strong> {formData.name}</li>
                            <li><strong>E-mail:</strong> {formData.email}</li>
                            <li><strong>Telefone:</strong> {formData.phone}</li>
                            <li><strong>Serviço:</strong> {formData.service}</li>
                            <li><strong>Profissional:</strong> {formData.professional}</li>
                            <li><strong>Data:</strong> {new Date(formData.date).toLocaleDateString('pt-BR')}</li>
                            <li><strong>Horário:</strong> {formData.time}</li>
                          </ul>
                        </Alert>

                        <div className="d-flex justify-content-between">
                          <Button variant="outline-secondary" onClick={prevStep}>
                            Voltar
                          </Button>
                          <Button className="btn-primary-custom" type="submit">
                            Confirmar Agendamento
                          </Button>
                        </div>
                      </div>
                    )}
                  </Form>
                </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agendamento Confirmado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="text-success mb-3">
              <FaCalendarAlt size={60} />
            </div>
            <h5>Seu agendamento foi realizado com sucesso!</h5>
            <p className="text-muted">
              Você receberá uma confirmação por e-mail e SMS com todos os detalhes.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary-custom" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;