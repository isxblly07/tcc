import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Makeup = () => {
  const trends = [
    {
      title: "Clean Girl Makeup",
      description: "Visual natural e fresco que valoriza a beleza natural",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      tag: "Tendência"
    },
    {
      title: "Maquiagem Colorida",
      description: "Cores vibrantes nos olhos e lábios para looks marcantes",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      tag: "Ousado"
    },
    {
      title: "Contorno Suave",
      description: "Técnicas de contorno mais naturais e iluminadas",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      tag: "Técnica"
    }
  ]

  const services = [
    { name: "Maquiagem Social", price: "R$ 60", duration: "1h" },
    { name: "Maquiagem Noiva", price: "R$ 150", duration: "2h" },
    { name: "Maquiagem Festa", price: "R$ 80", duration: "1h30" },
    { name: "Design de Sobrancelha", price: "R$ 35", duration: "30min" },
    { name: "Cílios Postiços", price: "R$ 25", duration: "20min" },
    { name: "Curso de Automaquiagem", price: "R$ 120", duration: "2h" }
  ]

  const tips = [
    "Sempre use primer antes da base para maior durabilidade",
    "Escolha tons que harmonizem com seu subtom de pele",
    "Invista em pincéis de qualidade para melhor aplicação",
    "Remova toda maquiagem antes de dormir para cuidar da pele"
  ]

  const occasions = [
    {
      name: "Casamento",
      description: "Maquiagem duradoura e fotogênica",
      style: "Clássica e elegante"
    },
    {
      name: "Formatura",
      description: "Look sofisticado para momentos especiais",
      style: "Glamourosa"
    },
    {
      name: "Trabalho",
      description: "Visual profissional e discreto",
      style: "Natural"
    },
    {
      name: "Balada",
      description: "Maquiagem marcante para a noite",
      style: "Dramática"
    }
  ]

  return (
    <div className="home-container">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Maquiagem & Beleza</h1>
                <p className="hero-subtitle">
                  Realce sua beleza natural com técnicas profissionais e produtos de alta qualidade
                </p>
                <div className="hero-buttons">
                  <Link to="/app" className="btn btn-primary-custom me-3">
                    Agendar Maquiagem
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
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Maquiagem" 
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
              <p className="section-subtitle">Os looks que estão dominando as redes sociais</p>
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
              <h2 className="section-title">Maquiagem por Ocasião</h2>
              <p className="section-subtitle">O look perfeito para cada momento</p>
            </Col>
          </Row>
          <Row>
            {occasions.map((occasion, index) => (
              <Col md={3} key={index} className="mb-4">
                <div className="service-preview-card">
                  <div className="service-icon mb-3">
                    {index === 0 ? '💒' : index === 1 ? '🎓' : index === 2 ? '💼' : '🌙'}
                  </div>
                  <h6>{occasion.name}</h6>
                  <p className="mb-2">{occasion.description}</p>
                  <small style={{color: '#6b5b95', fontWeight: '600'}}>{occasion.style}</small>
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
              <p className="section-subtitle">Transformação completa com profissionais especializados</p>
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
              <h2 className="section-title">Dicas de Maquiagem</h2>
              <p className="section-subtitle">Segredos para uma maquiagem perfeita</p>
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
              <h3 className="cta-title">Realce sua beleza natural!</h3>
              <p className="cta-subtitle">Agende sua maquiagem com nossos profissionais</p>
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

export default Makeup