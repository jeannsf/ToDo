import { v4 as uuidv4 } from 'uuid';
import pool from '../db';
import * as todoService from '../services/todoService';
import { TodoData } from '../services/todoService';

jest.mock('../db');

describe('todoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Testa o método fetchTodos, que busca todas as tarefas de um usuário.
   */
  describe('fetchTodos', () => {
    it('deve retornar um array de tarefas para um usuário', async () => {
      const fakeRows = [{
        id: '1',
        user_email: 'test@example.com',
        title: 'Teste',
        description: 'Desc',
        progress: 50,
        date: '2025-02-15',
        status: 'pendente'
      }];
      (pool.query as jest.Mock).mockResolvedValue({ rows: fakeRows });

      const todos = await todoService.fetchTodos('test@example.com');
      expect(todos).toEqual(fakeRows);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM todos WHERE user_email = $1', ['test@example.com']);
    });
  });

  /**
   * Testa o método createTodo, que cria uma nova tarefa no banco de dados.
   */
  describe('createTodo', () => {
    it('deve criar uma nova tarefa e retornar a tarefa criada', async () => {
      const todoData: TodoData = {
        user_email: 'test@example.com',
        title: 'Teste',
        description: 'Desc',
        progress: 50,
        date: '2025-02-15',
        status: 'pendente'
      };

      const fakeTodo = { id: uuidv4(), ...todoData };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeTodo] });

      const createdTodo = await todoService.createTodo(todoData);
      expect(createdTodo).toEqual(fakeTodo);
      expect(pool.query).toHaveBeenCalled();
    });
  });

  /**
   * Testa o método updateTodo, que atualiza uma tarefa existente.
   */
  describe('updateTodo', () => {
    it('deve atualizar uma tarefa existente e retornar a tarefa atualizada', async () => {
      const id = '1';
      const updatedData: TodoData = {
        user_email: 'test@example.com',
        title: 'Updated Test',
        description: 'Updated Desc',
        progress: 75,
        date: '2025-02-16',
        status: 'em progresso'
      };

      const fakeUpdatedTodo = { id, ...updatedData };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeUpdatedTodo] });

      const result = await todoService.updateTodo(id, updatedData);
      expect(result).toEqual(fakeUpdatedTodo);
      expect(pool.query).toHaveBeenCalledWith(
        `UPDATE todos 
     SET user_email = $1, title = $2, description = $3, progress = $4, date = $5, status = $6
     WHERE id = $7 RETURNING *`,
        [
          updatedData.user_email,
          updatedData.title,
          updatedData.description,
          updatedData.progress,
          updatedData.date,
          updatedData.status,
          id
        ]
      );
    });
  });

  /**
   * Testa o método deleteTodo, que deleta uma tarefa no banco de dados.
   */
  describe('deleteTodo', () => {
    it('deve deletar uma tarefa e retornar a tarefa deletada', async () => {
      const id = '1';
      const fakeDeletedTodo = {
        id,
        user_email: 'test@example.com',
        title: 'Test',
        description: 'Desc',
        progress: 50,
        date: '2025-02-15',
        status: 'pendente'
      };

      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeDeletedTodo] });

      const result = await todoService.deleteTodo(id);
      expect(result).toEqual(fakeDeletedTodo);
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM todos WHERE id = $1 RETURNING *',
        [id]
      );
    });
  });
});
