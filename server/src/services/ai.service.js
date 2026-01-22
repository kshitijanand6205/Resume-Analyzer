import { analyzeResume as geminiAnalyze } from "../config/gemini.js";

export const analyzeWithAI = async (resumeText, jobDesc) => {
  const prompt = `
You are an ATS resume analyzer.

Resume:
${resumeText}

Job Description:
${jobDesc}

Give:
1. Strengths
2. Weaknesses
3. Improvement suggestions
`;

  try {
    // Attempt Gemini
    const aiResponse = await geminiAnalyze(prompt);
    return aiResponse;

  } catch (error) {
    // 🔥 FALLBACK (CRITICAL)
    console.error("AI unavailable, using fallback analysis");

    return `
⚠️ AI service temporarily unavailable.

Basic Analysis:
- Resume length appears adequate
- Skills should be aligned more closely with job keywords
- Add measurable achievements
- Improve formatting for ATS compatibility

(Automated fallback response)
`;
  }
};
