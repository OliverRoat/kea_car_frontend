import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListSubheader,
  Container,
  Grid,
} from "@mui/material";
import useCar, { Car } from "../hooks/useCar";
import usePurchase, { Purchase } from "../hooks/usePurchase";
import RestrictedContent from "../components/RestrictedContent";
import CreatePurchaseForCarButton from "../components/CreatePurchaseForCarButton";
import DeleteCarButton from "../components/DeleteCarButton";

function CarPage() {
  const { car_id } = useParams<{ car_id: string }>();
  const { fetchCarById, car, loading, error } = useCar();
  const { fetchPurchaseByCarId, purchase } = usePurchase();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null
  );

  useEffect(() => {
    if (car_id) {
      fetchCarById(car_id);
    }
  }, [car_id, fetchCarById]);

  useEffect(() => {
    if (car) {
      setSelectedCar(car);
      if (car.is_purchased) {
        fetchPurchaseByCarId(car.id);
      }
    }
  }, [car, fetchPurchaseByCarId]);

  useEffect(() => {
    if (purchase) {
      setSelectedPurchase(purchase);
    }
  }, [purchase]);

  const updateCar = (updatedCar: Car) => {
    setSelectedCar(updatedCar);
    fetchPurchaseByCarId(updatedCar.id);
  };

  const returnToCarsList = () => {
    navigate("/cars");
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!selectedCar) {
    return (
      <Typography color="error" align="center">
        Car not found
      </Typography>
    );
  }

  return (
    <RestrictedContent>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, padding: isMobile ? 2 : 4 }}
        key={car_id}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          align="center"
          gutterBottom={true}
        >
          Car Details
        </Typography>

        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: isMobile ? 150 : 200,
              objectFit: "contain",
              marginTop: 1,
            }}
            image={selectedCar.model.image_url}
            alt={selectedCar.model.name}
          />
          <CardContent>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="div"
              sx={{ mb: isMobile ? 1 : 2 }}
              data-testid="show-car-model-name"
            >
              {selectedCar.model.brand.name}
              {" - "}
              {selectedCar.model.name}
            </Typography>
            <Grid container spacing={1} sx={{ mb: isMobile ? 1 : 2 }}>
              <Grid item xs={12} md={6} mb={4}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                    mb: isMobile ? 1 : 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: isMobile ? 1 : 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ fontSize: isMobile ? "1.4rem" : "1.8rem", mr: 2 }}
                    >
                      Color:
                    </Typography>
                    <Box
                      sx={{
                        width: isMobile ? 30 : 60,
                        height: isMobile ? 30 : 60,
                        borderRadius: "50%",
                        backgroundColor: `rgb(${selectedCar.color.red_value}, ${selectedCar.color.green_value}, ${selectedCar.color.blue_value})`,
                        border: "3px solid #ddd",
                        mr: 2,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                  >
                    Name: {selectedCar.color.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                  >
                    Price: ${selectedCar.color.price.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} mb={4}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: isMobile ? 1 : 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ fontSize: isMobile ? "1.2rem" : "1.6rem", mt: 2 }}
                  >
                    Model: {selectedCar.model.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                  >
                    Price of model: ${selectedCar.model.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "1.2rem" : "1.6rem", mt: 1 }}
                  >
                    Total Price: ${selectedCar.total_price.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid container spacing={2} sx={{ mb: isMobile ? 1 : 2 }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: isMobile ? 1 : 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ mb: isMobile ? 0.5 : 1 }}
                    >
                      Customer
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}
                    >
                      Name: {selectedCar.customer.first_name}{" "}
                      {selectedCar.customer.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                    >
                      Email: {selectedCar.customer.email}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                    >
                      Phone:{" "}
                      {selectedCar.customer.phone_number ?? "Not provided"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 1 }}
                    >
                      Address: {selectedCar.customer.address ?? "Not provided"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: isMobile ? 1 : 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ mb: isMobile ? 0.5 : 1 }}
                    >
                      Salesperson
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 3 }}
                    >
                      First Name: {selectedCar.sales_person.first_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 3 }}
                    >
                      Last Name: {selectedCar.sales_person.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? "1rem" : "1.2rem", mt: 3 }}
                    >
                      Email: {selectedCar.sales_person.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: isMobile ? 1 : 2 }}>
              <Grid item xs={12} md={6}>
                <List
                  subheader={
                    <ListSubheader component="div" sx={{ textAlign: "center" }}>
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        component="div"
                        color="text.primary"
                        style={{
                          textDecoration: "underline",
                          textDecorationThickness: "3px",
                        }}
                      >
                        Accessories:
                      </Typography>
                    </ListSubheader>
                  }
                >
                  {selectedCar.accessories.length > 0 ? (
                    selectedCar.accessories.map((acc) => (
                      <ListItem key={acc.id} sx={{ justifyContent: "center" }}>
                        {acc.name} - ${acc.price.toFixed(2)}
                      </ListItem>
                    ))
                  ) : (
                    <ListItem sx={{ justifyContent: "center" }}>
                      No accessories
                    </ListItem>
                  )}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List
                  subheader={
                    <ListSubheader component="div" sx={{ textAlign: "center" }}>
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        component="div"
                        color="text.primary"
                        style={{
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                        }}
                      >
                        Insurances:
                      </Typography>
                    </ListSubheader>
                  }
                >
                  {selectedCar.insurances.length > 0 ? (
                    selectedCar.insurances.map((ins) => (
                      <ListItem key={ins.id} sx={{ justifyContent: "center" }}>
                        {ins.name} - ${ins.price.toFixed(2)}
                      </ListItem>
                    ))
                  ) : (
                    <ListItem sx={{ justifyContent: "center" }}>
                      No insurances
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            <Box sx={{ mt: isMobile ? 1 : 2, gap: 1 }}>
              <Box
                sx={{
                  mt: isMobile ? 1 : 2,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: selectedCar.is_purchased
                      ? "green"
                      : selectedCar.purchase_deadline &&
                        new Date(selectedCar.purchase_deadline) < new Date()
                      ? "red"
                      : "inherit",
                    textDecorationThickness: "3px",
                    fontWeight: "bold",
                  }}
                >
                  Purchase Deadline:{" "}
                  {selectedCar.purchase_deadline
                    ? new Date(
                        selectedCar.purchase_deadline
                      ).toLocaleDateString()
                    : "Not set"}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    textDecorationThickness: "2px",
                  }}
                >
                  Purchase Date:{" "}
                  {selectedPurchase?.date_of_purchase
                    ? new Date(
                      selectedPurchase.date_of_purchase
                      ).toLocaleDateString()
                    : "Not purchased yet"}
                </Typography>
              </Box>
              <Box sx={{ mt: isMobile ? 1 : 2, display: "flex", gap: 1 }}>
                <CreatePurchaseForCarButton
                  car={selectedCar}
                  onPurchaseCreated={updateCar}
                />
                <DeleteCarButton
                  car={selectedCar}
                  onDeleteCar={returnToCarsList}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </RestrictedContent>
  );
}

export default CarPage;
