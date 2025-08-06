import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Appointments = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [appointmentsRes, servicesRes, professionalsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/services'),
        api.get('/professionals')
      ])
      
      const userAppointments = appointmentsRes.data.filter(apt => apt.userId === user.id)
      setAppointments(userAppointments)
      setServices(servicesRes.data)
      setProfessionals(professionalsRes.data)
    } catch (error) {
      alert('Erro ao carregar agendamentos')
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.name : 'Serviço não encontrado'
  }

  const getProfessionalName = (professionalId) => {
    const professional = professionals.find(p => p.id === professionalId)
    return professional ? professional.name : 'Profissional não encontrado'
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: { variant: 'success', text: 'Confirmado' },
      pending: { variant: 'warning', text: 'Pendente' },
      cancelled: { variant: 'danger', text: 'Cancelado' },
      completed: { variant: 'info', text: 'Concluído' }
    }
    
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status }
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return
    }

    try {
      await api.patch(`/appointments/${appointmentId}`, { status: 'cancelled' })
      alert('Agendamento cancelado com sucesso')
      fetchData()
    } catch (error) {
      alert('Erro ao cancelar agendamento')
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Meus Agendamentos</h1>
          
          {appointments.length === 0 ? (
            <Alert variant="info">
              Você ainda não possui agendamentos. 
              <Button variant="link" href="/services" className="p-0 ms-1">
                Agende um serviço agora!
              </Button>
            </Alert>
          ) : (
            <Row>
              {appointments.map(appointment => (
                <Col md={6} lg={4} key={appointment.id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="mb-0">
                          {getServiceName(appointment.serviceId)}
                        </Card.Title>
                        {getStatusBadge(appointment.status)}
                      </div>
                      
                      <Card.Text>
                        <strong>Profissional:</strong> {getProfessionalName(appointment.professionalId)}<br/>
                        <strong>Data:</strong> {formatDate(appointment.date)}<br/>
                        <strong>Horário:</strong> {appointment.time}
                      </Card.Text>
                      
                      {appointment.status === 'confirmed' && (
                        <div className="mt-auto">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Appointments