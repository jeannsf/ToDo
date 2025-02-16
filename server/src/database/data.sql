-- Cria o banco de dados "todoapp"
CREATE DATABASE todoapp;

-- Cria um tipo enumerado "task_status" para representar os possíveis status de uma tarefa.
-- Os valores permitidos são: 'pendente', 'em progresso' e 'concluída'.
CREATE TYPE task_status AS ENUM ('pendente', 'em progresso', 'concluída');

-- Cria a tabela "todos" para armazenar as tarefas.
-- Cada tarefa possui um id único, email do usuário, título, descrição, progresso, data e status.
CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,  -- Identificador único da tarefa.
  user_email VARCHAR(255),      -- Email do usuário associado à tarefa.
  title VARCHAR(30),            -- Título da tarefa (máximo 30 caracteres).
  description TEXT,             -- Descrição detalhada da tarefa.
  progress INT,                 -- Progresso da tarefa (valor numérico, geralmente de 0 a 100).
  date VARCHAR(300),            -- Data da tarefa (armazenada como string, pode ser ajustada conforme necessário).
  status task_status NOT NULL   -- Status da tarefa, deve ser um dos valores definidos no tipo "task_status".
);

-- Cria a tabela "users" para armazenar as informações dos usuários.
-- Cada usuário é identificado pelo email e possui uma senha criptografada.
CREATE TABLE users(
  email VARCHAR(255) PRIMARY KEY,         -- Email do usuário (chave primária).
  hashed_password VARCHAR(255)             -- Senha criptografada do usuário.
);

-- Insere um registro de exemplo na tabela "todos" para demonstrar a estrutura e funcionamento.
INSERT INTO todos (id, user_email, title, description, progress, date, status)
VALUES ('0', 'usuario@exemplo.com', 'Título da Tarefa', 'Descrição da tarefa de exemplo', 75, '2025-02-15', 'em progresso');
