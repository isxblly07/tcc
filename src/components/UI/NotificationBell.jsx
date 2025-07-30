import React, { useState, useEffect } from 'react'
import { Dropdown, Badge } from 'react-bootstrap'
import { FaBell } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const NotificationBell = () => {
  const { user, isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      // Simular notificações
      const mockNotifications = [
        {
          id: 1,
          title: 'Agendamento Confirmado',
          message: 'Seu agendamento para amanhã às 14:00 foi confirmado.',
          time: '2 min atrás',
          read: false
        },
        {
          id: 2,
          title: 'Lembrete',
          message: 'Você tem um agendamento em 1 hora.',
          time: '1 hora atrás',
          read: false
        }
      ]
      
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
    }
  }, [isAuthenticated])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  if (!isAuthenticated) return null

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

      <Dropdown.Menu style={{ width: '300px' }}>
        <Dropdown.Header>Notificações</Dropdown.Header>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={!notification.read ? 'bg-light' : ''}
            >
              <div>
                <strong>{notification.title}</strong>
                {!notification.read && <Badge bg="primary" className="ms-2">Novo</Badge>}
              </div>
              <div className="small text-muted">{notification.message}</div>
              <div className="small text-muted">{notification.time}</div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>Nenhuma notificação</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NotificationBell