import { parsePDF } from '../services/pdf.service.js';
import { analyzeResumeATS } from '../services/ats.service.js';
import { analyzeResume as analyzeWithAI } from '../services/ai.service.js';

export const analyzeResume = async (req, res) => {
  try {
    
    let resumeText = "";
    const jobDesc = req.body.jobDesc || "Software Developer";


    // Handle file upload
    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        resumeText = await parsePDF(req.file.buffer);
      } else {
        // Handle Word documents (you'd need additional libraries)
        return res.status(400).json({
          success: false,
          message: "Word document parsing not implemented yet"
        });
      }
    }

    if (!resumeText) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide resume text or upload a file" 
      });
    }

    // ATS score
    const score = analyzeResumeATS(resumeText, jobDesc || "Software Developer");

    // AI analysis
    const ai = await analyzeWithAI(resumeText, jobDesc || "Software Developer");

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
    console.error("Analysis error:", err);
    return res.status(500).json({
      success: false,
      message: "Analysis failed. Please try again."
    });
  }
};
