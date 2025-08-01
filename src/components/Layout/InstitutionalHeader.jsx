import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const InstitutionalHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'white'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="shadow-sm" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <span className="text-primary">Time</span>
          <span className="text-secondary">Right</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
            <Nav.Link as={Link} to="/servicos">Serviços</Nav.Link>
            <Nav.Link as={Link} to="/agendamento">Agendamento</Nav.Link>
            <Nav.Link as={Link} to="/design">Design</Nav.Link>
            <Nav.Link as={Link} to="/contato">Contato</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="me-2"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Button>
            
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate('/app')}
            >
              Ir para App
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default InstitutionalHeader;