// import { Button, TextField, Container, Typography } from "@mui/material";
// import axios from "../api/axiosInstance";
// import { useAuth } from "../auth/AuthContext";

// export default function Login() {
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const res = await axios.post("/auth/login", { email, password });
//     login(res.data.token);
//   };

//   return (
//     <Container maxWidth="xs">
//       <Typography variant="h5" align="center">Login</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField name="email" label="Email" fullWidth margin="normal" />
//         <TextField name="password" label="Password" type="password" fullWidth />
//         <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// }


import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "../api/axiosInstance";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/auth/login", { email, password });

      // ✅ save token
      login(res.data.token);

      // ✅ redirect AFTER login
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center">Login</Typography>

      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" fullWidth />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
}
