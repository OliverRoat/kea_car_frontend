import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface UseAccessoriesReturn {
  accessories: Accessory[];
  accessory: Accessory | null;
  error: string;
  loading: boolean;
  fetchAllAccessories: () => void;
  fetchAccessoryById: (id: string) => void;
}

const useAccessories = (): UseAccessoriesReturn => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [accessory, setAccessory] = useState<Accessory | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all accessories
  const fetchAllAccessories = () => {
    setLoading(true);
    apiClient
      .get<Accessory[]>("/accessories")
      .then((response) => setAccessories(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Fetch a single accessory by ID
  const fetchAccessoryById = (id: string) => {
    setLoading(true);
    apiClient
      .get<Accessory>(`/accessory/${id}`)
      .then((response) => setAccessory(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Initial data load - fetch all accessories on mount
  useEffect(() => {
    fetchAllAccessories();
  }, []);

  return {
    accessories,
    accessory,
    error,
    loading,
    fetchAllAccessories,
    fetchAccessoryById,
  };
};

export default useAccessories;
