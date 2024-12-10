import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
}

const fetchAllAccessories = async (): Promise<Accessory[]> => {
  const response = await apiClient.get<Accessory[]>("/accessories");
  return response.data;
};

const fetchAccessoryById = async (id: string): Promise<Accessory> => {
  const response = await apiClient.get<Accessory>(`/accessory/${id}`);
  return response.data;
};

// Here we are using the useQuery to fetch all accessories
const useAccessories = () => {
  const {
    data: accessories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["accessories"], // Unique query key that caches and manges the state of this data
    queryFn: fetchAllAccessories,
  });

  // Again we are using the new useQuery hook to fetch a single accessory by id
  const useAccessoryById = (id: string) =>
    useQuery({
      queryKey: ["accessory", id],
      queryFn: () => fetchAccessoryById(id),
      enabled: !!id,
    });

  return {
    accessories: accessories || [],
    loading: isLoading,
    error: isError ? (error as Error).message : "",
    useAccessoryById,
  };
};

export default useAccessories;
