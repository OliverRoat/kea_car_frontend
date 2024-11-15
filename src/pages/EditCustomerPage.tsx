import { useNavigate } from "react-router-dom";
import useCustomers from "../hooks/useCustomers";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Customer } from "../hooks/useCustomers";

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customers
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
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
      <List>
        {customers.map((customer) => (
          <ListItem
            key={customer.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 1,
              border: "1px solid #ddd",
              mb: 2,
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "scale(1.02)",
                transition: "transform 0.2s",
              },
            }}
          >
            <ListItemText
              primary={`${customer.first_name} ${customer.last_name}`}
              secondary={`Email: ${customer.email}`}
              sx={{ flex: 1 }}
            />
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleEditClick(customer)}
                sx={{ flexShrink: 0 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(customer.id)}
                sx={{ flexShrink: 0 }}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

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
  );
}

export default EditCustomerPage;
