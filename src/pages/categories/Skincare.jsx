import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Skincare = () => {
  const treatments = [
    {
      title: "Limpeza de Pele Profunda",
      description: "Remoção de cravos e impurezas com técnicas especializadas",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
      tag: "Popular"
    },
    {
      title: "Hidratação Facial",
      description: "Tratamento intensivo para peles ressecadas e sensíveis",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
      tag: "Essencial"
    },
    {
      title: "Peeling Químico",
      description: "Renovação celular para uma pele mais jovem e uniforme",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      tag: "Avançado"
    }
  ]

  const services = [
    { name: "Limpeza de Pele", price: "R$ 80", duration: "1h30" },
    { name: "Hidratação Facial", price: "R$ 60", duration: "1h" },
    { name: "Peeling Químico", price: "R$ 120", duration: "1h" },
    { name: "Microagulhamento", price: "R$ 150", duration: "1h30" },
    { name: "Drenagem Linfática", price: "R$ 70", duration: "50min" },
    { name: "Tratamento Anti-idade", price: "R$ 180", duration: "2h" }
  ]

  const skinTypes = [
    {
      type: "Pele Oleosa",
      characteristics: "Brilho excessivo, poros dilatados",
      care: "Limpeza profunda e controle da oleosidade"
    },
    {
      type: "Pele Seca",
      characteristics: "Ressecamento, descamação",
      care: "Hidratação intensa e nutrição"
    },
    {
      type: "Pele Mista",
      characteristics: "Oleosa na zona T, seca nas bochechas",
      care: "Tratamento específico por região"
    },
    {
      type: "Pele Sensível",
      characteristics: "Vermelhidão, irritação fácil",
      care: "Produtos hipoalergênicos e suaves"
    }
  ]

  const tips = [
    "Use protetor solar diariamente, mesmo em dias nublados",
    "Remova a maquiagem completamente antes de dormir",
    "Beba pelo menos 2 litros de água por dia",
    "Evite espremer cravos e espinhas para não causar cicatrizes",
    "Faça limpeza de pele profissional mensalmente"
  ]

  return (
    <div className="home-container">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Cuidados com a Pele</h1>
                <p className="hero-subtitle">
                  Tratamentos especializados para todos os tipos de pele com produtos profissionais
                </p>
                <div className="hero-buttons">
                  <Link to="/app" className="btn btn-primary-custom me-3">
                    Agendar Tratamento
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
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cuidados com a pele" 
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
              <h2 className="section-title">Tratamentos Especializados</h2>
              <p className="section-subtitle">Cuidados profissionais para sua pele</p>
            </Col>
          </Row>
          <Row>
            {treatments.map((treatment, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <img 
                    src={treatment.image} 
                    alt={treatment.title}
                    className="img-fluid rounded-3 mb-3"
                    style={{height: '200px', width: '100%', objectFit: 'cover'}}
                  />
                  <Badge className="mb-2" style={{background: 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)'}}>
                    {treatment.tag}
                  </Badge>
                  <h5>{treatment.title}</h5>
                  <p>{treatment.description}</p>
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
              <h2 className="section-title">Tipos de Pele</h2>
              <p className="section-subtitle">Identifique seu tipo e descubra os cuidados ideais</p>
            </Col>
          </Row>
          <Row>
            {skinTypes.map((skin, index) => (
              <Col md={6} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <div className="service-icon mb-3">
                    {index === 0 ? '🌟' : index === 1 ? '💧' : index === 2 ? '⚖️' : '🌸'}
                  </div>
                  <h5 style={{color: '#6b5b95'}}>{skin.type}</h5>
                  <p className="mb-2"><strong>Características:</strong> {skin.characteristics}</p>
                  <p><strong>Cuidados:</strong> {skin.care}</p>
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
              <p className="section-subtitle">Tratamentos para todos os tipos de pele</p>
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
              <h2 className="section-title">Dicas de Skincare</h2>
              <p className="section-subtitle">Rotina diária para uma pele saudável</p>
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
              <h3 className="cta-title">Sua pele merece o melhor!</h3>
              <p className="cta-subtitle">Agende uma avaliação gratuita com nossos especialistas</p>
              <Link to="/app" className="btn btn-primary-custom btn-lg">
                Agendar Avaliação
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Skincare