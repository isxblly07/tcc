import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hair = () => {
  const trends = [
    {
      title: "Cortes em Camadas 2024",
      description: "O corte em camadas volta com força total, trazendo movimento e leveza aos fios",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
      tag: "Tendência"
    },
    {
      title: "Coloração Balayage",
      description: "Técnica francesa que cria reflexos naturais e iluminados",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop",
      tag: "Popular"
    },
    {
      title: "Tratamentos Capilares",
      description: "Cronograma capilar personalizado para cada tipo de cabelo",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      tag: "Cuidados"
    }
  ]

  const services = [
    { name: "Corte Feminino", price: "R$ 45", duration: "45min" },
    { name: "Corte Masculino", price: "R$ 35", duration: "30min" },
    { name: "Coloração", price: "R$ 80", duration: "2h" },
    { name: "Mechas", price: "R$ 120", duration: "3h" },
    { name: "Escova", price: "R$ 25", duration: "30min" },
    { name: "Hidratação", price: "R$ 40", duration: "1h" }
  ]

  const tips = [
    "Corte o cabelo a cada 6-8 semanas para manter a forma",
    "Use protetor térmico antes de usar ferramentas de calor",
    "Faça hidratação semanal para cabelos ressecados",
    "Evite água muito quente que resseca os fios"
  ]

  return (
    <div className="home-container">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Cabelo & Estilo</h1>
                <p className="hero-subtitle">
                  Descubra as últimas tendências, dicas de cuidados e transforme seu visual com nossos especialistas
                </p>
                <div className="hero-buttons">
                  <Link to="/app" className="btn btn-primary-custom me-3">
                    Agendar Corte
                  </Link>
                  <Link to="/servicos" className="btn btn-outline-primary">
                    Ver Serviços
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cabeleireiro" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Tendências 2024</h2>
              <p className="section-subtitle">O que está em alta no mundo capilar</p>
            </Col>
          </Row>
          <Row>
            {trends.map((trend, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <img 
                    src={trend.image} 
                    alt={trend.title}
                    className="img-fluid rounded-3 mb-3"
                    style={{height: '200px', width: '100%', objectFit: 'cover'}}
                  />
                  <Badge className="mb-2" style={{background: 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)'}}>
                    {trend.tag}
                  </Badge>
                  <h5>{trend.title}</h5>
                  <p>{trend.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Nossos Serviços</h2>
              <p className="section-subtitle">Preços e duração dos tratamentos capilares</p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col md={4} key={index} className="mb-3">
                <div className="service-preview-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{service.name}</h6>
                      <small style={{color: '#8a7ca8'}}>{service.duration}</small>
                    </div>
                    <strong style={{color: '#6b5b95'}}>{service.price}</strong>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Dicas de Cuidados</h2>
              <p className="section-subtitle">Mantenha seus cabelos sempre saudáveis</p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              {tips.map((tip, index) => (
                <div key={index} className="service-preview-card mb-3">
                  <div className="d-flex align-items-center">
                    <div className="service-icon me-3" style={{width: '40px', height: '40px', fontSize: '1rem'}}>
                      {index + 1}
                    </div>
                    <p className="mb-0">{tip}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="cta-title">Pronta para uma transformação?</h3>
              <p className="cta-subtitle">Agende seu horário com nossos especialistas em cabelo</p>
              <Link to="/app" className="btn btn-primary-custom btn-lg">
                Agendar Agora
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Hair