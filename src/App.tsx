import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import CarBrandPage from "./pages/CarBrandPage";
import ModelPage from "./pages/ModelPage";
import CarColorPage from "./pages/CarColorPage";
import CarAccessoriesPage from "./pages/CarAccessoriesPage";
import CustomersPage from "./pages/CustomersPage";
import NewCustomersPage from "./pages/NewCustomersPage";
import CarsListPage from "./pages/CarsListPage";
import NavBar from "./components/NavBar";
import EditCustomerPage from "./pages/EditCustomerPage";
import CarReceiptPage from "./pages/CarReceiptPage"; // Import CarReceiptPage
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  return (
    <Router>
      {/* Conditionally render NavBar only when logged in */}
      {isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected Routes */}
        <Route
          path="/brands"
          element={isLoggedIn ? <CarBrandPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/brands/:brand"
          element={isLoggedIn ? <ModelPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/brands/:brand/models/:model/colors"
          element={isLoggedIn ? <CarColorPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/brands/:brand/models/:model/colors/:color/accessories"
          element={
            isLoggedIn ? <CarAccessoriesPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/customers"
          element={isLoggedIn ? <CustomersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/new-customer"
          element={isLoggedIn ? <NewCustomersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cars"
          element={isLoggedIn ? <CarsListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-customer"
          element={isLoggedIn ? <EditCustomerPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/car-receipt/:car_id"
          element={isLoggedIn ? <CarReceiptPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
