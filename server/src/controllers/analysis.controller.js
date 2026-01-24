import fs from "fs";
import pdfParse from "pdf-parse";
import { calculateATSScore } from "../services/ats.service.js";
import { analyzeWithAI } from "../services/ai.service.js";

export const analyzeResume = async (req, res) => {
  try {
    let resumeText = "";
    const jobDesc = req.body.jobDesc || "Software Developer";

    // 1️⃣ Get resume text
    if (req.file) {
      const buffer = fs.readFileSync(req.file.path);
      const pdf = await pdfParse(buffer);
      resumeText = pdf.text;
    } else if (req.body.text) {
      resumeText = req.body.text;
    } else {
      return res.status(400).json({ message: "No resume provided" });
    }

    if (resumeText.length < 50) {
      return res.status(400).json({ message: "Resume text too short" });
    }

    // 2️⃣ ATS score (your logic)
    const score = calculateATSScore(resumeText, jobDesc);

    // 3️⃣ AI analysis (SAFE – never throws)
    const ai = await analyzeWithAI(resumeText, jobDesc);

    return res.json({
      score,
      strengths: ai.strengths,
      weaknesses: ai.weaknesses,
      suggestions: ai.suggestions
    });

  } catch (err) {
    console.error("ANALYZE CONTROLLER ERROR:", err);
    return res.json({
      score: 0,
      strengths: "Could not analyze strengths",
      weaknesses: "Could not analyze weaknesses",
      suggestions: "Please try again"
    });
  }
};
