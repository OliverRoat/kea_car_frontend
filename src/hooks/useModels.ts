import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Brand } from "./useBrands";
import { Color } from "./useColors";

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

interface CreateModelInput {
  name: string;
  price: number;
  brands_id: string;
  color_ids: string[];
  model_image: File;
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

  // Add createModel function
  const createModel = async (input: CreateModelInput): Promise<Model | null> => {
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("price", input.price.toString());
    formData.append("brands_id", input.brands_id);
    input.color_ids.forEach((id) => formData.append("color_ids", id));
    formData.append("model_image", input.model_image);

    try {
      const response = await apiClient.post<Model>("/models", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return { models, error, createModel };
};

export default useModels;