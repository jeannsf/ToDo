import pool from '../db';
import * as userService from '../services/userService';

jest.mock('../db');

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Testa a função createUser, que cria um novo usuário no banco de dados.
   */
  describe('createUser', () => {
    it('deve criar um usuário e retornar os dados do usuário', async () => {
      const fakeUser = { email: 'test@example.com', hashed_password: 'hashed123' };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeUser] });

      const result = await userService.createUser('test@example.com', 'hashed123');
      expect(result).toEqual(fakeUser);
      expect(pool.query).toHaveBeenCalled();
    });
  });

  /**
   * Testa a função findUserByEmail, que busca um usuário pelo email.
   */
  describe('findUserByEmail', () => {
    it('deve retornar o usuário se encontrado', async () => {
      const fakeUser = { email: 'test@example.com', hashed_password: 'hashed123' };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeUser] });

      const result = await userService.findUserByEmail('test@example.com');
      expect(result).toEqual(fakeUser);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', ['test@example.com']);
    });

    it('deve retornar null se nenhum usuário for encontrado', async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await userService.findUserByEmail('notfound@example.com');
      expect(result).toBeNull();
    });
  });
});
