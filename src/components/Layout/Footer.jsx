import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>TimeRight</h5>
            <p>Sistema de agendamento online para diversos serviços.</p>
          </Col>
          <Col md={6}>
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