import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaBullseye, FaEye, FaCog, FaChartLine, FaHeart, FaStar } from 'react-icons/fa'

const About = () => {
  const features = [
    {
      icon: <FaCog />,
      title: "Tecnologia Avançada",
      description: "Sistema intuitivo que simplifica o agendamento para todos"
    },
    {
      icon: <FaChartLine />,
      title: "Crescimento Contínuo",
      description: "Sempre evoluindo para atender melhor nossos usuários"
    },
    {
      icon: <FaHeart />,
      title: "Foco no Cliente",
      description: "Sua satisfação é nossa prioridade número um"
    },
    {
      icon: <FaStar />,
      title: "Qualidade Premium",
      description: "Conectamos você apenas com os melhores profissionais"
    }
  ];

  const values = [
    { title: "Inovação", description: "Sempre buscando novas formas de melhorar a experiência" },
    { title: "Qualidade", description: "Comprometidos com a excelência em cada detalhe" },
    { title: "Confiança", description: "Construindo relacionamentos duradouros e transparentes" },
    { title: "Acessibilidade", description: "Beleza para todos, sem exceção" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Sobre o TimeRight</h1>
                <p className="hero-subtitle">
                  Revolucionando a forma como você cuida da sua beleza, conectando pessoas e profissionais de forma simples e eficiente
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Equipe TimeRight" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="services-preview py-5">
        <Container>
          <Row>
            <Col lg={6} className="mb-5">
              <div className="service-preview-card h-100">
                <div className="service-icon">
                  <FaBullseye />
                </div>
                <h3>Nossa Missão</h3>
                <p>
                  Democratizar o acesso à beleza, conectando pessoas aos melhores profissionais 
                  através de uma plataforma simples, confiável e acessível.
                </p>
              </div>
            </Col>
            <Col lg={6} className="mb-5">
              <div className="service-preview-card h-100">
                <div className="service-icon">
                  <FaEye />
                </div>
                <h3>Nossa Visão</h3>
                <p>
                  Ser a principal plataforma de beleza do Brasil, transformando a forma 
                  como as pessoas cuidam de si mesmas e se conectam com profissionais.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Nossos Diferenciais</h2>
              <p className="section-subtitle">O que nos torna únicos no mercado</p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <div className="service-preview-card">
                  <div className="service-icon">
                    {feature.icon}
                  </div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Values */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Nossos Valores</h2>
              <p className="section-subtitle">Os princípios que guiam nosso trabalho</p>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col md={6} key={index} className="mb-4">
                <div className="service-preview-card h-100">
                  <h5 style={{color: '#6b5b95'}}>{value.title}</h5>
                  <p>{value.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="cta-title">Nosso Impacto</h3>
              <p className="cta-subtitle">Transformando vidas através da beleza</p>
              <Row className="mt-5">
                <Col md={4} className="mb-3">
                  <h3 className="display-4 fw-bold">1000+</h3>
                  <p>Clientes felizes</p>
                </Col>
                <Col md={4} className="mb-3">
                  <h3 className="display-4 fw-bold">100+</h3>
                  <p>Profissionais parceiros</p>
                </Col>
                <Col md={4} className="mb-3">
                  <h3 className="display-4 fw-bold">99%</h3>
                  <p>Satisfação garantida</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;