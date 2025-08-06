const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getPool, sql } = require('../config/database')

const router = express.Router()

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body
    const pool = getPool()
    
    // Verificar se email já existe
    const existingUser = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id FROM Usuarios WHERE email = @email')
    
    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }
    
    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)
    
    // Inserir usuário
    await pool.request()
      .input('nome', sql.NVarChar, nome)
      .input('email', sql.NVarChar, email)
      .input('telefone', sql.NVarChar, telefone)
      .input('senha_hash', sql.NVarChar, senhaHash)
      .query('INSERT INTO Usuarios (nome, email, telefone, senha_hash) VALUES (@nome, @email, @telefone, @senha_hash)')
    
    res.status(201).json({ message: 'Usuário criado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const pool = getPool()
    
    // Buscar usuário
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id, nome, email, senha_hash FROM Usuarios WHERE email = @email')
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    const user = result.recordset[0]
    
    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, user.senha_hash)
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    )
    
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Login de administrador
router.post('/admin/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const pool = getPool()
    
    // Buscar admin
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id, nome, email, senha_hash FROM Administradores WHERE email = @email AND ativo = 1')
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    const admin = result.recordset[0]
    
    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, admin.senha_hash)
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    // Gerar token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    )
    
    res.json({
      token,
      user: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
        role: 'admin'
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    res.json({ user: decoded })
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
})

module.exports = router