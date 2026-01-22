import { saveAnalysis } from '../models/analysis.model.js';
import { getResumesByUser } from '../models/resume.model.js';
import { calculateATSScore } from '../services/ats.service.js';
import { analyzeWithAI } from '../services/ai.service.js';
import logger from '../utils/logger.js';

export const analyzeResume = async (req, res, next) => {
  try {
    const { resumeId, jobDesc } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!resumeId || !jobDesc) {
      return res.status(400).json({
        message: "resumeId and jobDesc are required"
      });
    }

    // Fetch user's resumes
    const resumes = await getResumesByUser(userId);

    // Find the requested resume
      const resume = resumes.find(r => r.id === Number(resumeId));

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found for this user"
      });
    }

    // Calculate ATS score
    const atsScore = calculateATSScore(resume.content, jobDesc);

    // AI-based analysis
    const aiFeedback = await analyzeWithAI(resume.content, jobDesc);

    // Save analysis result
    const analysisId = await saveAnalysis(
      resumeId,
      atsScore,
      aiFeedback
    );

    // Success response
    res.status(200).json({
      analysisId,
      atsScore,
      aiFeedback
    });

  } catch (error) {
    logger.error("Analyze Resume Error:", error);
    next(error);
  }
};
