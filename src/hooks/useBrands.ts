import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
 
export interface Brand {
  id: number;
  name: string;
  logo: string;
}
 
const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    apiClient
      .get<Brand[]>("/brands")
      .then((response) => setBrands(response.data))
      .catch((error) => setError(error.message));
  }, []);
 
  return { brands, error };
};
 
export default useBrands;