# TimeRight - Sistema de Agendamento Online

Sistema completo de agendamento online para salões de beleza, barbearias, oficinas, buffets e eventos.

## 🚀 Tecnologias

### Frontend
- **React 18** com Vite
- **TailwindCSS** para estilização
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **JWT** para autenticação

### Backend
- **Node.js** com Express
- **SQL Server** como banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd timeright
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
- Instale o SQL Server
- Execute o script `backend/config/database.sql` para criar as tabelas
- Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 4. Inicie o servidor backend
```bash
npm run server
```

### 5. Inicie o frontend
```bash
npm run dev
```

## 🎯 Funcionalidades

### 👤 Área do Cliente
- ✅ Cadastro/Login com validação
- ✅ Catálogo de serviços com filtros
- ✅ Agendamento com seleção de profissional
- ✅ Histórico de agendamentos
- ✅ Chatbot inteligente para suporte
- ✅ Interface responsiva com modo escuro

### 🧑‍💼 Área Administrativa
- ✅ Login seguro para administradores
- ✅ Dashboard com métricas em tempo real
- ✅ Gerenciamento completo de agendamentos
- ✅ CRUD de serviços e profissionais
- ✅ Relatórios detalhados
- ✅ Controle de status dos agendamentos

## 🗃️ Estrutura do Banco de Dados

### Principais Tabelas:
- **Usuarios** - Dados dos clientes
- **Administradores** - Dados dos administradores
- **Servicos** - Catálogo de serviços
- **Profissionais** - Cadastro de profissionais
- **Agendamentos** - Controle de agendamentos
- **Pagamentos** - Controle financeiro
- **Avaliacoes** - Sistema de avaliações
- **Promocoes** - Gestão de promoções

## 🤖 Chatbot (TimeBot)

O sistema inclui um chatbot conversacional com:
- Suporte a agendamentos
- Informações sobre serviços
- Suporte técnico básico
- Respostas automáticas inteligentes

## 📱 Responsividade

- ✅ Design mobile-first
- ✅ Compatível com tablets e desktops
- ✅ Modo escuro/claro
- ✅ Acessibilidade básica

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Senhas criptografadas com bcrypt
- ✅ Proteção de rotas
- ✅ Validação de dados
- ✅ Middleware de segurança

## 🚀 Deploy

### Frontend
```bash
npm run build
# Deploy da pasta dist/ para seu servidor web
```

### Backend
```bash
# Configure as variáveis de ambiente de produção
# Deploy para seu servidor Node.js
```

## 📄 API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/admin/login` - Login de administrador

### Serviços
- `GET /api/servicos` - Listar serviços
- `GET /api/servicos/:id` - Buscar serviço por ID

### Agendamentos
- `POST /api/agendamentos` - Criar agendamento
- `GET /api/agendamentos/meus` - Listar agendamentos do usuário

### Admin
- `GET /api/admin/stats` - Estatísticas do dashboard
- `GET /api/admin/agendamentos` - Gerenciar agendamentos
- `POST /api/admin/servicos` - Criar serviço
- `PUT /api/admin/servicos/:id` - Atualizar serviço

## 👥 Usuários de Teste

### Cliente
- **Email:** cliente@teste.com
- **Senha:** 123456

### Administrador
- **Email:** admin@timeright.com
- **Senha:** admin123

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- 📧 contato@timeright.com
- 📱 (11) 99999-9999

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.