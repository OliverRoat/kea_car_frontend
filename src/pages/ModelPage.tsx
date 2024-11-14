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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useModels, { Color } from "../hooks/useModels";

function ModelPage() {
  const { brand } = useParams<{ brand: string }>();
  const location = useLocation();
  const brandId = location.state?.id;

  const navigate = useNavigate();

  const { models, error: modelsError } = useModels({
    brandId: brandId || null,
  });

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
        {brand
          ? `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`
          : "Unknown"}{" "}
        Models
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {models.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
            <Card
              onClick={() => handleModelSelect(model)}
              sx={{ cursor: "pointer" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={model.image_url}
                  alt={model.name}
                  sx={{
                    objectFit: "contain",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
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
  );
}

export default ModelPage;
