import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

interface NavBarProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("salesPerson");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#E6EBE0", // Matches the page background
        borderBottom: "2px solid #ccc", // Adds a subtle border
        padding: "10px 30px",
        width: "100%",
        boxShadow: "none", // Removes shadow for a flat look
      }}
    >
      <Toolbar
        sx={{
          minHeight: "80px",
          display: "flex",
          justifyContent: "space-between",
          color: "#333",
        }}
      >
        <Box display="flex" alignItems="center">
          {/* Logo acting as Home button */}
          <Box
            component="img"
            src="https://keacar.ams3.cdn.digitaloceanspaces.com/KeaCarLogo.png"
            alt="KeaCar Logo"
            onClick={() => navigate("/brands")}
            sx={{
              height: "50px",
              width: "auto",
              cursor: "pointer",
              mr: 3,
            }}
          />

          <Button
            onClick={() => navigate("/edit-customer")}
            sx={{ color: "#333", fontSize: "16px", mx: 1 }}
          >
            Customers
          </Button>
          <Button
            onClick={() => navigate("/cars")}
            sx={{ color: "#333", fontSize: "16px", mx: 1 }}
          >
            Cars
          </Button>
        </Box>

        {/* Green Logout button */}
        <Button
          onClick={handleLogout}
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "green",
            borderRadius: "6px",
            padding: "6px 12px",
            "&:hover": {
              backgroundColor: "#006400",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
