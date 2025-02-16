import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Cria e retorna um pool de conexões com o banco de dados.
 * 
 * As configurações são definidas com base nas variáveis de ambiente, 
 * utilizando valores padrão caso estas não estejam definidas.
 *
 * @returns {Pool} Objeto Pool para acesso ao banco de dados.
 */
const pool = new Pool({
  user: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  host: process.env.HOST || 'localhost',
  port: process.env.DBPORT ? parseInt(process.env.DBPORT, 10) : 5432,
  database: 'todoapp'
});

export default pool;
