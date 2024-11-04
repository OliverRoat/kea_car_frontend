import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CarColorPage.css";

function CarColorPage() {
  const location = useLocation();
  const { brand, modelId, modelName, colors } = location.state || {};
  const navigate = useNavigate();

  const handleColorSelect = (color: string) => {
    navigate(`/brands/${brand}/models/${modelId}/colors/${color}/accessories`);
  };

  return (
    <div>
      <h1>Select a Color for {modelName}</h1>
      <div className="color-grid">
        {colors.map((color: any) => (
          <div
            key={color.id}
            className="color-item"
            onClick={() => handleColorSelect(color.name)}
          >
            <div
              className="color-swatch"
              style={{
                backgroundColor: `rgb(${color.red_value}, ${color.green_value}, ${color.blue_value})`,
              }}
            ></div>
            <p>{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarColorPage;
