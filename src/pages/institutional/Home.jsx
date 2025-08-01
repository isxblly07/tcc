import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaCut, FaPalette, FaHandPaper, FaEye, FaArrowRight } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Transforme seu visual no TimeRight</h1>
                <p className="hero-subtitle">
                  O sistema de agendamento online que conecta você aos melhores profissionais de beleza
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/app" className="btn-primary-custom me-3">
                    Agendar Agora
                  </Button>
                  <Button as={Link} to="/servicos" variant="outline-primary">
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
              <h2 className="section-title">Por que escolher o TimeRight?</h2>
              <p className="section-subtitle">Beleza e praticidade em um só lugar</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <Link to="/cabelo" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="service-preview-card">
                  <div className="service-icon">
                    <FaCut />
                  </div>
                  <h5>Cabelo</h5>
                  <p>Cortes, coloração e tratamentos capilares</p>
                </div>
              </Link>
            </Col>
            <Col md={3} className="mb-4">
              <Link to="/manicure" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="service-preview-card">
                  <div className="service-icon">
                    <FaHandPaper />
                  </div>
                  <h5>Manicure</h5>
                  <p>Unhas perfeitas e nail art criativa</p>
                </div>
              </Link>
            </Col>
            <Col md={3} className="mb-4">
              <Link to="/maquiagem" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="service-preview-card">
                  <div className="service-icon">
                    <FaPalette />
                  </div>
                  <h5>Maquiagem</h5>
                  <p>Para todas as ocasiões especiais</p>
                </div>
              </Link>
            </Col>
            <Col md={3} className="mb-4">
              <Link to="/cuidados" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="service-preview-card">
                  <div className="service-icon">
                    <FaEye />
                  </div>
                  <h5>Cuidados</h5>
                  <p>Tratamentos especializados para pele</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <h3 className="display-4 fw-bold" style={{color: '#6b5b95'}}>500+</h3>
                <p>Clientes satisfeitos</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <h3 className="display-4 fw-bold" style={{color: '#6b5b95'}}>50+</h3>
                <p>Profissionais parceiros</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <h3 className="display-4 fw-bold" style={{color: '#6b5b95'}}>24/7</h3>
                <p>Disponibilidade online</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="service-preview-card">
                <h3 className="display-4 fw-bold" style={{color: '#6b5b95'}}>98%</h3>
                <p>Taxa de satisfação</p>
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
              <p className="cta-subtitle">Junte-se a milhares de pessoas que já descobriram a praticidade do TimeRight</p>
              <Button as={Link} to="/app" size="lg" className="btn-primary-custom">
                Começar Agora
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;