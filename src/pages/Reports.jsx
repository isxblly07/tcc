import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import { toast } from 'react-toastify'
import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Reports = () => {
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [users, setUsers] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [appointmentsRes, servicesRes, usersRes, professionalsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/services'),
        api.get('/users'),
        api.get('/professionals')
      ])

      setAppointments(appointmentsRes.data)
      setServices(servicesRes.data)
      setUsers(usersRes.data)
      setProfessionals(professionalsRes.data)
    } catch (error) {
      toast.error('Erro ao carregar relatórios')
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.name : 'N/A'
  }

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : 'N/A'
  }

  const getProfessionalName = (professionalId) => {
    const professional = professionals.find(p => p.id === professionalId)
    return professional ? professional.name : 'N/A'
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

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1>Relatórios</h1>
          <p className="text-muted">Relatório detalhado de agendamentos</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Todos os Agendamentos</h5>
            </Card.Header>
            <Card.Body>
              {appointments.length === 0 ? (
                <p className="text-muted">Nenhum agendamento encontrado.</p>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Serviço</th>
                      <th>Profissional</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{getUserName(appointment.userId)}</td>
                        <td>{getServiceName(appointment.serviceId)}</td>
                        <td>{getProfessionalName(appointment.professionalId)}</td>
                        <td>{formatDate(appointment.date)}</td>
                        <td>{appointment.time}</td>
                        <td>{getStatusBadge(appointment.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Reports