# Banco de Dados SQLite - TimeRight

## 🗄️ Configuração

O sistema agora utiliza **SQLite** como banco de dados principal, substituindo o json-server para maior robustez e funcionalidades reais de autenticação.

### Estrutura do Banco

#### Tabela `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  password TEXT NOT NULL,  -- Hash bcrypt
  role TEXT DEFAULT 'client' CHECK(role IN ('client', 'admin')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Tabela `services`
```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  duration INTEGER NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Tabela `appointments`
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  professional_id INTEGER DEFAULT 1,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
)
```

## 🚀 Como Usar

### 1. Inicializar o Banco
```bash
node database/init.cjs
```

### 2. Iniciar o Servidor
```bash
npm run server
# ou
node server.cjs
```

### 3. Script Completo
```bash
./start-db.sh
```

## 🔐 Usuários Pré-cadastrados

### Admin
- **Email:** admin@timeright.com
- **Senha:** admin123
- **Role:** admin

### Cliente Teste
- **Email:** joao@email.com
- **Senha:** 123456
- **Role:** client

## 📡 API Endpoints

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Cadastro

### Serviços
- `GET /services` - Listar serviços

### Agendamentos
- `GET /appointments` - Agendamentos do usuário logado
- `POST /appointments` - Criar agendamento
- `GET /admin/appointments` - Todos agendamentos (admin)

## 🔧 Tecnologias

- **SQLite3** - Banco de dados
- **Express** - Servidor web
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **CORS** - Cross-origin requests

## 📁 Arquivos

- `database/init.cjs` - Script de inicialização
- `database/timeright.db` - Arquivo do banco SQLite
- `server.cjs` - Servidor Express
- `start-db.sh` - Script de inicialização completa

## ✅ Funcionalidades Implementadas

- ✅ Autenticação real com JWT
- ✅ Hash de senhas com bcrypt
- ✅ Cadastro e login funcionais
- ✅ Proteção de rotas por role
- ✅ Persistência real de dados
- ✅ Relacionamentos entre tabelas
- ✅ API RESTful completa

## 🔄 Migração do json-server

O sistema foi migrado do json-server para SQLite mantendo compatibilidade com o frontend. As principais mudanças:

1. **Autenticação real** - JWT tokens válidos
2. **Senhas criptografadas** - bcrypt hash
3. **Validações** - Constraints no banco
4. **Performance** - Consultas SQL otimizadas
5. **Segurança** - Proteção contra SQL injection