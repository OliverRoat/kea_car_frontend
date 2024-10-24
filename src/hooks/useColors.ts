import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
 
export interface Color {
  id: string;
  name: string;
  price: number;
  red_value: number;
  green_value: number;
  blue_value: number;
}
 
const useColors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    apiClient
      .get<Color[]>("/colors")
      .then((response) => setColors(response.data))
      .catch((error) => setError(error.message));
  }, []);
 
  return { colors, error };
};
 
export default useColors;