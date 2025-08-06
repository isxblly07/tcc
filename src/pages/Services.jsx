import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/services')
        setServices(response.data)
      } catch (error) {
        console.error('Erro ao carregar serviços:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      if (remainingMinutes === 0) {
        return `${hours}h`
      }
      return `${hours}h ${remainingMinutes}min`
    }
    return `${minutes} minutos`
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Cabelo': return '💇♀️'
      case 'Unhas': return '💅'
      case 'Estética': return '✨'
      default: return '💄'
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-5 mb-3">💇♀️ Nossos Serviços</h1>
          <p className="lead text-muted">
            Descubra nossa gama completa de serviços de beleza e bem-estar
          </p>
        </Col>
      </Row>

      <Row>
        {services.map(service => (
          <Col md={6} lg={4} key={service.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={service.image} 
                  style={{ 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {getCategoryIcon(service.category)} {service.category}
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="h5 mb-3" style={{ color: '#2c3e50' }}>
                  {service.name}
                </Card.Title>
                
                <Card.Text className="flex-grow-1 text-muted mb-3" style={{ lineHeight: '1.6' }}>
                  {service.description}
                </Card.Text>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold" style={{ fontSize: '18px', color: '#27ae60' }}>
                      R$ {service.price.toFixed(2)}
                    </span>
                    <Badge 
                      bg="light" 
                      text="dark" 
                      style={{ 
                        fontSize: '12px',
                        padding: '6px 10px',
                        borderRadius: '15px'
                      }}
                    >
                      ⏱️ {formatDuration(service.duration)}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  as={Link} 
                  to={`/booking/${service.id}`} 
                  variant="primary"
                  size="lg"
                  className="mt-auto"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 24px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  ✨ Agendar Agora
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <div className="p-4" style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '20px',
            color: 'white'
          }}>
            <h4 className="mb-3">💎 Por que escolher o TimeRight?</h4>
            <Row>
              <Col md={4} className="mb-3">
                <h6>🏆 Profissionais Qualificados</h6>
                <small>Equipe experiente e certificada</small>
              </Col>
              <Col md={4} className="mb-3">
                <h6>⭐ Produtos Premium</h6>
                <small>Marcas reconhecidas mundialmente</small>
              </Col>
              <Col md={4} className="mb-3">
                <h6>📱 Agendamento Fácil</h6>
                <small>Sistema online prático e rápido</small>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Services