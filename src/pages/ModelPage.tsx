import { useNavigate, useParams } from "react-router-dom";
import "../styles/ModelPage.css";
import useModels from "../hooks/useModels";
import useBrands from "../hooks/useBrands";

function ModelPage() {
  const { brand } = useParams<{ brand: string }>(); // Get the brand name from the URL params
  const { brands, error: brandsError } = useBrands(); // Fetch all brands to get the full brand details
  const navigate = useNavigate();

  // Find the selected brand by name (case-insensitive)
  const selectedBrand = brands.find(
    (b) => b.name.toLowerCase() === brand?.toLowerCase()
  );

  // If the selected brand exists, pass the brand_id to useModels
  const { models, error: modelsError } = useModels({
    brand: selectedBrand || null,
  });

  if (brandsError) {
    return <div>Error fetching brands: {brandsError}</div>;
  }

  if (modelsError) {
    return <div>Error fetching models: {modelsError}</div>;
  }

  const handleModelSelect = (model: string) => {
    navigate(
      `/brands/${brand?.toLowerCase()}/models/${model.toLowerCase()}/colors`
    );
  };

  return (
    <div>
      <h1>
        {brand
          ? `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`
          : "Unknown"}{" "}
        Models
      </h1>

      <div className="model-grid">
        {models.map((model) => (
          <div
            key={model.id}
            className="model-item"
            onClick={() => handleModelSelect(model.name)}
          >
            <img
              src={model.image_url}
              alt={model.name}
              className="model-image"
            />
            <p>{model.name}</p>
            <p>Price: {model.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelPage;
