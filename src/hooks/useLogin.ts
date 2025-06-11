import { useState } from "react";
import apiAuthClient from "../services/authClient";

export enum UserRole {
  Admin = "admin",
  Manager = "manager",
  SalesPerson = "sales_person",
}

export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_deleted: boolean;
}

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
  employee: Employee | null;
}

const useLogin = (): UseLoginReturn => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiAuthClient.post("/login", { email, password });
      const { access_token, employee } = response.data;

      // Store the access token and employee information
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("employee", JSON.stringify(employee));

      setEmployee(employee);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading, employee };
};

export default useLogin;
