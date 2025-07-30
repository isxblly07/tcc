import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'

const Review = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error('Por favor, selecione uma avaliação')
      return
    }

    setSubmitting(true)
    try {
      // Simular envio da avaliação
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Avaliação enviada com sucesso!')
      navigate('/history')
    } catch (error) {
      toast.error('Erro ao enviar avaliação')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Avaliar Serviço</h3>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Sua avaliação:</Form.Label>
                  <div className="d-flex justify-content-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar
                        key={star}
                        size={30}
                        color={star <= rating ? '#ffc107' : '#e4e5e9'}
                        style={{ cursor: 'pointer', margin: '0 2px' }}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Comentário (opcional):</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Conte-nos sobre sua experiência..."
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Enviando...' : 'Enviar Avaliação'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/history')}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Review