import React from 'react'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaCalendar, FaCog, FaChartBar } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="/admin/dashboard">
          TimeRight Admin
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/dashboard">
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link href="/admin/appointments">
              <FaCalendar className="me-2" />
              Agendamentos
            </Nav.Link>
            <Nav.Link href="/admin/services">
              <FaCog className="me-2" />
              Serviços
            </Nav.Link>
            <Nav.Link href="/admin/reports">
              <FaChartBar className="me-2" />
              Relatórios
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="admin-dropdown">
                <FaUser className="me-2" />
                {user?.name}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar