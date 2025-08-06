-- TimeRight - Sistema de Agendamento Online
-- Banco de Dados SQL Server Completo
-- Versão: 2.0

USE master;
GO

-- Criar banco se não existir
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TimeRight')
BEGIN
    CREATE DATABASE TimeRight;
END
GO

USE TimeRight;
GO

-- =============================================
-- TABELAS PRINCIPAIS
-- =============================================

-- Tabela de Usuários (Clientes e Administradores)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' AND xtype='U')
BEGIN
    CREATE TABLE Usuarios (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL UNIQUE,
        Telefone NVARCHAR(20) NOT NULL,
        Senha NVARCHAR(255) NOT NULL,
        Role NVARCHAR(20) NOT NULL DEFAULT 'client' 
            CHECK (Role IN ('client', 'admin', 'professional')),
        TwoFactorEnabled BIT DEFAULT 0,
        EmailVerificado BIT DEFAULT 0,
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        DataUltimoLogin DATETIME2 NULL,
        FotoPerfil NVARCHAR(255) NULL,
        Endereco NVARCHAR(200) NULL,
        DataNascimento DATE NULL,
        Genero NVARCHAR(20) NULL,
        CONSTRAINT CK_Usuarios_Email CHECK (Email LIKE '%@%.%')
    );
END
GO

-- Tabela de Profissionais
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Profissionais' AND xtype='U')
BEGIN
    CREATE TABLE Profissionais (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NULL,
        Telefone NVARCHAR(20) NULL,
        Especialidade NVARCHAR(100) NOT NULL,
        Descricao NVARCHAR(500) NULL,
        FotoPerfil NVARCHAR(255) NULL,
        AvaliacaoMedia DECIMAL(3,2) DEFAULT 0.00,
        TotalAvaliacoes INT DEFAULT 0,
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Tabela de Categorias de Serviços
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CategoriasServicos' AND xtype='U')
BEGIN
    CREATE TABLE CategoriasServicos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(50) NOT NULL UNIQUE,
        Descricao NVARCHAR(200) NULL,
        Icone NVARCHAR(50) NULL,
        Cor NVARCHAR(7) NULL, -- Hex color
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Tabela de Serviços
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Servicos' AND xtype='U')
BEGIN
    CREATE TABLE Servicos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(100) NOT NULL,
        CategoriaId INT NOT NULL,
        Preco DECIMAL(10,2) NOT NULL CHECK (Preco >= 0),
        Duracao INT NOT NULL CHECK (Duracao > 0), -- em minutos
        Descricao NVARCHAR(500) NOT NULL,
        Imagem NVARCHAR(255) NULL,
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (CategoriaId) REFERENCES CategoriasServicos(Id)
    );
END
GO

-- Tabela de Relacionamento Profissional-Serviço
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ProfissionalServicos' AND xtype='U')
BEGIN
    CREATE TABLE ProfissionalServicos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ProfissionalId INT NOT NULL,
        ServicoId INT NOT NULL,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id) ON DELETE CASCADE,
        FOREIGN KEY (ServicoId) REFERENCES Servicos(Id) ON DELETE CASCADE,
        UNIQUE(ProfissionalId, ServicoId)
    );
END
GO

-- Tabela de Horários Disponíveis
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='HorariosDisponiveis' AND xtype='U')
BEGIN
    CREATE TABLE HorariosDisponiveis (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ProfissionalId INT NOT NULL,
        DiaSemana INT NOT NULL CHECK (DiaSemana BETWEEN 0 AND 6), -- 0=Domingo, 6=Sábado
        HoraInicio TIME NOT NULL,
        HoraFim TIME NOT NULL,
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id) ON DELETE CASCADE
    );
END
GO

-- Tabela de Agendamentos
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Agendamentos' AND xtype='U')
BEGIN
    CREATE TABLE Agendamentos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UsuarioId INT NOT NULL,
        ServicoId INT NOT NULL,
        ProfissionalId INT NOT NULL,
        DataAgendamento DATE NOT NULL,
        HorarioAgendamento TIME NOT NULL,
        Status NVARCHAR(20) NOT NULL DEFAULT 'pending' 
            CHECK (Status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
        StatusPagamento NVARCHAR(20) DEFAULT 'pending'
            CHECK (StatusPagamento IN ('pending', 'paid', 'refunded', 'failed')),
        ValorTotal DECIMAL(10,2) NOT NULL,
        ObservacoesCliente NVARCHAR(500) NULL,
        ObservacoesProfissional NVARCHAR(500) NULL,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        DataCancelamento DATETIME2 NULL,
        MotivoCancelamento NVARCHAR(200) NULL,
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE CASCADE,
        FOREIGN KEY (ServicoId) REFERENCES Servicos(Id),
        FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id)
    );
END
GO

-- Tabela de Pagamentos
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Pagamentos' AND xtype='U')
BEGIN
    CREATE TABLE Pagamentos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        AgendamentoId INT NOT NULL,
        UsuarioId INT NOT NULL,
        Valor DECIMAL(10,2) NOT NULL CHECK (Valor > 0),
        MetodoPagamento NVARCHAR(20) NOT NULL 
            CHECK (MetodoPagamento IN ('pix', 'credit_card', 'debit_card', 'wallet', 'cash')),
        Status NVARCHAR(20) NOT NULL DEFAULT 'pending'
            CHECK (Status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
        TransactionId NVARCHAR(100) NULL,
        GatewayResponse NVARCHAR(MAX) NULL, -- JSON response
        DataPagamento DATETIME2 DEFAULT GETDATE(),
        DataProcessamento DATETIME2 NULL,
        FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id) ON DELETE CASCADE,
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
    );
END
GO

-- Tabela de Avaliações
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Avaliacoes' AND xtype='U')
BEGIN
    CREATE TABLE Avaliacoes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        AgendamentoId INT NOT NULL,
        UsuarioId INT NOT NULL,
        ServicoId INT NOT NULL,
        ProfissionalId INT NOT NULL,
        Nota INT NOT NULL CHECK (Nota BETWEEN 1 AND 5),
        Comentario NVARCHAR(500) NULL,
        Anonimo BIT DEFAULT 0,
        Aprovado BIT DEFAULT 1,
        DataAvaliacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id) ON DELETE CASCADE,
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
        FOREIGN KEY (ServicoId) REFERENCES Servicos(Id),
        FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id)
    );
END
GO

-- Tabela de Promoções
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Promocoes' AND xtype='U')
BEGIN
    CREATE TABLE Promocoes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(100) NOT NULL,
        Descricao NVARCHAR(500) NULL,
        Codigo NVARCHAR(20) UNIQUE NULL, -- Cupom de desconto
        TipoDesconto NVARCHAR(20) NOT NULL CHECK (TipoDesconto IN ('percentage', 'fixed')),
        ValorDesconto DECIMAL(10,2) NOT NULL CHECK (ValorDesconto > 0),
        ServicoId INT NULL, -- NULL = aplicável a todos os serviços
        DataInicio DATETIME2 NOT NULL,
        DataFim DATETIME2 NOT NULL,
        LimiteUso INT NULL, -- NULL = ilimitado
        UsosRealizados INT DEFAULT 0,
        Ativo BIT DEFAULT 1,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (ServicoId) REFERENCES Servicos(Id),
        CHECK (DataFim > DataInicio)
    );
END
GO

-- Tabela de Uso de Promoções
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PromocaoUsos' AND xtype='U')
BEGIN
    CREATE TABLE PromocaoUsos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        PromocaoId INT NOT NULL,
        UsuarioId INT NOT NULL,
        AgendamentoId INT NOT NULL,
        ValorDesconto DECIMAL(10,2) NOT NULL,
        DataUso DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (PromocaoId) REFERENCES Promocoes(Id),
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
        FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id)
    );
END
GO

-- Tabela de Notificações
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notificacoes' AND xtype='U')
BEGIN
    CREATE TABLE Notificacoes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UsuarioId INT NOT NULL,
        Titulo NVARCHAR(100) NOT NULL,
        Mensagem NVARCHAR(500) NOT NULL,
        Tipo NVARCHAR(20) NOT NULL 
            CHECK (Tipo IN ('appointment', 'payment', 'promotion', 'reminder', 'system')),
        Lida BIT DEFAULT 0,
        AgendamentoId INT NULL,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        DataLeitura DATETIME2 NULL,
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE CASCADE,
        FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id)
    );
END
GO

-- Tabela de Mensagens de Chat/Suporte
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='MensagensChat' AND xtype='U')
BEGIN
    CREATE TABLE MensagensChat (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UsuarioId INT NOT NULL,
        Mensagem NVARCHAR(1000) NOT NULL,
        Remetente NVARCHAR(20) NOT NULL CHECK (Remetente IN ('user', 'bot', 'admin')),
        Status NVARCHAR(20) DEFAULT 'sent' 
            CHECK (Status IN ('sent', 'delivered', 'read')),
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE CASCADE
    );
END
GO

-- Tabela de Configurações do Sistema
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ConfiguracoesSistema' AND xtype='U')
BEGIN
    CREATE TABLE ConfiguracoesSistema (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Chave NVARCHAR(50) NOT NULL UNIQUE,
        Valor NVARCHAR(500) NOT NULL,
        Descricao NVARCHAR(200) NULL,
        DataCriacao DATETIME2 DEFAULT GETDATE(),
        DataAtualizacao DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

-- Índices para Agendamentos
CREATE NONCLUSTERED INDEX IX_Agendamentos_Usuario ON Agendamentos(UsuarioId);
CREATE NONCLUSTERED INDEX IX_Agendamentos_Data ON Agendamentos(DataAgendamento);
CREATE NONCLUSTERED INDEX IX_Agendamentos_Status ON Agendamentos(Status);
CREATE NONCLUSTERED INDEX IX_Agendamentos_Profissional ON Agendamentos(ProfissionalId);

-- Índices para Pagamentos
CREATE NONCLUSTERED INDEX IX_Pagamentos_Status ON Pagamentos(Status);
CREATE NONCLUSTERED INDEX IX_Pagamentos_Data ON Pagamentos(DataPagamento);

-- Índices para Notificações
CREATE NONCLUSTERED INDEX IX_Notificacoes_Usuario ON Notificacoes(UsuarioId);
CREATE NONCLUSTERED INDEX IX_Notificacoes_Lida ON Notificacoes(Lida);

-- Índices para Avaliações
CREATE NONCLUSTERED INDEX IX_Avaliacoes_Profissional ON Avaliacoes(ProfissionalId);
CREATE NONCLUSTERED INDEX IX_Avaliacoes_Servico ON Avaliacoes(ServicoId);

-- =============================================
-- DADOS INICIAIS
-- =============================================

-- Inserir categorias padrão
INSERT INTO CategoriasServicos (Nome, Descricao, Icone, Cor) VALUES
('Cabeleireiro', 'Serviços capilares em geral', 'FaCut', '#6f42c1'),
('Manicure', 'Cuidados com unhas e nail art', 'FaHandPaper', '#e83e8c'),
('Maquiagem', 'Maquiagem para eventos e dia a dia', 'FaPalette', '#fd7e14'),
('Cuidados', 'Tratamentos faciais e corporais', 'FaEye', '#20c997'),
('Barbearia', 'Cortes masculinos e barba', 'FaUserTie', '#495057'),
('Eventos', 'Serviços para festas e casamentos', 'FaCalendarAlt', '#6610f2'),
('Buffet', 'Serviços de alimentação', 'FaUtensils', '#dc3545'),
('Oficina', 'Serviços automotivos', 'FaWrench', '#28a745');

-- Inserir usuário administrador padrão
INSERT INTO Usuarios (Nome, Email, Telefone, Senha, Role, EmailVerificado) VALUES
('Administrador TimeRight', 'admin@timeright.com', '(11) 99999-9999', 
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: admin123
 'admin', 1);

-- Inserir profissional exemplo
INSERT INTO Profissionais (Nome, Email, Telefone, Especialidade, Descricao) VALUES
('Ana Silva', 'ana@timeright.com', '(11) 88888-8888', 'Cabeleireiro', 
 'Especialista em cortes femininos e coloração com mais de 10 anos de experiência.');

-- Inserir serviços exemplo
INSERT INTO Servicos (Nome, CategoriaId, Preco, Duracao, Descricao, Imagem) VALUES
('Corte Feminino', 1, 45.00, 60, 'Corte feminino moderno e estiloso', 'https://images.unsplash.com/photo-1560066984-138dadb4c035'),
('Escova Progressiva', 1, 120.00, 180, 'Tratamento capilar com escova progressiva', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e'),
('Coloração', 1, 80.00, 120, 'Coloração completa com produtos de qualidade', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2'),
('Manicure Simples', 2, 25.00, 45, 'Manicure tradicional com esmaltação', 'https://images.unsplash.com/photo-1604654894610-df63bc536371'),
('Nail Art', 2, 40.00, 60, 'Decoração artística nas unhas', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc');

-- Relacionar profissional com serviços
INSERT INTO ProfissionalServicos (ProfissionalId, ServicoId) VALUES
(1, 1), (1, 2), (1, 3);

-- Inserir horários disponíveis (Segunda a Sexta, 8h às 18h)
DECLARE @i INT = 1;
WHILE @i <= 5
BEGIN
    INSERT INTO HorariosDisponiveis (ProfissionalId, DiaSemana, HoraInicio, HoraFim) 
    VALUES (1, @i, '08:00', '18:00');
    SET @i = @i + 1;
END

-- Inserir configurações do sistema
INSERT INTO ConfiguracoesSistema (Chave, Valor, Descricao) VALUES
('site_name', 'TimeRight', 'Nome do sistema'),
('site_email', 'contato@timeright.com', 'Email de contato'),
('site_phone', '(11) 99999-9999', 'Telefone de contato'),
('working_hours', '08:00-18:00', 'Horário de funcionamento padrão'),
('booking_advance_days', '30', 'Dias de antecedência para agendamento'),
('cancellation_hours', '24', 'Horas mínimas para cancelamento'),
('payment_methods', 'pix,credit_card,debit_card', 'Métodos de pagamento aceitos');

PRINT 'Banco de dados TimeRight criado com sucesso!';
GO