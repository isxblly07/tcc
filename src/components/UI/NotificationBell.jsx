import React, { useState } from 'react'
import { Button, Badge } from 'react-bootstrap'


const NotificationBell = () => {
  const [notifications] = useState(0) // Simulação - sem notificações por enquanto

  return (
    <Button variant="outline-secondary" size="sm" className="position-relative me-2">
      🔔
      {notifications > 0 && (
        <Badge 
          bg="danger" 
          pill 
          className="position-absolute top-0 start-100 translate-middle"
        >
          {notifications}
        </Badge>
      )}
    </Button>
  )
}

export default NotificationBell