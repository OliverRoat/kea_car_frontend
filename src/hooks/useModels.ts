import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Brand } from "./useBrands";

export interface ModelQuery {
  brandId: string | null;
}

export interface Model { 
  id: string;
  name: string;
  price: number;
  image_url: string;
  colors: Color[];
  brand: Brand;
}
export interface Color {
  id: string;
  name: string;
  price: number;
  red_value: number;
  green_value: number;
  blue_value: number;
}

const useModels = (modelQuery: ModelQuery) => {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!modelQuery.brandId) return;

    apiClient
      .get<Model[]>("/models", {
        params: { brand_id: modelQuery.brandId },
      })
      .then((response) => setModels(response.data))
      .catch((error) => setError(error.message));
  }, [modelQuery.brandId]);

  return { models, error };
};

export default useModels;
