import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Booking = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [service, setService] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    professionalId: '',
    date: '',
    time: ''
  })

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  useEffect(() => {
    fetchServiceAndProfessionals()
  }, [serviceId])

  const fetchServiceAndProfessionals = async () => {
    try {
      const [serviceResponse, professionalsResponse] = await Promise.all([
        api.get(`/services/${serviceId}`),
        api.get('/professionals')
      ])
      
      setService(serviceResponse.data)
      setProfessionals(professionalsResponse.data.filter(p => 
        p.services.includes(parseInt(serviceId))
      ))
    } catch (error) {
      toast.error('Erro ao carregar dados')
      navigate('/services')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.professionalId || !formData.date || !formData.time) {
      toast.error('Preencha todos os campos')
      return
    }

    setSubmitting(true)
    try {
      const appointmentData = {
        userId: user.id,
        serviceId: parseInt(serviceId),
        professionalId: parseInt(formData.professionalId),
        date: formData.date,
        time: formData.time,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }

      await api.post('/appointments', appointmentData)
      toast.success('Agendamento realizado com sucesso!')
      navigate('/appointments')
    } catch (error) {
      toast.error('Erro ao realizar agendamento')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) return <LoadingSpinner />

  if (!service) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Serviço não encontrado</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Agendar Serviço</h2>
              
              <div className="mb-4 p-3 bg-light rounded">
                <h5>{service.name}</h5>
                <p className="text-muted mb-1">{service.description}</p>
                <div className="d-flex justify-content-between">
                  <span><strong>Preço:</strong> R$ {service.price.toFixed(2)}</span>
                  <span><strong>Duração:</strong> {service.duration} min</span>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Profissional</Form.Label>
                  <Form.Select
                    name="professionalId"
                    value={formData.professionalId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um profissional</option>
                    {professionals.map(professional => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name} - {professional.specialty}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Horário</Form.Label>
                  <Form.Select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="flex-grow-1"
                  >
                    {submitting ? 'Agendando...' : 'Confirmar Agendamento'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/services')}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Booking