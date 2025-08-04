import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap'
import { FaUsers, FaCalendar, FaDollarSign, FaChartLine, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/Layout/AdminNavbar'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  })
  const [users, setUsers] = useState([])
  const [appointments, setAppointments] = useState([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'client'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, appointmentsRes] = await Promise.all([
        fetch('http://localhost:3001/users'),
        fetch('http://localhost:3001/appointments')
      ])

      const usersData = await usersRes.json()
      const appointmentsData = await appointmentsRes.json()

      setUsers(usersData)
      setAppointments(appointmentsData)

      setStats({
        totalUsers: usersData.length,
        totalAppointments: appointmentsData.length,
        totalRevenue: appointmentsData.length * 75, // Média de preço
        monthlyGrowth: 15.2
      })
    } catch (error) {
      toast.error('Erro ao carregar dados')
    }
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = selectedUser ? 'PUT' : 'POST'
      const url = selectedUser 
        ? `http://localhost:3001/users/${selectedUser.id}`
        : 'http://localhost:3001/users'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userForm,
          id: selectedUser?.id || Date.now(),
          password: selectedUser?.password || '123456'
        })
      })

      if (response.ok) {
        toast.success(selectedUser ? 'Usuário atualizado!' : 'Usuário criado!')
        setShowUserModal(false)
        fetchData()
        resetForm()
      }
    } catch (error) {
      toast.error('Erro ao salvar usuário')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Deseja excluir este usuário?')) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, { method: 'DELETE' })
        toast.success('Usuário excluído!')
        fetchData()
      } catch (error) {
        toast.error('Erro ao excluir usuário')
      }
    }
  }

  const resetForm = () => {
    setUserForm({ name: '', email: '', phone: '', role: 'client' })
    setSelectedUser(null)
  }

  const openUserModal = (user = null) => {
    if (user) {
      setSelectedUser(user)
      setUserForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      })
    } else {
      resetForm()
    }
    setShowUserModal(true)
  }

  return (
    <>
      <AdminNavbar />
      <Container fluid className="py-4">
        <h2 className="mb-4">Dashboard Administrativo</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaUsers size={30} className="text-primary mb-2" />
              <h4>{stats.totalUsers}</h4>
              <p className="text-muted">Total de Usuários</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaCalendar size={30} className="text-success mb-2" />
              <h4>{stats.totalAppointments}</h4>
              <p className="text-muted">Agendamentos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaDollarSign size={30} className="text-warning mb-2" />
              <h4>R$ {stats.totalRevenue}</h4>
              <p className="text-muted">Receita Total</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartLine size={30} className="text-info mb-2" />
              <h4>{stats.monthlyGrowth}%</h4>
              <p className="text-muted">Crescimento Mensal</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Users Management */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>Gerenciar Usuários</h5>
          <Button variant="primary" onClick={() => openUserModal()}>
            <FaPlus className="me-2" />
            Novo Usuário
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                      {user.role === 'admin' ? 'Admin' : 'Cliente'}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => openUserModal(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUserSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                value={userForm.phone}
                onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Usuário</Form.Label>
              <Form.Select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value})}
              >
                <option value="client">Cliente</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {selectedUser ? 'Atualizar' : 'Criar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </>
  )
}

export default AdminDashboard