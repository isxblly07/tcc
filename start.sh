#!/bin/bash

echo "🚀 Iniciando TimeRight - Sistema de Agendamento"
echo "=============================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Instalar dependências se não existirem
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Criar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "⚙️ Criando arquivo de configuração..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Configure suas variáveis de ambiente."
fi

echo ""
echo "🎯 Para usar o TimeRight:"
echo "1. Configure o SQL Server e execute o script backend/config/database.sql"
echo "2. Edite o arquivo .env com suas configurações de banco"
echo "3. Execute 'npm run server' em um terminal para o backend"
echo "4. Execute 'npm run dev' em outro terminal para o frontend"
echo ""
echo "📚 Acesse o README.md para instruções detalhadas"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "👤 Usuários de teste:"
echo "   Admin: admin@timeright.com / admin123"
echo "   Cliente: cliente@teste.com / 123456"