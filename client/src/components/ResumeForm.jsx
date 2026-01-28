import { useState, useCallback } from "react";
import { Button, TextField, Stack, Alert, LinearProgress } from "@mui/material";
import { analyzeResume } from "../api/resumeApi";
import { useNavigate } from "react-router-dom";

export default function ResumeForm({ onResult }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
        setFile(null);
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum size is 5MB.");
        setFile(null);
        return;
      }

      setError("");
      setFile(selectedFile);
      setText(""); // Clear text input when file is selected
    }
  }, []);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
    setFile(null); // Clear file when text is entered
    setError("");
  }, []);

  const handleAnalyze = async () => {
    setError("");
    setSuccess(false);

    // Validate input
    if (!text && !file) {
      setError("Please upload a file or paste resume text.");
      return;
    }

    if (text && text.trim().length < 50) {
      setError("Resume text is too short. Please provide more content.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (file) formData.append("resume", file);
    if (text) formData.append("text", text);

    try {
      const res = await analyzeResume(formData);
      
      if (res.data.success) {
        setSuccess(true);
        onResult(res.data.data);
      } else {
        setError(res.data.message || "Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (err.response?.status === 504) {
        setError("Analysis timed out. Please try with a shorter resume.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success">
          Resume analysis completed successfully!
        </Alert>
      )}

      <TextField
        label="Paste Resume Text"
        multiline
        rows={6}
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your resume text here or upload a file below..."
        disabled={!!file}
        helperText="Minimum 50 characters required"
      />

      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'block', marginBottom: '8px' }}
        />
        <small style={{ color: '#666' }}>
          Supported formats: PDF, DOC, DOCX (Max 5MB)
        </small>
      </div>

      {loading && (
        <LinearProgress sx={{ mt: 1 }} />
      )}

      <Button 
        variant="contained" 
        onClick={handleAnalyze} 
        disabled={loading || (!text && !file)}
        size="large"
        sx={{ mt: 2 }}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </Button>
    </Stack>
  );
}
