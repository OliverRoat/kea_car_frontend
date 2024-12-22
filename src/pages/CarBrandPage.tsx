import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import useBrands from "../hooks/useBrands";
import RestrictedContent from "../components/RestrictedContent";

function CarBrandPage() {
  const { brands, error } = useBrands();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (error) {
    return <Box color="red">Error Message: {error}</Box>;
  }

  return (
    <RestrictedContent
      slot={
        <Box
          p={3}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto", // Center the page content
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"} // Adjust title size for mobile
            align="center"
            gutterBottom
          >
            Choose a Car Brand
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              padding: isMobile ? 1 : 3,
            }}
          >
            {brands.map((brand) => (
              <Grid
                item
                xs={12} // Full width on mobile
                sm={6} // Two columns on tablets
                md={4} // Three columns on small desktops
                lg={3} // Four columns on larger desktops
                key={brand.id}
              >
                <Card
                  className="brand-card"
                  onClick={() =>
                    navigate(`/brands/${brand.name.toLowerCase()}`, {
                      state: { id: brand.id },
                    })
                  }
                  sx={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={brand.logo_url}
                      alt={`${brand.name} logo`}
                      sx={{
                        width: "100%",
                        height: isMobile ? "80px" : "100px", // Adjust image height for mobile
                        objectFit: "contain",
                        padding: 2,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom
                      sx={{
                        fontSize: isMobile ? "1rem" : "1.25rem", // Adjust font size for mobile
                        padding: isMobile ? 1 : 2,
                      }}
                    >
                      {brand.name}
                    </Typography>
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

export default CarBrandPage;
