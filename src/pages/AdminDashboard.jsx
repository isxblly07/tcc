import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'


import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    totalServices: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersRes, appointmentsRes, servicesRes] = await Promise.all([
        api.get('/users'),
        api.get('/appointments'),
        api.get('/services')
      ])

      const users = usersRes.data.filter(u => u.role === 'client')
      const appointments = appointmentsRes.data
      const services = servicesRes.data

      const revenue = appointments
        .filter(apt => apt.status === 'completed')
        .reduce((total, apt) => {
          const service = services.find(s => s.id === apt.serviceId)
          return total + (service ? service.price : 0)
        }, 0)

      setStats({
        totalUsers: users.length,
        totalAppointments: appointments.length,
        totalRevenue: revenue,
        totalServices: services.length
      })
    } catch (error) {
      alert('Erro ao carregar estatísticas')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const statCards = [
    {
      title: 'Total de Clientes',
      value: stats.totalUsers,
      icon: '👥',
      color: 'primary'
    },
    {
      title: 'Agendamentos',
      value: stats.totalAppointments,
      icon: '📅',
      color: 'success'
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: '💰',
      color: 'warning'
    },
    {
      title: 'Serviços Ativos',
      value: stats.totalServices,
      icon: '✂️',
      color: 'info'
    }
  ]

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1>Painel Administrativo</h1>
          <p className="text-muted">Visão geral do sistema</p>
        </Col>
      </Row>

      <Row>
        {statCards.map((stat, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className={`text-${stat.color} mb-3`} style={{fontSize: '40px'}}>
                  {stat.icon}
                </div>
                <h3 className="mb-1">{stat.value}</h3>
                <p className="text-muted mb-0">{stat.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h5>Ações Rápidas</h5>
              <p className="text-muted">
                Use o menu de navegação para acessar as funcionalidades administrativas:
              </p>
              <ul>
                <li>Gerenciar agendamentos</li>
                <li>Visualizar relatórios</li>
                <li>Configurar serviços</li>
                <li>Gerenciar usuários</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard