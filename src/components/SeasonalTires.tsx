import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import useDegrees from "../hooks/useDegrees";

export default function SeasonalTires() {
  const { degrees } = useDegrees();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTiny = useMediaQuery("(max-width:1000px)"); // Custom threshold for very small screens

  return (
    <Box
      sx={{
        position: "absolute",
        top: 80,
        right: 16,
        p: isMobile ? 1 : 2,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 3,
        borderRadius: 1,
        zIndex: 1000,
        textAlign: "center", // Center the text horizontally
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center the text vertically
        alignItems: "center",
        minWidth: isTiny ? 80 : isMobile ? 100 : 200, // Adjust the minimum width for different screen sizes
        maxWidth: isTiny ? "40%" : isMobile ? "30%" : "auto", // Ensure it does not overlap on very small screens
        maxHeight: isTiny ? "40%" : isMobile ? "30%" : "auto", // Ensure it does not overlap on very small screens
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontSize: isTiny ? "0.75rem" : isMobile ? "0.6rem" : "1.25rem", // Adjust font size for different screen sizes
        }}
      >
        It is {degrees}°C degrees.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontSize: isTiny ? "0.5rem" : isMobile ? "0.45rem" : "1rem", // Adjust font size for different screen sizes
        }}
      >
        So it is recommended to use {degrees && degrees <= 7 ? "winter Tires" : "all Season Tires"}.
      </Typography>
    </Box>
  );
}