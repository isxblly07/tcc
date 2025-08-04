import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table } from 'react-bootstrap'
import { FaCalendarAlt, FaUsers, FaDollarSign, FaCog } from 'react-icons/fa'
import api from '../../services/api'
import SidebarAdmin from '../../components/admin/SidebarAdmin'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsRes, appointmentsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/appointments')
      ])
      
      setStats(statsRes.data)
      setRecentAppointments(appointmentsRes.data.slice(0, 5))
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card className="h-100">
      <Card.Body className="d-flex align-items-center">
        <div className={`rounded-circle p-3 me-3 bg-${color} text-white`}>
          <Icon size={24} />
        </div>
        <div>
          <h6 className="text-muted mb-0">{title}</h6>
          <h4 className="mb-0">{value}</h4>
        </div>
      </Card.Body>
    </Card>
  )

  if (loading) return <div>Carregando...</div>

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <SidebarAdmin />
        </Col>
        <Col md={9}>
          <h2 className="mb-4">Dashboard</h2>
          
          <Row className="mb-4">
            <Col md={3}>
              <StatCard
                icon={FaCalendarAlt}
                title="Total Agendamentos"
                value={stats.totalAppointments || 0}
                color="primary"
              />
            </Col>
            <Col md={3}>
              <StatCard
                icon={FaUsers}
                title="Total Usuários"
                value={stats.totalUsers || 0}
                color="success"
              />
            </Col>
            <Col md={3}>
              <StatCard
                icon={FaDollarSign}
                title="Receita Total"
                value={`R$ ${(stats.totalRevenue || 0).toFixed(2)}`}
                color="warning"
              />
            </Col>
            <Col md={3}>
              <StatCard
                icon={FaCog}
                title="Serviços Ativos"
                value={stats.activeServices || 0}
                color="info"
              />
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5>Agendamentos Recentes</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.user_name}</td>
                      <td>{appointment.service_name}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <span className={`badge bg-${
                          appointment.status === 'confirmed' ? 'success' :
                          appointment.status === 'pending' ? 'warning' : 'secondary'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard