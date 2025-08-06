const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const servicosRoutes = require('./routes/servicos')
const agendamentosRoutes = require('./routes/agendamentos')
const profissionaisRoutes = require('./routes/profissionais')
const adminRoutes = require('./routes/admin')
const { connectDB } = require('./config/database')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/servicos', servicosRoutes)
app.use('/api/agendamentos', agendamentosRoutes)
app.use('/api/profissionais', profissionaisRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Inicializar banco e servidor
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
      console.log(`📊 API disponível em http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

startServer()