import { useState } from "react";
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
  Alert,
} from "@mui/material";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = async () => {
    /**
     * Add some client-side validation
     */
    if (!email) {
      setFieldError("Email is required");
      return;
    }

    if (!password) {
      setFieldError("Password is required");
      return;
    }

    try {
      await login(email, password);
      navigate("/brands");
    } catch (err) {
      console.error('Login failed:', err);
    }
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
      <Typography 
      data-testid="login-title"
      variant={isMobile ? "h5" : "h4"} 
      align="center" gutterBottom>
        Login
      </Typography>
      {fieldError && (
        <Alert severity="error" sx={{ mb: 2 }} data-testid="login-error-alert">
          {fieldError}
        </Alert>
      )}
      <Stack spacing={3}>
        <TextField
          data-testid="email-login-input"
          label="Email"
          type="email"
          id="email-login-input"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ fontSize: "1rem" }}
        />
        <TextField
          data-testid="password-login-input"
          label="Password"
          type="password"
          id="password-login-input"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ fontSize: "1rem" }}
        />
        <Button
          data-testid="login-button"
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
