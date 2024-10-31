import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/ModelPage.css";
import useModels from "../hooks/useModels";

function ModelPage() {
  const { brand } = useParams<{ brand: string }>(); // Get the brand name from the URL params
  const location = useLocation();
  const brandId = location.state?.id; // Get brand ID from the location state

  const navigate = useNavigate();

  // Pass the brand ID to useModels for fetching models
  const { models, error: modelsError } = useModels({
    brandId: brandId || null,
  });

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
