import request from 'supertest';
import express from 'express';
import cors from 'cors';
import todoRoutes from '../../routes/todoRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

describe('Todo Routes Integration', () => {
  let createdTodoId: string;

  /**
   * Testa o endpoint GET /todos/:userEmail
   */
  it('deve retornar uma lista de tarefas para um usuário', async () => {
    const userEmail = 'test@example.com';
    const response = await request(app).get(`/todos/${userEmail}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  /**
   * Testa o endpoint POST /todos para criação de uma nova tarefa
   */
  it('deve criar uma nova tarefa', async () => {
    const newTodo = {
      user_email: 'test@example.com',
      title: 'Teste de Integração',
      description: 'Teste de criação de tarefa via API',
      progress: 50,
      date: '2025-02-15',
      status: 'pendente',
    };

    const response = await request(app)
      .post('/todos')
      .send(newTodo);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTodo.title);
    
    createdTodoId = response.body.id;
  });

  /**
   * Testa o endpoint PUT /todos/:id para atualização de uma tarefa existente
   */
  it('deve atualizar uma tarefa existente', async () => {
    const updatedTodo = {
      user_email: 'test@example.com',
      title: 'Teste Atualizado',
      description: 'Descrição atualizada',
      progress: 75,
      date: '2025-02-16',
      status: 'em progresso',
    };

    const response = await request(app)
      .put(`/todos/${createdTodoId}`)
      .send(updatedTodo);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTodoId);
    expect(response.body.title).toBe(updatedTodo.title);
  });

  /**
   * Testa o endpoint DELETE /todos/:id para remoção de uma tarefa
   */
  it('deve deletar uma tarefa', async () => {
    const response = await request(app)
      .delete(`/todos/${createdTodoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTodoId);
  });
});
