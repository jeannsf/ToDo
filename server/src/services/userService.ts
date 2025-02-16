import pool from '../db';
import { QueryResult } from 'pg';

export interface User {
  email: string;
  hashed_password: string;
}

/**
 * Cria um novo usuário no banco de dados.
 * @param email - Email do usuário.
 * @param hashedPassword - Senha criptografada.
 * @returns O usuário criado.
 */
export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
  const result: QueryResult<User> = await pool.query(
    `INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *`,
    [email, hashedPassword]
  );
  return result.rows[0];
};

/**
 * Busca um usuário no banco de dados pelo email.
 * @param email - Email do usuário.
 * @returns O usuário encontrado ou null se não existir.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result: QueryResult<User> = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows.length ? result.rows[0] : null;
};
