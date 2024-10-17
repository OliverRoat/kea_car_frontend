import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CarBrandPage from "./pages/CarBrandPage";
import ModelPage from "./pages/ModelPage";
import CarColorPage from "./pages/CarColorPage";
import CarAccessoriesPage from "./pages/CarAccessoriesPage";
import CustomersPage from "./pages/CustomersPage";
import NewCustomersPage from "./pages/NewCustomersPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Car-related pages */}
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
          element={isLoggedIn ? <CarAccessoriesPage /> : <Navigate to="/login" />}
        />

        {/* Customer pages */}
        <Route
          path="/customers"
          element={isLoggedIn ? <CustomersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/newcustomers"
          element={isLoggedIn ? <NewCustomersPage /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
