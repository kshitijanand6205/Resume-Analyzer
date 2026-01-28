import { Button, Container, Typography, Stack, Box, Card, CardContent, Grid } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const { logout, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Box className="analyze-container">
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2d3748' }}>
            Welcome to Resume Analyzer
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {user ? `Hello, ${user.email}!` : 'Get started with professional resume analysis.'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our AI-powered system will help you optimize your resume for better job opportunities
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} justifyContent="center" mb={6}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#4f46e5' }}>📊</Typography>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  ATS Scoring
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get an objective score based on Applicant Tracking System compatibility
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#10b981' }}>🤖</Typography>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  AI Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive personalized feedback and improvement suggestions
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#f59e0b' }}>💡</Typography>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Smart Suggestions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get actionable recommendations to improve your resume
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Action Section */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#2d3748', mb: 3 }}>
            Ready to analyze your resume?
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate("/analyze")}
            sx={{ 
              px: 8, 
              py: 2.5, 
              fontSize: '1.3rem',
              backgroundColor: '#4f46e5',
              '&:hover': {
                backgroundColor: '#4338ca',
                transform: 'translateY(-2px)',
              },
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
              textTransform: 'none',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            Analyze Your Resume
          </Button>
        </Box>

        {/* Quick Stats */}
        <Box textAlign="center" mb={4}>
          <Typography variant="body2" color="text.secondary">
            Join thousands of job seekers who have improved their resumes
          </Typography>
        </Box>

        {/* Logout Section */}
        <Box textAlign="center" mt={5}>
          <Button 
            variant="text" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{ 
              color: '#718096',
              '&:hover': {
                color: '#4f46e5',
                backgroundColor: 'transparent'
              },
              textTransform: 'none'
            }}
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
