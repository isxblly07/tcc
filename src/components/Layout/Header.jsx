import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaCalendarAlt, FaCog, FaChartBar } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import NotificationBell from '../UI/NotificationBell'

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <Navbar bg="transparent" variant={theme} expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-custom">
          <strong>TimeRight</strong>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/services">Serviços</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/app/agenda">
                  <FaCalendarAlt className="me-1" />
                  Agenda
                </Nav.Link>
                <Nav.Link as={Link} to="/app/appointments">Meus Agendamentos</Nav.Link>
                <Nav.Link as={Link} to="/app/history">Histórico</Nav.Link>
                {isAdmin && (
                  <>
                    <Nav.Link as={Link} to="/app/admin">Painel Admin</Nav.Link>
                    <Nav.Link as={Link} to="/app/reports">
                      <FaChartBar className="me-1" />
                      Relatórios
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            <NotificationBell />
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="me-2 ms-2 theme-toggle"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/app/profile">
                  <FaUser className="me-1" />
                  {user?.name}
                </Nav.Link>
                <Nav.Link as={Link} to="/app/settings">
                  <FaCog className="me-1" />
                  Configurações
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/app/admin/services">
                    Gerenciar Serviços
                  </Nav.Link>
                )}
                <Button variant="outline-danger" size="sm" onClick={logout}>
                  <FaSignOutAlt className="me-1" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Cadastrar</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header