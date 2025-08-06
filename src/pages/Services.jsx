import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import api from '../services/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services)
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory))
    }
  }, [services, selectedCategory])

  const fetchServices = async () => {
    try {
      const response = await api.get('/services')
      setServices(response.data)
    } catch (error) {
      alert('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'Cabeleireiro', 'Unhas', 'Maquiagem']

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">Nossos Serviços</h1>
          
          <Form.Select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mb-4"
            style={{ maxWidth: '300px', margin: '0 auto' }}
          >
            <option value="all">Todas as categorias</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredServices.map(service => (
          <Col md={6} lg={4} key={service.id} className="mb-4">
            <Card className="h-100 service-card">
              <Card.Img 
                variant="top" 
                src={service.image} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{service.name}</Card.Title>
                <Card.Text className="text-muted small">{service.category}</Card.Text>
                <Card.Text className="flex-grow-1">{service.description}</Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 text-primary mb-0">R$ {service.price.toFixed(2)}</span>
                    <small className="text-muted">{service.duration} min</small>
                  </div>
                  <Button 
                    as={Link} 
                    to={`/booking/${service.id}`} 
                    variant="primary" 
                    className="w-100"
                  >
                    Agendar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredServices.length === 0 && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">Nenhum serviço encontrado para esta categoria.</p>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Services