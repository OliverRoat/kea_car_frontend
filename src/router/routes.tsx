import LoginPage from "../pages/LoginPage";
import CarBrandPage from "../pages/CarBrandPage";
import ModelPage from "../pages/ModelPage";
import CarColorPage from "../pages/CarColorPage";
import CarAccessoriesPage from "../pages/CarAccessoriesPage";
import CustomersPage from "../pages/CustomersPage";
import NewCustomerPage from "../pages/NewCustomersPage";
import EditCustomerPage from "../pages/EditCustomerPage";
import CarsListPage from "../pages/CarsListPage";
import CarReceiptPage from "../pages/CarReceiptPage";
import CarPage from "../pages/CarPage";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/login",
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/brands",
    name: "Brands",
    element: <CarBrandPage />,
  },
  {
    path: "/brands/:brand",
    name: "Models",
    element: <ModelPage />,
  },
  {
    path: "/brands/:brand/models/:model/colors",
    name: "Colors",
    element: <CarColorPage />,
  },
  {
    path: "/brands/:brand/models/:model/colors/:color/accessories",
    name: "Accessories",
    element: <CarAccessoriesPage />,
  },
  {
    path: "/customers",
    name: "Customers",
    element: <CustomersPage />,
  },
  {
    path: "/new-customer",
    name: "New Customer",
    element: <NewCustomerPage />,
  },
  {
    path: "/edit-customer",
    name: "Edit Customer",
    element: <EditCustomerPage />,
  },
  {
    path: "/cars",
    name: "Cars List",
    element: <CarsListPage />,
  },
  {
    path: "/car-receipt/:car_id",
    name: "Car Receipt",
    element: <CarReceiptPage />,
  },
  {
    path: "/car/:car_id",
    name: "Car",
    element: <CarPage />,
  },
  {
    path: "*",
    name: "Not Found",
    element: <Navigate to="/login" />,
  },
];
