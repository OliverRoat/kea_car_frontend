import { useNavigate } from "react-router-dom";
import useCustomers from "../hooks/useCustomers";
import { useEffect, useState } from "react";
import { SavedCar } from "../types/SavedCar";
import { Accessory } from "../hooks/useAccessories";
import { Insurance } from "../hooks/useInsurances";
import apiClient from "../services/apiClient";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Stack,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestrictedContent from "../components/RestrictedContent";

function CustomersPage() {
  const { customers, error, loading } = useCustomers();
  const [savedCar, setSavedCar] = useState<SavedCar | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carData = sessionStorage.getItem("savedCar");
    if (carData) {
      try {
        setSavedCar(JSON.parse(carData));
      } catch (error) {
        console.error("Failed to parse savedCar from sessionStorage:", error);
      }
    }
  }, []);

  const handleCustomerSelect = async (customerId: string) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === customerId
    );
    const salesPerson = JSON.parse(
      sessionStorage.getItem("salesPerson") || "{}"
    );

    if (
      !savedCar ||
      !savedCar.model ||
      !savedCar.color ||
      !selectedCustomer ||
      !salesPerson.id
    ) {
      console.error("Required data is missing");
      return;
    }

    const carData = {
      models_id: savedCar.model.id,
      colors_id: savedCar.color.id,
      customers_id: selectedCustomer.id,
      sales_people_id: salesPerson.id,
      accessory_ids: savedCar.accessories.map((acc: Accessory) => acc.id),
      insurance_ids: savedCar.insurances.map((ins: Insurance) => ins.id),
    };

    try {
      const response = await apiClient.post("/car", carData);
      console.log("Car created successfully:", response.data);

      sessionStorage.removeItem("savedCar");
      sessionStorage.removeItem("selectedCustomerId");

      // Navigate to the receipt page with the newly created car's ID
      navigate(`/car-receipt/${response.data.id}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Failed to create car:", err.response.data);
        } else {
          console.error("Failed to create car:", err.message);
        }
      } else {
        console.error("An unknown error occurred:", err);
      }
    }
  };

  return (
    <RestrictedContent
      children={
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            mt: 4,
            p: 3,
            position: "relative",
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "white",
              backgroundColor: "green",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            <ArrowBackIcon />
            <Typography variant="button" sx={{ ml: 1 }}>
              Back
            </Typography>
          </IconButton>

          <Typography variant="h4" align="center" gutterBottom>
            Select a Customer
          </Typography>

          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" align="center">
              Error loading customers: {error}
            </Typography>
          )}

          <Grid container spacing={3}>
            {customers.map((customer) => (
              <Grid item xs={12} sm={6} md={4} key={customer.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    boxShadow: 3,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => handleCustomerSelect(customer.id)}
                >
                  <CardContent>
                    <Stack direction="column" spacing={1} alignItems="center">
                      <Typography variant="h6">
                        {customer.first_name} {customer.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {customer.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {customer.phone_number}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 4 }}
            onClick={() =>
              navigate("/new-customer", { state: { redirectTo: "/customers" } })
            }
          >
            Add New Customer
          </Button>
        </Box>
      }
    />
  );
}

export default CustomersPage;
