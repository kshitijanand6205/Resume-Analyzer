import React from 'react';
import { useState, useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import ResultCard from "../components/ResultCard";
import { Box, Container, Typography, Alert, Fade } from "@mui/material";

export default function Analyze() {
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Trigger fade-in animation when result is available
  useEffect(() => {
    if (result) {
      setShowResult(true);
    }
  }, [result]);

  return (
    <Box className="analyze-container">
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2d3748' }}>
            Resume Analysis
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Upload your resume or paste the content to get detailed analysis and improvement suggestions
          </Typography>
          
          {/* Quick Tips */}
          <Box mt={3} p={3} bgcolor="rgba(79, 70, 229, 0.05)" borderRadius={2}>
            <Typography variant="body2" color="text.secondary">
              💡 <strong>Tip:</strong> For best results, upload a PDF or DOC file, or paste at least 50 characters of your resume content
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        <Box className="analyze-card" sx={{ position: 'relative' }}>
          {/* Upload Section */}
          <ResumeForm onResult={setResult} />
          
          {/* Result Section with Animation */}
          {result && (
            <Fade in={showResult} timeout={600}>
              <Box mt={4}>
                <ResultCard result={result} />
              </Box>
            </Fade>
          )}
        </Box>

        {/* Footer Info */}
        <Box textAlign="center" mt={5} mb={3}>
          <Typography variant="body2" color="text.secondary">
            Our analysis combines ATS compatibility scoring with AI-powered insights to help you optimize your resume
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
