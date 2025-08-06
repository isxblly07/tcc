import React, { useState, useEffect } from 'react'
import api from '../../services/api'

const Relatorios = () => {
  const [periodo, setPeriodo] = useState('mes')
  const [dados, setDados] = useState({
    receita: [],
    servicos: [],
    profissionais: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatorios()
  }, [periodo])

  const fetchRelatorios = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/admin/relatorios?periodo=${periodo}`)
      setDados(response.data)
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportarCSV = async () => {
    try {
      const response = await api.get(`/admin/relatorios/export?periodo=${periodo}`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `relatorio-${periodo}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Erro ao exportar:', error)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Carregando relatórios...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        
        <div className="flex space-x-4">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="input w-auto"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="trimestre">Este Trimestre</option>
            <option value="ano">Este Ano</option>
          </select>
          
          <button
            onClick={exportarCSV}
            className="btn-primary"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Gráfico de Receita */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Receita por Período</h2>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-gray-600 dark:text-gray-300">
              Gráfico de receita seria implementado aqui
            </p>
            <p className="text-2xl font-bold text-primary mt-2">
              R$ {dados.receita.reduce((acc, item) => acc + item.valor, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Serviços Mais Populares */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Serviços Mais Populares</h2>
          <div className="space-y-3">
            {dados.servicos.map((servico, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{servico.nome}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(servico.quantidade / dados.servicos[0]?.quantidade * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold">{servico.quantidade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance dos Profissionais */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Performance dos Profissionais</h2>
          <div className="space-y-3">
            {dados.profissionais.map((prof, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{prof.nome}</span>
                <div className="text-right">
                  <div className="font-semibold">{prof.atendimentos} atendimentos</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    R$ {prof.receita.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Resumo do Período</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {dados.receita.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total de Agendamentos
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              R$ {dados.receita.reduce((acc, item) => acc + item.valor, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Receita Total
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              R$ {dados.receita.length > 0 ? (dados.receita.reduce((acc, item) => acc + item.valor, 0) / dados.receita.length).toFixed(2) : '0.00'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Ticket Médio
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {dados.servicos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Serviços Ativos
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorios