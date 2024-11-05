import { useState } from "react";
import apiClient from "../services/apiClient";

export interface Customer {
  id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  address: string;
}

interface UseNewCustomerReturn {
  createCustomer: (newCustomer: Omit<Customer, "id">) => void;
  error: string;
  loading: boolean;
}

const useNewCustomer = (): UseNewCustomerReturn => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Create a new customer
  const createCustomer = (newCustomer: Omit<Customer, "id">) => {
    setLoading(true);
    apiClient
      .post<Customer>("/customer", newCustomer)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return {
    createCustomer,
    error,
    loading,
  };
};

export default useNewCustomer;
