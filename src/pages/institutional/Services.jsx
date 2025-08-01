import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { FaCut, FaPaintBrush, FaHandPaper, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: null },
    { id: 'cabelo', name: 'Cabelo', icon: <FaCut /> },
    { id: 'manicure', name: 'Manicure', icon: <FaHandPaper /> },
    { id: 'maquiagem', name: 'Maquiagem', icon: <FaPaintBrush /> },
    { id: 'sobrancelha', name: 'Sobrancelha', icon: <FaEye /> }
  ];

  const services = [
    {
      id: 1,
      name: 'Corte Feminino',
      category: 'cabelo',
      price: 'R$ 45,00',
      duration: '45 min',
      description: 'Corte moderno e personalizado para realçar sua beleza',
      image: '💇‍♀️'
    },
    {
      id: 2,
      name: 'Coloração',
      category: 'cabelo',
      price: 'R$ 80,00',
      duration: '2h',
      description: 'Coloração profissional com produtos de alta qualidade',
      image: '🎨'
    },
    {
      id: 3,
      name: 'Escova Progressiva',
      category: 'cabelo',
      price: 'R$ 120,00',
      duration: '3h',
      description: 'Alisamento natural que mantém o movimento dos fios',
      image: '💫'
    },
    {
      id: 4,
      name: 'Manicure Tradicional',
      category: 'manicure',
      price: 'R$ 25,00',
      duration: '30 min',
      description: 'Cuidado completo para suas unhas com esmaltação',
      image: '💅'
    },
    {
      id: 5,
      name: 'Pedicure',
      category: 'manicure',
      price: 'R$ 30,00',
      duration: '45 min',
      description: 'Tratamento relaxante para os pés com hidratação',
      image: '🦶'
    },
    {
      id: 6,
      name: 'Unha em Gel',
      category: 'manicure',
      price: 'R$ 45,00',
      duration: '1h',
      description: 'Unhas resistentes e duradouras com acabamento perfeito',
      image: '✨'
    },
    {
      id: 7,
      name: 'Maquiagem Social',
      category: 'maquiagem',
      price: 'R$ 60,00',
      duration: '1h',
      description: 'Maquiagem elegante para eventos especiais',
      image: '💄'
    },
    {
      id: 8,
      name: 'Maquiagem Noiva',
      category: 'maquiagem',
      price: 'R$ 150,00',
      duration: '2h',
      description: 'Maquiagem especial para o dia mais importante',
      image: '👰'
    },
    {
      id: 9,
      name: 'Design de Sobrancelha',
      category: 'sobrancelha',
      price: 'R$ 35,00',
      duration: '30 min',
      description: 'Modelagem perfeita para valorizar seu olhar',
      image: '👁️'
    },
    {
      id: 10,
      name: 'Micropigmentação',
      category: 'sobrancelha',
      price: 'R$ 300,00',
      duration: '2h',
      description: 'Técnica avançada para sobrancelhas naturais',
      image: '🎯'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Nossos Serviços</h1>
                <p className="hero-subtitle">
                  Descubra uma variedade completa de serviços de beleza com profissionais especializados
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/app" className="btn-primary-custom me-3">
                    Agendar Agora
                  </Button>
                  <Button as={Link} to="/agendamento" variant="outline-primary">
                    Fazer Agendamento
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Serviços de beleza" 
                  className="img-fluid rounded-4"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Filter */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Categorias de Serviços</h2>
              <p className="section-subtitle">Escolha a categoria que mais combina com você</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="mb-2 btn-primary-custom"
                    style={{
                      background: selectedCategory === category.id ? 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)' : 'transparent',
                      border: selectedCategory === category.id ? 'none' : '1px solid #b19cd9',
                      color: selectedCategory === category.id ? 'white' : '#6b5b95'
                    }}
                  >
                    {category.icon && <span className="me-2">{category.icon}</span>}
                    {category.name}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            {filteredServices.map(service => (
              <Col lg={4} md={6} key={service.id} className="mb-4">
                <div className="service-preview-card h-100">
                  <div className="text-center mb-3">
                    <div className="service-icon mb-3">
                      <span style={{ fontSize: '2rem' }}>{service.image}</span>
                    </div>
                    <h5>{service.name}</h5>
                    <Badge 
                      style={{
                        background: 'linear-gradient(135deg, #b19cd9 0%, #a68cc9 100%)',
                        border: 'none'
                      }} 
                      className="mb-3"
                    >
                      {categories.find(cat => cat.id === service.category)?.name}
                    </Badge>
                  </div>
                  
                  <p className="mb-3">{service.description}</p>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <strong style={{color: '#6b5b95', fontSize: '1.2rem'}}>{service.price}</strong>
                    </div>
                    <div style={{color: '#8a7ca8'}}>
                      <small>⏱️ {service.duration}</small>
                    </div>
                  </div>
                  
                  <Button 
                    as={Link} 
                    to="/app" 
                    className="btn-primary-custom w-100"
                  >
                    Agendar Serviço
                  </Button>
                </div>
              </Col>
            ))}
          </Row>

          {filteredServices.length === 0 && (
            <Row>
              <Col className="text-center py-5">
                <div className="service-preview-card">
                  <h4>Nenhum serviço encontrado nesta categoria</h4>
                  <p>Tente selecionar outra categoria</p>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Quality Section */}
      <section className="services-preview py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Qualidade Garantida</h2>
              <p className="section-subtitle">Todos os nossos parceiros são profissionais qualificados</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <span style={{fontSize: '2rem'}}>✅</span>
                </div>
                <h6>Profissionais Certificados</h6>
                <p>Todos verificados e qualificados</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <span style={{fontSize: '2rem'}}>🏆</span>
                </div>
                <h6>Produtos Premium</h6>
                <p>Apenas marcas de alta qualidade</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-preview-card">
                <div className="service-icon">
                  <span style={{fontSize: '2rem'}}>⭐</span>
                </div>
                <h6>Avaliação 5 Estrelas</h6>
                <p>Satisfação garantida em todos os serviços</p>
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
              <h3 className="cta-title">Pronta para se cuidar?</h3>
              <p className="cta-subtitle">Agende seu serviço favorito agora mesmo</p>
              <Button as={Link} to="/app" size="lg" className="btn-primary-custom">
                Agendar Agora
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Services;