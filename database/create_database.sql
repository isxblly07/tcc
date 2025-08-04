-- TimeRight Database Schema for SQL Server
USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TimeRight')
BEGIN
    CREATE DATABASE TimeRight;
END
GO

USE TimeRight;
GO

-- Tabela de Usuários
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    Telefone NVARCHAR(20) NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL DEFAULT 'client' CHECK (Role IN ('client', 'admin', 'professional')),
    TwoFactorEnabled BIT DEFAULT 0,
    EmailVerificado BIT DEFAULT 0,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT CK_Usuarios_Email CHECK (Email LIKE '%@%.%')
);

-- Tabela de Profissionais
CREATE TABLE Profissionais (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Especialidade NVARCHAR(100) NOT NULL,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Serviços
CREATE TABLE Servicos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Categoria NVARCHAR(50) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL CHECK (Preco >= 0),
    Duracao INT NOT NULL CHECK (Duracao > 0),
    Descricao NVARCHAR(500) NOT NULL,
    Imagem NVARCHAR(255) NULL,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Agendamentos
CREATE TABLE Agendamentos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    ServicoId INT NOT NULL,
    ProfissionalId INT NOT NULL,
    DataAgendamento DATE NOT NULL,
    HorarioAgendamento TIME NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (Status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    StatusPagamento NVARCHAR(20) DEFAULT 'pending'
        CHECK (StatusPagamento IN ('pending', 'paid', 'refunded')),
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE CASCADE,
    FOREIGN KEY (ServicoId) REFERENCES Servicos(Id),
    FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id)
);

-- Tabela de Pagamentos
CREATE TABLE Pagamentos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AgendamentoId INT NOT NULL,
    UsuarioId INT NOT NULL,
    Valor DECIMAL(10,2) NOT NULL CHECK (Valor > 0),
    MetodoPagamento NVARCHAR(20) NOT NULL 
        CHECK (MetodoPagamento IN ('pix', 'card', 'wallet')),
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (Status IN ('pending', 'completed', 'failed', 'refunded')),
    TransactionId NVARCHAR(100) NULL,
    DataPagamento DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id) ON DELETE CASCADE,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AgendamentoId INT NOT NULL,
    UsuarioId INT NOT NULL,
    ServicoId INT NOT NULL,
    Nota INT NOT NULL CHECK (Nota BETWEEN 1 AND 5),
    Comentario NVARCHAR(500) NULL,
    DataAvaliacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (AgendamentoId) REFERENCES Agendamentos(Id) ON DELETE CASCADE,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    FOREIGN KEY (ServicoId) REFERENCES Servicos(Id)
);

-- Tabela de Horários Disponíveis
CREATE TABLE HorariosDisponiveis (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProfissionalId INT NOT NULL,
    DiaSemana INT NOT NULL CHECK (DiaSemana BETWEEN 0 AND 6),
    HoraInicio TIME NOT NULL,
    HoraFim TIME NOT NULL,
    Ativo BIT DEFAULT 1,
    FOREIGN KEY (ProfissionalId) REFERENCES Profissionais(Id) ON DELETE CASCADE
);

-- Tabela de Mensagens de Suporte
CREATE TABLE MensagensSuporte (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    Mensagem NVARCHAR(1000) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'open' 
        CHECK (Status IN ('open', 'resolved', 'closed')),
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX IX_Agendamentos_Usuario ON Agendamentos(UsuarioId);
CREATE INDEX IX_Agendamentos_Data ON Agendamentos(DataAgendamento);
CREATE INDEX IX_Pagamentos_Status ON Pagamentos(Status);

-- Dados iniciais
INSERT INTO Usuarios (Nome, Email, Telefone, Senha, Role, EmailVerificado) VALUES
('Admin', 'admin@timeright.com', '(11) 88888-8888', 'admin123', 'admin', 1);

PRINT 'Database TimeRight criado!';
GO