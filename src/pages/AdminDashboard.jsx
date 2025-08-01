import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { formatDate, formatTime, formatCurrency, getStatusColor, getStatusText } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appointmentsData, servicesData] = await Promise.all([
        appointmentService.getAllAppointments(),
        serviceService.getServices()
      ])
      
      setAppointments(appointmentsData)
      setServices(servicesData)
      calculateStats(appointmentsData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error(`Erro ao carregar dados: ${error.message || 'Verifique se o servidor está rodando'}`)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (appointmentsData) => {
    const stats = {
      total: appointmentsData.length,
      confirmed: appointmentsData.filter(a => a.status === 'confirmed').length,
      pending: appointmentsData.filter(a => a.status === 'pending').length,
      cancelled: appointmentsData.filter(a => a.status === 'cancelled').length
    }
    setStats(stats)
  }

  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId)
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateAppointment(appointmentId, { status: newStatus })
      toast.success('Status atualizado com sucesso!')
      loadData()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error(`Erro ao atualizar status: ${error.message || 'Tente novamente'}`)
    }
  }

  const exportToCSV = () => {
    const csvData = appointments.map(appointment => {
      const service = getServiceById(appointment.serviceId)
      return {
        ID: appointment.id,
        Serviço: service?.name || '',
        Data: formatDate(appointment.date),
        Horário: formatTime(appointment.time),
        Status: getStatusText(appointment.status),
        Valor: service?.price || 0
      }
    })

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'agendamentos.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Painel Administrativo</h1>
            <Button variant="success" onClick={exportToCSV}>
              Exportar CSV
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{stats.total}</h3>
              <p>Total de Agendamentos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{stats.confirmed}</h3>
              <p>Confirmados</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{stats.pending}</h3>
              <p>Pendentes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-danger">{stats.cancelled}</h3>
              <p>Cancelados</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Agendamentos Recentes</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Serviço</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Valor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => {
                    const service = getServiceById(appointment.serviceId)
                    return (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{service?.name}</td>
                        <td>{formatDate(appointment.date)}</td>
                        <td>{formatTime(appointment.time)}</td>
                        <td>
                          <Badge bg={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </td>
                        <td>{formatCurrency(service?.price || 0)}</td>
                        <td>
                          {appointment.status === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => handleStatusChange(appointment.id, 'completed')}
                              className="me-1"
                            >
                              Concluir
                            </Button>
                          )}
                          {appointment.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            >
                              Cancelar
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard