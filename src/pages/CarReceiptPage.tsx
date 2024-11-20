import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import useCar from "../hooks/useCar";

function CarReceiptPage() {
  const { car_id } = useParams<{ car_id: string }>();
  const { fetchCarById, car, loading, error } = useCar();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (car_id) {
      fetchCarById(car_id);
    }
  }, [car_id, fetchCarById]);

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

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        padding: isMobile ? 2 : 4,
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
        Car Receipt
      </Typography>
      {car ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                padding: isMobile ? 2 : 4,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: isMobile ? 150 : 200,
                  objectFit: "contain",
                  marginBottom: 2,
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

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="subtitle1">Color</Typography>
                  <Typography variant="body2">
                    {car.color.name} - ${car.color.price.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="subtitle1">Accessories</Typography>
                  <List dense>
                    {car.accessories.map((acc) => (
                      <ListItem key={acc.id} sx={{ justifyContent: "center" }}>
                        <Typography variant="body2">
                          {acc.name} - ${acc.price.toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="subtitle1">Insurances</Typography>
                  <List dense>
                    {car.insurances.map((ins) => (
                      <ListItem key={ins.id} sx={{ justifyContent: "center" }}>
                        <Typography variant="body2">
                          {ins.name} - ${ins.price.toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="subtitle1">Customer</Typography>
                  <Typography variant="body2">
                    {car.customer.first_name} {car.customer.last_name}
                  </Typography>
                  <Typography variant="body2">
                    Email: {car.customer.email}
                  </Typography>
                  <Typography variant="body2">
                    Phone: {car.customer.phone_number}
                  </Typography>
                  <Typography variant="body2">
                    Address: {car.customer.address}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="subtitle1">Salesperson</Typography>
                  <Typography variant="body2">
                    {car.sales_person.first_name} {car.sales_person.last_name}
                  </Typography>
                  <Typography variant="body2">
                    Email: {car.sales_person.email}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Purchase Deadline:{" "}
                    {car.purchase_deadline
                      ? new Date(car.purchase_deadline).toLocaleDateString()
                      : "Not set"}
                  </Typography>
                  <Typography variant="h6" mt={1} color="primary">
                    Total Price: ${car.total_price.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography align="center">No car found</Typography>
      )}
      <Button
        onClick={() => navigate("/cars")}
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 4 }}
      >
        View All Cars
      </Button>
    </Container>
  );
}

export default CarReceiptPage;
