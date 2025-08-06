const express = require('express')
const { getPool, sql } = require('../config/database')

const router = express.Router()

// Listar todos os profissionais
router.get('/', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.request()
      .query('SELECT * FROM Profissionais WHERE ativo = 1 ORDER BY nome')
    
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar profissionais' })
  }
})

// Buscar horários disponíveis de um profissional
router.get('/:id/horarios/:data', async (req, res) => {
  try {
    const { id, data } = req.params
    const pool = getPool()
    
    // Gerar horários disponíveis (8h às 18h, de hora em hora)
    const horarios = []
    for (let hora = 8; hora <= 17; hora++) {
      horarios.push(`${hora.toString().padStart(2, '0')}:00`)
    }
    
    // Verificar quais estão ocupados
    const ocupados = await pool.request()
      .input('profissionalId', sql.Int, id)
      .input('data', sql.Date, data)
      .query(`
        SELECT DISTINCT FORMAT(hora, 'HH:mm') as horario
        FROM Agendamentos 
        WHERE id_profissional = @profissionalId 
        AND data = @data 
        AND status IN ('confirmado', 'pendente')
      `)
    
    const horariosOcupados = ocupados.recordset.map(h => h.horario)
    const horariosDisponiveis = horarios.filter(h => !horariosOcupados.includes(h))
    
    res.json(horariosDisponiveis)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar horários' })
  }
})

module.exports = router