import pool from '../config/db.js';

export const saveAnalysis = async (resumeId, atsScore, aiFeedback) => {
  const [result] = await pool.execute('INSERT INTO analyses (resume_id, ats_score, ai_feedback) VALUES (?, ?, ?)', [resumeId, atsScore, aiFeedback]);
  return result.insertId;
};

export const getAnalysisByResume = async (resumeId) => {
  const [rows] = await pool.execute('SELECT * FROM analyses WHERE resume_id = ?', [resumeId]);
  return rows[0];
};