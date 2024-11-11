import { useState } from "react";
import apiClient from "../services/apiClient";

export interface SalesPerson {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
  salesPerson: SalesPerson | null;
}

const useLogin = (): UseLoginReturn => {
  const [salesPerson, setSalesPerson] = useState<SalesPerson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/login", { email, password });
      const { access_token, sales_person } = response.data;

      // Store the access token and salesperson information
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("salesPerson", JSON.stringify(sales_person));

      setSalesPerson(sales_person);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading, salesPerson };
};

export default useLogin;
