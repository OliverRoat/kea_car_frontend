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
  Switch,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAccessories from "../hooks/useAccessories";
import useInsurances from "../hooks/useInsurances";
import RestrictedContent from "../components/RestrictedContent";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brand, model, color } = location.state || {};

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!brand || !model || !color) {
      console.warn("Missing required car configuration data.");
    }
  }, [brand, model, color]);

  const handleAccessoryChange = (accessoryId: string) => {
    setSelectedAccessories((prev) => {
      if (prev.includes(accessoryId)) {
        return prev.filter((id) => id !== accessoryId);
      } else if (prev.length >= 10) {
        setSnackbarOpen(true);
        return prev;
      }
      return [...prev, accessoryId];
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInsuranceChange = (insuranceId: string) => {
    setSelectedInsurances((prev) =>
      prev.includes(insuranceId)
        ? prev.filter((id) => id !== insuranceId)
        : [...prev, insuranceId]
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
    <RestrictedContent
      slot={
        <Box
          p={3}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
            variant="contained"
          >
            Back
          </Button>

          {/* Title */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            gutterBottom
          >
            Select Car Accessories and Insurance
          </Typography>

          {/* Accessories Section */}
          <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Accessories
            </Typography>
            {accessoriesLoading ? (
              <CircularProgress />
            ) : accessoriesError ? (
              <Typography color="error">
                Error loading accessories: {accessoriesError}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {accessories.map((accessory) => (
                  <Grid item xs={12} sm={6} md={4} key={accessory.id}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        className="accessory-checkbox"
                        checked={selectedAccessories.includes(accessory.id)}
                        onChange={() => handleAccessoryChange(accessory.id)}
                        sx={{
                          color: "green",
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                      <Typography>
                        {accessory.name} - ${accessory.price}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Card>

          {/* Insurance Section */}
          <Card variant="outlined" sx={{ p: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Insurance</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  color={!showInsurances ? "text.primary" : "text.secondary"}
                >
                  NO
                </Typography>
                <Switch
                  checked={showInsurances}
                  onChange={() => setShowInsurances(!showInsurances)}
                  inputProps={{ "aria-label": "Toggle insurance selection" }}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "green",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "green",
                    },
                  }}
                />
                <Typography
                  color={showInsurances ? "text.primary" : "text.secondary"}
                >
                  YES
                </Typography>
              </Box>
            </Box>
            {showInsurances && (
              <>
                <Divider sx={{ my: 2 }} />
                {insurancesLoading ? (
                  <CircularProgress />
                ) : insurancesError ? (
                  <Typography color="error">
                    Error loading insurances: {insurancesError}
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {insurances.map((insurance) => (
                      <Grid item xs={12} sm={6} md={4} key={insurance.id}>
                        <Box display="flex" alignItems="center">
                          <Checkbox
                            checked={selectedInsurances.includes(insurance.id)}
                            onChange={() => handleInsuranceChange(insurance.id)}
                            sx={{
                              color: "green",
                              "&.Mui-checked": {
                                color: "green",
                              },
                            }}
                          />
                          <Typography>
                            {insurance.name} - ${insurance.price}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Card>

          {/* Save Button */}
          <Box mt={4} textAlign="center">
            <Button
              data-testid="save-car-configuration"
              variant="contained"
              color="success"
              onClick={saveCarConfiguration}
            >
              Save Car Configuration
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              You can select up to 10 accessories only.
            </Alert>
          </Snackbar>
        </Box>
      }
    />
  );
}

export default CarAccessoriesPage;
