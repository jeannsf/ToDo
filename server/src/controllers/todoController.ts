import { Request, Response } from 'express';
import * as todoService from '../services/todoService';

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
