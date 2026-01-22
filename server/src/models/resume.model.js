import pool from '../config/db.js';

export const saveResume = async (userId, filename, content) => {
  const [result] = await pool.execute('INSERT INTO resumes (user_id, filename, content) VALUES (?, ?, ?)', [userId, filename, content]);
  return result.insertId;
};

export const getResumesByUser = async (userId) => {
  const [rows] = await pool.execute('SELECT * FROM resumes WHERE user_id = ?', [userId]);
  return rows;
};