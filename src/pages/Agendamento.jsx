import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'

const Agendamento = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [servicos, setServicos] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [formData, setFormData] = useState({
    servicoId: searchParams.get('servico') || '',
    profissionalId: '',
    data: '',
    horario: ''
  })
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        const [servicosRes, profissionaisRes] = await Promise.all([
          api.get('/servicos'),
          api.get('/profissionais')
        ])
        setServicos(servicosRes.data)
        setProfissionais(profissionaisRes.data)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData()
  }, [user, navigate])

  useEffect(() => {
    if (formData.profissionalId && formData.data) {
      fetchHorarios()
    }
  }, [formData.profissionalId, formData.data])

  const fetchHorarios = async () => {
    try {
      const response = await api.get(`/profissionais/${formData.profissionalId}/horarios/${formData.data}`)
      setHorariosDisponiveis(response.data)
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/agendamentos', formData)
      alert('Agendamento realizado com sucesso!')
      navigate('/')
    } catch (error) {
      alert('Erro ao realizar agendamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const servicoSelecionado = servicos.find(s => s.id === parseInt(formData.servicoId))

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Agendar Serviço</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Serviço</label>
            <select
              required
              className="input"
              value={formData.servicoId}
              onChange={(e) => setFormData({...formData, servicoId: e.target.value})}
            >
              <option value="">Selecione um serviço</option>
              {servicos.map(servico => (
                <option key={servico.id} value={servico.id}>
                  {servico.nome} - R$ {servico.preco.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {servicoSelecionado && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold">{servicoSelecionado.nome}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Duração: {servicoSelecionado.duracao} minutos
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Preço: R$ {servicoSelecionado.preco.toFixed(2)}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Profissional</label>
            <select
              required
              className="input"
              value={formData.profissionalId}
              onChange={(e) => setFormData({...formData, profissionalId: e.target.value})}
            >
              <option value="">Selecione um profissional</option>
              {profissionais.map(prof => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome} - {prof.especialidade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Data</label>
            <input
              type="date"
              required
              className="input"
              min={new Date().toISOString().split('T')[0]}
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
            />
          </div>

          {horariosDisponiveis.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Horário</label>
              <div className="grid grid-cols-3 gap-2">
                {horariosDisponiveis.map(horario => (
                  <button
                    key={horario}
                    type="button"
                    onClick={() => setFormData({...formData, horario})}
                    className={`p-2 rounded border text-sm ${
                      formData.horario === horario
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !formData.horario}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Agendamento