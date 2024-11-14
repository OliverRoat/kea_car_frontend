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
        maxWidth: 600, // Increase maximum width for a larger box
        width: "100%",
        margin: "80px auto", // Add more margin to center the box lower
        padding: 4, // Increase padding for a more spacious look
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        boxShadow: 5,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ fontSize: "1rem" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ fontSize: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
          sx={{ padding: "12px 0", fontSize: "1rem" }} // Larger button
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
