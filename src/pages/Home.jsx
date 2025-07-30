import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaCut, FaWrench, FaUtensils, FaPalette } from 'react-icons/fa'

const Home = () => {
  const categories = [
    { name: 'Barbearia', icon: <FaCut />, color: 'primary' },
    { name: 'Cabeleireiro', icon: <FaPalette />, color: 'info' },
    { name: 'Buffet', icon: <FaUtensils />, color: 'success' },
    { name: 'Oficina Mecânica', icon: <FaWrench />, color: 'danger' }
  ]

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">Bem-vindo ao TimeRight</h1>
          <p className="lead">
            Agende seus serviços favoritos de forma rápida e prática
          </p>
          <Button as={Link} to="/services" variant="primary" size="lg">
            Ver Serviços
          </Button>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Categorias de Serviços</h2>
        </Col>
      </Row>

      <Row>
        {categories.map((category, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <div className={`text-${category.color} mb-3`} style={{ fontSize: '3rem' }}>
                  {category.icon}
                </div>
                <Card.Title>{category.name}</Card.Title>
                <Button 
                  as={Link} 
                  to={`/services?category=${category.name}`}
                  variant={category.color}
                  size="sm"
                >
                  Ver Serviços
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5 text-center">
        <Col>
          <h3>Por que escolher o TimeRight?</h3>
          <Row className="mt-4">
            <Col md={4}>
              <h5>Fácil de usar</h5>
              <p>Interface intuitiva e responsiva</p>
            </Col>
            <Col md={4}>
              <h5>Seguro</h5>
              <p>Seus dados protegidos</p>
            </Col>
            <Col md={4}>
              <h5>Rápido</h5>
              <p>Agendamento em poucos cliques</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home