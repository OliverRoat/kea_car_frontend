import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
 
export interface SalesPerson {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Credentials {
    email: string;
    password: string;
}
 
const useLogin = (credentials: Credentials) => {
  const [salesPerson, setSalesPerson] = useState<SalesPerson>({} as SalesPerson);
  const [error, setError] = useState("");
 
  useEffect(() => {
    apiClient
      .post<SalesPerson>("/login", credentials)
      .then((response) => setSalesPerson(response.data))
      .catch((error) => setError(error.message));
  }, []);
 
  return { salesPerson, error };
};
 
export default useLogin;