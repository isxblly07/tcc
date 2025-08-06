import React, { useState } from 'react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou o TimeBot 🤖 Como posso ajudá-lo hoje?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const responses = {
    'oi': 'Olá! Como posso ajudá-lo?',
    'olá': 'Oi! Em que posso ser útil?',
    'agendar': 'Para agendar um serviço, acesse a página de Serviços e escolha o que deseja!',
    'cancelar': 'Para cancelar um agendamento, entre em contato conosco ou acesse sua área do cliente.',
    'preços': 'Nossos preços variam por serviço. Confira na página de Serviços!',
    'horários': 'Funcionamos de segunda a sábado, das 8h às 18h.',
    'contato': 'Entre em contato pelo telefone (11) 99999-9999 ou email contato@timeright.com',
    'default': 'Desculpe, não entendi. Pode reformular sua pergunta? Ou digite "ajuda" para ver o que posso fazer.'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])

    const key = input.toLowerCase()
    const response = responses[key] || responses.default
    
    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: response, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
    }, 1000)

    setInput('')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50">
          <div className="bg-primary text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">TimeBot - Assistente Virtual</h3>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 input"
              />
              <button
                onClick={handleSend}
                className="btn-primary"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot