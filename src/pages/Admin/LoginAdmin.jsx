import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/admin/login', formData)
      localStorage.setItem('adminToken', response.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Credenciais inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Acesso Administrativo</h1>
            <p className="text-gray-600 dark:text-gray-300">TimeRight Admin</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                required
                className="input"
                value={formData.senha}
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin