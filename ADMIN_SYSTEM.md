# Sistema de Administração - TimeRight

## 🔐 Autenticação Admin

### Login Admin
- **Rota:** `/admin/login`
- **Credenciais:** admin@timeright.com / Admin@123
- **Validação:** JWT com role 'admin'
- **Redirecionamento:** `/admin/dashboard`

### Cadastro Admin
- **Rota:** `/admin/register`
- **Validação de senha forte:** 8+ chars, maiúscula, número, símbolo
- **Email único:** Verificação no banco
- **Hash bcrypt:** Senha criptografada

## 📊 Páginas Administrativas

### 1. Dashboard (`/admin/dashboard`)
- **Estatísticas:** Total agendamentos, usuários, receita, serviços
- **Agendamentos recentes:** Últimos 5 agendamentos
- **Cards visuais:** Ícones e cores por categoria

### 2. Gerenciar Usuários (`/admin/users`)
- **Lista completa:** Todos os usuários cadastrados
- **Busca:** Por nome ou email
- **Ações:** Editar e excluir usuários
- **Filtros:** Por role (client/admin)

### 3. Gerenciar Promoções (`/admin/promotions`)
- **CRUD completo:** Criar, listar, editar, excluir
- **Campos:** Nome, serviço, desconto %, período
- **Validação:** Datas e percentuais

## 🗃️ Banco de Dados

### Tabelas Criadas
```sql
-- Administradores
administrators (id, name, email, password_hash, active, created_at)

-- Promoções
promotions (id, name, service_id, discount_percent, start_date, end_date, active, created_at)

-- Horários de Funcionamento
business_hours (id, day_of_week, open_time, close_time, active)

-- Notificações
notifications (id, user_id, type, message, sent, scheduled_for, created_at)

-- Avaliações
reviews (id, appointment_id, user_id, service_id, rating, comment, created_at)
```

## 🛡️ Segurança Implementada

### Proteção de Rotas
- **PrivateRouteAdmin:** Middleware de autenticação
- **Role validation:** Verificação de permissão admin
- **JWT tokens:** Autenticação stateless

### Validações
- **Senha forte:** Regex para critérios mínimos
- **Email único:** Constraint no banco
- **Hash bcrypt:** Criptografia de senhas
- **CORS:** Configurado no servidor

## 📁 Estrutura de Arquivos

```
src/
├── pages/admin/
│   ├── LoginAdmin.jsx
│   ├── RegisterAdmin.jsx
│   ├── Dashboard.jsx
│   ├── ManageUsers.jsx
│   └── ManagePromotions.jsx
├── components/admin/
│   ├── PrivateRouteAdmin.jsx
│   └── SidebarAdmin.jsx
├── services/admin/
│   └── adminService.js
└── hooks/
    └── useAdmin.js
```

## 🚀 Funcionalidades Implementadas

### ✅ Parte 1 - Autenticação
- [x] Login admin com validação JWT
- [x] Cadastro com senha forte
- [x] Proteção de rotas
- [x] Hash bcrypt de senhas

### ✅ Parte 2 - Páginas Admin
- [x] Dashboard com estatísticas
- [x] Gerenciamento de usuários
- [x] Gerenciamento de promoções
- [x] Sidebar de navegação

### ✅ Parte 3 - Banco de Dados
- [x] Tabelas administrativas
- [x] Relacionamentos FK
- [x] Dados iniciais (admin padrão)

## 🔧 Como Usar

### 1. Inicializar Banco Admin
```bash
node database/admin-init.cjs
```

### 2. Iniciar Servidor
```bash
npm run server
```

### 3. Acessar Admin
- **URL:** http://localhost:3000/admin/login
- **Login:** admin@timeright.com
- **Senha:** Admin@123

## 📈 Próximas Implementações

- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] Gerenciamento de notificações
- [ ] Análise de avaliações
- [ ] Configurações do sistema
- [ ] Integração Google Agenda
- [ ] 2FA para admins
- [ ] Logs de auditoria

## 🎯 Endpoints API

### Autenticação
- `POST /admin/login` - Login admin
- `POST /admin/register` - Cadastro admin

### Dashboard
- `GET /admin/stats` - Estatísticas gerais

### Usuários
- `GET /admin/users` - Listar usuários

### Promoções
- `GET /admin/promotions` - Listar promoções
- `POST /admin/promotions` - Criar promoção

Sistema admin completo e funcional com autenticação segura, dashboard informativo e gerenciamento de usuários e promoções.