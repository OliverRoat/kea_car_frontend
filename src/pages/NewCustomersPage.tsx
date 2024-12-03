import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RestrictedContent from "../components/RestrictedContent";

function NewCustomerPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine where to navigate after creating a customer so we can do this from multiple pages
  const redirectTo = location.state?.redirectTo || "/customers";

  const handleCreateCustomer = async () => {
    try {
      const newCustomer = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        address,
      };
      await apiClient.post("/customer", newCustomer);
      navigate(redirectTo);
    } catch (err) {
      setError("Failed to create customer. Please try again.");
    }
  };

  return (
    <RestrictedContent
      children={
        <Container
          maxWidth="sm"
          sx={{
            mt: 5,
            p: 4,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            gutterBottom
          >
            Create New Customer
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCustomer();
            }}
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "green",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              }}
            >
              Save Customer
            </Button>
          </Box>
        </Container>
      }
    />
  );
}

export default NewCustomerPage;
