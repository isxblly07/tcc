import React, { useState, useEffect } from 'react'
import api from '../../services/api'

const GerenciarServicos = () => {
  const [servicos, setServicos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingServico, setEditingServico] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    duracao: '',
    preco: '',
    descricao: ''
  })

  useEffect(() => {
    fetchServicos()
  }, [])

  const fetchServicos = async () => {
    try {
      const response = await api.get('/admin/servicos')
      setServicos(response.data)
    } catch (error) {
      console.error('Erro ao carregar serviços:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingServico) {
        await api.put(`/admin/servicos/${editingServico.id}`, formData)
      } else {
        await api.post('/admin/servicos', formData)
      }
      fetchServicos()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
    }
  }

  const handleEdit = (servico) => {
    setEditingServico(servico)
    setFormData(servico)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await api.delete(`/admin/servicos/${id}`)
        fetchServicos()
      } catch (error) {
        console.error('Erro ao excluir serviço:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      categoria: '',
      duracao: '',
      preco: '',
      descricao: ''
    })
    setEditingServico(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Serviços</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          Novo Serviço
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicos.map(servico => (
          <div key={servico.id} className="card">
            <h3 className="text-xl font-semibold mb-2">{servico.nome}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{servico.categoria}</p>
            <p className="text-sm mb-3">{servico.descricao}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">⏱️ {servico.duracao} min</span>
              <span className="font-bold text-primary">R$ {servico.preco}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(servico)}
                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(servico.id)}
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  required
                  className="input"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                >
                  <option value="">Selecione</option>
                  <option value="Cabelo">Cabelo</option>
                  <option value="Barba">Barba</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duração (min)</label>
                <input
                  type="number"
                  required
                  className="input"
                  value={formData.duracao}
                  onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="input"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  className="input"
                  rows="3"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                />
              </div>

              <div className="flex space-x-2">
                <button type="submit" className="flex-1 btn-primary">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GerenciarServicos