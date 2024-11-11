// src/pages/CustomersPage.tsx
import { useNavigate } from "react-router-dom";
import useCustomers from "../hooks/useCustomers";
import { useEffect, useState } from "react";
import { SavedCar } from "../types/SavedCar";
import { Accessory } from "../hooks/useAccessories";
import { Insurance } from "../hooks/useInsurances";
import apiClient from "../services/apiClient";
import axios from "axios";

function CustomersPage() {
  const { customers, error, loading } = useCustomers();
  const [savedCar, setSavedCar] = useState<SavedCar | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carData = sessionStorage.getItem("savedCar");
    if (carData) {
      try {
        setSavedCar(JSON.parse(carData));
      } catch (error) {
        console.error("Failed to parse savedCar from sessionStorage:", error);
      }
    }
  }, []);

  const handleCustomerSelect = async (customerId: string) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === customerId
    );
    const salesPerson = JSON.parse(
      sessionStorage.getItem("salesPerson") || "{}"
    );

    if (
      !savedCar ||
      !savedCar.model ||
      !savedCar.color ||
      !selectedCustomer ||
      !salesPerson.id
    ) {
      console.error("Required data is missing");
      return;
    }

    const today = new Date();
    const purchase_deadline = today.toISOString().split("T")[0];

    const carData = {
      purchase_deadline,
      models_id: savedCar.model.id,
      colors_id: savedCar.color.id,
      customers_id: selectedCustomer.id,
      sales_people_id: salesPerson.id,
      accessory_ids: savedCar.accessories.map((acc: Accessory) => acc.id),
      insurance_ids: savedCar.insurances.map((ins: Insurance) => ins.id),
    };

    try {
      const response = await apiClient.post("/car", carData);
      console.log("Car created successfully:", response.data);

      sessionStorage.removeItem("savedCar");
      sessionStorage.removeItem("selectedCustomerId");

      navigate("/cars");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Failed to create car:", err.response.data);
        } else {
          console.error("Failed to create car:", err.message);
        }
      } else {
        console.error("An unknown error occurred:", err);
      }
    }
  };

  return (
    <div>
      <h1>Select a Customer</h1>
      {loading && <p>Loading customers...</p>}
      {error && <p>Error loading customers: {error}</p>}
      <ul>
        {customers.map((customer) => (
          <li
            key={customer.id}
            onClick={() => handleCustomerSelect(customer.id)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {customer.first_name} {customer.last_name} - {customer.email}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/new-customer")}
        style={{ marginTop: "20px" }}
      >
        Add New Customer
      </button>
    </div>
  );
}

export default CustomersPage;
