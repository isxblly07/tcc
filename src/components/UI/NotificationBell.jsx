import React, { useState, useEffect } from 'react'
import { Dropdown, Badge } from 'react-bootstrap'
import { FaBell, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { appointmentService } from '../../services/appointmentService'
import { formatDate, formatTime } from '../../utils/helpers'

const NotificationBell = () => {
  const { user, isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications()
    }
  }, [isAuthenticated])

  const loadNotifications = async () => {
    try {
      const appointments = await appointmentService.getUserAppointments(user.id)
      
      // Criar notificações baseadas nos agendamentos
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const upcomingAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date)
        return aptDate >= now && aptDate <= tomorrow && apt.status === 'confirmed'
      })
      
      const pendingAppointments = appointments.filter(apt => apt.status === 'pending')
      
      const notifs = [
        ...upcomingAppointments.map(apt => ({
          id: `upcoming_${apt.id}`,
          type: 'upcoming',
          title: 'Agendamento Próximo',
          message: `Você tem um agendamento amanhã às ${formatTime(apt.time)}`,
          time: new Date(),
          read: false
        })),
        ...pendingAppointments.map(apt => ({
          id: `pending_${apt.id}`,
          type: 'pending',
          title: 'Agendamento Pendente',
          message: `Seu agendamento para ${formatDate(apt.date)} está aguardando confirmação`,
          time: new Date(apt.createdAt),
          read: false
        }))
      ]
      
      setNotifications(notifs)
      setUnreadCount(notifs.filter(n => !n.read).length)
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'upcoming':
        return <FaCalendarAlt className="text-primary me-2" />
      case 'pending':
        return <FaExclamationTriangle className="text-warning me-2" />
      default:
        return <FaBell className="text-info me-2" />
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-secondary" size="sm" className="position-relative">
        <FaBell />
        {unreadCount > 0 && (
          <Badge 
            bg="danger" 
            pill 
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.6rem' }}
          >
            {unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
        <Dropdown.Header>
          <strong>Notificações</strong>
          {unreadCount > 0 && (
            <Badge bg="danger" className="ms-2">{unreadCount}</Badge>
          )}
        </Dropdown.Header>
        
        {notifications.length === 0 ? (
          <Dropdown.Item disabled>
            <div className="text-center text-muted py-3">
              Nenhuma notificação
            </div>
          </Dropdown.Item>
        ) : (
          notifications.map(notification => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`${!notification.read ? 'bg-light' : ''} border-bottom`}
            >
              <div className="d-flex align-items-start">
                {getIcon(notification.type)}
                <div className="flex-grow-1">
                  <div className="fw-bold small">{notification.title}</div>
                  <div className="text-muted small">{notification.message}</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                    {notification.time.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                {!notification.read && (
                  <div 
                    className="bg-primary rounded-circle" 
                    style={{ width: '8px', height: '8px' }}
                  />
                )}
              </div>
            </Dropdown.Item>
          ))
        )}
        
        {notifications.length > 0 && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item className="text-center text-primary">
              Ver todas as notificações
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NotificationBell