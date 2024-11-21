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
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { styled } from "@mui/material/styles";
import { useThemeToggle } from "../styles/themeContext";

const ThemeToggleButton = styled(Box)(({ theme }) => ({
  width: 60,
  height: 30,
  backgroundColor: theme.palette.background.default,
  borderRadius: 30,
  position: "relative",
  border: `2px solid ${theme.palette.divider}`,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 5px",
  boxShadow: theme.shadows[1],
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const ToggleThumb = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  transition: "left 0.3s ease",
}));

const NavBar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toggleTheme, isDarkMode } = useThemeToggle();
  const theme = useTheme();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("salesPerson");
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const navItems = [
    { label: "Customers", onClick: () => navigate("/edit-customer") },
    { label: "Cars", onClick: () => navigate("/cars") },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.background.default,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 0,
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section: Logo */}
          <Box
            component="img"
            src="https://keacar.ams3.cdn.digitaloceanspaces.com/KeaCarLogo.png"
            alt="KeaCar Logo"
            onClick={() => navigate("/brands")}
            sx={{
              height: "50px",
              width: "auto",
              cursor: "pointer",
            }}
          />

          {/* Center Section: Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexGrow: 1, // Push logout and theme toggle to the right
              justifyContent: "center",
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick}
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  fontWeight: "normal",
                  backgroundColor: "transparent",
                  borderRadius: "6px",
                  mx: 1,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Section: Theme Toggle and Logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ThemeToggleButton
              onClick={toggleTheme}
              sx={{
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              }}
            >
              <WbSunnyIcon
                sx={{
                  fontSize: 20,
                  color: isDarkMode ? "text.secondary" : "gold",
                }}
              />
              <NightlightRoundIcon
                sx={{
                  fontSize: 20,
                  color: isDarkMode ? "purple" : "text.secondary",
                }}
              />
              <ToggleThumb
                sx={{
                  left: isDarkMode ? 32 : 4,
                }}
              />
            </ThemeToggleButton>

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
          </Box>

          {/* Mobile Navigation - Burger Menu */}
          <IconButton
            edge="end"
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
            {navItems
              .concat({ label: "Logout", onClick: handleLogout })
              .map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={item.onClick}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer for content below NavBar */}
      <Box sx={{ height: "80px" }} />
    </>
  );
};

export default NavBar;
