import { Button, Container, Typography, Stack } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Stack spacing={3} alignItems="center" sx={{ mt: 5 }}>
        <Typography variant="h4">Resume Analyzer</Typography>
        <Button variant="contained" onClick={() => navigate("/analyze")}>
          Analyze Resume
        </Button>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
}
