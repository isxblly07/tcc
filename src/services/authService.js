import api from './api'

export const authService = {
  async login(credentials) {
    try {
      const { data: users } = await api.get('/users')
      const user = users.find(u => 
        (u.email === credentials.email || u.phone === credentials.email) && 
        u.password === credentials.password
      )
      
      if (!user) {
        throw new Error('Credenciais inválidas')
      }

      const token = `token_${user.id}_${Date.now()}`
      return { user, token }
    } catch (error) {
      throw new Error('Erro ao fazer login')
    }
  },

  async register(userData) {
    try {
      const { data: users } = await api.get('/users')
      const existingUser = users.find(u => u.email === userData.email)
      
      if (existingUser) {
        throw new Error('Email já cadastrado')
      }

      const newUser = {
        ...userData,
        id: Date.now(),
        role: 'client'
      }

      await api.post('/users', newUser)
      const token = `token_${newUser.id}_${Date.now()}`
      
      return { user: newUser, token }
    } catch (error) {
      throw new Error('Erro ao criar conta')
    }
  }
}