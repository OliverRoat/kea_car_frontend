import { useNavigate } from "react-router-dom";
import useCustomers, { Customer } from "../hooks/useCustomers";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestrictedContent from "../components/RestrictedContent";

function EditCustomerPage() {
  const { customers, error, loading, fetchAllCustomers } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCustomer) {
      setSelectedCustomer({
        ...selectedCustomer,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateCustomer = async () => {
    if (selectedCustomer) {
      const originalCustomer = customers.find(
        (c) => c.id === selectedCustomer.id
      );

      if (!originalCustomer) {
        console.error("Original customer data not found.");
        return;
      }

      const updatedFields: Partial<Customer> = {};

      if (originalCustomer.email !== selectedCustomer.email) {
        updatedFields.email = selectedCustomer.email;
      }
      if (originalCustomer.phone_number !== selectedCustomer.phone_number) {
        updatedFields.phone_number = selectedCustomer.phone_number;
      }
      if (originalCustomer.first_name !== selectedCustomer.first_name) {
        updatedFields.first_name = selectedCustomer.first_name;
      }
      if (originalCustomer.last_name !== selectedCustomer.last_name) {
        updatedFields.last_name = selectedCustomer.last_name;
      }
      if (originalCustomer.address !== selectedCustomer.address) {
        updatedFields.address = selectedCustomer.address;
      }

      try {
        await apiClient.put(`/customer/${selectedCustomer.id}`, updatedFields);
        fetchAllCustomers();
        handleClose();
        showAlert("Customer updated successfully", "success");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Failed to update customer:",
            err.response?.data || err.message
          );
          showAlert("Failed to update customer. Please try again.", "error");
        } else {
          console.error("An unknown error occurred:", err);
          showAlert("An unknown error occurred. Please try again.", "error");
        }
      }
    }
  };

  const handleDelete = async (customerId: string) => {
    try {
      await apiClient.delete(`/customer/${customerId}`);
      fetchAllCustomers();
      showAlert("Customer deleted successfully", "success");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Failed to delete customer:",
          err.response?.data || err.message
        );
        showAlert("Failed to delete customer. Please try again.", "error");
      } else {
        console.error("An unknown error occurred:", err);
        showAlert("An unknown error occurred. Please try again.", "error");
      }
    }
  };

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <RestrictedContent
      children={
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom data-testid="edit-customer-title">
            Customers
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              id="create-customer"
              variant="contained"
              color="success"
              onClick={() =>
                navigate("/new-customer", {
                  state: { redirectTo: "/edit-customer" },
                })
              }
            >
              Create Customer
            </Button>
          </Box>
          {loading && (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          )}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={3} data-testid="customers-grid">
            {customers.map((customer) => (
              <Grid item xs={12} sm={6} md={4} key={customer.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6">
                        {customer.first_name} {customer.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {customer.email}
                      </Typography>
                      <Box display="flex" gap={1} mt={2}>
                        <Button
                          id={`edit-customer${customer.id}`}
                          variant="contained"
                          color="success"
                          onClick={() => handleEditClick(customer)}
                          fullWidth
                        >
                          Edit
                        </Button>
                        <Button
                          id={`delete-customer${customer.id}`}
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(customer.id)}
                          fullWidth
                        >
                          Delete
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Edit Customer Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              Edit Customer
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedCustomer && (
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="First Name"
                    name="first_name"
                    variant="outlined"
                    value={selectedCustomer.first_name}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    variant="outlined"
                    value={selectedCustomer.last_name}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={selectedCustomer.email}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    label="Phone Number"
                    name="phone_number"
                    variant="outlined"
                    value={selectedCustomer.phone_number}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={selectedCustomer.address}
                    onChange={handleInputChange}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCustomer}
                variant="contained"
                color="success"
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for success/error messages */}
          <Snackbar
            open={alertOpen}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleAlertClose}
              severity={alertSeverity}
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      }
    />
  );
}

export default EditCustomerPage;
