import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;
try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('Database pool created with host:', process.env.DB_HOST, 'and port:', process.env.DB_PORT);
} catch (error) {
  console.error('Failed to create database pool:', error.message);
  throw new Error('Database connection failed: ' + error.message);
}

export default pool;