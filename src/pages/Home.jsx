import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaCut, FaPalette, FaHandPaper, FaEye } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Agende seu horário no salão</h1>
                <p className="hero-subtitle">
                  Transforme seu visual com nossos profissionais especializados
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/services" className="btn-primary-custom me-3">
                    Agendar Agora
                  </Button>
                  <Button as={Link} to="/services" variant="outline-primary">
                    Ver Serviços
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Salão de beleza" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Preview */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Nossos Serviços</h2>
              <p className="section-subtitle">Beleza completa em um só lugar</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaCut />
                </div>
                <h5>Cabelo</h5>
                <p>Cortes, coloração e tratamentos</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaHandPaper />
                </div>
                <h5>Manicure</h5>
                <p>Unhas perfeitas e nail art</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaPalette />
                </div>
                <h5>Maquiagem</h5>
                <p>Para todas as ocasiões</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <FaEye />
                </div>
                <h5>Cuidados</h5>
                <p>Tratamentos especializados</p>
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
              <h3 className="cta-title">Pronta para uma transformação?</h3>
              <p className="cta-subtitle">Agende seu horário e deixe-se surpreender</p>
              <Button as={Link} to="/services" size="lg" className="btn-primary-custom">
                Agendar Agora
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home