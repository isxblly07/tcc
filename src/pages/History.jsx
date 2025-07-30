import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../context/AuthContext'
import { formatDate, formatTime, formatCurrency, getStatusColor, getStatusText } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const History = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appointmentsData, servicesData] = await Promise.all([
        appointmentService.getUserAppointments(user.id),
        serviceService.getServices()
      ])
      
      // Filtrar apenas agendamentos concluídos ou cancelados
      const historyAppointments = appointmentsData.filter(
        appointment => appointment.status === 'completed' || appointment.status === 'cancelled'
      )
      
      setAppointments(historyAppointments)
      setServices(servicesData)
    } catch (error) {
      toast.error('Erro ao carregar histórico')
    } finally {
      setLoading(false)
    }
  }

  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId)
  }

  const handleRepeatBooking = (serviceId) => {
    // Redirecionar para a página de agendamento do serviço
    window.location.href = `/booking/${serviceId}`
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Histórico de Serviços</h1>
          <p className="text-muted">Seus agendamentos anteriores</p>
        </Col>
      </Row>

      <Row>
        {appointments.length > 0 ? (
          appointments.map(appointment => {
            const service = getServiceById(appointment.serviceId)
            return (
              <Col md={6} lg={4} key={appointment.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5>{service?.name}</h5>
                      <Badge bg={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-muted mb-2">{service?.category}</p>
                    
                    <div className="mb-3">
                      <strong>Data:</strong> {formatDate(appointment.date)}<br />
                      <strong>Horário:</strong> {formatTime(appointment.time)}<br />
                      <strong>Valor:</strong> {formatCurrency(service?.price || 0)}
                    </div>

                    {appointment.status === 'completed' && (
                      <div className="d-grid gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRepeatBooking(service.id)}
                        >
                          Agendar Novamente
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          as={Link}
                          to={`/review/${appointment.id}`}
                        >
                          Avaliar Serviço
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        ) : (
          <Col>
            <div className="text-center py-5">
              <h4>Nenhum histórico encontrado</h4>
              <p className="text-muted">Você ainda não possui serviços concluídos</p>
              <Button as={Link} to="/services" variant="primary">
                Agendar Primeiro Serviço
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default History