import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap'
import { FaPlus, FaEdit, FaTrash, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SidebarAdmin from '../../components/admin/SidebarAdmin'

const ManageSchedules = () => {
  const [schedules, setSchedules] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    professionalId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    active: true
  })

  const daysOfWeek = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Segunda-feira' },
    { value: 2, label: 'Terça-feira' },
    { value: 3, label: 'Quarta-feira' },
    { value: 4, label: 'Quinta-feira' },
    { value: 5, label: 'Sexta-feira' },
    { value: 6, label: 'Sábado' }
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Mock data
    setProfessionals([
      { id: 1, name: 'Ana Silva' },
      { id: 2, name: 'Carlos Santos' }
    ])
    
    setSchedules([
      { id: 1, professionalId: 1, professionalName: 'Ana Silva', dayOfWeek: 1, startTime: '08:00', endTime: '17:00', active: true },
      { id: 2, professionalId: 1, professionalName: 'Ana Silva', dayOfWeek: 2, startTime: '08:00', endTime: '17:00', active: true },
      { id: 3, professionalId: 2, professionalName: 'Carlos Santos', dayOfWeek: 1, startTime: '09:00', endTime: '18:00', active: true }
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const professional = professionals.find(p => p.id == formData.professionalId)
    const newSchedule = {
      ...formData,
      id: Date.now(),
      professionalName: professional?.name,
      dayOfWeek: parseInt(formData.dayOfWeek)
    }
    
    setSchedules(prev => [...prev, newSchedule])
    toast.success('Horário adicionado!')
    setShowModal(false)
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este horário?')) {
      setSchedules(prev => prev.filter(s => s.id !== id))
      toast.success('Horário excluído!')
    }
  }

  const toggleActive = (id) => {
    setSchedules(prev => prev.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ))
    toast.success('Status atualizado!')
  }

  const resetForm = () => {
    setFormData({
      professionalId: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      active: true
    })
  }

  const getDayName = (dayOfWeek) => {
    return daysOfWeek.find(d => d.value === dayOfWeek)?.label || 'N/A'
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
              <h5>Gerenciar Horários</h5>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Novo Horário
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Profissional</th>
                    <th>Dia da Semana</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map(schedule => (
                    <tr key={schedule.id}>
                      <td>{schedule.professionalName}</td>
                      <td>{getDayName(schedule.dayOfWeek)}</td>
                      <td>{schedule.startTime} - {schedule.endTime}</td>
                      <td>
                        <Button
                          variant={schedule.active ? 'success' : 'secondary'}
                          size="sm"
                          onClick={() => toggleActive(schedule.id)}
                        >
                          {schedule.active ? 'Ativo' : 'Inativo'}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
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
          <Modal.Title>Novo Horário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Profissional</Form.Label>
              <Form.Select
                value={formData.professionalId}
                onChange={(e) => setFormData({...formData, professionalId: e.target.value})}
                required
              >
                <option value="">Selecione um profissional</option>
                {professionals.map(prof => (
                  <option key={prof.id} value={prof.id}>{prof.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dia da Semana</Form.Label>
              <Form.Select
                value={formData.dayOfWeek}
                onChange={(e) => setFormData({...formData, dayOfWeek: e.target.value})}
                required
              >
                <option value="">Selecione um dia</option>
                {daysOfWeek.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Horário Início</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Horário Fim</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
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
              Criar Horário
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManageSchedules