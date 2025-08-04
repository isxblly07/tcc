import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaCreditCard, FaCalendarAlt, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../context/AuthContext'
import { formatDate, formatTime, formatCurrency, getStatusColor, getStatusText } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Appointments = () => {
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
      
      setAppointments(appointmentsData)
      setServices(servicesData)
    } catch (error) {
      toast.error('Erro ao carregar agendamentos')
    } finally {
      setLoading(false)
    }
  }

  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId)
  }

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await appointmentService.updateAppointment(appointmentId, { status: 'cancelled' })
        toast.success('Agendamento cancelado com sucesso!')
        loadData()
      } catch (error) {
        toast.error('Erro ao cancelar agendamento')
      }
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Meus Agendamentos</h1>
          <p className="text-muted">Gerencie seus agendamentos</p>
        </Col>
      </Row>

      <Row>
        {appointments.length > 0 ? (
          appointments.map(appointment => {
            const service = getServiceById(appointment.serviceId)
            return (
              <Col md={6} lg={4} key={appointment.id} className="mb-4">
                <Card className="appointment-card">
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

                    <div className="d-flex gap-2">
                      {appointment.status === 'pending' && !appointment.paymentStatus && (
                        <Button
                          as={Link}
                          to={`/app/payment/${appointment.id}`}
                          variant="success"
                          size="sm"
                          className="flex-fill"
                        >
                          <FaCreditCard className="me-1" />
                          Pagar
                        </Button>
                      )}
                      
                      {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                        <Button
                          as={Link}
                          to={`/app/reschedule/${appointment.id}`}
                          variant="outline-primary"
                          size="sm"
                          className="flex-fill"
                        >
                          <FaCalendarAlt className="me-1" />
                          Reagendar
                        </Button>
                      )}
                      
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <FaTimes />
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        ) : (
          <Col>
            <div className="text-center py-5">
              <h4>Nenhum agendamento encontrado</h4>
              <p className="text-muted">Você ainda não possui agendamentos</p>
              <Button href="/services" variant="primary">
                Agendar Serviço
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default Appointments