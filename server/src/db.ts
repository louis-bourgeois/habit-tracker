// server/src/db.ts
import { Pool } from 'pg';


const pool = new Pool({
  connectionString: "postgres://postgres:@localhost:5432/habit_tracker",
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
