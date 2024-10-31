import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Color } from "./useColors";

export interface ModelQuery {
  brandId: string | null;
}

interface Model {
  id: string;
  name: string;
  price: number;
  image_url: string;
  colors: Color[];
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
