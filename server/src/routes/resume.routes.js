import express from 'express';
import { uploadResume, getResumes } from '../controllers/resume.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import uploadMiddleware from '../middleware/upload.middleware.js';

const router = express.Router();

// Upload resume (file)
router.post(
  '/',
  authMiddleware,
  uploadMiddleware.single('resume'), // IMPORTANT
  uploadResume
);

// Get all resumes for user
router.get(
  '/',
  authMiddleware,
  getResumes
);

export default router;
