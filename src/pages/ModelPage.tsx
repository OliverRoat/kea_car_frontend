import { useNavigate, useParams } from "react-router-dom";
import "../styles/ModelPage.css";

const carModels: { [key: string]: { name: string; image: string }[] } = {
  bmw: [
    { name: "Series 1", image: "/Series 1.png" },
    { name: "Series 2", image: "/Series 2.png" },
    { name: "Series 3", image: "/Series 3.png" },
    { name: "X5", image: "/X6.png" },
    { name: "i8", image: "/i8.png" },
  ],
  mercedes: [
    { name: "A-Class", image: "/a-class.png" },
    { name: "C-Class", image: "/c-class.png" },
    { name: "S-Class", image: "/s-class.png" },
    { name: "G-Class", image: "/g-class.png" },
    { name: "AmgGT", image: "/amgGT.png" },
  ],
  audi: [
    { name: "A1", image: "/a1.png" },
    { name: "A3", image: "/a3.png" },
    { name: "A4", image: "/a4.png" },
    { name: "A6", image: "/a6.png" },
    { name: "R8", image: "/r8.png" },
  ],
  skoda: [
    { name: "Citigo", image: "/citigo.png" },
    { name: "Yeti", image: "/yeti.png" },
    { name: "Rapid", image: "/rapid.png" },
    { name: "Octavia", image: "/octavia.png" },
    { name: "Kodiaq", image: "/kodiaq.png" },
  ],
  ford: [
    { name: "Fiesta", image: "/fiesta.png" },
    { name: "Fusion", image: "/fusion.png" },
    { name: "Explorer", image: "/explorer.png" },
    { name: "Pickup", image: "/pickup.png" },
    { name: "Mustang", image: "/mustang.png" },
  ],
};

function ModelPage() {
  const { brand } = useParams<{ brand: string }>();
  const models = carModels[brand?.toLowerCase() || ""] || [];
  const navigate = useNavigate();
  const handleModelSelect = (model: string) => {
    navigate(`/brands/${brand?.toLowerCase()}/models/${model.toLowerCase()}/colors`);
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
            key={model.name}
            className="model-item"
            onClick={() => handleModelSelect(model.name)} // Navigate on click
            style={{ cursor: "pointer" }}
          >
            <img src={model.image} alt={model.name} className="model-image" />
            <p>{model.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelPage;
