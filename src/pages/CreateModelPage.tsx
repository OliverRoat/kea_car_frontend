import { useState } from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useBrands from "../hooks/useBrands";
import useColors from "../hooks/useColors";
import useModels from "../hooks/useModels";
import RestrictedContent from "../components/RestrictedContent";

function CreateModelPage() {
  const navigate = useNavigate();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();
  const { colors, loading: colorsLoading, error: colorsError } = useColors();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [creating, setCreating] = useState(false);

  const { createModel, error: modelError } = useModels({ brandId: null });

  const handleColorChange = (event: any) => {
    const { value } = event.target;
    setSelectedColors(typeof value === "string" ? value.split(",") : value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !brandId || selectedColors.length === 0 || !file) {
      setSnackbar({
        open: true,
        message: "Please fill all fields.",
        severity: "error",
      });
      return;
    }
    setCreating(true);
    const result = await createModel({
      name,
      price: Number(price),
      brands_id: brandId,
      color_ids: selectedColors,
      model_image: file,
    });
    setCreating(false);
    if (result) {
      setSnackbar({
        open: true,
        message: "Model created successfully!",
        severity: "success",
      });
      setName("");
      setPrice("");
      setBrandId("");
      setSelectedColors([]);
      setFile(null);
    } else {
      setSnackbar({
        open: true,
        message: modelError || "Failed to create model.",
        severity: "error",
      });
    }
  };

  return (
    <RestrictedContent
      slot={
        <Box
          p={3}
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            position: "relative",
          }}
        >
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
          <Typography variant="h4" align="center" gutterBottom>
            Create New Model
          </Typography>
          <Card variant="outlined" sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Model Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="brand-label">Brand</InputLabel>
                    {brandsLoading ? (
                      <CircularProgress size={24} />
                    ) : brandsError ? (
                      <Typography color="error">{brandsError}</Typography>
                    ) : (
                      <Select
                        labelId="brand-label"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value as string)}
                        input={<OutlinedInput label="Brand" />}
                      >
                        {brands.map((brand: any) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="colors-label">Colors</InputLabel>
                    {colorsLoading ? (
                      <CircularProgress size={24} />
                    ) : colorsError ? (
                      <Typography color="error">{colorsError}</Typography>
                    ) : (
                      <Select
                        labelId="colors-label"
                        multiple
                        value={selectedColors}
                        onChange={handleColorChange}
                        input={<OutlinedInput label="Colors" />}
                        renderValue={(selected) =>
                          colors
                            .filter((color: any) => selected.includes(color.id))
                            .map((color: any) => color.name)
                            .join(", ")
                        }
                      >
                        {colors.map((color: any) => (
                          <MenuItem key={color.id} value={color.id}>
                            <Checkbox
                              checked={selectedColors.indexOf(color.id) > -1}
                            />
                            <ListItemText primary={color.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" component="label" fullWidth>
                    {file ? file.name : "Upload File"}
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={creating}
                  >
                    {creating ? <CircularProgress size={24} /> : "Create Model"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      }
    />
  );
}

export default CreateModelPage;
