import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import RestrictedContent from "../components/RestrictedContent";
import useCar, { Car } from "../hooks/useCar";
import CreatePurchaseForCarButton from "../components/CreatePurchaseForCarButton";
import DeleteCarButton from "../components/DeleteCarButton";

function CarsListPage() {
  const { allCars, fetchAllCars, loading, error } = useCar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [carList, setCarList] = useState<Car[]>([]);
  const [visibleCars, setVisibleCars] = useState<Car[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [carsToShow, setCarsToShow] = useState(5);

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  useEffect(() => {
    setCarList(allCars);
    setVisibleCars(allCars.slice(0, carsToShow));
  }, [allCars, carsToShow]);

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

  const updateCarInList = (updatedCar: Car) => {
    setCarList((prevCarList) =>
      prevCarList.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
    setVisibleCars((prevVisibleCars) =>
      prevVisibleCars.map((car) =>
        car.id === updatedCar.id ? updatedCar : car
      )
    );
  };

  const handleDeleteCar = (carId: string) => {
    setCarList((prevCars) => prevCars.filter((car) => car.id !== carId));
    setVisibleCars((prevVisibleCars) =>
      prevVisibleCars.filter((car) => car.id !== carId)
    );
    setSnackbarOpen(true); // Open the snackbar when a car is deleted
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const loadMoreCars = () => {
    setCarsToShow((prev) => prev + 5);
  };

  return (
    <RestrictedContent slot={
      <Container maxWidth="lg" sx={{ mt: 4, padding: isMobile ? 2 : 4 }}>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          align="center"
          data-testid="cars-list-title"
          gutterBottom={true}
        >
          Cars
        </Typography>
        <Grid container spacing={3} data-testid="cars-grid">
          {visibleCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card
                onClick={() => navigate(`/car/${car.id}`)}
                // Add a class to add a flag to cards with expired purchase deadlines (used by e2e testing).
                className={`car-card `
                  + (car.purchase_deadline && new Date(car.purchase_deadline) < new Date() ? "car-purchase-deadline-expired " : "")
                  + (car.is_purchased ? "car-purchased " : "")
                }
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: isMobile ? 150 : 200,
                    objectFit: "contain",
                    marginTop: 1,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.06)",
                    },
                  }}
                  image={car.model.image_url}
                  alt={car.model.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {car.model.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${car.model.price.toFixed(2)}
                  </Typography>

                  {[
                    {
                      title: "Color",
                      key: `color-${car.id}`,
                      content: `${car.color.name} - $${car.color.price.toFixed(
                        2
                      )}`,
                    },
                    {
                      title: "Accessories",
                      key: `accessories-${car.id}`,
                      content:
                        car.accessories.length > 0
                          ? car.accessories
                              .map(
                                (acc) =>
                                  `${acc.name} - $${acc.price.toFixed(2)}`
                              )
                              .join(", ")
                          : "No accessories",
                    },
                    {
                      title: "Insurances",
                      key: `insurances-${car.id}`,
                      content:
                        car.insurances.length > 0
                          ? car.insurances
                              .map(
                                (ins) =>
                                  `${ins.name} - $${ins.price.toFixed(2)}`
                              )
                              .join(", ")
                          : "No insurances",
                    },
                    {
                      title: "Customer",
                      key: `customer-${car.id}`,
                      content: `${car.customer.first_name} ${
                        car.customer.last_name
                      }, Email: ${car.customer.email}, Phone: ${
                        car.customer.phone_number ?? ""
                      }, Address: ${car.customer.address ?? ""}`,
                    },
                    {
                      title: "Employee",
                      key: `employee-${car.id}`,
                      content: `${car.employee.first_name} ${car.employee.last_name}, Email: ${car.employee.email}`,
                    },
                  ].map(({ title, key, content }) => (
                    <Box
                      key={key}
                      sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1,
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="subtitle1">{title}</Typography>
                      <Typography variant="body2" color="text.primary">
                        {content}
                      </Typography>
                    </Box>
                  ))}

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.primary"                      
                      style={{
                        textDecoration: "underline",
                        textDecorationColor: car.is_purchased
                          ? "green"
                          : car.purchase_deadline &&
                            new Date(car.purchase_deadline) < new Date()
                          ? "red"
                          : "inherit",
                        textDecorationThickness: "3px",
                        fontWeight: "bold",
                      }}
                    >
                      Purchase Deadline:{" "}
                      {car.purchase_deadline
                        ? new Date(car.purchase_deadline).toLocaleDateString()
                        : "Not set"}
                    </Typography>
                    <Box 
                      sx={{ mt: 2, display: "flex", gap: 1 }} 
                      /**
                       * Hidden because it seems more natural to click on the card to view and manage
                       * the car details. Rather than having to click on the image (which is not clear at all) 
                       * to view details which was the initial design. (Ideally, the buttons should just be removed)
                       */
                      className="hidden"
                    >
                      <CreatePurchaseForCarButton
                        car={car}
                        onPurchaseCreated={updateCarInList} // Pass the callback function
                      />
                      <DeleteCarButton
                        car={car}
                        onDeleteCar={handleDeleteCar} // Pass the callback function
                      />
                    </Box>
                    <Typography variant="h6" mt={1} color="primary">
                      Total Price: ${car.total_price.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {visibleCars.length >= 5 && visibleCars.length < carList.length && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={loadMoreCars}>
              Load More Cars
            </Button>
          </Box>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Car deleted successfully!
          </Alert>
        </Snackbar>
      </Container>
    } />
  );
}

export default CarsListPage;
