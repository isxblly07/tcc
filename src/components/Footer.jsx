import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TimeRight</h3>
            <p className="text-gray-300">
              Sistema completo de agendamento online para salões, barbearias e muito mais.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Início</a></li>
              <li><a href="/servicos" className="hover:text-white">Serviços</a></li>
              <li><a href="/contato" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="text-gray-300 space-y-2">
              <p>📧 contato@timeright.com</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 TimeRight. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer