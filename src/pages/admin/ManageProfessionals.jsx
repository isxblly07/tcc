import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SidebarAdmin from '../../components/admin/SidebarAdmin'

const ManageProfessionals = () => {
  const [professionals, setProfessionals] = useState([])
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    services: [],
    phone: '',
    email: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // Mock data
    setProfessionals([
      { id: 1, name: 'Ana Silva', specialty: 'Cabeleireiro', services: [1, 2], phone: '(11) 99999-1111', email: 'ana@salon.com' },
      { id: 2, name: 'Carlos Santos', specialty: 'Barbeiro', services: [3, 4], phone: '(11) 99999-2222', email: 'carlos@salon.com' }
    ])
    setServices([
      { id: 1, name: 'Corte Feminino' },
      { id: 2, name: 'Coloração' },
      { id: 3, name: 'Corte Masculino' },
      { id: 4, name: 'Barba' }
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProfessional) {
      setProfessionals(prev => prev.map(p => 
        p.id === editingProfessional.id ? { ...formData, id: editingProfessional.id } : p
      ))
      toast.success('Profissional atualizado!')
    } else {
      setProfessionals(prev => [...prev, { ...formData, id: Date.now() }])
      toast.success('Profissional adicionado!')
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (professional) => {
    setEditingProfessional(professional)
    setFormData(professional)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
      setProfessionals(prev => prev.filter(p => p.id !== id))
      toast.success('Profissional excluído!')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', specialty: '', services: [], phone: '', email: '' })
    setEditingProfessional(null)
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3}>
          <SidebarAdmin />
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Gerenciar Profissionais</h5>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Novo Profissional
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Especialidade</th>
                    <th>Serviços</th>
                    <th>Contato</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {professionals.map(professional => (
                    <tr key={professional.id}>
                      <td>{professional.name}</td>
                      <td>{professional.specialty}</td>
                      <td>{professional.services?.length || 0} serviços</td>
                      <td>
                        <div>{professional.phone}</div>
                        <small className="text-muted">{professional.email}</small>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(professional)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2"
                        >
                          <FaClock />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(professional.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProfessional ? 'Editar' : 'Novo'} Profissional
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Especialidade</Form.Label>
              <Form.Control
                type="text"
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingProfessional ? 'Atualizar' : 'Criar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManageProfessionals