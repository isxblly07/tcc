import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'

const ServiceCard = ({ service }) => {
  return (
    <Card className="h-100 service-card">
      <Card.Img variant="top" src={service.image} alt={service.name} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="primary">{service.category}</Badge>
        </div>
        <Card.Title>{service.name}</Card.Title>
        <Card.Text className="flex-grow-1">{service.description}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>{formatCurrency(service.price)}</strong>
            <small className="text-muted">{service.duration} min</small>
          </div>
          <Button 
            as={Link} 
            to={`/booking/${service.id}`} 
            variant="primary" 
            className="w-100"
          >
            Agendar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ServiceCard