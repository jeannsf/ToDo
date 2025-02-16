import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUpResult = await pool.query(
      `INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *`,
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    res.json({ email, token });
  } catch (error: any) {
    console.error('Error during signup:', error);
    res.status(400).json({ detail: error.detail });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!users.rows.length) {
      res.status(404).json({ detail: 'User does not exist!' });
      return;
    }
    const user = users.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    if (passwordMatch) {
      res.json({ email: user.email, token });
    } else {
      res.status(401).json({ detail: 'Login failed' });
    }
  } catch (error: any) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
