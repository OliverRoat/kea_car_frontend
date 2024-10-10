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
import CarColorPage from "./pages/CarColorPage"
import CarAccessoriesPage from "./pages/CarAccessoriesPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/brands"
          element={isLoggedIn ? <CarBrandPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/brands/:brand"
          element={isLoggedIn ? <ModelPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route 
          path="/brands/:brand/models/:model/colors"  
          element={<CarColorPage />} 
        />
        <Route 
          path="/brands/:brand/models/:model/colors" 
          element={<CarColorPage />} 
        />
        <Route 
          path="/brands/:brand/models/:model/colors/:color/accessories" 
          element={<CarAccessoriesPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
