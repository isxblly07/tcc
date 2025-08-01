import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const InstitutionalFooter = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5 className="fw-bold mb-3">
              <span className="text-primary">Time</span>
              <span className="text-secondary">Right</span>
            </h5>
            <p className="text-muted">
              Revolucionando a gestão de salões de beleza com tecnologia e inovação. 
              Conectando profissionais e clientes de forma eficiente.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-primary fs-4" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="text-primary fs-4" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="text-primary fs-4" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6 className="fw-bold mb-3">Navegação</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-muted text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/sobre" className="text-muted text-decoration-none">Sobre</a>
              </li>
              <li className="mb-2">
                <a href="/servicos" className="text-muted text-decoration-none">Serviços</a>
              </li>
              <li className="mb-2">
                <a href="/agendamento" className="text-muted text-decoration-none">Agendamento</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} className="mb-4">
            <h6 className="fw-bold mb-3">Serviços</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-muted">Corte e Cabelo</span>
              </li>
              <li className="mb-2">
                <span className="text-muted">Manicure e Pedicure</span>
              </li>
              <li className="mb-2">
                <span className="text-muted">Maquiagem</span>
              </li>
              <li className="mb-2">
                <span className="text-muted">Design de Sobrancelha</span>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} className="mb-4">
            <h6 className="fw-bold mb-3">Contato</h6>
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="text-primary me-2" />
              <span className="text-muted">contato@timeright.com</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="text-primary me-2" />
              <span className="text-muted">(11) 9999-9999</span>
            </div>
            <p className="text-muted small mt-3">
              Atendimento: Segunda à Sexta<br />
              Das 9h às 18h
            </p>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        
        <Row>
          <Col md={6}>
            <p className="text-muted small mb-0">
              © 2024 TimeRight. Todos os direitos reservados.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted small mb-0">
              <a href="#" className="text-muted text-decoration-none me-3">Política de Privacidade</a>
              <a href="#" className="text-muted text-decoration-none">Termos de Uso</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default InstitutionalFooter;