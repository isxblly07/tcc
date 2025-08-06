import React, { useState, useEffect } from 'react'
import api from '../../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    agendamentos: 0,
    clientes: 0,
    receita: 0,
    servicos: 0
  })
  const [agendamentosRecentes, setAgendamentosRecentes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, agendamentosRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/agendamentos/recentes')
        ])
        setStats(statsRes.data)
        setAgendamentosRecentes(agendamentosRes.data)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
      
      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-2xl font-bold text-primary">{stats.agendamentos}</h3>
          <p className="text-gray-600 dark:text-gray-300">Agendamentos</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-2xl font-bold text-primary">{stats.clientes}</h3>
          <p className="text-gray-600 dark:text-gray-300">Clientes</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="text-2xl font-bold text-primary">R$ {stats.receita.toFixed(2)}</h3>
          <p className="text-gray-600 dark:text-gray-300">Receita</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="text-2xl font-bold text-primary">{stats.servicos}</h3>
          <p className="text-gray-600 dark:text-gray-300">Serviços</p>
        </div>
      </div>

      {/* Agendamentos Recentes */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Agendamentos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Cliente</th>
                <th className="text-left py-2">Serviço</th>
                <th className="text-left py-2">Data</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {agendamentosRecentes.map(agendamento => (
                <tr key={agendamento.id} className="border-b">
                  <td className="py-2">{agendamento.cliente}</td>
                  <td className="py-2">{agendamento.servico}</td>
                  <td className="py-2">{agendamento.data}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      agendamento.status === 'confirmado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agendamento.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard