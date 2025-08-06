import React from 'react'
import { Link } from 'react-router-dom'
import Botao from './Botao'

const CardServico = ({ servico }) => {
  const getIcon = (categoria) => {
    const icons = {
      'Cabelo': '✂️',
      'Barba': '🪒',
      'Buffet': '🍽️',
      'Oficina': '🔧',
      'Eventos': '🎉'
    }
    return icons[categoria] || '⚙️'
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">
          {getIcon(servico.categoria)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {servico.nome}
          </h3>
          <p className="text-sm text-primary font-medium">
            {servico.categoria}
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {servico.descricao}
        </p>
        
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center text-gray-500 dark:text-gray-400">
            ⏱️ {servico.duracao} min
          </span>
          <span className="text-lg font-bold text-primary">
            R$ {servico.preco?.toFixed(2)}
          </span>
        </div>
        
        <Link
          to={`/agendamento?servico=${servico.id}`}
          className="block w-full"
        >
          <Botao className="w-full">
            Agendar Agora
          </Botao>
        </Link>
      </div>
    </div>
  )
}

export default CardServico