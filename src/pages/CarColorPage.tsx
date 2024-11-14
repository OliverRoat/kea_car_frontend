import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Color {
  id: string;
  name: string;
  price: number;
  red_value: number;
  green_value: number;
  blue_value: number;
}

function CarColorPage() {
  const location = useLocation();
  const { brand, model, colors } = location.state || {};
  const navigate = useNavigate();

  const handleColorSelect = (color: Color) => {
    navigate(
      `/brands/${brand}/models/${model.name}/colors/${color.name}/accessories`,
      {
        state: { brand, model, color },
      }
    );
  };

  return (
    <Box p={3} position="relative">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          mt: 2,
          ml: 2,
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

      <Typography variant="h4" align="center" gutterBottom>
        Select a Color for {model.name}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {colors.map((color: Color) => (
          <Grid item xs={12} sm={6} md={4} key={color.id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => handleColorSelect(color)}
            >
              <CardActionArea>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: `rgb(${color.red_value}, ${color.green_value}, ${color.blue_value})`,
                    mx: "auto",
                    mt: 2,
                    border: "3px solid #ddd",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {color.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    ${color.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CarColorPage;
