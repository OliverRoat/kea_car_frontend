import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Brand } from "./useBrands";

export interface ModelQuery {
  brand: Brand | null;
}

interface Model {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

const useModels = (modelQuery: ModelQuery) => {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!modelQuery.brand) return;

    apiClient
      .get<Model[]>(
        "/models",
        {
          params: { brand_id: modelQuery.brand.id },
        }
      )
      .then((response) => setModels(response.data))
      .catch((error) => setError(error.message));
  }, [modelQuery.brand]);

  return { models, error };
};

export default useModels;
