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
import RestrictedContent from "../components/RestrictedContent";
import SeasonalTires from "../components/SeasonalTires";

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
    <RestrictedContent
      children={
        <Container maxWidth="lg" sx={{ mt: 4, padding: isMobile ? 2 : 4 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            gutterBottom
          >
            Car Receipt <SeasonalTires />
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

                    {[
                      {
                        title: "Color",
                        content: `${
                          car.color.name
                        } - $${car.color.price.toFixed(2)}`,
                      },
                      {
                        title: "Accessories",
                        content: car.accessories
                          .map(
                            (acc) => `${acc.name} - $${acc.price.toFixed(2)}`
                          )
                          .join(", "),
                      },
                      {
                        title: "Insurances",
                        content: car.insurances
                          .map(
                            (ins) => `${ins.name} - $${ins.price.toFixed(2)}`
                          )
                          .join(", "),
                      },
                      {
                        title: "Customer",
                        content: `${car.customer.first_name} ${car.customer.last_name}, Email: ${car.customer.email}, Phone: ${car.customer.phone_number}, Address: ${car.customer.address}`,
                      },
                      {
                        title: "Salesperson",
                        content: `${car.sales_person.first_name} ${car.sales_person.last_name}, Email: ${car.sales_person.email}`,
                      },
                    ].map(({ title, content }) => (
                      <Box
                        key={title}
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
                      <Typography variant="body2" color="text.primary">
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
      }
    />
  );
}

export default CarReceiptPage;
