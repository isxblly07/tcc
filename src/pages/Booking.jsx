import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { serviceService } from '../services/serviceService'
import { appointmentService } from '../services/appointmentService'
import { useAuth } from '../context/AuthContext'
import { appointmentSchema } from '../utils/validation'
import { formatCurrency } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Booking = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [service, setService] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(appointmentSchema)
  })

  useEffect(() => {
    loadData()
  }, [serviceId])

  const loadData = async () => {
    try {
      const [serviceData, professionalsData] = await Promise.all([
        serviceService.getService(serviceId),
        serviceService.getProfessionals()
      ])
      
      setService(serviceData)
      setProfessionals(professionalsData.filter(p => 
        p.services.includes(parseInt(serviceId))
      ))
    } catch (error) {
      toast.error('Erro ao carregar dados')
      navigate('/services')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await appointmentService.createAppointment({
        ...data,
        userId: user.id,
        serviceId: parseInt(serviceId)
      })
      toast.success('Agendamento realizado com sucesso!')
      navigate('/appointments')
    } catch (error) {
      toast.error('Erro ao criar agendamento')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!service) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3>Serviço não encontrado</h3>
        </div>
      </Container>
    )
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={service.image} />
            <Card.Body>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="d-flex justify-content-between">
                <strong>{formatCurrency(service.price)}</strong>
                <span>{service.duration} minutos</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Agendar Serviço</h4>
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Profissional</Form.Label>
                  <Form.Select
                    {...register('professionalId')}
                    isInvalid={!!errors.professionalId}
                  >
                    <option value="">Selecione um profissional</option>
                    {professionals.map(professional => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.professionalId?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    {...register('date')}
                    isInvalid={!!errors.date}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Horário</Form.Label>
                  <Form.Select
                    {...register('time')}
                    isInvalid={!!errors.time}
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.time?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Agendando...' : 'Confirmar Agendamento'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/services')}
                  >
                    Voltar
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