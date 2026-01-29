export const analyzeResumeATS = (resumeText, jobDesc) => {
  if (!resumeText || !jobDesc) return 0;

  const clean = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(" ")
      .filter(word => word.length > 3);

  const resumeWords = clean(resumeText);
  const jobWords = clean(jobDesc);

  const uniqueJobWords = [...new Set(jobWords)];

  let matched = 0;
  uniqueJobWords.forEach(word => {
    if (resumeWords.includes(word)) {
      matched++;
    }
  });

  // Keyword relevance (70%)
  const keywordScore =
    (matched / uniqueJobWords.length) * 70;

  // Section presence (30%)
  let sectionScore = 0;
  const resumeLower = resumeText.toLowerCase();

  if (resumeLower.includes("education")) sectionScore += 10;
  if (resumeLower.includes("skills")) sectionScore += 10;
  if (
    resumeLower.includes("experience") ||
    resumeLower.includes("projects")
  ) {
    sectionScore += 10;
  }

  const finalScore = Math.round(keywordScore + sectionScore);

  return Math.min(finalScore, 100);
};