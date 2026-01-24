import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios.post("/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" />
        <TextField name="email" label="Email" fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" fullWidth />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
}
