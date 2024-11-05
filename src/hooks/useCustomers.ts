import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Customer {
  id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  address: string;
}

interface UseCustomerReturn {
  customers: Customer[];
  customer: Customer | null;
  error: string;
  loading: boolean;
  fetchAllCustomers: () => void;
  fetchCustomerById: (id: string) => void;
  createCustomer: (newCustomer: Omit<Customer, "id">) => void;
}

const useCustomer = (): UseCustomerReturn => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all customers
  const fetchAllCustomers = () => {
    setLoading(true);
    apiClient
      .get<Customer[]>("/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Fetch a single customer by ID
  const fetchCustomerById = (id: string) => {
    setLoading(true);
    apiClient
      .get<Customer>(`/customer/${id}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Create a new customer
  const createCustomer = (newCustomer: Omit<Customer, "id">) => {
    setLoading(true);
    apiClient
      .post<Customer>("/customer", newCustomer)
      .then((response) => setCustomers((prev) => [...prev, response.data]))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Initial data load - fetch all customers on mount
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return {
    customers,
    customer,
    error,
    loading,
    fetchAllCustomers,
    fetchCustomerById,
    createCustomer,
  };
};

export default useCustomer;
