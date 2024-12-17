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



// Here we are using the useQuery to fetch all accessories
const useAccessories = () => {
  const {
    data: accessories,
    isLoading,
    isError,
    error,
  } = useQuery<Accessory[], Error>({
    queryKey: ["accessories"], // Unique query key that caches and manges the state of this data
    queryFn: fetchAllAccessories,
    staleTime: 60000, // Data is considered fresh for 1 minute
  });


  return {
    accessories: accessories || [],
    loading: isLoading,
    error: isError ? error.message : "",
  };
};

export default useAccessories;
