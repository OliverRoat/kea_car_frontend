import { useState } from "react";
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
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { styled } from "@mui/material/styles";
import { useThemeToggle } from "../styles/themeContext";

const ThemeToggleButton = styled(Box)(({ theme }) => ({
  id: "theme-toggle-button",
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
  id: "toggle-thumb",
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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("salesPerson");
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const navItems = [
    { label: "Customers", onClick: () => navigate("/edit-customer"), id: "view-customers" },
    { label: "Cars", onClick: () => navigate("/cars"), id: "view-cars" },
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
          {/* Logo for Tablet and Desktop */}
          {!isMobile && (
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
          )}

          {/* Desktop Navigation */}
          {!isMobile && !isTablet && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3, // Add spacing between buttons
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  id={item.id}
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "16px",
                    fontWeight: "normal",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    px: 3, // Add padding on left and right
                    py: 1, // Add padding on top and bottom
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                id="logout-button"
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
              <ThemeToggleButton
                onClick={toggleTheme}
                data-testid={isDarkMode ? "dark-mode-toggle" : "light-mode-toggle"}
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
            </Box>
          )}

          {/* Tablet Navigation */}
          {isTablet && (
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
              <IconButton
                edge="end"
                sx={{ display: { xs: "block", md: "block" } }}
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <IconButton
              edge="end"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile and Tablet */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            pt: isMobile ? 12 : isTablet ? 10 : 2, // Adjust padding for Mobile and Tablet
            mt: isMobile ? 2 : isTablet ? 2 : 0, // Ensure no overlap for Mobile and Tablet
          }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            {/* Home Button - Only for Mobile */}
            {isMobile && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/brands")}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            )}
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {/* Dark and Light Theme Toggle - Only for Mobile */}
            {isMobile && (
              <ListItem disablePadding>
                <ListItemButton>
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
                  </Box>
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Spacer for content below NavBar */}
      <Box sx={{ height: "80px" }} />
    </>
  );
};

export default NavBar;
