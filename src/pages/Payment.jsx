import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap'
import { FaCreditCard, FaQrcode, FaMobile, FaLock, FaCheck } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import paymentService from '../services/paymentService'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Payment = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [appointment, setAppointment] = useState(null)
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [showSuccess, setShowSuccess] = useState(false)
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  useEffect(() => {
    loadData()
  }, [appointmentId])

  const loadData = async () => {
    try {
      const appointments = await appointmentService.getUserAppointments(user.id)
      const apt = appointments.find(a => a.id === parseInt(appointmentId))
      
      if (!apt) {
        toast.error('Agendamento não encontrado')
        navigate('/app/appointments')
        return
      }

      const serviceData = await serviceService.getService(apt.serviceId)
      setAppointment(apt)
      setService(serviceData)
    } catch (error) {
      toast.error('Erro ao carregar dados do pagamento')
      navigate('/app/appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '')
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const processPayment = async () => {
    setProcessing(true)
    try {
      const paymentData = {
        appointmentId: appointment.id,
        userId: user.id,
        amount: service.price,
        method: paymentMethod,
        ...(paymentMethod === 'card' && { cardData })
      }

      await paymentService.processPayment(paymentData)
      
      // Atualizar status do agendamento
      await appointmentService.updateAppointment(appointment.id, { 
        status: 'confirmed',
        paymentStatus: 'paid'
      })

      setShowSuccess(true)
      toast.success('Pagamento realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao processar pagamento')
    } finally {
      setProcessing(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    processPayment()
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h4>
                <FaLock className="me-2" />
                Pagamento Seguro
              </h4>
            </Card.Header>
            <Card.Body>
              {/* Resumo do Serviço */}
              <Card className="mb-4 bg-light">
                <Card.Body>
                  <h5>Resumo do Agendamento</h5>
                  <Row>
                    <Col md={6}>
                      <strong>Serviço:</strong> {service?.name}<br />
                      <strong>Duração:</strong> {service?.duration} minutos<br />
                      <strong>Data:</strong> {new Date(appointment?.date).toLocaleDateString('pt-BR')}
                    </Col>
                    <Col md={6}>
                      <strong>Horário:</strong> {appointment?.time}<br />
                      <strong>Valor:</strong> <span className="h5 text-primary">{formatCurrency(service?.price)}</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Métodos de Pagamento */}
              <h5 className="mb-3">Escolha a forma de pagamento</h5>
              
              <div className="payment-methods mb-4">
                <div className="d-flex gap-3 mb-3">
                  <Button
                    variant={paymentMethod === 'pix' ? 'primary' : 'outline-primary'}
                    onClick={() => setPaymentMethod('pix')}
                    className="flex-fill"
                  >
                    <FaQrcode className="me-2" />
                    PIX
                  </Button>
                  <Button
                    variant={paymentMethod === 'card' ? 'primary' : 'outline-primary'}
                    onClick={() => setPaymentMethod('card')}
                    className="flex-fill"
                  >
                    <FaCreditCard className="me-2" />
                    Cartão
                  </Button>
                  <Button
                    variant={paymentMethod === 'wallet' ? 'primary' : 'outline-primary'}
                    onClick={() => setPaymentMethod('wallet')}
                    className="flex-fill"
                  >
                    <FaMobile className="me-2" />
                    Carteira Digital
                  </Button>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* PIX */}
                {paymentMethod === 'pix' && (
                  <Alert variant="info">
                    <FaQrcode className="me-2" />
                    <strong>Pagamento via PIX</strong><br />
                    Após confirmar, você receberá um QR Code para pagamento instantâneo.
                  </Alert>
                )}

                {/* Cartão de Crédito */}
                {paymentMethod === 'card' && (
                  <div>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Número do Cartão</Form.Label>
                          <Form.Control
                            type="text"
                            name="number"
                            value={cardData.number}
                            onChange={handleCardInputChange}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome no Cartão</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={cardData.name}
                            onChange={handleCardInputChange}
                            placeholder="Nome como no cartão"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Validade</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardInputChange}
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardInputChange}
                            placeholder="000"
                            maxLength={4}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Carteira Digital */}
                {paymentMethod === 'wallet' && (
                  <Alert variant="info">
                    <FaMobile className="me-2" />
                    <strong>Carteira Digital</strong><br />
                    Você será redirecionado para sua carteira digital preferida.
                  </Alert>
                )}

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Button variant="outline-secondary" onClick={() => navigate('/app/appointments')}>
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="success" 
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? 'Processando...' : `Pagar ${formatCurrency(service?.price)}`}
                  </Button>
                </div>
              </Form>

              <div className="mt-3 text-center">
                <small className="text-muted">
                  <FaLock className="me-1" />
                  Seus dados estão protegidos com criptografia SSL
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de Sucesso */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Body className="text-center py-4">
          <FaCheck className="text-success mb-3" size={60} />
          <h4>Pagamento Realizado!</h4>
          <p>Seu agendamento foi confirmado com sucesso.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/app/appointments')}
          >
            Ver Agendamentos
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Payment