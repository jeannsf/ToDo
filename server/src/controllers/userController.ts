import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';

/**
 * Registra um novo usuário.
 * 
 * Recebe o email e a senha no corpo da requisição, criptografa a senha,
 * cria um novo usuário no banco de dados e gera um token JWT.
 *
 * @param req - Requisição HTTP contendo email e password no corpo.
 * @param res - Resposta HTTP contendo o email do usuário e o token JWT.
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await userService.createUser(email, hashedPassword);
    const token = jwt.sign({ email: newUser.email }, 'secret', { expiresIn: '1hr' });
    res.json({ email: newUser.email, token });
  } catch (error: any) {
    console.error('Error during signup:', error);
    res.status(400).json({ detail: error.detail });
  }
};

/**
 * Realiza o login do usuário.
 * 
 * Verifica se o usuário existe pelo email, compara a senha fornecida com a senha armazenada,
 * e, se as credenciais estiverem corretas, gera um token JWT.
 *
 * @param req - Requisição HTTP contendo email e password no corpo.
 * @param res - Resposta HTTP contendo o email do usuário e o token JWT se o login for bem-sucedido.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      res.status(404).json({ detail: 'User does not exist!' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1hr' });
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
