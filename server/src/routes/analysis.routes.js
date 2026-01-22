import express from 'express';
import { analyzeResume } from '../controllers/analysis.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, analyzeResume);

export default router;