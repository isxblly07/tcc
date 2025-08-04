import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap'
import { FaCog, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/Layout/AdminNavbar'

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    image: 'https://via.placeholder.com/300x200'
  })

  const categories = [
    'Cabeleireiro',
    'Manicure',
    'Maquiagem',
    'Estética',
    'Bem-estar',
    'Cuidados Capilares'
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      toast.error('Erro ao carregar serviços')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = selectedService ? 'PUT' : 'POST'
      const url = selectedService 
        ? `http://localhost:3001/services/${selectedService.id}`
        : 'http://localhost:3001/services'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...serviceForm,
          id: selectedService?.id || Date.now(),
          price: parseFloat(serviceForm.price),
          duration: parseInt(serviceForm.duration)
        })
      })

      if (response.ok) {
        toast.success(selectedService ? 'Serviço atualizado!' : 'Serviço criado!')
        setShowModal(false)
        fetchServices()
        resetForm()
      }
    } catch (error) {
      toast.error('Erro ao salvar serviço')
    }
  }

  const handleDelete = async (serviceId) => {
    if (window.confirm('Deseja excluir este serviço?')) {
      try {
        await fetch(`http://localhost:3001/services/${serviceId}`, { method: 'DELETE' })
        toast.success('Serviço excluído!')
        fetchServices()
      } catch (error) {
        toast.error('Erro ao excluir serviço')
      }
    }
  }

  const resetForm = () => {
    setServiceForm({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      image: 'https://via.placeholder.com/300x200'
    })
    setSelectedService(null)
  }

  const openModal = (service = null) => {
    if (service) {
      setSelectedService(service)
      setServiceForm({
        name: service.name,
        category: service.category,
        price: service.price.toString(),
        duration: service.duration.toString(),
        description: service.description,
        image: service.image
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  return (
    <>
      <AdminNavbar />
      <Container fluid className="py-4">
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>
                <FaCog className="me-2" />
                Gerenciar Serviços
              </h5>
              <Button variant="primary" onClick={() => openModal()}>
                <FaPlus className="me-2" />
                Novo Serviço
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Duração</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id}>
                      <td>{service.name}</td>
                      <td>{service.category}</td>
                      <td>R$ {service.price.toFixed(2)}</td>
                      <td>{service.duration} min</td>
                      <td>{service.description.substring(0, 50)}...</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => openModal(service)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Service Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedService ? 'Editar Serviço' : 'Novo Serviço'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome do Serviço</Form.Label>
                  <Form.Control
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preço (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duração (minutos)</Form.Label>
                  <Form.Control
                    type="number"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={serviceForm.description}
                onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="url"
                value={serviceForm.image}
                onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {selectedService ? 'Atualizar' : 'Criar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </>
  )
}

export default AdminServices