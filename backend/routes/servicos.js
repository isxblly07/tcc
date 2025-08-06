const express = require('express')
const { getPool, sql } = require('../config/database')

const router = express.Router()

// Listar todos os serviços
router.get('/', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.request()
      .query('SELECT * FROM Servicos WHERE ativo = 1 ORDER BY categoria, nome')
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar serviços' })
  }
})

// Buscar serviço por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Servicos WHERE id = @id AND ativo = 1')
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' })
    }
    
    res.json(result.recordset[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar serviço' })
  }
})

module.exports = router