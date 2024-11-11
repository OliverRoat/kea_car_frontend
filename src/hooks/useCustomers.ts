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

interface UseCustomersReturn {
  customers: Customer[];
  customer: Customer | null;
  error: string;
  loading: boolean;
  fetchAllCustomers: () => void;
  createCustomer: (newCustomer: Omit<Customer, "id">) => void;
  deleteCustomer: (id: string) => void;
}

const useCustomers = (): UseCustomersReturn => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllCustomers = () => {
    setLoading(true);
    apiClient
      .get<Customer[]>("/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const createCustomer = (newCustomer: Omit<Customer, "id">) => {
    setLoading(true);
    apiClient
      .post<Customer>("/customer", newCustomer)
      .then(() => fetchAllCustomers()) // Refresh list after creation
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const deleteCustomer = (id: string) => {
    setLoading(true);
    apiClient
      .delete(`/customer/${id}`)
      .then(() => setCustomers(customers.filter((customer) => customer.id !== id)))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return {
    customers,
    customer,
    error,
    loading,
    fetchAllCustomers,
    createCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
