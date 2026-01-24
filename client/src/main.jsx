import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { CssBaseline } from "@mui/material";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

