import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const navigate = useNavigate()

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (minLength && hasUpper && hasNumber && hasSymbol) {
      setPasswordStrength('Forte')
      return true
    } else if (minLength && (hasUpper || hasNumber || hasSymbol)) {
      setPasswordStrength('Média')
      return false
    } else {
      setPasswordStrength('Fraca')
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    if (name === 'password') {
      validatePassword(value)
    }
    
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem')
      setLoading(false)
      return
    }

    if (!validatePassword(formData.password)) {
      setError('Senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 número e 1 símbolo')
      setLoading(false)
      return
    }

    try {
      await api.post('/admin/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      toast.success('Administrador cadastrado com sucesso!')
      navigate('/admin/login')
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Header className="text-center">
              <h4>Cadastro Administrador</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Institucional *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {formData.password && (
                    <Form.Text className={`text-${passwordStrength === 'Forte' ? 'success' : passwordStrength === 'Média' ? 'warning' : 'danger'}`}>
                      Força da senha: {passwordStrength}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha *</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/admin/login">Já tem conta? Faça login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterAdmin