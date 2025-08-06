import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'

const RatingSystem = ({ appointment, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        appointmentId: appointment.id,
        serviceId: appointment.serviceId,
        professionalId: appointment.professionalId,
        rating,
        comment: comment.trim(),
        anonymous
      })
      alert('Avaliação enviada com sucesso!')
    } catch (error) {
      alert('Erro ao enviar avaliação')
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || rating)
      stars.push(
        <button
          key={i}
          type="button"
          className="btn p-0 me-1"
          style={{ 
            background: 'none', 
            border: 'none',
            fontSize: '1.5rem',
            color: isFilled ? '#ffc107' : '#dee2e6'
          }}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          {isFilled ? '⭐' : '☆'}
        </button>
      )
    }
    return stars
  }

  const getRatingText = (rating) => {
    const texts = {
      1: 'Muito insatisfeito',
      2: 'Insatisfeito',
      3: 'Regular',
      4: 'Satisfeito',
      5: 'Muito satisfeito'
    }
    return texts[rating] || ''
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Avaliar Serviço</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-4 p-3 bg-light rounded">
            <Row>
              <Col md={6}>
                <strong>Serviço:</strong> {appointment.serviceName}<br />
                <strong>Data:</strong> {new Date(appointment.date).toLocaleDateString('pt-BR')}
              </Col>
              <Col md={6}>
                <strong>Profissional:</strong> {appointment.professionalName}<br />
                <strong>Horário:</strong> {appointment.time}
              </Col>
            </Row>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Como você avalia este serviço?</Form.Label>
            <div className="d-flex align-items-center">
              <div className="me-3">
                {renderStars()}
              </div>
              {rating > 0 && (
                <span className="text-muted">
                  {getRatingText(rating)}
                </span>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comentário (opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre sua experiência..."
              maxLength={500}
            />
            <Form.Text className="text-muted">
              {comment.length}/500 caracteres
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              id="anonymous"
              label="Avaliar anonimamente"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <Form.Text className="text-muted">
              Sua avaliação será exibida sem identificação
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="outline-secondary" 
              onClick={onCancel}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={submitting || rating === 0}
            >
              {submitting ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export const ReviewDisplay = ({ reviews, showAll = false }) => {
  const [expanded, setExpanded] = useState({})

  const toggleExpanded = (reviewId) => {
    setExpanded(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{color: i <= rating ? '#ffc107' : '#dee2e6'}}>
          ⭐
        </span>
      )
    }
    return stars
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className="reviews-container">
      {displayedReviews.map((review) => (
        <Card key={review.id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  {review.anonymous ? (
                    <div 
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                      style={{ width: '40px', height: '40px' }}
                    >
                      👤
                    </div>
                  ) : (
                    <div 
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ width: '40px', height: '40px' }}
                    >
                      {review.userName?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <h6 className="mb-0">
                    {review.anonymous ? 'Usuário Anônimo' : review.userName}
                  </h6>
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      {renderStars(review.rating)}
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {review.comment && (
              <div className="mt-2">
                <p className="mb-0">
                  {expanded[review.id] || review.comment.length <= 150
                    ? review.comment
                    : `${review.comment.substring(0, 150)}...`
                  }
                  {review.comment.length > 150 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 ms-1"
                      onClick={() => toggleExpanded(review.id)}
                    >
                      {expanded[review.id] ? 'Ver menos' : 'Ver mais'}
                    </Button>
                  )}
                </p>
              </div>
            )}

            <div className="mt-2">
              <small className="text-muted">
                Serviço: {review.serviceName}
              </small>
            </div>
          </Card.Body>
        </Card>
      ))}

      {!showAll && reviews.length > 3 && (
        <div className="text-center">
          <Button variant="outline-primary" size="sm">
            Ver todas as avaliações ({reviews.length})
          </Button>
        </div>
      )}
    </div>
  )
}

export default RatingSystem