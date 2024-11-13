import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

interface NavBarProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage items
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("salesPerson");

    // Update the login status and navigate to login
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Car Management
          </Typography>
          <Button color="inherit" onClick={() => navigate("/brands")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/edit-customer")}>
            Customers
          </Button>
          <Button color="inherit" onClick={() => navigate("/cars")}>
            Cars
          </Button>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
