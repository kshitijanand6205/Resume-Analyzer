import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { calculateATSScore } from "../services/ats.service.js";
import { analyzeWithAI } from "../services/ai.service.js";
import logger from "../utils/logger.js";

export const analyzeResume = async (req, res) => {
  try {
    let resumeText = "";
    const jobDesc = req.body.jobDesc || "Software Developer";

    // 1️⃣ Get resume text
    if (req.file) {
      // Validate file type and size
      if (!req.file.mimetype.startsWith('application/pdf') && 
          !req.file.mimetype.startsWith('application/msword') &&
          !req.file.mimetype.startsWith('application/vnd.openxmlformats-officedocument')) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid file type. Please upload a PDF or Word document." 
        });
      }

      if (req.file.size > 5 * 1024 * 1024) { // 5MB limit
        return res.status(400).json({ 
          success: false,
          message: "File too large. Maximum size is 5MB." 
        });
      }

      const buffer = fs.readFileSync(req.file.path);
      const pdf = await pdfParse(buffer);
      resumeText = pdf.text;
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
    } else if (req.body.text) {
      resumeText = req.body.text;
    } else {
      return res.status(400).json({ 
        success: false,
        message: "No resume provided. Please upload a file or paste text." 
      });
    }

    // Validate resume content
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ 
        success: false,
        message: "Resume content too short or empty. Please provide more content." 
      });
    }

    // Sanitize resume text
    resumeText = resumeText.replace(/\s+/g, ' ').trim();

    // 2️⃣ ATS score
    const score = calculateATSScore(resumeText, jobDesc);

    // 3️⃣ AI analysis with timeout
    const ai = await Promise.race([
      analyzeWithAI(resumeText, jobDesc),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI analysis timeout')), 30000)
      )
    ]);

    logger.info(`Resume analysis completed for user ${req.user.id}`, {
      score,
      resumeLength: resumeText.length,
      jobDescLength: jobDesc.length
    });

    return res.json({
      success: true,
      data: {
        score,
        strengths: ai.strengths,
        weaknesses: ai.weaknesses,
        suggestions: ai.suggestions,
        analysisDate: new Date().toISOString()
      }
    });

  } catch (err) {
    logger.error("Resume analysis error:", err);
    
    // Clean up file if it exists and error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupErr) {
        logger.error("Failed to cleanup file:", cleanupErr);
      }
    }

    if (err.message === 'AI analysis timeout') {
      return res.status(504).json({
        success: false,
        message: "Analysis timed out. Please try again with a shorter resume.",
        data: {
          score: 0,
          strengths: "Analysis timed out",
          weaknesses: "Please try again with a shorter resume",
          suggestions: "Reduce resume length and try again"
        }
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred during analysis. Please try again.",
      data: {
        score: 0,
        strengths: "Analysis failed",
        weaknesses: "Please try again",
        suggestions: "Contact support if the problem persists"
      }
    });
  }
};
