import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FaExternalLinkAlt, FaFigma, FaPalette, FaMobile } from 'react-icons/fa'

const Design = () => {
  const figmaUrl = "https://www.figma.com/proto/RZP2yBWwtbHGzpSuEAuoaa/TimeRigth?node-id=201-443&t=oqmWvY5khCQ39BHL-1"

  const designFeatures = [
    {
      icon: <FaPalette />,
      title: "Design System",
      description: "Paleta de cores pastéis e componentes consistentes"
    },
    {
      icon: <FaMobile />,
      title: "Responsivo",
      description: "Adaptado para desktop, tablet e mobile"
    },
    {
      icon: <FaFigma />,
      title: "Prototipado",
      description: "Fluxos interativos e navegação completa"
    }
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Design do TimeRight</h1>
                <p className="hero-subtitle">
                  Explore o design completo do projeto no Figma com protótipos interativos e sistema de design
                </p>
                <div className="hero-buttons">
                  <Button 
                    href={figmaUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary-custom me-3"
                  >
                    <FaFigma className="me-2" />
                    Ver no Figma
                    <FaExternalLinkAlt className="ms-2" size={14} />
                  </Button>
                  <Button href="/sobre" variant="outline-primary">
                    Sobre o Projeto
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <iframe
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                    width: "100%",
                    height: "450px"
                  }}
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FRZPyBWwtbHGzpSuEAuoaa%2FTimeRigth%3Fnode-id%3D201-443%26t%3DoqmWvY5khCQ39BHL-1"
                  allowFullScreen
                  title="TimeRight Figma Preview"
                />
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
              <h2 className="section-title">Características do Design</h2>
              <p className="section-subtitle">Um design pensado para a melhor experiência do usuário</p>
            </Col>
          </Row>
          <Row>
            {designFeatures.map((feature, index) => (
              <Col md={4} key={index} className="mb-4">
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

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="cta-title">Explore o Design Completo</h3>
              <p className="cta-subtitle">Veja todos os protótipos e componentes no Figma</p>
              <Button 
                href={figmaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                size="lg" 
                className="btn-primary-custom"
              >
                <FaFigma className="me-2" />
                Abrir Figma
                <FaExternalLinkAlt className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Design