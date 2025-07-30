# Deploy do TimeRight

## 🚀 Deploy no Vercel

1. **Conecte seu repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório do TimeRight

2. **Configurações automáticas:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar

## ⚠️ Importante para Produção

Como o projeto usa `json-server` para mock da API, você precisará:

### Opção 1: API Mock Online
```bash
# Instalar json-server globalmente
npm install -g json-server

# Fazer deploy do db.json em um serviço como:
# - Railway
# - Heroku
# - Render
```

### Opção 2: Substituir por API Real
Altere as URLs em `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://sua-api-real.com/api',
  timeout: 10000,
})
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` para produção:
```
VITE_API_URL=https://sua-api.com
VITE_APP_NAME=TimeRight
```

## 📱 PWA (Opcional)

Para transformar em PWA, adicione:
```bash
npm install vite-plugin-pwa
```

## 🌐 Domínio Personalizado

No Vercel:
1. Vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções