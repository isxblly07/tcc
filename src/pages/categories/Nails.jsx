import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nails = () => {
  const trends = [
    {
      title: "Nail Art Minimalista",
      description: "Designs simples e elegantes que combinam com qualquer look",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
      tag: "Tendência"
    },
    {
      title: "Unhas Francesas Coloridas",
      description: "A clássica francesinha ganha cores vibrantes e modernas",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=300&fit=crop",
      tag: "Popular"
    },
    {
      title: "Gel Extensions",
      description: "Alongamento natural com gel para unhas resistentes",
      image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop",
      tag: "Técnica"
    }
  ]

  const services = [
    { name: "Manicure Tradicional", price: "R$ 25", duration: "30min" },
    { name: "Pedicure", price: "R$ 30", duration: "45min" },
    { name: "Unha em Gel", price: "R$ 45", duration: "1h" },
    { name: "Nail Art", price: "R$ 60", duration: "1h30" },
    { name: "Alongamento", price: "R$ 80", duration: "2h" },
    { name: "Spa dos Pés", price: "R$ 50", duration: "1h" }
  ]

  const tips = [
    "Use base fortalecedora para proteger as unhas naturais",
    "Hidrate as cutículas diariamente com óleo específico",
    "Evite usar as unhas como ferramentas para não quebrá-las",
    "Remova o esmalte a cada 7-10 dias para deixar as unhas respirarem"
  ]

  const colors = [
    { name: "Rosa Nude", trend: "Clássico atemporal" },
    { name: "Vermelho Cereja", trend: "Elegância pura" },
    { name: "Azul Petróleo", trend: "Moderno e sofisticado" },
    { name: "Verde Sage", trend: "Cor do ano 2024" }
  ]

  return (
    <div className="home-container">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Manicure & Pedicure</h1>
                <p className="hero-subtitle">
                  Unhas perfeitas com as últimas tendências em nail art e cuidados especializados
                </p>
                <div className="hero-buttons">
                  <Link to="/app" className="btn btn-primary-custom me-3">
                    Agendar Manicure
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
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Manicure" 
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
              <h2 className="section-title">Tendências em Unhas</h2>
              <p className="section-subtitle">Inspire-se com os designs mais procurados</p>
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
              <h2 className="section-title">Cores em Alta</h2>
              <p className="section-subtitle">Paleta de cores que estão dominando 2024</p>
            </Col>
          </Row>
          <Row>
            {colors.map((color, index) => (
              <Col md={3} key={index} className="mb-4">
                <div className="service-preview-card">
                  <div className="service-icon mb-3" style={{
                    background: index === 0 ? '#F8BBD9' : 
                               index === 1 ? '#DC143C' : 
                               index === 2 ? '#2F4F4F' : '#87A96B'
                  }}>
                    💅
                  </div>
                  <h6>{color.name}</h6>
                  <small style={{color: '#8a7ca8'}}>{color.trend}</small>
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
              <p className="section-subtitle">Cuidados completos para suas unhas</p>
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
              <p className="section-subtitle">Mantenha suas unhas sempre saudáveis</p>
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
              <h3 className="cta-title">Unhas perfeitas te esperam!</h3>
              <p className="cta-subtitle">Agende seu horário e deixe suas unhas impecáveis</p>
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

export default Nails