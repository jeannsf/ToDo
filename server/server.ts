import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import pool from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PORT: number = Number(process.env.PORT) || 8000;
const app = express();

app.use(cors());
app.use(express.json());

interface Todo {
  id: string;
  user_email: string;
  title: string;
  description: string;
  progress: number;
  date: string; // armazenado como VARCHAR(300)
  status: 'pendente' | 'em progresso' | 'concluída';
}

interface User {
  email: string;
  hashed_password: string;
}

app.get('/todos/:userEmail', async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.post('/todos', async (req: Request, res: Response) => {
  const { user_email, title, description, progress, date, status } = req.body;
  const id: string = uuidv4();
  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, description, progress, date, status)
       VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, user_email, title, description, progress, date, status]
    );
    res.json(newToDo.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_email, title, description, progress, date, status } = req.body;
  try {
    const editToDo = await pool.query(
      `UPDATE todos SET user_email = $1, title = $2, description = $3, progress = $4, date = $5, status = $6
       WHERE id = $7 RETURNING *`,
      [user_email, title, description, progress, date, status, id]
    );
    res.json(editToDo.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao editar tarefa' });
  }
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    res.json(deleteToDo.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUp = await pool.query(
      `INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *`,
      [email, hashedPassword]
    );
    
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    
    res.json({ email, token });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ detail: err.detail });
  }
});

// Login
const loginHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const users = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);

    if (!users.rows.length) {
      res.json({ detail: 'User does not exist!' });
      return;
    }
    
    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

app.post('/login', loginHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
