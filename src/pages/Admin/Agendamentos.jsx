import React, { useState, useEffect } from 'react'
import api from '../../services/api'

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAgendamentos()
  }, [])

  const fetchAgendamentos = async () => {
    try {
      const response = await api.get('/admin/agendamentos')
      setAgendamentos(response.data)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, novoStatus) => {
    try {
      await api.put(`/admin/agendamentos/${id}/status`, { status: novoStatus })
      fetchAgendamentos()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const agendamentosFiltrados = filtro === 'todos' 
    ? agendamentos 
    : agendamentos.filter(a => a.status === filtro)

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Carregando agendamentos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Agendamentos</h1>
        
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="input w-auto"
        >
          <option value="todos">Todos</option>
          <option value="pendente">Pendentes</option>
          <option value="confirmado">Confirmados</option>
          <option value="cancelado">Cancelados</option>
          <option value="concluido">Concluídos</option>
        </select>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Cliente</th>
                <th className="text-left py-3">Serviço</th>
                <th className="text-left py-3">Profissional</th>
                <th className="text-left py-3">Data/Hora</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentosFiltrados.map(agendamento => (
                <tr key={agendamento.id} className="border-b">
                  <td className="py-3">{agendamento.cliente}</td>
                  <td className="py-3">{agendamento.servico}</td>
                  <td className="py-3">{agendamento.profissional}</td>
                  <td className="py-3">
                    {agendamento.data} às {agendamento.hora}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      agendamento.status === 'confirmado' ? 'bg-green-100 text-green-800' :
                      agendamento.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      agendamento.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {agendamento.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-1">
                      {agendamento.status === 'pendente' && (
                        <>
                          <button
                            onClick={() => updateStatus(agendamento.id, 'confirmado')}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => updateStatus(agendamento.id, 'cancelado')}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {agendamento.status === 'confirmado' && (
                        <button
                          onClick={() => updateStatus(agendamento.id, 'concluido')}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Concluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {agendamentosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum agendamento encontrado.
          </p>
        </div>
      )}
    </div>
  )
}

export default Agendamentos