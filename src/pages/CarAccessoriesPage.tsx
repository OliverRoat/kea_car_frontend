import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  Checkbox,
  Button,
  Typography,
  Grid,
  Divider,
  Stack,
  Switch,
} from "@mui/material";
import useAccessories from "../hooks/useAccessories";
import useInsurances from "../hooks/useInsurances";

function CarAccessoriesPage() {
  const {
    accessories,
    error: accessoriesError,
    loading: accessoriesLoading,
  } = useAccessories();
  const {
    insurances,
    error: insurancesError,
    loading: insurancesLoading,
  } = useInsurances();

  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [showInsurances, setShowInsurances] = useState(false);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve car details from the previous page
  const { brand, model, color } = location.state || {};

  useEffect(() => {
    if (!brand || !model || !color) {
      console.warn("Missing required car configuration data.");
    }
  }, [brand, model, color]);

  const handleAccessoryChange = (accessoryId: string) => {
    setSelectedAccessories((prevSelected) =>
      prevSelected.includes(accessoryId)
        ? prevSelected.filter((id) => id !== accessoryId)
        : [...prevSelected, accessoryId]
    );
  };

  const handleInsuranceChange = (insuranceId: string) => {
    setSelectedInsurances((prevSelected) =>
      prevSelected.includes(insuranceId)
        ? prevSelected.filter((id) => id !== insuranceId)
        : [...prevSelected, insuranceId]
    );
  };

  const saveCarConfiguration = () => {
    const savedCar = {
      brand,
      model,
      color,
      accessories: selectedAccessories
        .map((id) => {
          const accessory = accessories.find((acc) => acc.id === id);
          return accessory
            ? { id: accessory.id, name: accessory.name, price: accessory.price }
            : null;
        })
        .filter(Boolean),
      insurances: selectedInsurances
        .map((id) => {
          const insurance = insurances.find((ins) => ins.id === id);
          return insurance
            ? { id: insurance.id, name: insurance.name, price: insurance.price }
            : null;
        })
        .filter(Boolean),
    };

    sessionStorage.setItem("savedCar", JSON.stringify(savedCar));
    navigate("/customers");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Select Car Accessories
      </Typography>
      <Grid container spacing={3}>
        {/* Accessories Section */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Accessories
            </Typography>
            {accessoriesLoading ? (
              <Typography>Loading accessories...</Typography>
            ) : accessoriesError ? (
              <Typography color="error">
                Error loading accessories: {accessoriesError}
              </Typography>
            ) : (
              <Stack spacing={1}>
                {accessories.map((accessory) => (
                  <Box key={accessory.id} display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedAccessories.includes(accessory.id)}
                      onChange={() => handleAccessoryChange(accessory.id)}
                    />
                    <Typography>
                      {accessory.name} - ${accessory.price}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Card>
        </Grid>

        {/* Insurance Section */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Insurance</Typography>
              <Switch
                checked={showInsurances}
                onChange={() => setShowInsurances(!showInsurances)}
                inputProps={{ "aria-label": "Toggle insurance selection" }}
              />
            </Box>
            {showInsurances && (
              <>
                <Divider sx={{ my: 2 }} />
                {insurancesLoading ? (
                  <Typography>Loading insurances...</Typography>
                ) : insurancesError ? (
                  <Typography color="error">
                    Error loading insurances: {insurancesError}
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {insurances.map((insurance) => (
                      <Box
                        key={insurance.id}
                        display="flex"
                        alignItems="center"
                      >
                        <Checkbox
                          checked={selectedInsurances.includes(insurance.id)}
                          onChange={() => handleInsuranceChange(insurance.id)}
                        />
                        <Typography>
                          {insurance.name} - ${insurance.price}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </>
            )}
          </Card>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={saveCarConfiguration}
        >
          Save Car Configuration
        </Button>
      </Box>
    </Box>
  );
}

export default CarAccessoriesPage;
