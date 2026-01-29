import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const analyzeResume = async (resumeText, jobDesc) => {
  try {
    const prompt = `
You are a senior ATS (Applicant Tracking System) resume evaluator and hiring analyst with deep expertise in:
- Resume screening logic used by real ATS software
- Keyword matching, semantic relevance, and role alignment
- Entry-level, internship, and early-career technical roles

Your task is to analyze the resume strictly against the provided job description.

IMPORTANT RULES:
- Evaluate ONLY based on the given resume and job description
- Do NOT assume or invent skills, experience, or education
- Think like an ATS first, then like a recruiter
- Prioritize keyword relevance, role alignment, and clarity
- Be concise, factual, and actionable

RESUME CONTENT:
"""
${resumeText.slice(0, 3500)}
"""

JOB DESCRIPTION:
"""
${jobDesc}
"""

ANALYSIS CRITERIA:
1. Keyword match with job description (skills, tools, technologies)
2. Role alignment and relevance
3. Project and experience clarity
4. Technical depth appropriate for the role
5. ATS readability and structure

RESPONSE FORMAT (STRICT — follow exactly):

Strengths:
- List concrete strengths that directly match the job description
- Mention matched keywords or skills explicitly

Weaknesses:
- Identify missing or weakly represented skills or keywords
- Point out unclear, vague, or non-ATS-friendly sections

Suggestions:
- Provide specific, realistic improvements (keywords to add, sections to refine)
- Suggestions must be achievable without exaggeration or false claims
- Focus on improving ATS score and recruiter clarity

Do not add any extra sections.
Do not explain your reasoning.
Do not include scores or percentages.
`;


    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.6
    });

    const text = response.choices[0]?.message?.content || "";

    return {
      strengths: text.split("Weaknesses")[0] || text,
      weaknesses: text.split("Weaknesses")[1]?.split("Suggestions")[0] || "",
      suggestions: text.split("Suggestions")[1] || ""
    };

  } catch (err) {
    console.error("GROQ AI ERROR:", err.message);
    return {
      strengths: "Strong technical foundation.",
      weaknesses: "Needs clearer impact and metrics.",
      suggestions: "Add quantified achievements and role-specific keywords."
    };
  }
};