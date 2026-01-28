import { Card, CardContent, Typography, Divider, Chip, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const toBulletPoints = (text) => {
  if (!text) return [];

  return text
    .replace(/\*\*/g, "")
    .replace(/Strengths:|Weaknesses:|Suggestions:/gi, "")
    .split(/\n|\d+\./)
    .map(point => point.trim())
    .filter(point => point.length > 2 && point !== "-");
};

const StyledSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledList = styled('ul')(({ theme }) => ({
  paddingLeft: "20px",
  marginTop: "8px",
  marginBottom: 0,
  '& li': {
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    }
  }
}));

const Section = ({ title, content, color = "primary" }) => {
  const points = toBulletPoints(content);

  return (
    <StyledSection>
      <Typography variant="h6" color={`${color}.main`} gutterBottom>
        {title}
      </Typography>
      <StyledList>
        {points.map((point, index) => (
          <li key={index}>
            <Typography variant="body1" color="text.secondary">
              {point}
            </Typography>
          </li>
        ))}
      </StyledList>
    </StyledSection>
  );
};

const ScoreChip = styled(Chip)(({ theme, score }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  padding: theme.spacing(1, 2),
  backgroundColor: score >= 80 ? theme.palette.success.light : 
                  score >= 60 ? theme.palette.warning.light : 
                  theme.palette.error.light,
  color: score >= 80 ? theme.palette.success.contrastText : 
         score >= 60 ? theme.palette.warning.contrastText : 
         theme.palette.error.contrastText,
}));

export default function ResultCard({ result }) {
  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  return (
    <Card sx={{ mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" component="h3" gutterBottom>
            Resume Analysis Results
          </Typography>
          <ScoreChip 
            label={`ATS Score: ${result.score}/100`}
            score={result.score}
            variant="filled"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Section title="Strengths" content={result.strengths} color="success" />
        <Section title="Areas for Improvement" content={result.weaknesses} color="warning" />
        <Section title="Suggestions" content={result.suggestions} color="info" />

        {result.analysisDate && (
          <Box mt={3} textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Analyzed on: {new Date(result.analysisDate).toLocaleString()}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

