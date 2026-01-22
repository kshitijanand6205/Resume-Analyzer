import { saveResume, getResumesByUser } from '../models/resume.model.js';
import { parsePDF } from '../services/pdf.service.js';
import logger from '../utils/logger.js';

/**
 * Upload Resume (PDF)
 */
export const uploadResume = async (req, res, next) => {
  try {
    // ✅ Auth validation
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const userId = req.user.id;

    // ✅ File validation (MOST IMPORTANT FIX)
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required. Use form-data with key 'resume'."
      });
    }

    const { filename, path } = req.file;

    // ✅ Parse PDF safely
    let content;
    try {
      content = await parsePDF(path);
    } catch (pdfError) {
      logger.error("PDF parse failed:", pdfError);
      return res.status(400).json({
        message: "Invalid or corrupted PDF file"
      });
    }

    // ✅ Save to DB
    const resumeId = await saveResume(
      userId,
      filename,
      content
    );

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId
    });

  } catch (error) {
    logger.error("Upload Resume Error:", error);
    next(error);
  }
};

/**
 * Get all resumes for logged-in user
 */
export const getResumes = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const userId = req.user.id;

    const resumes = await getResumesByUser(userId);

    return res.json(resumes);

  } catch (error) {
    logger.error("Get Resumes Error:", error);
    next(error);
  }
};
