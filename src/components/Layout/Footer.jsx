import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>TimeRight</h5>
            <p className="text-muted">
              Sistema completo de agendamento online para salões de beleza.
            </p>
          </Col>
          <Col md={3}>
            <h6>Links Úteis</h6>
            <ul className="list-unstyled">
              <li><a href="/services" className="text-muted">Serviços</a></li>
              <li><a href="/about" className="text-muted">Sobre</a></li>
              <li><a href="/contact" className="text-muted">Contato</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Redes Sociais</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted"><FaFacebook size={20} /></a>
              <a href="#" className="text-muted"><FaInstagram size={20} /></a>
              <a href="#" className="text-muted"><FaTwitter size={20} /></a>
              <a href="#" className="text-muted"><FaWhatsapp size={20} /></a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2024 TimeRight. Todos os direitos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer