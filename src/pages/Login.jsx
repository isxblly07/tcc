import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email ou Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Digite seu email ou telefone"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Digite sua senha"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </Form>

              <hr />
              
              <div className="text-center">
                <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
              </div>

              <Alert variant="info" className="mt-3">
                <small>
                  <strong>Teste:</strong><br />
                  Cliente: joao@email.com / 123456<br />
                  Admin: admin@timeright.com / admin123
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login