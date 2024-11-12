import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import useBrands from "../hooks/useBrands";

function CarBrandPage() {
  const { brands, error } = useBrands();
  const navigate = useNavigate();

  if (error) {
    return <Box color="red">Error Message: {error}</Box>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose a Car Brand
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {brands.map((brand) => (
          <Grid item xs={6} sm={4} md={3} key={brand.id}>
            <Card
              onClick={() =>
                navigate(`/brands/${brand.name.toLowerCase()}`, {
                  state: { id: brand.id },
                })
              }
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={brand.logo_url}
                  alt={`${brand.name} logo`}
                  sx={{
                    width: "100%",
                    height: "100px",
                    objectFit: "contain",
                    padding: 2,
                  }}
                />
                <Typography variant="h6" align="center" gutterBottom>
                  {brand.name}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CarBrandPage;
