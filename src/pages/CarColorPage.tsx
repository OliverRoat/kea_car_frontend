import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestrictedContent from "../components/RestrictedContent";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleColorSelect = (color: Color) => {
    navigate(
      `/brands/${brand}/models/${model.name}/colors/${color.name}/accessories`,
      {
        state: { brand, model, color },
      }
    );
  };

  return (
    <RestrictedContent
      children={
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
            variant={isMobile ? "h5" : "h4"} // Responsive font size
            align="center"
            gutterBottom
          >
            Select a Color for {model.name}
          </Typography>

          {/* Colors Grid */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: isMobile ? 1 : 3 }}
          >
            {colors.map((color: Color) => (
              <Grid
                item
                xs={12} // Full width on mobile
                sm={6} // Two columns on tablets
                md={4} // Three columns on small desktops
                lg={3} // Four columns on larger desktops
                key={color.id}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                  className="color-card"
                  onClick={() => handleColorSelect(color)}
                >
                  <CardActionArea>
                    <Box
                      sx={{
                        width: isMobile ? 80 : 100, // Adjust size for mobile
                        height: isMobile ? 80 : 100,
                        borderRadius: "50%",
                        backgroundColor: `rgb(${color.red_value}, ${color.green_value}, ${color.blue_value})`,
                        mx: "auto",
                        mt: 2,
                        border: "3px solid #ddd",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          fontSize: isMobile ? "1rem" : "1.25rem", // Responsive font size
                        }}
                      >
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
      }
    />
  );
}

export default CarColorPage;
