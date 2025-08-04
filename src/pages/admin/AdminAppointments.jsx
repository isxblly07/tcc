import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap'
import { FaCalendar, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/Layout/AdminNavbar'

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [users, setUsers] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [appointmentsRes, servicesRes, usersRes, professionalsRes] = await Promise.all([
        fetch('http://localhost:3001/appointments'),
        fetch('http://localhost:3001/services'),
        fetch('http://localhost:3001/users'),
        fetch('http://localhost:3001/professionals')
      ])

      const appointmentsData = await appointmentsRes.json()
      const servicesData = await servicesRes.json()
      const usersData = await usersRes.json()
      const professionalsData = await professionalsRes.json()

      setAppointments(appointmentsData)
      setServices(servicesData)
      setUsers(usersData)
      setProfessionals(professionalsData)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    }
  }

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.name : 'Serviço não encontrado'
  }

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : 'Usuário não encontrado'
  }

  const getProfessionalName = (professionalId) => {
    const professional = professionals.find(p => p.id === professionalId)
    return professional ? professional.name : 'Profissional não encontrado'
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const appointment = appointments.find(a => a.id === appointmentId)
      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...appointment, status: newStatus })
      })

      if (response.ok) {
        toast.success('Status atualizado!')
        fetchData()
      }
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Deseja excluir este agendamento?')) {
      try {
        await fetch(`http://localhost:3001/appointments/${appointmentId}`, { method: 'DELETE' })
        toast.success('Agendamento excluído!')
        fetchData()
      } catch (error) {
        toast.error('Erro ao excluir agendamento')
      }
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: { bg: 'success', text: 'Confirmado' },
      pending: { bg: 'warning', text: 'Pendente' },
      cancelled: { bg: 'danger', text: 'Cancelado' },
      completed: { bg: 'info', text: 'Concluído' }
    }
    const statusInfo = statusMap[status] || { bg: 'secondary', text: status }
    return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>
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
                <FaCalendar className="me-2" />
                Gerenciar Agendamentos
              </h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Profissional</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{getUserName(appointment.userId)}</td>
                      <td>{getServiceName(appointment.serviceId)}</td>
                      <td>{getProfessionalName(appointment.professionalId)}</td>
                      <td>{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                      <td>{appointment.time}</td>
                      <td>{getStatusBadge(appointment.status)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Form.Select
                            size="sm"
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                            style={{ width: '120px' }}
                          >
                            <option value="pending">Pendente</option>
                            <option value="confirmed">Confirmado</option>
                            <option value="completed">Concluído</option>
                            <option value="cancelled">Cancelado</option>
                          </Form.Select>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </>
  )
}

export default AdminAppointments