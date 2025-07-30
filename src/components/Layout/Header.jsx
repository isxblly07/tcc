import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import NotificationBell from '../UI/NotificationBell'

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">TimeRight</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/services">Serviços</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/appointments">Meus Agendamentos</Nav.Link>
                <Nav.Link as={Link} to="/history">Histórico</Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin">Painel Admin</Nav.Link>
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
                <Nav.Link disabled>
                  <FaUser className="me-1" />
                  {user?.name}
                </Nav.Link>
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