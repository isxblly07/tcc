import api from './api'

class AuthService {
  async login(email, password) {
    try {
      const response = await api.get('/users')
      const users = response.data
      
      const user = users.find(u => 
        u.email === email && 
        u.password === password &&
        u.active !== false
      )

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', `token_${user.id}`)
        return { success: true, user }
      } else {
        return { success: false, message: 'Credenciais inválidas' }
      }
    } catch (error) {
      return { success: false, message: 'Erro ao conectar com o servidor' }
    }
  }

  async register(userData) {
    try {
      const response = await api.get('/users')
      const users = response.data
      
      // Verificar se email já existe
      const existingUser = users.find(u => u.email === userData.email)
      if (existingUser) {
        return { success: false, message: 'Email já cadastrado' }
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'client',
        createdAt: new Date().toISOString(),
        active: true
      }

      await api.post('/users', newUser)
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, message: 'Erro ao criar usuário' }
    }
  }

  async adminLogin(email, password) {
    try {
      const response = await api.get('/users')
      const users = response.data
      
      const admin = users.find(u => 
        u.email === email && 
        u.password === password &&
        u.role === 'admin' &&
        u.active !== false
      )

      if (admin) {
        localStorage.setItem('user', JSON.stringify(admin))
        localStorage.setItem('token', `admin_token_${admin.id}`)
        return { success: true, user: admin }
      } else {
        return { success: false, message: 'Credenciais inválidas ou usuário não é administrador' }
      }
    } catch (error) {
      return { success: false, message: 'Erro ao conectar com o servidor' }
    }
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  isAdmin() {
    const user = this.getCurrentUser()
    return user && user.role === 'admin'
  }

  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      const updatedUser = response.data
      
      // Atualizar localStorage se for o usuário atual
      const currentUser = this.getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, message: 'Erro ao atualizar usuário' }
    }
  }

  async checkServerConnection() {
    try {
      await api.get('/users')
      return true
    } catch (error) {
      console.error('Erro de conexão com o servidor:', error)
      return false
    }
  }

  async enable2FA(userId) {
    // Simulação de ativação 2FA
    const qrCode = `timeright_2fa_${userId}`
    const backupCodes = [
      'ABC123DEF456',
      'GHI789JKL012',
      'MNO345PQR678',
      'STU901VWX234',
      'YZA567BCD890'
    ]
    return { qrCode, backupCodes }
  }

  async verify2FA(userId, code) {
    // Simulação de verificação 2FA
    if (code === '123456') {
      return { success: true }
    }
    throw new Error('Código inválido')
  }

  async disable2FA(userId) {
    // Simulação de desativação 2FA
    return { success: true }
  }
}

export default new AuthService()