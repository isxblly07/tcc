import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { serviceService } from '../../services/serviceService'
import { formatCurrency } from '../../utils/helpers'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const ServiceManagement = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    image: '',
    active: true
  })

  const categories = [
    'Cabeleireiro',
    'Manicure', 
    'Maquiagem',
    'Estética',
    'Cuidados Capilares',
    'Bem-estar'
  ]

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await serviceService.getServices()
      setServices(data)
    } catch (error) {
      toast.error('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      }

      if (editingService) {
        await serviceService.updateService(editingService.id, serviceData)
        toast.success('Serviço atualizado!')
      } else {
        await serviceService.createService(serviceData)
        toast.success('Serviço criado!')
      }

      setShowModal(false)
      setEditingService(null)
      setFormData({
        name: '',
        category: '',
        price: '',
        duration: '',
        description: '',
        image: '',
        active: true
      })
      loadServices()
    } catch (error) {
      toast.error('Erro ao salvar serviço')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
      description: service.description,
      image: service.image,
      active: service.active !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (service) => {
    if (window.confirm(`Excluir "${service.name}"?`)) {
      try {
        await serviceService.deleteService(service.id)
        toast.success('Serviço excluído!')
        loadServices()
      } catch (error) {
        toast.error('Erro ao excluir')
      }
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Gerenciar Serviços</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <FaPlus className="me-1" />
              Novo Serviço
            </Button>
          </div>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Duração</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td><Badge bg="secondary">{service.category}</Badge></td>
                  <td>{formatCurrency(service.price)}</td>
                  <td>{service.duration} min</td>
                  <td>
                    <Badge bg={service.active !== false ? 'success' : 'danger'}>
                      {service.active !== false ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(service)} className="me-1">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(service)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingService ? 'Editar' : 'Novo'} Serviço</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Selecione</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duração (min)</Form.Label>
                  <Form.Control type="number" name="duration" value={formData.duration} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagem</Form.Label>
              <Form.Control type="url" name="image" value={formData.image} onChange={handleInputChange} />
            </Form.Group>
            <Form.Check type="checkbox" name="active" label="Ativo" checked={formData.active} onChange={handleInputChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">{editingService ? 'Atualizar' : 'Criar'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ServiceManagement