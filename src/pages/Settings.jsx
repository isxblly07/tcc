import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  })

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
    alert('Configuração atualizada!')
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-4">Configurações</h1>
          
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Aparência</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Tema</strong>
                  <p className="text-muted mb-0">
                    Tema atual: {theme === 'dark' ? 'Escuro' : 'Claro'}
                  </p>
                </div>
                <Button variant="outline-primary" onClick={toggleTheme}>
                  Alternar Tema
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Notificações</h5>
              
              <Form.Check
                type="switch"
                id="email-notifications"
                label="Notificações por email"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="mb-2"
              />
              
              <Form.Check
                type="switch"
                id="sms-notifications"
                label="Notificações por SMS"
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
                className="mb-2"
              />
              
              <Form.Check
                type="switch"
                id="push-notifications"
                label="Notificações push"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Conta</h5>
              <Alert variant="warning">
                <strong>Atenção:</strong> As configurações de conta estão em desenvolvimento.
              </Alert>
              <Button variant="outline-danger" disabled>
                Excluir Conta
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings