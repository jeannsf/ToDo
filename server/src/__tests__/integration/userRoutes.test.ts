import request from 'supertest';
import express from 'express';
import cors from 'cors';
import userRoutes from '../../routes/userRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);

describe('User Routes Integration', () => {
  // Gera um email único para cada execução do teste para evitar conflitos de chave duplicada
  const uniqueEmail = `integration+${Date.now()}@test.com`;

  /**
   * Testa o endpoint POST /signup para registro de um novo usuário.
   * 
   * Envia os dados de um novo usuário e espera receber um status 200 com os campos "email" e "token".
   */
  it('deve registrar um novo usuário', async () => {
    const newUser = {
      email: uniqueEmail,
      password: 'senha123'
    };

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).toHaveProperty('token');
  });

  /**
   * Testa o endpoint POST /login para autenticação de um usuário existente.
   * 
   * Utiliza as mesmas credenciais do usuário previamente registrado e espera receber um status 200 com os campos "email" e "token".
   */
  it('deve autenticar um usuário existente', async () => {
    const credentials = {
      email: uniqueEmail,
      password: 'senha123'
    };

    const response = await request(app)
      .post('/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', credentials.email);
    expect(response.body).toHaveProperty('token');
  });
});
