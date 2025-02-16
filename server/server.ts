import express, { Request, Response } from 'express';
import pool from './db';
import cors from 'cors';

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 8000;
const app = express();
app.use(cors());


// Get all todos
app.get('/todos/:userEmail', async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  try {
    const result = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
