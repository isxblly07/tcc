import React, { useState, useEffect } from 'react'
import api from '../services/api'
import CardServico from '../components/CardServico'

const Servicos = () => {
  const [servicos, setServicos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [loading, setLoading] = useState(true)

  const categorias = ['todos', 'Cabelo', 'Barba', 'Buffet', 'Oficina', 'Eventos']

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/servicos')
        setServicos(response.data)
      } catch (error) {
        console.error('Erro ao carregar serviços:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServicos()
  }, [])

  const servicosFiltrados = filtro === 'todos' 
    ? servicos 
    : servicos.filter(s => s.categoria === filtro)

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Carregando serviços...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Nossos Serviços</h1>
      
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => setFiltro(categoria)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filtro === categoria
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {categoria === 'todos' ? 'Todos' : categoria}
          </button>
        ))}
      </div>

      {/* Grid de Serviços */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicosFiltrados.map(servico => (
          <CardServico key={servico.id} servico={servico} />
        ))}
      </div>

      {servicosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum serviço encontrado para esta categoria.
          </p>
        </div>
      )}
    </div>
  )
}

export default Servicos