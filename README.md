# TimeRight - Sistema de Agendamento Online

Sistema completo de agendamento online desenvolvido com React, Vite e React Bootstrap.

## 🚀 Funcionalidades

### Cliente
- ✅ Login/Cadastro (email, telefone)
- ✅ Catálogo de serviços com filtros por categoria
- ✅ Agendamento com escolha de data, horário e profissional
- ✅ **Agenda com calendário interativo**
- ✅ Visualização de agendamentos
- ✅ Histórico de serviços
- ✅ **Perfil do usuário editável**
- ✅ **Configurações personalizáveis**
- ✅ **Notificações em tempo real**
- ✅ Interface responsiva com modo escuro

### Administrador
- ✅ Painel administrativo
- ✅ Gerenciamento de agendamentos
- ✅ **Relatórios detalhados com gráficos**
- ✅ **Agenda administrativa com calendário**
- ✅ Estatísticas em tempo real
- ✅ Exportação de dados (CSV)

## 🛠️ Tecnologias

- **React 18** com Vite
- **React Bootstrap** para UI
- **React Calendar** para calendário interativo
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **React Hook Form + Yup** para validação
- **React Context API** para estado global
- **React Toastify** para notificações
- **React Icons** para ícones
- **json-server** para mock da API

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd timeright
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Em outro terminal, inicie o json-server:
```bash
npm run server
```

5. Acesse a aplicação:
- Frontend: http://localhost:3000
- API Mock: http://localhost:3001

## 👤 Usuários de Teste

### Cliente
- **Email:** joao@email.com
- **Senha:** 123456

### Administrador
- **Email:** admin@timeright.com
- **Senha:** admin123

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout/         # Header, Footer
│   ├── UI/             # Cards, Spinners, etc.
│   └── Forms/          # Formulários específicos
├── pages/              # Páginas da aplicação
├── services/           # Configuração Axios e APIs
├── context/            # Context API (Auth, Theme)
├── utils/              # Validações e helpers
└── styles/             # Estilos globais
```

## 🎨 Recursos Implementados

- ✅ Interface responsiva (mobile-first)
- ✅ **Modo escuro/claro com persistência**
- ✅ **Calendário interativo com indicadores**
- ✅ **Sistema de notificações**
- ✅ **Relatórios e estatísticas**
- ✅ Validação de formulários
- ✅ Proteção de rotas
- ✅ Feedback visual (toasts)
- ✅ Loading states
- ✅ **Tratamento de erros melhorado**
- ✅ Acessibilidade básica

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build
- `npm run server` - Inicia o json-server
- `npm run start` - **Verifica e inicia o servidor + dev**
- `npm run check-server` - **Verifica se o json-server está rodando**
- `npm run lint` - Executa o linter

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🔒 Segurança

- Autenticação com tokens
- Proteção de rotas
- Validação de dados
- Sanitização de inputs

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Gere o build:
```bash
npm run build
```

2. O conteúdo da pasta `dist/` pode ser servido por qualquer servidor web.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.