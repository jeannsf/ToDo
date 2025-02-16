import { Request, Response } from 'express';
import * as todoService from '../services/todoService';

/**
 * Retorna todas as tarefas de um usuário.
 * @param req - Requisição HTTP contendo o parâmetro "userEmail" na URL.
 * @param res - Resposta HTTP que retorna a lista de tarefas.
 */
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const { userEmail } = req.params;
  try {
    const todos = await todoService.fetchTodos(userEmail);
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

/**
 * Cria uma nova tarefa.
 * @param req - Requisição HTTP contendo os dados da tarefa no corpo.
 * @param res - Resposta HTTP que retorna a tarefa criada.
 */
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { user_email, title, description, progress, date, status } = req.body;
  try {
    const newTodo = await todoService.createTodo({
      user_email,
      title,
      description,
      progress,
      date,
      status,
    });
    res.json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

/**
 * Atualiza uma tarefa existente.
 * @param req - Requisição HTTP contendo o ID da tarefa na URL e os novos dados no corpo.
 * @param res - Resposta HTTP que retorna a tarefa atualizada.
 */
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { user_email, title, description, progress, date, status } = req.body;
  try {
    const updatedTodo = await todoService.updateTodo(id, {
      user_email,
      title,
      description,
      progress,
      date,
      status,
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Erro ao editar tarefa' });
  }
};

/**
 * Deleta uma tarefa.
 * @param req - Requisição HTTP contendo o ID da tarefa a ser deletada na URL.
 * @param res - Resposta HTTP que retorna a tarefa deletada.
 */
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTodo = await todoService.deleteTodo(id);
    res.json(deletedTodo);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
