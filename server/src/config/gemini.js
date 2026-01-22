import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText, jobDesc) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });  // Use the latest model
    const prompt = `Analyze this resume text: "${resumeText}" against this job description: 
    "${jobDesc}". Provide a detailed feedback summary, including strengths, weaknesses, 
    and suggestions for improvement. Keep it concise.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();  // Returns the AI-generated text
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};