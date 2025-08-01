import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap'
import { FaChartBar, FaDownload, FaCalendarAlt, FaDollarSign, FaUsers, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { appointmentService } from '../services/appointmentService'
import { serviceService } from '../services/serviceService'
import { formatDate, formatCurrency, getStatusColor } from '../utils/helpers'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Reports = () => {
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [reportType, setReportType] = useState('general')

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
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar relatórios')
    } finally {
      setLoading(false)
    }
  }

  const getFilteredAppointments = () => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date)
      const start = new Date(dateRange.startDate)
      const end = new Date(dateRange.endDate)
      return aptDate >= start && aptDate <= end
    })
  }

  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId)
  }

  const calculateStats = () => {
    const filtered = getFilteredAppointments()
    
    const stats = {
      total: filtered.length,
      confirmed: filtered.filter(a => a.status === 'confirmed').length,
      completed: filtered.filter(a => a.status === 'completed').length,
      cancelled: filtered.filter(a => a.status === 'cancelled').length,
      pending: filtered.filter(a => a.status === 'pending').length,
      revenue: filtered
        .filter(a => a.status === 'completed')
        .reduce((sum, apt) => {
          const service = getServiceById(apt.serviceId)
          return sum + (service?.price || 0)
        }, 0)
    }
    
    return stats
  }

  const getServiceStats = () => {
    const filtered = getFilteredAppointments()
    const serviceStats = {}
    
    filtered.forEach(apt => {
      const service = getServiceById(apt.serviceId)
      if (service) {
        if (!serviceStats[service.id]) {
          serviceStats[service.id] = {
            name: service.name,
            count: 0,
            revenue: 0,
            category: service.category
          }
        }
        serviceStats[service.id].count++
        if (apt.status === 'completed') {
          serviceStats[service.id].revenue += service.price
        }
      }
    })
    
    return Object.values(serviceStats).sort((a, b) => b.count - a.count)
  }

  const exportToCSV = () => {
    const filtered = getFilteredAppointments()
    const csvData = filtered.map(appointment => {
      const service = getServiceById(appointment.serviceId)
      return {
        ID: appointment.id,
        Data: formatDate(appointment.date),
        Horário: appointment.time,
        Serviço: service?.name || '',
        Categoria: service?.category || '',
        Status: appointment.status,
        Valor: service?.price || 0
      }
    })

    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${dateRange.startDate}_${dateRange.endDate}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast.success('Relatório exportado com sucesso!')
  }

  const stats = calculateStats()
  const serviceStats = getServiceStats()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>
              <FaChartBar className="me-2" />
              Relatórios
            </h1>
            <Button variant="success" onClick={exportToCSV}>
              <FaDownload className="me-1" />
              Exportar CSV
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Data Inicial</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Data Final</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Tipo de Relatório</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="general">Geral</option>
                  <option value="services">Por Serviços</option>
                  <option value="financial">Financeiro</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button variant="primary" className="w-100">
                Atualizar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Cards de Estatísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaCalendarAlt className="text-primary mb-2" size={30} />
              <h3 className="text-primary">{stats.total}</h3>
              <p className="mb-0">Total de Agendamentos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaUsers className="text-success mb-2" size={30} />
              <h3 className="text-success">{stats.completed}</h3>
              <p className="mb-0">Concluídos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaClock className="text-warning mb-2" size={30} />
              <h3 className="text-warning">{stats.pending}</h3>
              <p className="mb-0">Pendentes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaDollarSign className="text-info mb-2" size={30} />
              <h3 className="text-info">{formatCurrency(stats.revenue)}</h3>
              <p className="mb-0">Receita</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Relatório por Serviços */}
      {reportType === 'services' && (
        <Card className="mb-4">
          <Card.Header>
            <h5>Relatório por Serviços</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Categoria</th>
                  <th>Quantidade</th>
                  <th>Receita</th>
                  <th>Ticket Médio</th>
                </tr>
              </thead>
              <tbody>
                {serviceStats.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>
                      <Badge bg="secondary">{service.category}</Badge>
                    </td>
                    <td>{service.count}</td>
                    <td>{formatCurrency(service.revenue)}</td>
                    <td>{formatCurrency(service.revenue / service.count || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Relatório Geral */}
      {reportType === 'general' && (
        <Card>
          <Card.Header>
            <h5>Agendamentos no Período</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Serviço</th>
                  <th>Status</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredAppointments().map(appointment => {
                  const service = getServiceById(appointment.serviceId)
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{formatDate(appointment.date)}</td>
                      <td>{appointment.time}</td>
                      <td>{service?.name}</td>
                      <td>
                        <Badge bg={getStatusColor(appointment.status)}>
                          {appointment.status === 'confirmed' && 'Confirmado'}
                          {appointment.status === 'pending' && 'Pendente'}
                          {appointment.status === 'cancelled' && 'Cancelado'}
                          {appointment.status === 'completed' && 'Concluído'}
                        </Badge>
                      </td>
                      <td>{formatCurrency(service?.price || 0)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Relatório Financeiro */}
      {reportType === 'financial' && (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h5>Resumo Financeiro</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Receita Total:</span>
                  <strong>{formatCurrency(stats.revenue)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Serviços Concluídos:</span>
                  <span>{stats.completed}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Ticket Médio:</span>
                  <span>{formatCurrency(stats.revenue / stats.completed || 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Taxa de Conversão:</span>
                  <span>{((stats.completed / stats.total) * 100 || 0).toFixed(1)}%</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h5>Status dos Agendamentos</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Concluídos:</span>
                  <Badge bg="success">{stats.completed}</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Confirmados:</span>
                  <Badge bg="primary">{stats.confirmed}</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Pendentes:</span>
                  <Badge bg="warning">{stats.pending}</Badge>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Cancelados:</span>
                  <Badge bg="danger">{stats.cancelled}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Reports