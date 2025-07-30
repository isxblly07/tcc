import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { serviceService } from '../services/serviceService'
import ServiceCard from '../components/UI/ServiceCard'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchParams] = useSearchParams()

  const categories = ['Barbearia', 'Cabeleireiro', 'Buffet', 'Salões', 'Oficina Mecânica']

  useEffect(() => {
    loadServices()
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory])

  const loadServices = async () => {
    try {
      const data = await serviceService.getServices()
      setServices(data)
    } catch (error) {
      toast.error('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    if (selectedCategory) {
      setFilteredServices(services.filter(service => service.category === selectedCategory))
    } else {
      setFilteredServices(services)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Nossos Serviços</h1>
          <p className="text-muted">Escolha o serviço que deseja agendar</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'primary' : 'outline-primary'}
              onClick={() => handleCategoryChange('')}
            >
              Todos
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      <Row>
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <Col md={6} lg={4} key={service.id} className="mb-4">
              <ServiceCard service={service} />
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center py-5">
              <h4>Nenhum serviço encontrado</h4>
              <p className="text-muted">Tente selecionar uma categoria diferente</p>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default Services