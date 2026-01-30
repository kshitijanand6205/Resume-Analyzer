import pool from '../config/db.js';

export const createUser = async (email, hashedPassword) => {
  if (!pool) {
    throw new Error('Database is not available');
  }
  const [result] = await pool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  return result.insertId;
};

export const findByEmail = async (email) => {
  if (!pool) {
    return null;
  }
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
