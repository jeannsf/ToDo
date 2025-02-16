import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  host: process.env.HOST || 'localhost',
  port: process.env.DBPORT ? parseInt(process.env.DBPORT, 10) : 5432,
  database: 'todoapp'
});

export default pool;
