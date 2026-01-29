import express from 'express';
import { uploadResume, getResumes } from '../controllers/resume.controller.js';
import requireAuth from '../middleware/auth.middleware.js';

const router = express.Router();

// Upload resume
router.post('/', requireAuth, uploadResume);

// Get all resumes for user
router.get('/', requireAuth, getResumes);

export default router;
