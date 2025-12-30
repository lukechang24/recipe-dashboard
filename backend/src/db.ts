import 'dotenv/config';
import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

export default pool;