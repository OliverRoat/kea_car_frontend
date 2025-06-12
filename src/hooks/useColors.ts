import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export interface Color {
  id: string;
  name: string;
  price: number;
  red_value: number;
  green_value: number;
  blue_value: number;
}

function useColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get<Color[]>("/colors")
      .then((response) => setColors(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
 
  return { colors, error, loading };
}

export default useColors;