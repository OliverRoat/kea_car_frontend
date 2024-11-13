import { useEffect } from "react";
import useCar from "../hooks/useCar";
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
} from "@mui/material";

function CarsListPage() {
  const { allCars, fetchAllCars, loading, error } = useCar();

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cars
      </Typography>
      <Grid container spacing={3}>
        {allCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, textAlign: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: { xs: 150, md: 200 }, objectFit: "contain", marginTop: 1 }}
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
                  <Typography variant="body2">Email: {car.customer.email}</Typography>
                  <Typography variant="body2">Phone: {car.customer.phone_number}</Typography>
                  <Typography variant="body2">Address: {car.customer.address}</Typography>
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
                  <Typography variant="body2">Email: {car.sales_person.email}</Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Purchase Deadline: {new Date(car.purchase_deadline).toLocaleDateString()}
                  </Typography>
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
  );
}

export default CarsListPage;
