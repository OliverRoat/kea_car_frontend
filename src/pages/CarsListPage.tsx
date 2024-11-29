import { useState, useEffect } from "react";
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
} from "@mui/material";
import RestrictedContent from "../components/RestrictedContent";
import useCar, { Car } from "../hooks/useCar";
import CreatePurchaseForCarButton from "../components/CreatePurchaseForCarButton";
import DeleteCarButton from "../components/DeleteCarButton";

function CarsListPage() {
  const { allCars, fetchAllCars, loading, error } = useCar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [carList, setCarList] = useState<Car[]>(allCars);

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  useEffect(() => {
    setCarList(allCars);
  }, [allCars]);

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
  };

  const removeCarFromList = (carId: string) => {
    setCarList((prevCarList) => prevCarList.filter((car) => car.id !== carId));
  };

  return (
    <RestrictedContent>
      <Container maxWidth="lg" sx={{ mt: 4, padding: isMobile ? 2 : 4 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          gutterBottom
        >
          Cars
        </Typography>
        <Grid container spacing={3}>
          {carList.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
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
                      content: `${car.customer.first_name} ${car.customer.last_name}, Email: ${car.customer.email}, Phone: ${car.customer.phone_number}, Address: ${car.customer.address}`,
                    },
                    {
                      title: "Salesperson",
                      key: `sales-person-${car.id}`,
                      content: `${car.sales_person.first_name} ${car.sales_person.last_name}, Email: ${car.sales_person.email}`,
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
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <CreatePurchaseForCarButton
                        car={car}
                        onPurchaseCreated={updateCarInList} // Pass the callback function
                      />
                      <DeleteCarButton
                        car={car}
                        onDeleteCar={removeCarFromList} // Pass the callback function
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
      </Container>
    </RestrictedContent>
  );
}

export default CarsListPage;
