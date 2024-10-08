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
      </Routes>
    </Router>
  );
}

export default App;
