import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap'

import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const History = () => {
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
      
      const userAppointments = appointmentsRes.data
        .filter(apt => apt.userId === user.id && apt.status === 'completed')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      
      setAppointments(userAppointments)
      setServices(servicesRes.data)
      setProfessionals(professionalsRes.data)
    } catch (error) {
      alert('Erro ao carregar histórico')
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.name : 'Serviço não encontrado'
  }

  const getServicePrice = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.price : 0
  }

  const getProfessionalName = (professionalId) => {
    const professional = professionals.find(p => p.id === professionalId)
    return professional ? professional.name : 'Profissional não encontrado'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const totalSpent = appointments.reduce((total, apt) => {
    return total + getServicePrice(apt.serviceId)
  }, 0)

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Histórico de Serviços</h1>
          
          {appointments.length > 0 && (
            <Card className="mb-4">
              <Card.Body>
                <Row className="text-center">
                  <Col md={4}>
                    <h4>{appointments.length}</h4>
                    <p className="text-muted">Serviços realizados</p>
                  </Col>
                  <Col md={4}>
                    <h4>R$ {totalSpent.toFixed(2)}</h4>
                    <p className="text-muted">Total gasto</p>
                  </Col>
                  <Col md={4}>
                    <h4>R$ {(totalSpent / appointments.length).toFixed(2)}</h4>
                    <p className="text-muted">Ticket médio</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
          
          {appointments.length === 0 ? (
            <Alert variant="info">
              Você ainda não possui histórico de serviços realizados.
            </Alert>
          ) : (
            <Row>
              {appointments.map(appointment => (
                <Col md={6} lg={4} key={appointment.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="mb-0">
                          {getServiceName(appointment.serviceId)}
                        </Card.Title>
                        <Badge bg="success">Concluído</Badge>
                      </div>
                      
                      <Card.Text>
                        <strong>Profissional:</strong> {getProfessionalName(appointment.professionalId)}<br/>
                        <strong>Data:</strong> {formatDate(appointment.date)}<br/>
                        <strong>Horário:</strong> {appointment.time}<br/>
                        <strong>Valor:</strong> R$ {getServicePrice(appointment.serviceId).toFixed(2)}
                      </Card.Text>
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

export default History