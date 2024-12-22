import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useModels, { Color } from "../hooks/useModels";
import RestrictedContent from "../components/RestrictedContent";

function ModelPage() {
  const { brand } = useParams<{ brand: string }>();
  const location = useLocation();
  const brandId = location.state?.id;

  const navigate = useNavigate();
  const { models, error: modelsError } = useModels({
    brandId: brandId || null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (modelsError) {
    return <Box color="red">Error fetching models: {modelsError}</Box>;
  }

  const handleModelSelect = (model: {
    id: string;
    name: string;
    price: number;
    colors: Color[];
  }) => {
    navigate(
      `/brands/${brand?.toLowerCase()}/models/${model.name.toLowerCase()}/colors`,
      {
        state: { brand, model, colors: model.colors },
      }
    );
  };

  return (
    <RestrictedContent
      slot={
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
            {brand
              ? `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`
              : "Unknown"}{" "}
            Models
          </Typography>

          {/* Models Grid */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: isMobile ? 1 : 3 }}
          >
            {models.map((model) => (
              <Grid
                item
                xs={12} // Full width on mobile
                sm={6} // Two columns on tablets
                md={4} // Three columns on small desktops
                lg={3} // Four columns on larger desktops
                key={model.id}
              >
                <Card
                  className="model-card"
                  onClick={() => handleModelSelect(model)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
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
                      height={isMobile ? "100" : "140"} // Adjust height for mobile
                      image={model.image_url}
                      alt={model.name}
                      sx={{
                        objectFit: "contain",
                        transition: "transform 0.2s ease",
                        "&:hover": { transform: "scale(1.1)" },
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
                        {model.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                      >
                        Price: ${model.price}
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

export default ModelPage;
