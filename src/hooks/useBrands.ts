import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
 
export interface Brand {
  id: string;
  name: string;
  logo_url: string;
}
 
const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get<Brand[]>("/brands")
      .then((response) => setBrands(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
 
  return { brands, error, loading };
};
 
export default useBrands;