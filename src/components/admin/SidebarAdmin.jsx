import React from 'react'
import { Nav, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaCalendarAlt, FaCog, FaUsers, FaChartBar, FaTags, FaBell, FaStar } from 'react-icons/fa'

const SidebarAdmin = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/appointments', icon: FaCalendarAlt, label: 'Agendamentos' },
    { path: '/admin/services', icon: FaCog, label: 'Serviços' },
    { path: '/admin/professionals', icon: FaUsers, label: 'Profissionais' },
    { path: '/admin/schedules', icon: FaCalendarAlt, label: 'Horários' },
    { path: '/admin/users', icon: FaUsers, label: 'Usuários' },
    { path: '/admin/reports', icon: FaChartBar, label: 'Relatórios' },
    { path: '/admin/promotions', icon: FaTags, label: 'Promoções' },
    { path: '/admin/notifications', icon: FaBell, label: 'Notificações' },
    { path: '/admin/reviews', icon: FaStar, label: 'Avaliações' }
  ]

  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="mb-0">Administração</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Nav className="flex-column">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Nav.Link
              key={path}
              as={Link}
              to={path}
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === path ? 'bg-primary text-white' : ''
              }`}
            >
              <Icon className="me-2" />
              {label}
            </Nav.Link>
          ))}
        </Nav>
      </Card.Body>
    </Card>
  )
}

export default SidebarAdmin