const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

const app = express()
const PORT = 3001
const JWT_SECRET = 'timeright-secret-key'

// Middleware
app.use(cors())
app.use(express.json())

// Conectar ao banco
const dbPath = path.join(__dirname, 'database', 'timeright.db')
const db = new sqlite3.Database(dbPath)

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Rotas de autenticação
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' })
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    })
  })
})

app.post('/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body

  const hashedPassword = bcrypt.hashSync(password, 10)

  db.run(
    'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, hashedPassword],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email já cadastrado' })
        }
        return res.status(500).json({ error: 'Erro no servidor' })
      }

      const token = jwt.sign(
        { id: this.lastID, email, role: 'client' },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.json({
        token,
        user: {
          id: this.lastID,
          name,
          email,
          phone,
          role: 'client'
        }
      })
    }
  )
})

// Rotas de serviços
app.get('/services', (req, res) => {
  db.all('SELECT * FROM services WHERE active = 1', (err, services) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' })
    }
    res.json(services)
  })
})

// Rotas de agendamentos
app.get('/appointments', authenticateToken, (req, res) => {
  const query = `
    SELECT a.*, s.name as service_name, s.price, s.duration 
    FROM appointments a 
    JOIN services s ON a.service_id = s.id 
    WHERE a.user_id = ?
    ORDER BY a.date DESC, a.time DESC
  `
  
  db.all(query, [req.user.id], (err, appointments) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' })
    }
    res.json(appointments)
  })
})

app.post('/appointments', authenticateToken, (req, res) => {
  const { service_id, date, time } = req.body

  db.run(
    'INSERT INTO appointments (user_id, service_id, date, time) VALUES (?, ?, ?, ?)',
    [req.user.id, service_id, date, time],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro no servidor' })
      }
      res.json({ id: this.lastID, message: 'Agendamento criado com sucesso' })
    }
  )
})

// Rota para admin - todos os agendamentos
app.get('/admin/appointments', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  const query = `
    SELECT a.*, s.name as service_name, s.price, u.name as user_name, u.phone as user_phone
    FROM appointments a 
    JOIN services s ON a.service_id = s.id 
    JOIN users u ON a.user_id = u.id
    ORDER BY a.date DESC, a.time DESC
  `
  
  db.all(query, (err, appointments) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' })
    }
    res.json(appointments)
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log(`Banco de dados: ${dbPath}`)
})