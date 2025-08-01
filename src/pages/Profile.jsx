import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, login } = useAuth()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    try {
      // Simular atualização do perfil
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      toast.success('Perfil atualizado com sucesso!')
      setEditing(false)
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres')
      return
    }
    
    try {
      // Simular mudança de senha
      toast.success('Senha alterada com sucesso!')
      setShowPasswordForm(false)
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast.error('Erro ao alterar senha')
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setEditing(false)
    setShowPasswordForm(false)
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>
                <FaUser className="me-2" />
                Meu Perfil
              </h4>
              {!editing && (
                <Button variant="outline-primary" onClick={() => setEditing(true)}>
                  <FaEdit className="me-1" />
                  Editar
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSaveProfile}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUser className="me-2" />
                        Nome Completo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editing}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaEnvelope className="me-2" />
                        E-mail
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editing}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaPhone className="me-2" />
                        Telefone
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo de Conta</Form.Label>
                      <Form.Control
                        type="text"
                        value={user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {editing && (
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success">
                      <FaSave className="me-1" />
                      Salvar
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      <FaTimes className="me-1" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h5>
                <FaLock className="me-2" />
                Alterar Senha
              </h5>
            </Card.Header>
            <Card.Body>
              {!showPasswordForm ? (
                <div className="text-center">
                  <p className="text-muted">Clique no botão abaixo para alterar sua senha</p>
                  <Button 
                    variant="outline-warning" 
                    onClick={() => setShowPasswordForm(true)}
                  >
                    <FaLock className="me-1" />
                    Alterar Senha
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label>Senha Atual</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nova Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          minLength={6}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirmar Nova Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          minLength={6}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="warning">
                      <FaSave className="me-1" />
                      Alterar Senha
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowPasswordForm(false)}
                    >
                      <FaTimes className="me-1" />
                      Cancelar
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h5>Informações da Conta</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Membro desde:</strong><br />
                  <span className="text-muted">Janeiro 2024</span>
                </Col>
                <Col md={6}>
                  <strong>Último acesso:</strong><br />
                  <span className="text-muted">Hoje</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile