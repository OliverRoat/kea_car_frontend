import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import useLogin from "../hooks/useLogin";

function LoginPage({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (loggedIn: boolean) => void;
}) {
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoggedIn(true);
      navigate("/brands");
    } catch {
      // Optionally handle errors
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        width: "100%",
        margin: "50px auto",
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default LoginPage;
