import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaCog, FaBell, FaEye, FaCalendarAlt, FaEnvelope, FaSms } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    promotionalEmails: false,
    autoConfirmAppointments: false,
    showProfilePublic: false,
    defaultView: 'calendar',
    reminderTime: '24',
    language: 'pt-BR'
  })

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings))
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    }
  }

  const handleResetSettings = () => {
    setSettings({
      emailNotifications: true,
      smsNotifications: false,
      appointmentReminders: true,
      promotionalEmails: false,
      autoConfirmAppointments: false,
      showProfilePublic: false,
      defaultView: 'calendar',
      reminderTime: '24',
      language: 'pt-BR'
    })
    toast.info('Configurações restauradas para o padrão')
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>
              <FaCog className="me-2" />
              Configurações
            </h1>
          </div>

          {/* Aparência */}
          <Card className="mb-4">
            <Card.Header>
              <h5>
                <FaEye className="me-2" />
                Aparência
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tema</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    id="theme-light"
                    label="Claro"
                    checked={theme === 'light'}
                    onChange={() => theme === 'dark' && toggleTheme()}
                  />
                  <Form.Check
                    type="radio"
                    id="theme-dark"
                    label="Escuro"
                    checked={theme === 'dark'}
                    onChange={() => theme === 'light' && toggleTheme()}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Idioma</Form.Label>
                <Form.Select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Visualização Padrão</Form.Label>
                <Form.Select
                  value={settings.defaultView}
                  onChange={(e) => handleSettingChange('defaultView', e.target.value)}
                >
                  <option value="calendar">Calendário</option>
                  <option value="list">Lista</option>
                  <option value="grid">Grade</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Notificações */}
          <Card className="mb-4">
            <Card.Header>
              <h5>
                <FaBell className="me-2" />
                Notificações
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="email-notifications"
                  label={
                    <span>
                      <FaEnvelope className="me-2" />
                      Notificações por E-mail
                    </span>
                  }
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Receber notificações sobre agendamentos por e-mail
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="sms-notifications"
                  label={
                    <span>
                      <FaSms className="me-2" />
                      Notificações por SMS
                    </span>
                  }
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Receber lembretes por SMS (podem ser cobradas taxas)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="appointment-reminders"
                  label="Lembretes de Agendamento"
                  checked={settings.appointmentReminders}
                  onChange={(e) => handleSettingChange('appointmentReminders', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Receber lembretes antes dos agendamentos
                </Form.Text>
              </Form.Group>

              {settings.appointmentReminders && (
                <Form.Group className="mb-3">
                  <Form.Label>Tempo do Lembrete</Form.Label>
                  <Form.Select
                    value={settings.reminderTime}
                    onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                  >
                    <option value="1">1 hora antes</option>
                    <option value="2">2 horas antes</option>
                    <option value="24">1 dia antes</option>
                    <option value="48">2 dias antes</option>
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="promotional-emails"
                  label="E-mails Promocionais"
                  checked={settings.promotionalEmails}
                  onChange={(e) => handleSettingChange('promotionalEmails', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Receber ofertas e promoções por e-mail
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Agendamentos */}
          <Card className="mb-4">
            <Card.Header>
              <h5>
                <FaCalendarAlt className="me-2" />
                Agendamentos
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="auto-confirm"
                  label="Confirmação Automática"
                  checked={settings.autoConfirmAppointments}
                  onChange={(e) => handleSettingChange('autoConfirmAppointments', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Confirmar automaticamente novos agendamentos (apenas para administradores)
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Privacidade */}
          <Card className="mb-4">
            <Card.Header>
              <h5>Privacidade</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="public-profile"
                  label="Perfil Público"
                  checked={settings.showProfilePublic}
                  onChange={(e) => handleSettingChange('showProfilePublic', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Permitir que outros usuários vejam seu perfil
                </Form.Text>
              </Form.Group>

              <Alert variant="info">
                <strong>Política de Privacidade:</strong> Seus dados são protegidos e nunca compartilhados com terceiros sem seu consentimento.
              </Alert>
            </Card.Body>
          </Card>

          {/* Botões de Ação */}
          <div className="d-flex gap-3 justify-content-end">
            <Button variant="outline-secondary" onClick={handleResetSettings}>
              Restaurar Padrão
            </Button>
            <Button variant="primary" onClick={handleSaveSettings}>
              Salvar Configurações
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings