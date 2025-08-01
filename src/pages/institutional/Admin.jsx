import React, { useState } from 'react'
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap'
import { FaUsers, FaCalendarAlt, FaDollarSign, FaChartLine, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      icon: <FaUsers className="text-primary" size={30} />,
      title: 'Total de Clientes',
      value: '1,234',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: <FaCalendarAlt className="text-success" size={30} />,
      title: 'Agendamentos Hoje',
      value: '45',
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: <FaDollarSign className="text-warning" size={30} />,
      title: 'Receita Mensal',
      value: 'R$ 25,680',
      change: '+15%',
      changeType: 'positive'
    },
    {
      icon: <FaChartLine className="text-info" size={30} />,
      title: 'Taxa de Ocupação',
      value: '87%',
      change: '+3%',
      changeType: 'positive'
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      client: 'Maria Silva',
      service: 'Corte Feminino',
      professional: 'Ana Costa',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmado',
      value: 'R$ 45,00'
    },
    {
      id: 2,
      client: 'João Santos',
      service: 'Corte Masculino',
      professional: 'Carlos Lima',
      date: '2024-01-15',
      time: '15:00',
      status: 'pendente',
      value: 'R$ 35,00'
    },
    {
      id: 3,
      client: 'Ana Oliveira',
      service: 'Manicure',
      professional: 'Julia Mendes',
      date: '2024-01-15',
      time: '15:30',
      status: 'concluido',
      value: 'R$ 25,00'
    },
    {
      id: 4,
      client: 'Pedro Costa',
      service: 'Coloração',
      professional: 'Ana Costa',
      date: '2024-01-15',
      time: '16:00',
      status: 'cancelado',
      value: 'R$ 80,00'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmado: 'success',
      pendente: 'warning',
      concluido: 'primary',
      cancelado: 'danger'
    };
    return <Badge bg={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const filteredAppointments = recentAppointments.filter(appointment =>
    appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Painel Administrativo</h1>
                <p className="hero-subtitle">
                  Gerencie seu salão de forma eficiente com ferramentas avançadas de controle
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/app/admin" className="btn-primary-custom me-3">
                    Acessar Painel
                  </Button>
                  <Button as={Link} to="/sobre" variant="outline-primary">
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Painel administrativo" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Cards */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Estatísticas do Salão</h2>
              <p className="section-subtitle">Acompanhe o desempenho em tempo real</p>
            </Col>
          </Row>
          <Row className="mb-5">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="service-icon" style={{width: '60px', height: '60px'}}>
                      {stat.icon}
                    </div>
                    <span className="badge" style={{
                      background: stat.changeType === 'positive' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #fd7e14)',
                      color: 'white',
                      border: 'none'
                    }}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 style={{color: '#6b5b95'}} className="fw-bold mb-1">{stat.value}</h3>
                  <p className="mb-0">{stat.title}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Recent Appointments */}
          <Row>
            <Col>
              <div className="service-preview-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0" style={{color: '#6b5b95'}}>Agendamentos Recentes</h4>
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{color: '#8a7ca8'}} />
                      <Form.Control
                        type="text"
                        placeholder="Buscar agendamentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ps-5"
                        style={{ 
                          width: '250px',
                          border: '1px solid #b19cd9',
                          borderRadius: '25px'
                        }}
                      />
                    </div>
                    <Button className="btn-primary-custom" size="sm">
                      Novo Agendamento
                    </Button>
                  </div>
                </div>
                <div style={{overflowX: 'auto'}}>
                  <Table responsive hover className="mb-0">
                    <thead style={{background: 'rgba(177, 156, 217, 0.1)'}}>
                      <tr>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Cliente</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Serviço</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Profissional</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Data/Hora</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Status</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Valor</th>
                        <th className="border-0 p-3" style={{color: '#6b5b95'}}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td className="p-3">
                            <div className="fw-bold">{appointment.client}</div>
                          </td>
                          <td className="p-3">{appointment.service}</td>
                          <td className="p-3">{appointment.professional}</td>
                          <td className="p-3">
                            <div>{new Date(appointment.date).toLocaleDateString('pt-BR')}</div>
                            <small className="text-muted">{appointment.time}</small>
                          </td>
                          <td className="p-3">
                            {getStatusBadge(appointment.status)}
                          </td>
                          <td className="p-3 fw-bold">{appointment.value}</td>
                          <td className="p-3">
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                style={{
                                  borderColor: '#b19cd9',
                                  color: '#6b5b95'
                                }}
                              >
                                Editar
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                Cancelar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Actions */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Ações Rápidas</h2>
              <p className="section-subtitle">Acesse rapidamente as principais funcionalidades</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaUsers />
                </div>
                <h6>Gerenciar Clientes</h6>
                <p>Visualize e edite informações dos clientes</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaCalendarAlt />
                </div>
                <h6>Ver Agenda</h6>
                <p>Acompanhe todos os agendamentos</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaChartLine />
                </div>
                <h6>Relatórios</h6>
                <p>Análises detalhadas do negócio</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaDollarSign />
                </div>
                <h6>Financeiro</h6>
                <p>Controle de receitas e despesas</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="cta-title">Pronto para otimizar seu salão?</h3>
              <p className="cta-subtitle">Acesse o painel completo e gerencie tudo em um só lugar</p>
              <Button as={Link} to="/app/admin" size="lg" className="btn-primary-custom">
                Acessar Painel Completo
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Admin;