CREATE DATABASE todoapp;

CREATE TYPE task_status AS ENUM ('pendente', 'em progresso', 'concluída');


CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  description TEXT,
  progress INT,
  date VARCHAR(300),
  status task_status NOT NULL
);

CREATE TABLE users(
email VARCHAR(255) PRIMARY KEY,
hashed_password VARCHAR(255)
);

INSERT INTO todos (user_email, title, description, progress, date, status)
VALUES ('usuario@exemplo.com', 'Título da Tarefa', 'Descrição da tarefa de exemplo', 75, '2025-02-15', 'em progresso');

