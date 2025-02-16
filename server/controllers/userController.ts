import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUpResult = await pool.query(
      `INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    res.json({ email, token });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ detail: err.detail });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (!users.rows.length) {
      res.json({ detail: 'User does not exist!' });
      return;
    }

    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: 'Login failed' });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
