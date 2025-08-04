#!/bin/bash

echo "🗄️  Inicializando banco de dados SQLite..."
node database/init.cjs

echo "🚀 Iniciando servidor..."
node server.cjs