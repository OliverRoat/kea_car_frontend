import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Brand } from "./useBrands";
import { Color } from "./useColors";

export interface ModelQuery {
    brand: Brand | null;
  }

interface Model {
  id: number;
  name: string;
  price: number;
  brand: Brand;
  colors: Color;
}
 
const useModels = (modelQuery: ModelQuery) => {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState("");

    useEffect(() => {
    apiClient
      .get<Model[]>(
        "/models",
        {
            params: {
                brand_id: modelQuery.brand?.id,
            },
        }
        )
        .then((response) => setModels(response.data))
        .catch((error) => setError(error.message));
    }, []);
 
  return { models, error };
};
 
export default useModels;