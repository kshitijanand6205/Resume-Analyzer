export const calculateATSScore = (resumeText, jobDesc) => {
  const keywords = jobDesc.toLowerCase().split(' ');
  const resumeWords = resumeText.toLowerCase().split(' ');
  const matches = keywords.filter(word => resumeWords.includes(word)).length;
  return Math.min((matches / keywords.length) * 100, 100);
};