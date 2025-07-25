import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'intellizap',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

let pool;

export const createConnection = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
      
      // Test connection
      const connection = await pool.getConnection();
      console.log('✅ Connected to MySQL database:', process.env.DB_NAME);
      connection.release();
    }
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Config used:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });
    throw error;
  }
};

export const getConnection = () => {
  if (!pool) {
    throw new Error('Database not initialized. Call createConnection() first.');
  }
  return pool;
};

// Helper function for queries
export const query = async (sql, params = []) => {
  try {
    const connection = getConnection();
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('❌ Database query error:', error.message);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw error;
  }
};