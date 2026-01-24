import { Card, CardContent, Typography, Divider } from "@mui/material";

const toBulletPoints = (text) => {
  if (!text) return [];

  return text
    .replace(/\*\*/g, "")
    .replace(/Strengths:|Weaknesses:|Suggestions:/gi, "")
    .split(/\n|\d+\./)   // split on new line or "1."
    .map(point => point.trim())
    .filter(point => point.length > 2 && point !=="-");
};

const Section = ({ title, content }) => {
  const points = toBulletPoints(content);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
        {points.map((point, index) => (
          <li key={index}>
            <Typography variant="body1">
              {point}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          ATS Score: {result.score}/100
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* <Typography><b>Strengths:</b> {result.strengths}</Typography>
        <Typography sx={{ mt: 1 }}><b>Weaknesses:</b> {result.weaknesses}</Typography>
        <Typography sx={{ mt: 1 }}><b>Suggestions:</b> {result.suggestions}</Typography> */}
        <Section title="Strengths" content={result.strengths} />
        <Section title="Weaknesses" content={result.weaknesses} />
        <Section title="Suggestions" content={result.suggestions} />
      </CardContent>
    </Card>
  );
}

