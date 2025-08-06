const express = require('express')
const { getPool, sql } = require('../config/database')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

// Estatísticas do dashboard
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const pool = getPool()
    
    const [agendamentos, clientes, receita, servicos] = await Promise.all([
      pool.request().query('SELECT COUNT(*) as total FROM Agendamentos'),
      pool.request().query('SELECT COUNT(*) as total FROM Usuarios'),
      pool.request().query(`
        SELECT COALESCE(SUM(s.preco), 0) as total 
        FROM Agendamentos a 
        JOIN Servicos s ON a.id_servico = s.id 
        WHERE a.status = 'concluido'
      `),
      pool.request().query('SELECT COUNT(*) as total FROM Servicos WHERE ativo = 1')
    ])
    
    res.json({
      agendamentos: agendamentos.recordset[0].total,
      clientes: clientes.recordset[0].total,
      receita: receita.recordset[0].total,
      servicos: servicos.recordset[0].total
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas' })
  }
})

// Agendamentos recentes
router.get('/agendamentos/recentes', adminAuth, async (req, res) => {
  try {
    const pool = getPool()
    
    const result = await pool.request()
      .query(`
        SELECT TOP 10
          a.id, a.data, a.hora, a.status,
          u.nome as cliente,
          s.nome as servico,
          p.nome as profissional
        FROM Agendamentos a
        JOIN Usuarios u ON a.id_usuario = u.id
        JOIN Servicos s ON a.id_servico = s.id
        JOIN Profissionais p ON a.id_profissional = p.id
        ORDER BY a.data_criacao DESC
      `)
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar agendamentos' })
  }
})

// Gerenciar serviços
router.get('/servicos', adminAuth, async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.request()
      .query('SELECT * FROM Servicos ORDER BY categoria, nome')
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar serviços' })
  }
})

router.post('/servicos', adminAuth, async (req, res) => {
  try {
    const { nome, categoria, duracao, preco, descricao } = req.body
    const pool = getPool()
    
    await pool.request()
      .input('nome', sql.NVarChar, nome)
      .input('categoria', sql.NVarChar, categoria)
      .input('duracao', sql.Int, duracao)
      .input('preco', sql.Decimal, preco)
      .input('descricao', sql.NVarChar, descricao)
      .query(`
        INSERT INTO Servicos (nome, categoria, duracao, preco, descricao)
        VALUES (@nome, @categoria, @duracao, @preco, @descricao)
      `)
    
    res.status(201).json({ message: 'Serviço criado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar serviço' })
  }
})

router.put('/servicos/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { nome, categoria, duracao, preco, descricao } = req.body
    const pool = getPool()
    
    await pool.request()
      .input('id', sql.Int, id)
      .input('nome', sql.NVarChar, nome)
      .input('categoria', sql.NVarChar, categoria)
      .input('duracao', sql.Int, duracao)
      .input('preco', sql.Decimal, preco)
      .input('descricao', sql.NVarChar, descricao)
      .query(`
        UPDATE Servicos 
        SET nome = @nome, categoria = @categoria, duracao = @duracao, 
            preco = @preco, descricao = @descricao
        WHERE id = @id
      `)
    
    res.json({ message: 'Serviço atualizado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar serviço' })
  }
})

router.delete('/servicos/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    
    await pool.request()
      .input('id', sql.Int, id)
      .query('UPDATE Servicos SET ativo = 0 WHERE id = @id')
    
    res.json({ message: 'Serviço removido com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao remover serviço' })
  }
})

// Gerenciar agendamentos
router.get('/agendamentos', adminAuth, async (req, res) => {
  try {
    const pool = getPool()
    
    const result = await pool.request()
      .query(`
        SELECT 
          a.id, a.data, a.hora, a.status,
          u.nome as cliente,
          s.nome as servico,
          p.nome as profissional
        FROM Agendamentos a
        JOIN Usuarios u ON a.id_usuario = u.id
        JOIN Servicos s ON a.id_servico = s.id
        JOIN Profissionais p ON a.id_profissional = p.id
        ORDER BY a.data DESC, a.hora DESC
      `)
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar agendamentos' })
  }
})

router.put('/agendamentos/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const pool = getPool()
    
    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.NVarChar, status)
      .query('UPDATE Agendamentos SET status = @status WHERE id = @id')
    
    res.json({ message: 'Status atualizado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar status' })
  }
})

// Relatórios
router.get('/relatorios', adminAuth, async (req, res) => {
  try {
    const { periodo } = req.query
    const pool = getPool()
    
    // Dados mockados para exemplo
    const dados = {
      receita: [
        { data: '2024-01-01', valor: 1500.00 },
        { data: '2024-01-02', valor: 2000.00 }
      ],
      servicos: [
        { nome: 'Corte Masculino', quantidade: 25 },
        { nome: 'Barba Completa', quantidade: 15 }
      ],
      profissionais: [
        { nome: 'João Silva', atendimentos: 30, receita: 750.00 },
        { nome: 'Maria Santos', atendimentos: 20, receita: 1000.00 }
      ]
    }
    
    res.json(dados)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao gerar relatórios' })
  }
})

module.exports = router