import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { analyzeResume } from "../api/resumeApi";
import { useNavigate } from "react-router-dom";

export default function ResumeForm({ onResult }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    const token = localStorage.getItem("token");

    // 🔐 AUTH GUARD
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("resume", file);
    if (text) formData.append("text", text);

    try {
      setLoading(true);
      const res = await analyzeResume(formData);
      onResult(res.data);
    } catch (err) {
      // 🔐 HANDLE EXPIRED / INVALID TOKEN
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Paste Resume Text"
        multiline
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button variant="contained" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </Button>
    </Stack>
  );
}