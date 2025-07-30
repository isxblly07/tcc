#!/bin/bash

echo "🚀 Iniciando TimeRight..."

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "🔧 Iniciando json-server..."
npm run server &

echo "⚡ Iniciando aplicação React..."
npm run dev

echo "✅ TimeRight iniciado com sucesso!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 API Mock: http://localhost:3001"