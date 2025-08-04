import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaCalendarAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../context/AuthContext'
import { formatDate, formatTime } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Reschedule = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [appointment, setAppointment] = useState(null)
  const [service, setService] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newProfessional, setNewProfessional] = useState('')

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

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

      const [serviceData, professionalsData] = await Promise.all([
        serviceService.getService(apt.serviceId),
        serviceService.getProfessionals()
      ])

      const availableProfessionals = professionalsData.filter(p => 
        p.services.includes(apt.serviceId)
      )

      setAppointment(apt)
      setService(serviceData)
      setProfessionals(availableProfessionals)
      setNewProfessional(apt.professionalId.toString())
    } catch (error) {
      toast.error('Erro ao carregar dados')
      navigate('/app/appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newDate || !newTime) {
      toast.error('Selecione nova data e horário')
      return
    }

    const selectedDate = new Date(newDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      toast.error('Não é possível agendar para datas passadas')
      return
    }

    setSubmitting(true)
    try {
      const updates = {
        date: newDate,
        time: newTime,
        professionalId: parseInt(newProfessional),
        status: 'pending',
        rescheduledAt: new Date().toISOString(),
        rescheduledFrom: {
          date: appointment.date,
          time: appointment.time,
          professionalId: appointment.professionalId
        }
      }

      await appointmentService.updateAppointment(appointment.id, updates)
      toast.success('Agendamento reagendado com sucesso!')
      navigate('/app/appointments')
    } catch (error) {
      toast.error('Erro ao reagendar')
    } finally {
      setSubmitting(false)
    }
  }

  const canReschedule = () => {
    if (!appointment) return false
    
    const appointmentDate = new Date(appointment.date)
    const now = new Date()
    const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60)
    
    return hoursDiff > 24 && appointment.status !== 'completed' && appointment.status !== 'cancelled'
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h4>
                <FaCalendarAlt className="me-2" />
                Reagendar Serviço
              </h4>
            </Card.Header>
            <Card.Body>
              {/* Agendamento Atual */}
              <Card className="mb-4 bg-light">
                <Card.Body>
                  <h5>Agendamento Atual</h5>
                  <Row>
                    <Col md={6}>
                      <strong>Serviço:</strong> {service?.name}<br />
                      <strong>Data:</strong> {formatDate(appointment?.date)}<br />
                      <strong>Horário:</strong> {formatTime(appointment?.time)}
                    </Col>
                    <Col md={6}>
                      <strong>Profissional:</strong> {professionals.find(p => p.id === appointment?.professionalId)?.name}<br />
                      <strong>Status:</strong> {appointment?.status}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {!canReschedule() ? (
                <Alert variant="warning">
                  <FaExclamationTriangle className="me-2" />
                  <strong>Não é possível reagendar este agendamento.</strong><br />
                  Reagendamentos só são permitidos com pelo menos 24 horas de antecedência 
                  e para agendamentos que não foram concluídos ou cancelados.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Escolha nova data e horário</h5>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nova Data</Form.Label>
                        <Form.Control
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Novo Horário</Form.Label>
                        <Form.Select
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          required
                        >
                          <option value="">Selecione um horário</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Profissional</Form.Label>
                    <Form.Select
                      value={newProfessional}
                      onChange={(e) => setNewProfessional(e.target.value)}
                      required
                    >
                      {professionals.map(professional => (
                        <option key={professional.id} value={professional.id}>
                          {professional.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Alert variant="info">
                    <strong>Política de Reagendamento:</strong><br />
                    • Reagendamentos gratuitos até 24h antes do horário<br />
                    • Após reagendar, o status voltará para "Pendente" até confirmação<br />
                    • Você receberá uma confirmação por e-mail
                  </Alert>

                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate('/app/appointments')}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Reagendando...' : 'Confirmar Reagendamento'}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Reschedule