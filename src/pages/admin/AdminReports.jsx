import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { FaChartBar, FaDownload, FaCalendar, FaDollarSign } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/Layout/AdminNavbar'

const AdminReports = () => {
  const [reportData, setReportData] = useState({
    dailyAppointments: [],
    monthlyRevenue: [],
    topServices: [],
    customerStats: []
  })

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      const [appointmentsRes, servicesRes, usersRes] = await Promise.all([
        fetch('http://localhost:3001/appointments'),
        fetch('http://localhost:3001/services'),
        fetch('http://localhost:3001/users')
      ])

      const appointments = await appointmentsRes.json()
      const services = await servicesRes.json()
      const users = await usersRes.json()

      // Processar dados para relatórios
      const dailyAppointments = processDaily(appointments)
      const monthlyRevenue = processMonthly(appointments, services)
      const topServices = processTopServices(appointments, services)
      const customerStats = processCustomerStats(users)

      setReportData({
        dailyAppointments,
        monthlyRevenue,
        topServices,
        customerStats
      })
    } catch (error) {
      toast.error('Erro ao carregar relatórios')
    }
  }

  const processDaily = (appointments) => {
    const daily = {}
    appointments.forEach(apt => {
      const date = apt.date
      daily[date] = (daily[date] || 0) + 1
    })
    return Object.entries(daily).map(([date, count]) => ({ date, count }))
  }

  const processMonthly = (appointments, services) => {
    const monthly = {}
    appointments.forEach(apt => {
      const month = apt.date.substring(0, 7) // YYYY-MM
      const service = services.find(s => s.id === apt.serviceId)
      const revenue = service ? service.price : 0
      monthly[month] = (monthly[month] || 0) + revenue
    })
    return Object.entries(monthly).map(([month, revenue]) => ({ month, revenue }))
  }

  const processTopServices = (appointments, services) => {
    const serviceCount = {}
    appointments.forEach(apt => {
      serviceCount[apt.serviceId] = (serviceCount[apt.serviceId] || 0) + 1
    })
    
    return Object.entries(serviceCount)
      .map(([serviceId, count]) => {
        const service = services.find(s => s.id === parseInt(serviceId))
        return {
          name: service ? service.name : 'Serviço não encontrado',
          count,
          revenue: service ? service.price * count : 0
        }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  const processCustomerStats = (users) => {
    const clients = users.filter(u => u.role === 'client')
    const admins = users.filter(u => u.role === 'admin')
    
    return {
      totalClients: clients.length,
      totalAdmins: admins.length,
      newThisMonth: Math.floor(clients.length * 0.2) // Simulado
    }
  }

  const exportToCSV = (data, filename) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    toast.success('Relatório exportado!')
  }

  return (
    <>
      <AdminNavbar />
      <Container fluid className="py-4">
        <h2 className="mb-4">
          <FaChartBar className="me-2" />
          Relatórios e Estatísticas
        </h2>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaCalendar size={30} className="text-primary mb-2" />
              <h4>{reportData.dailyAppointments.reduce((sum, day) => sum + day.count, 0)}</h4>
              <p className="text-muted">Total de Agendamentos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaDollarSign size={30} className="text-success mb-2" />
              <h4>R$ {reportData.monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0).toFixed(2)}</h4>
              <p className="text-muted">Receita Total</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartBar size={30} className="text-info mb-2" />
              <h4>{reportData.customerStats.totalClients}</h4>
              <p className="text-muted">Total de Clientes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaCalendar size={30} className="text-warning mb-2" />
              <h4>{reportData.customerStats.newThisMonth}</h4>
              <p className="text-muted">Novos Clientes (Mês)</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Services */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Serviços Mais Populares</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => exportToCSV(reportData.topServices, 'top-services.csv')}
              >
                <FaDownload className="me-1" />
                Exportar
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Serviço</th>
                    <th>Agendamentos</th>
                    <th>Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topServices.map((service, index) => (
                    <tr key={index}>
                      <td>{service.name}</td>
                      <td>{service.count}</td>
                      <td>R$ {service.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Daily Appointments */}
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Agendamentos por Dia</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => exportToCSV(reportData.dailyAppointments, 'daily-appointments.csv')}
              >
                <FaDownload className="me-1" />
                Exportar
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Agendamentos</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.dailyAppointments.slice(0, 10).map((day, index) => (
                    <tr key={index}>
                      <td>{new Date(day.date).toLocaleDateString('pt-BR')}</td>
                      <td>{day.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Monthly Revenue */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Receita Mensal</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => exportToCSV(reportData.monthlyRevenue, 'monthly-revenue.csv')}
              >
                <FaDownload className="me-1" />
                Exportar
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.monthlyRevenue.map((month, index) => (
                    <tr key={index}>
                      <td>{month.month}</td>
                      <td>R$ {month.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </>
  )
}

export default AdminReports