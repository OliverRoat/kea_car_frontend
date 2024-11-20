import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavBarProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("salesPerson");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const navItems = [
    { label: "Customers", onClick: () => navigate("/edit-customer") },
    { label: "Cars", onClick: () => navigate("/cars") },
    { label: "Logout", onClick: handleLogout, isLogout: true },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#E6EBE0", // Matches the page background
          borderBottom: "2px solid #ccc",
          padding: "10px 30px",
          width: "100%",
          boxShadow: "none",
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
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick}
                sx={{
                  color: item.isLogout ? "#fff" : "#333",
                  fontSize: "16px",
                  fontWeight: item.isLogout ? "bold" : "normal",
                  backgroundColor: item.isLogout ? "green" : "transparent",
                  borderRadius: "6px",
                  padding: item.isLogout ? "6px 12px" : "inherit",
                  "&:hover": {
                    backgroundColor: item.isLogout ? "#006400" : "transparent",
                  },
                  mx: 1,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Navigation - Burger Menu */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
