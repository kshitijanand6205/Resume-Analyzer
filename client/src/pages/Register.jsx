import { Button, TextField, Container, Typography, Box, Alert } from "@mui/material";
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/auth/register", { email, password });
      setSuccess(true);
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.response?.status === 400) {
        setError("This email is already registered. Please try logging in.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="auth-card">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Join us today and start analyzing your resume
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Account created successfully! Redirecting to login...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            autoComplete="email"
            placeholder="Enter your email"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cbd5e0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4f46e5',
                },
              }
            }}
          />
          
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            autoComplete="new-password"
            placeholder="Create a strong password"
            helperText="Password must be at least 6 characters"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cbd5e0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4f46e5',
                },
              }
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large"
            disabled={loading || success}
            sx={{ 
              mt: 3, 
              py: 1.5,
              backgroundColor: '#4f46e5',
              '&:hover': {
                backgroundColor: '#4338ca',
                transform: 'translateY(-1px)',
              },
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 2, cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Already have an account? <span style={{ color: '#4f46e5', fontWeight: 600 }}>Sign in</span>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
