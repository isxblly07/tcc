-- Criação do banco de dados TimeRight
CREATE DATABASE TimeRight;
GO

USE TimeRight;
GO

-- Tabela de Usuários
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    telefone NVARCHAR(20),
    senha_hash NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) DEFAULT 'cliente',
    data_criacao DATETIME DEFAULT GETDATE()
);

-- Tabela de Administradores
CREATE TABLE Administradores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha_hash NVARCHAR(255) NOT NULL,
    permissao NVARCHAR(50) DEFAULT 'admin',
    ativo BIT DEFAULT 1
);

-- Tabela de Serviços
CREATE TABLE Servicos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    categoria NVARCHAR(50) NOT NULL,
    duracao INT NOT NULL, -- em minutos
    preco DECIMAL(10,2) NOT NULL,
    descricao NVARCHAR(500),
    imagem NVARCHAR(255),
    ativo BIT DEFAULT 1
);

-- Tabela de Profissionais
CREATE TABLE Profissionais (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    especialidade NVARCHAR(100),
    bio NVARCHAR(500),
    ativo BIT DEFAULT 1
);

-- Tabela de Horários Disponíveis
CREATE TABLE HorariosDisponiveis (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_profissional INT FOREIGN KEY REFERENCES Profissionais(id),
    data DATE NOT NULL,
    horario TIME NOT NULL,
    status NVARCHAR(20) DEFAULT 'disponivel' -- disponivel, ocupado
);

-- Tabela de Agendamentos
CREATE TABLE Agendamentos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT FOREIGN KEY REFERENCES Usuarios(id),
    id_servico INT FOREIGN KEY REFERENCES Servicos(id),
    id_profissional INT FOREIGN KEY REFERENCES Profissionais(id),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status NVARCHAR(20) DEFAULT 'pendente', -- pendente, confirmado, cancelado, concluido
    data_criacao DATETIME DEFAULT GETDATE()
);

-- Tabela de Pagamentos
CREATE TABLE Pagamentos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_agendamento INT FOREIGN KEY REFERENCES Agendamentos(id),
    valor DECIMAL(10,2) NOT NULL,
    metodo NVARCHAR(50), -- pix, cartao, dinheiro
    status NVARCHAR(20) DEFAULT 'pendente', -- pendente, pago, cancelado
    data_pagamento DATETIME
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_agendamento INT FOREIGN KEY REFERENCES Agendamentos(id),
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario NVARCHAR(500),
    data DATETIME DEFAULT GETDATE()
);

-- Tabela de Promoções
CREATE TABLE Promocoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    servico_alvo INT FOREIGN KEY REFERENCES Servicos(id),
    desconto DECIMAL(5,2), -- percentual
    validade DATE,
    ativo BIT DEFAULT 1
);

-- Tabela de Notificações
CREATE TABLE Notificacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT FOREIGN KEY REFERENCES Usuarios(id),
    tipo NVARCHAR(50), -- lembrete, promocao, confirmacao
    mensagem NVARCHAR(500),
    data_envio DATETIME DEFAULT GETDATE(),
    lida BIT DEFAULT 0
);

-- Inserir dados de exemplo
INSERT INTO Administradores (nome, email, senha_hash) VALUES 
('Admin TimeRight', 'admin@timeright.com', '$2a$10$example');

INSERT INTO Servicos (nome, categoria, duracao, preco, descricao) VALUES 
('Corte Masculino', 'Cabelo', 30, 25.00, 'Corte moderno e estiloso'),
('Barba Completa', 'Barba', 20, 15.00, 'Aparar e modelar barba'),
('Buffet Casamento', 'Buffet', 480, 5000.00, 'Buffet completo para casamentos'),
('Revisão Automotiva', 'Oficina', 120, 150.00, 'Revisão completa do veículo');

INSERT INTO Profissionais (nome, especialidade) VALUES 
('João Silva', 'Cabelo e Barba'),
('Maria Santos', 'Eventos e Buffet'),
('Carlos Oliveira', 'Mecânica Automotiva');