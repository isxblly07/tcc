import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

const Header = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          TimeRight
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary">
            Início
          </Link>
          <Link to="/servicos" className="text-gray-700 dark:text-gray-300 hover:text-primary">
            Serviços
          </Link>
          {user && (
            <Link to="/agendamento" className="text-gray-700 dark:text-gray-300 hover:text-primary">
              Agendar
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-gray-300">
                Olá, {user.nome}
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="btn-secondary">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn-primary">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header