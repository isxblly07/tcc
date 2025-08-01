import api from './api'

export const authService = {
  async login(credentials) {
    try {
      const { data: users } = await api.get('/users')
      const user = users.find(user => 
        (user.email === credentials.email || user.phone === credentials.email) && 
        user.password === credentials.password
      )
      
      if (!user) {
        throw new Error('Credenciais inválidas')
      }

      const token = `token_${user.id}_${Date.now()}`
      return { user, token }
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error(error.message || 'Erro ao fazer login. Verifique suas credenciais.')
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
      console.error('Erro no registro:', error)
      throw new Error(error.message || 'Erro ao criar conta. Tente novamente.')
    }
  }
}