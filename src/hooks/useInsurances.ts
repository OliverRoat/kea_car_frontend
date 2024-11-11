import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Insurance {
  id: string;
  name: string;
  price: number;
}

interface UseInsurancesReturn {
  insurances: Insurance[];
  error: string;
  loading: boolean;
  fetchAllInsurances: () => void;
}

const useInsurances = (): UseInsurancesReturn => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllInsurances = () => {
    setLoading(true);
    apiClient
      .get<Insurance[]>("/insurances")
      .then((response) => setInsurances(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllInsurances();
  }, []);

  return { insurances, error, loading, fetchAllInsurances };
};

export default useInsurances;
