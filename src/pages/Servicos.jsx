import React, { useState, useEffect } from 'react'
import api from '../services/api'
import CardServico from '../components/CardServico'

const getCategoryIcon = (categoria) => {
  const icons = {
    'Cabelo': '💇‍♀️',
    'Barba': '🧔',
  
  }
  return icons[categoria] || '✨'
}

const Servicos = () => {
  const [servicos, setServicos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [loading, setLoading] = useState(true)

  const categorias = ['todos', 'Cabelo', 'Barba']

  // Dados de exemplo
  const servicosExemplo = [
    {
      id: 1,
      nome: 'Corte Masculino',
      categoria: 'Cabelo',
      duracao: 30,
      preco: 25.00,
      descricao: 'Corte moderno e estiloso para homens',
      imagem: 'https://images.unsplash.com/photo-1622286346003-c8b4473f4c6c?w=400'
    },
    {
      id: 2,
      nome: 'Corte Feminino',
      categoria: 'Cabelo',
      duracao: 45,
      preco: 35.00,
      descricao: 'Corte personalizado para mulheres',
      imagem: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
    },
    {
      id: 3,
      nome: 'Barba Completa',
      categoria: 'Barba',
      duracao: 20,
      preco: 15.00,
      descricao: 'Aparar e modelar barba profissionalmente',
      imagem: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400'
    },
    
    
    
  ]

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/servicos')
        setServicos(response.data)
      } catch (error) {
        console.error('Erro ao carregar serviços:', error)
        // Usar dados de exemplo se a API falhar
        setServicos(servicosExemplo)
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando serviços...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">💇‍♀️ Nossos Serviços</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubra nossa gama completa de serviços profissionais para todas as suas necessidades
        </p>
      </div>
      
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => setFiltro(categoria)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              filtro === categoria
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            {categoria === 'todos' ? '🎯 Todos' : `${getCategoryIcon(categoria)} ${categoria}`}
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
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum serviço encontrado para esta categoria.
          </p>
        </div>
      )}
      
      {/* Seção de destaque */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">✨ Por que escolher o TimeRight?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-semibold mb-2">Profissionais Qualificados</h4>
            <p className="text-blue-100">Equipe experiente e certificada</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⭐</div>
            <h4 className="font-semibold mb-2">Qualidade Premium</h4>
            <p className="text-blue-100">Produtos e serviços de alta qualidade</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold mb-2">Agendamento Fácil</h4>
            <p className="text-blue-100">Sistema online prático e rápido</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servicos