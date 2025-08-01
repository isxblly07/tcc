#!/usr/bin/env node

import { spawn } from 'child_process';
import http from 'http';

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001', (res) => {
      // Se receber resposta HTML, significa que não é o json-server
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (data.includes('<!DOCTYPE html>')) {
          resolve(false); // Não é json-server
        } else {
          resolve(true); // É json-server
        }
      });
    });
    
    req.on('error', () => {
      resolve(false); // Servidor não está rodando
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startServer() {
  const isRunning = await checkServer();
  
  if (!isRunning) {
    console.log('🚀 Iniciando json-server...');
    const server = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3001'], {
      stdio: 'inherit',
      shell: true
    });
    
    server.on('error', (err) => {
      console.error('❌ Erro ao iniciar servidor:', err);
    });
    
    // Aguarda um pouco para o servidor iniciar
    setTimeout(async () => {
      const isNowRunning = await checkServer();
      if (isNowRunning) {
        console.log('✅ JSON Server iniciado com sucesso na porta 3001');
      } else {
        console.log('⚠️  Verifique se o json-server foi instalado: npm install -g json-server');
      }
    }, 3000);
  } else {
    console.log('✅ JSON Server já está rodando na porta 3001');
  }
}

startServer();