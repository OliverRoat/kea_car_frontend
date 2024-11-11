import React from "react";
import { useNavigate } from "react-router-dom";

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
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <button onClick={() => navigate("/brands")}>Home</button>
      <button onClick={() => navigate("/customers")}>Customers</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
