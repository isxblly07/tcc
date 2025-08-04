import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Footer = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>TimeRight</h5>
            <p>Sistema de agendamento online para diversos serviços.</p>
          </Col>
          <Col md={4}>
            <h6>Links Úteis</h6>
            <div className="d-flex flex-column">
              <Link to="/sobre" className="text-light mb-1">Sobre Nós</Link>
              <Link to="/servicos" className="text-light mb-1">Serviços</Link>
              <Link to="/contato" className="text-light mb-1">Contato</Link>
              {isAuthenticated && (
                <Link to="/lgpd" className="text-light mb-1">LGPD</Link>
              )}
            </div>
          </Col>
          <Col md={4}>
            <h6>Contato</h6>
            <p>Email: contato@timeright.com</p>
            <p>Telefone: (11) 9999-9999</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 TimeRight. Todos os direitos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer