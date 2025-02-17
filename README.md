# Todo App

O Todo App é uma aplicação full-stack para gerenciamento de tarefas que possui autenticação de usuários. A aplicação é dividida em duas partes principais:

## Back-end

A API RESTful foi desenvolvida com **Node.js**, **Express**, **TypeScript** e **PostgreSQL**.  
Ela oferece os seguintes recursos:
- **Autenticação de Usuários:** Endpoints para cadastro e login, permitindo a criação e verificação de usuários.
- **Gerenciamento de Tarefas:** CRUD (criar, ler, atualizar e excluir) de tarefas, além de funcionalidades para marcar tarefas como concluídas.
- **Comunicação via API:** Padronização dos endpoints para facilitar a integração com o front-end, utilizando JSON para troca de informações.

## Front-end

O front-end foi construído com **React** e **TypeScript**, proporcionando uma interface de usuário interativa e responsiva.  
Principais funcionalidades:
- **Autenticação:** 
  - Tela de login e cadastro que utiliza formulários gerenciados com `react-hook-form` para validação.
  - Armazenamento de tokens e informações de usuário via cookies, permitindo manter a sessão ativa.
- **Gerenciamento de Tarefas:** 
  - Interface para criação, edição, exclusão, conclusão e visualização de tarefas.
  - Uso de componentes modulares, como:
    - **ListHeader:** Exibe o título da lista de tarefas e informações do usuário, além de botões para adicionar tarefas e sair.
    - **ListItem:** Renderiza cada tarefa com informações resumidas, opções para editar, excluir e visualizar detalhes, e um checkbox para marcar tarefas concluídas.
    - **Modal:** Janela para criação e edição de tarefas, com formulário para entrada de dados e controle de progresso.
    - **ModalConfirm:** Janela de confirmação para ações sensíveis, como excluir ou concluir uma tarefa.
    - **ModalView:** Janela para visualização detalhada dos dados de uma tarefa.
    - **ProgressBar:** Componente gráfico que mostra o progresso da tarefa com cores diferenciadas para cada status.
- **Funcionalidades Adicionais:**
  - Filtro de tarefas através de um campo de busca.
  - Ordenação de tarefas por data.
  - Integração com a API do back-end usando a variável de ambiente `REACT_APP_SERVERURL` para definir a URL base.

# Visão Geral

Esta aplicação é composta por duas camadas:

- **Back-end:** Responsável por gerenciar a lógica de negócio, autenticação de usuários e operações CRUD (Criar, Ler, Atualizar e Deletar) de tarefas. Implementado com **Node.js**, **Express** e **TypeScript**, utiliza **PostgreSQL** como banco de dados e conta com testes unitários e de integração para garantir a qualidade e robustez do código.
  
- **Front-end:** Fornece uma interface interativa e intuitiva para o gerenciamento das tarefas. Desenvolvido com **React** e **TypeScript**, o front-end integra componentes modulares para autenticação, criação, edição, exclusão, conclusão e visualização de tarefas, mantendo a comunicação com a API por meio da variável de ambiente `REACT_APP_SERVERURL`.

---

# Decisões Técnicas

### Back-end

#### Linguagem e Framework
- **TypeScript:** Oferece tipagem estática, aumentando a segurança e a manutenibilidade do código.
- **Node.js com Express:** Framework leve e flexível para a construção de APIs RESTful.

#### Banco de Dados
- **PostgreSQL:** Banco de dados relacional robusto.
- **Modelagem:**  
  - **Tabela `todos`:** Armazena as tarefas dos usuários.
  - **Tabela `users`:** Armazena as informações dos usuários, com as senhas devidamente criptografadas.
- **Enumeração `task_status`:** Restringe os status das tarefas aos valores: `'pendente'`, `'em progresso'` e `'concluída'`.

#### Segurança
- **bcrypt:** Criptografa as senhas dos usuários.
- **JWT (JSON Web Token):** Utilizado para autenticação, permitindo a validação das credenciais do usuário e a proteção dos endpoints.

#### Testes
- **Jest:** Framework para testes unitários.
- **Supertest:** Ferramenta para testes de integração, simulando requisições HTTP aos endpoints.

#### Documentação da API
- **Swagger:** Configurado via `swaggerOptions.ts` para a geração de documentação interativa e detalhada dos endpoints.

### Front-end

#### Tecnologias e Ferramentas
- **React com TypeScript:** Permite a construção de interfaces de usuário dinâmicas e com tipagem estática, melhorando a manutenção e a escalabilidade do código.
- **react-hook-form:** Gerencia formulários e realiza validações de forma eficiente.
- **react-cookie:** Facilita o gerenciamento de cookies, essencial para a manutenção da sessão do usuário.

#### Arquitetura e Componentes
- **Componentização Modular:**  
  - **Auth:** Gerencia o fluxo de autenticação (login e cadastro) e a criação de sessões de usuário.
  - **ListHeader:** Exibe o título da lista de tarefas, informações do usuário e botões para adicionar novas tarefas ou encerrar a sessão.
  - **ListItem:** Renderiza cada tarefa, oferecendo ações para editar, excluir, concluir e visualizar detalhes.
  - **Modal, ModalConfirm e ModalView:** Implementam janelas para criação/edição de tarefas, confirmação de ações sensíveis e visualização detalhada das tarefas, respectivamente.
  - **ProgressBar e TickIcon:** Componentes visuais que exibem o progresso das tarefas e permitem marcar uma tarefa como concluída.

#### Integração com o Back-end
- A comunicação com a API é realizada utilizando a variável de ambiente `REACT_APP_SERVERURL`, garantindo que as operações de CRUD e autenticação no front-end sejam sincronizadas com o back-end.

Esta arquitetura integrada proporciona uma experiência de usuário fluida e segura, unindo uma API robusta com uma interface moderna e intuitiva para o gerenciamento de tarefas.
<br>

## Estrutura do Projeto

```plaintext
.
├── server                   # Pasta raiz do back-end
│   ├── __tests__                # Testes unitários e de integração
│   │   ├── todoService.test.ts
│   │   ├── userService.test.ts
│   │   └── integration
│   │       ├── todoRoutes.test.ts
│   │       └── userRoutes.test.ts
│   ├── controllers              # Controladores que processam as requisições HTTP
│   │   ├── todoController.ts
│   │   └── userController.ts
│   ├── routes                   # Definição das rotas da API
│   │   ├── todoRoutes.ts
│   │   └── userRoutes.ts
│   ├── services                 # Camada de negócio e acesso ao banco de dados
│   │   ├── todoService.ts
│   │   └── userService.ts
│   ├── db.ts                    # Configuração do pool de conexões com o PostgreSQL
│   ├── swaggerOptions.ts        # Configuração do Swagger para documentação da API
│   ├── .env                     # Arquivo de variáveis de ambiente (não incluído no repositório)
│   ├── package.json             # Gerenciamento de dependências e scripts
│   └── tsconfig.json            # Configurações do TypeScript
└── client                   # Pasta raiz do front-end
    └── src
        ├── components         # Componentes da aplicação
        │   ├── auth.tsx             # Componente de autenticação (login/cadastro)
        │   ├── listheader.tsx       # Cabeçalho da lista de tarefas
        │   ├── listitem.tsx         # Item da lista com ações (editar, excluir, concluir, visualizar)
        │   ├── modal.tsx            # Modal para criação e edição de tarefas
        │   ├── modalconfirm.tsx     # Modal de confirmação para ações sensíveis
        │   ├── modalview.tsx        # Modal para visualização detalhada da tarefa
        │   ├── progressbar.tsx      # Barra de progresso das tarefas
        │   └── tickicon.tsx         # Ícone para marcar tarefas como concluídas
        ├── app.tsx              # Componente principal da aplicação
        └── index.tsx            # Ponto de entrada da aplicação
```



## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```env
POSTGRES_USERNAME=postgres (exemplo)
POSTGRES_PASSWORD=postgres_pass (exemplo)
PGADMIN_DEFAULT_EMAIL=test@test.com (exemplo)
PGADMIN_DEFAULT_PASSWORD=pass_pg (exemplo)
HOST=localhost (exemplo)
DBPORT=5432 (exemplo) 
REACT_APP_SERVERURL=http://localhost:8000 (exemplo)
```

## Instalação e Execução
```markdown

1. Clonar o Repositório

   Execute os comandos abaixo para clonar e ativar o projeto:

   git clone https://github.com/jeannsf/ToDo.git
   ```

2. **Instalar Dependências e Iniciar o Back-end**

   Utilize um dos seguintes comandos para instalar as dependências necessárias:

   ```bash
   cd server
   npm install
   npm run start:server
   ```
   
   ou
   
   ```bash
   cd server
   yarn install
   npm run start:server
   ```

3. **Instalar Dependências e Iniciar o Front-end**

   Utilize um dos seguintes comandos para instalar as dependências necessárias:

   ```bash
   cd client
   npm install
   npm run start
   ```
   
   ou
   
   ```bash
   cd client
   yarn install
   npm run start
   ```

## Configuração do Banco de Dados

Utilize o script abaixo para configurar o banco de dados e criar as tabelas necessárias para a aplicação:

```sql
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
```

Este script cria o banco de dados `todoapp`, define o tipo enumerado `task_status` para os status das tarefas, e constrói as tabelas `todos` e `users`, além de inserir um registro de exemplo na tabela `todos`.  

## Endpoints da API

Abaixo estão os endpoints disponíveis e suas descrições:

### 1. Tarefas (Todos)
- **Endpoint:** `/todos/:userEmail`
- **Descrição:** Retorna todas as tarefas associadas ao email informado.

  Exemplo de JSON:
  ```json
  {
    "tarefas": [
      {
        "user_email": "test@example.com",
        "title": "Teste de Integração",
        "description": "Descrição da tarefa",
        "progress": 50,
        "date": "2025-02-15",
        "status": "pendente"
      }
    ]
  }
  ```

### 2. Cadastrar Tarefas
- **Endpoint:** `/todos`
- **Descrição:** Cria uma nova tarefa com os parâmetros fornecidos.

  Exemplo de JSON para a requisição:
  ```json
  {
    "user_email": "test@example.com",
    "title": "Teste Nova Tarefa",
    "description": "Descreva brevemente a tarefa",
    "progress": 30,
    "date": "2025-02-16",
    "status": "iniciando"
  }
  ```

### 3. Atualizar Tarefas
- **Endpoint:** `/todos/:id`
- **Descrição:** Atualiza uma tarefa existente.

  Exemplo de JSON para a requisição:
  ```json
  {
    "user_email": "test@example.com",
    "title": "Teste Atualizado",
    "description": "Descrição atualizada",
    "progress": 75,
    "date": "2025-02-16",
    "status": "em progresso"
  }
  ```

### 4. Excluir Tarefas
- **Endpoint:** `/todos/:id`
- **Descrição:** Remove uma tarefa pelo ID.

### 5. Cadastro de Usuário
- **Endpoint:** `/signup`
- **Descrição:** Cria um novo usuário.
- **Requisição (JSON):**
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

### 6. Login de Usuário
- **Endpoint:** `/login`
- **Descrição:** Realiza login do usuário.
- **Requisição (JSON):**
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

## Segurança

- **bcrypt:** Para criptografar as senhas dos usuários.
- **JWT (JSON Web Token):** Para autenticação, permitindo validar as credenciais de usuário e protegender os endpoints.

## Testes

### Testes Unitários
- Localização: `__tests__/`
- Objetivo: Validar as funções dos serviços (todoService e userService) utilizando mocks para simular a interação com o banco de dados.

### Testes de Integração
- Localização: `__tests__/integration`
- Objetivo: Validar o comportamento dos endpoints por meio de requisições HTTP utilizando o Supertest.

## Documentação Interativa (Swagger)

A documentação interativa da API está configurada no arquivo `swaggerOptions.ts`.Para visualizar a documentação:

1. Integre o Swagger UI no seu servidor (exemplo: utilizando `swagger-ui-express`).
2. Acesse o endpoint configurado (ex.: http://localhost:8000/api-docs).

## Considerações Finais

- **Manutenibilidade:**  
  - **Back-end:** O uso de TypeScript e a separação em camadas (Controllers, Services, Routes) torna o código modular e de fácil manutenção.  
  - **Front-end:** A estrutura baseada em componentes com React e TypeScript facilita o reuso de código, a escalabilidade e a manutenção da interface.

- **Segurança:**  
  - **Back-end:** A implementação de `bcrypt` para criptografia de senhas e de JWT para autenticação fornece uma camada robusta de segurança.  
  - **Front-end:** O gerenciamento seguro de tokens e cookies, juntamente com práticas modernas de desenvolvimento, garante a proteção dos dados dos usuários e a integridade das sessões.

- **Testabilidade:**  
  - **Back-end:** Testes unitários e de integração asseguram a qualidade e a confiabilidade do sistema. 




