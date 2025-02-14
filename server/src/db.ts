// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL // Pensez à définir cette variable dans un fichier .env
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
