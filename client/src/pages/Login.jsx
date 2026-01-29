import React from 'react';
import { Button, TextField, Container, Typography, Box, Alert } from "@mui/material";
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });

      // Save token and user data
      login(res.data.token, res.data.user);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
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
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Sign in to your account to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
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
            autoComplete="current-password"
            placeholder="Enter your password"
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
            disabled={loading}
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
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 2, cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Don't have an account? <span style={{ color: '#4f46e5', fontWeight: 600 }}>Sign up</span>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
