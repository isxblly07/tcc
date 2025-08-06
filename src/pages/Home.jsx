import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-6">
          Bem-vindo ao TimeRight
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          O sistema completo de agendamento online para salões, barbearias, oficinas e muito mais.
        </p>
        <div className="space-x-4">
          <Link to="/servicos" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ver Serviços
          </Link>
          <Link to="/cadastro" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Cadastre-se
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Por que escolher o TimeRight?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Agendamento Fácil</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Agende seus serviços em poucos cliques, escolha data, horário e profissional.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Pagamento Online</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pague com segurança via PIX, cartão ou carteiras digitais.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">Assistente Virtual</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tire dúvidas e faça agendamentos com nosso chatbot inteligente.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Nossos Serviços
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['Cabelo', 'Barba', 'Buffet', 'Oficina'].map(service => (
            <div key={service} className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">
                {service === 'Cabelo' && '✂️'}
                {service === 'Barba' && '🪒'}
                {service === 'Buffet' && '🍽️'}
                {service === 'Oficina' && '🔧'}
              </div>
              <h3 className="font-semibold">{service}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/servicos" className="btn-primary">
            Ver Todos os Serviços
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home