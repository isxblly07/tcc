import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap'
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import api from '../../services/api'
import SidebarAdmin from '../../components/admin/SidebarAdmin'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm])

  const loadUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      setUsers(response.data)
    } catch (error) {
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    if (searchTerm) {
      setFilteredUsers(users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    } else {
      setFilteredUsers(users)
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/admin/users/${userId}`)
        toast.success('Usuário excluído com sucesso')
        loadUsers()
      } catch (error) {
        toast.error('Erro ao excluir usuário')
      }
    }
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
              <h5>Gerenciar Usuários</h5>
              <Form.Control
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px' }}
              />
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Role</th>
                    <th>Data Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(user)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
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
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser.email}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.phone}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary">
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ManageUsers