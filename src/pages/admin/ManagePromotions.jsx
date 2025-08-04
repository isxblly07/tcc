import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import api from '../../services/api'
import SidebarAdmin from '../../components/admin/SidebarAdmin'

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    service_id: '',
    discount_percent: '',
    start_date: '',
    end_date: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [promotionsRes, servicesRes] = await Promise.all([
        api.get('/admin/promotions'),
        api.get('/services')
      ])
      setPromotions(promotionsRes.data)
      setServices(servicesRes.data)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/admin/promotions', formData)
      toast.success('Promoção criada com sucesso!')
      setShowModal(false)
      setFormData({
        name: '',
        service_id: '',
        discount_percent: '',
        start_date: '',
        end_date: ''
      })
      loadData()
    } catch (error) {
      toast.error('Erro ao criar promoção')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) return <div>Carregando...</div>

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <SidebarAdmin />
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Gerenciar Promoções</h5>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Nova Promoção
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Serviço</th>
                    <th>Desconto</th>
                    <th>Início</th>
                    <th>Fim</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map(promotion => (
                    <tr key={promotion.id}>
                      <td>{promotion.name}</td>
                      <td>{promotion.service_name || 'Todos os serviços'}</td>
                      <td>{promotion.discount_percent}%</td>
                      <td>{promotion.start_date}</td>
                      <td>{promotion.end_date}</td>
                      <td>
                        <span className={`badge bg-${promotion.active ? 'success' : 'secondary'}`}>
                          {promotion.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Promoção</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Promoção</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Serviço</Form.Label>
              <Form.Select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
              >
                <option value="">Todos os serviços</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Desconto (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount_percent"
                value={formData.discount_percent}
                onChange={handleChange}
                min="1"
                max="100"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Início</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Fim</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Criar Promoção
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManagePromotions