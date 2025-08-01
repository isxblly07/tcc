import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { FaPlus, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../context/AuthContext'
import { formatDate, formatTime, formatCurrency, getStatusColor } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import 'react-calendar/dist/Calendar.css'

const Agenda = () => {
  const { user, isAdmin } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appointmentsData, servicesData, professionalsData] = await Promise.all([
        isAdmin ? appointmentService.getAllAppointments() : appointmentService.getUserAppointments(user.id),
        serviceService.getServices(),
        serviceService.getProfessionals()
      ])
      
      setAppointments(appointmentsData)
      setServices(servicesData)
      setProfessionals(professionalsData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar agenda')
    } finally {
      setLoading(false)
    }
  }

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === dateStr)
  }

  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId)
  }

  const getProfessionalById = (professionalId) => {
    return professionals.find(prof => prof.id === professionalId)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setShowModal(true)
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateAppointment(appointmentId, { status: newStatus })
      toast.success('Status atualizado com sucesso!')
      loadData()
      setShowModal(false)
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayAppointments = getAppointmentsForDate(date)
      if (dayAppointments.length > 0) {
        return (
          <div className="calendar-appointments">
            <small className="badge bg-primary rounded-pill">
              {dayAppointments.length}
            </small>
          </div>
        )
      }
    }
    return null
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>
            <FaCalendarAlt className="me-2" />
            Agenda
          </h1>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Calendário</h5>
            </Card.Header>
            <Card.Body>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                locale="pt-BR"
                className="w-100"
              />
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>
              <h6>Legenda</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-2">
                <div><Badge bg="success">Confirmado</Badge></div>
                <div><Badge bg="warning">Pendente</Badge></div>
                <div><Badge bg="danger">Cancelado</Badge></div>
                <div><Badge bg="info">Concluído</Badge></div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>
                Agendamentos - {formatDate(selectedDate)}
              </h5>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => window.location.href = '/booking'}
              >
                <FaPlus className="me-1" />
                Novo Agendamento
              </Button>
            </Card.Header>
            <Card.Body>
              {selectedDateAppointments.length === 0 ? (
                <Alert variant="info">
                  Nenhum agendamento para esta data.
                </Alert>
              ) : (
                <div className="agenda-appointments">
                  {selectedDateAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(appointment => {
                      const service = getServiceById(appointment.serviceId)
                      const professional = getProfessionalById(appointment.professionalId)
                      
                      return (
                        <Card 
                          key={appointment.id} 
                          className="mb-3 appointment-card"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col md={2}>
                                <div className="text-center">
                                  <FaClock className="text-primary mb-1" />
                                  <div className="fw-bold">{formatTime(appointment.time)}</div>
                                </div>
                              </Col>
                              <Col md={4}>
                                <h6 className="mb-1">{service?.name}</h6>
                                <small className="text-muted">
                                  {service?.duration} min - {formatCurrency(service?.price)}
                                </small>
                              </Col>
                              <Col md={3}>
                                <div className="d-flex align-items-center">
                                  <FaUser className="me-2 text-muted" />
                                  <span>{professional?.name}</span>
                                </div>
                              </Col>
                              <Col md={3} className="text-end">
                                <Badge bg={getStatusColor(appointment.status)}>
                                  {appointment.status === 'confirmed' && 'Confirmado'}
                                  {appointment.status === 'pending' && 'Pendente'}
                                  {appointment.status === 'cancelled' && 'Cancelado'}
                                  {appointment.status === 'completed' && 'Concluído'}
                                </Badge>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      )
                    })}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de Detalhes do Agendamento */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Serviço:</strong><br />
                  {getServiceById(selectedAppointment.serviceId)?.name}
                </Col>
                <Col md={6}>
                  <strong>Profissional:</strong><br />
                  {getProfessionalById(selectedAppointment.professionalId)?.name}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Data:</strong><br />
                  {formatDate(selectedAppointment.date)}
                </Col>
                <Col md={6}>
                  <strong>Horário:</strong><br />
                  {formatTime(selectedAppointment.time)}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Duração:</strong><br />
                  {getServiceById(selectedAppointment.serviceId)?.duration} minutos
                </Col>
                <Col md={6}>
                  <strong>Valor:</strong><br />
                  {formatCurrency(getServiceById(selectedAppointment.serviceId)?.price)}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Status:</strong><br />
                  <Badge bg={getStatusColor(selectedAppointment.status)} className="fs-6">
                    {selectedAppointment.status === 'confirmed' && 'Confirmado'}
                    {selectedAppointment.status === 'pending' && 'Pendente'}
                    {selectedAppointment.status === 'cancelled' && 'Cancelado'}
                    {selectedAppointment.status === 'completed' && 'Concluído'}
                  </Badge>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isAdmin && selectedAppointment && (
            <>
              {selectedAppointment.status === 'pending' && (
                <Button
                  variant="success"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                >
                  Confirmar
                </Button>
              )}
              {selectedAppointment.status === 'confirmed' && (
                <Button
                  variant="info"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                >
                  Concluir
                </Button>
              )}
              {selectedAppointment.status !== 'cancelled' && selectedAppointment.status !== 'completed' && (
                <Button
                  variant="danger"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                >
                  Cancelar
                </Button>
              )}
            </>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .calendar-appointments {
          position: absolute;
          top: 2px;
          right: 2px;
        }
        
        .appointment-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
        
        .react-calendar {
          border: none !important;
        }
        
        .react-calendar__tile {
          position: relative;
        }
        
        .react-calendar__tile--active {
          background: #6f42c1 !important;
          color: white !important;
        }
        
        .react-calendar__tile--now {
          background: #e9ecef !important;
        }
      `}</style>
    </Container>
  )
}

export default Agenda