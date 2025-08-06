import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ThemeProvider } from './hooks/useTheme'

// Pages
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Agendamento from './pages/Agendamento'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

// Admin Pages
import LoginAdmin from './pages/Admin/LoginAdmin'
import Dashboard from './pages/Admin/Dashboard'
import GerenciarServicos from './pages/Admin/GerenciarServicos'
import Agendamentos from './pages/Admin/Agendamentos'
import Relatorios from './pages/Admin/Relatorios'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/agendamento" element={<Agendamento />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/servicos" element={<GerenciarServicos />} />
                <Route path="/admin/agendamentos" element={<Agendamentos />} />
                <Route path="/admin/relatorios" element={<Relatorios />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App