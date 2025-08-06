const express = require('express')
const { getPool, sql } = require('../config/database')
const auth = require('../middleware/auth')

const router = express.Router()

// Criar agendamento
router.post('/', auth, async (req, res) => {
  try {
    const { servicoId, profissionalId, data, horario } = req.body
    const userId = req.user.id
    const pool = getPool()
    
    // Verificar se horário está disponível
    const horarioDisponivel = await pool.request()
      .input('profissionalId', sql.Int, profissionalId)
      .input('data', sql.Date, data)
      .input('horario', sql.Time, horario)
      .query(`
        SELECT id FROM HorariosDisponiveis 
        WHERE id_profissional = @profissionalId 
        AND data = @data 
        AND horario = @horario 
        AND status = 'disponivel'
      `)
    
    if (horarioDisponivel.recordset.length === 0) {
      return res.status(400).json({ error: 'Horário não disponível' })
    }
    
    // Criar agendamento
    await pool.request()
      .input('userId', sql.Int, userId)
      .input('servicoId', sql.Int, servicoId)
      .input('profissionalId', sql.Int, profissionalId)
      .input('data', sql.Date, data)
      .input('horario', sql.Time, horario)
      .query(`
        INSERT INTO Agendamentos (id_usuario, id_servico, id_profissional, data, hora)
        VALUES (@userId, @servicoId, @profissionalId, @data, @horario)
      `)
    
    // Marcar horário como ocupado
    await pool.request()
      .input('profissionalId', sql.Int, profissionalId)
      .input('data', sql.Date, data)
      .input('horario', sql.Time, horario)
      .query(`
        UPDATE HorariosDisponiveis 
        SET status = 'ocupado'
        WHERE id_profissional = @profissionalId 
        AND data = @data 
        AND horario = @horario
      `)
    
    res.status(201).json({ message: 'Agendamento criado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar agendamento' })
  }
})

// Listar agendamentos do usuário
router.get('/meus', auth, async (req, res) => {
  try {
    const userId = req.user.id
    const pool = getPool()
    
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(`
        SELECT 
          a.id, a.data, a.hora, a.status,
          s.nome as servico, s.preco,
          p.nome as profissional
        FROM Agendamentos a
        JOIN Servicos s ON a.id_servico = s.id
        JOIN Profissionais p ON a.id_profissional = p.id
        WHERE a.id_usuario = @userId
        ORDER BY a.data DESC, a.hora DESC
      `)
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar agendamentos' })
  }
})

module.exports = router