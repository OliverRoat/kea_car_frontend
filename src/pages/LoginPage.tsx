import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/brands");
    } catch {}
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
        margin: "80px auto",
        padding: 4,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        boxShadow: 5,
        textAlign: "center",
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
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
          onClick={handleLogin}
          disabled={loading}
          fullWidth
          sx={{
            padding: "12px 0",
            fontSize: "1rem",
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
