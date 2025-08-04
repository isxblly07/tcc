import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaLock, FaQrcode, FaMobile } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService'

const TwoFactorAuth = () => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [qrCode, setQrCode] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const [loading, setLoading] = useState(false)

  const enable2FA = async () => {
    setLoading(true)
    try {
      const response = await authService.enable2FA(user.id)
      setQrCode(response.qrCode)
      setBackupCodes(response.backupCodes)
      setStep(2)
    } catch (error) {
      toast.error('Erro ao ativar 2FA')
    } finally {
      setLoading(false)
    }
  }

  const verify2FA = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.verify2FA(user.id, verificationCode)
      toast.success('2FA ativado com sucesso!')
      setStep(3)
    } catch (error) {
      toast.error('Código inválido')
    } finally {
      setLoading(false)
    }
  }

  const disable2FA = async () => {
    if (window.confirm('Desativar autenticação em dois fatores?')) {
      try {
        await authService.disable2FA(user.id)
        toast.success('2FA desativado')
        setStep(1)
      } catch (error) {
        toast.error('Erro ao desativar 2FA')
      }
    }
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={6} className="mx-auto">
          <Card>
            <Card.Header className="text-center">
              <h4>
                <FaLock className="me-2" />
                Autenticação em Dois Fatores
              </h4>
            </Card.Header>
            <Card.Body>
              {step === 1 && (
                <div className="text-center">
                  <FaLock size={60} className="text-primary mb-3" />
                  <h5>Proteja sua conta</h5>
                  <p className="text-muted mb-4">
                    A autenticação em dois fatores adiciona uma camada extra de segurança à sua conta.
                  </p>
                  <Alert variant="info">
                    <strong>Como funciona:</strong><br />
                    1. Instale um app autenticador (Google Authenticator, Authy)<br />
                    2. Escaneie o QR Code<br />
                    3. Digite o código de verificação
                  </Alert>
                  <Button 
                    variant="primary" 
                    onClick={enable2FA}
                    disabled={loading}
                  >
                    {loading ? 'Configurando...' : 'Ativar 2FA'}
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="text-center mb-4">
                    <h5>Escaneie o QR Code</h5>
                    <p className="text-muted">
                      Use seu app autenticador para escanear o código abaixo
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <div 
                      className="d-inline-block p-3 border rounded"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <FaQrcode size={150} className="text-muted" />
                      <div className="small mt-2">QR Code simulado</div>
                    </div>
                  </div>

                  <Form onSubmit={verify2FA}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código de Verificação</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="000000"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        required
                      />
                      <Form.Text className="text-muted">
                        Digite o código de 6 dígitos do seu app
                      </Form.Text>
                    </Form.Group>

                    <div className="d-grid">
                      <Button 
                        type="submit" 
                        variant="success"
                        disabled={loading || verificationCode.length !== 6}
                      >
                        {loading ? 'Verificando...' : 'Verificar e Ativar'}
                      </Button>
                    </div>
                  </Form>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="text-center mb-4">
                    <FaLock size={60} className="text-success mb-3" />
                    <h5 className="text-success">2FA Ativado!</h5>
                    <p className="text-muted">
                      Sua conta agora está protegida com autenticação em dois fatores
                    </p>
                  </div>

                  <Alert variant="warning">
                    <strong>Códigos de Backup</strong><br />
                    Guarde estes códigos em local seguro. Use-os se perder acesso ao seu dispositivo:
                    <div className="mt-2 font-monospace">
                      {backupCodes.map((code, index) => (
                        <div key={index}>{code}</div>
                      ))}
                    </div>
                  </Alert>

                  <div className="d-grid">
                    <Button variant="outline-danger" onClick={disable2FA}>
                      Desativar 2FA
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TwoFactorAuth