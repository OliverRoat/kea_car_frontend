import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CarColorPage.css";

// Define the Color interface based on the structure you are using.
interface Color {
  id: string;
  name: string;
  price: number;
  red_value: number;
  green_value: number;
  blue_value: number;
}

function CarColorPage() {
  const location = useLocation();
  const { brand, modelName, colors } = location.state || {};
  const navigate = useNavigate();

  const handleColorSelect = (color: string) => {
    navigate(
      `/brands/${brand}/models/${modelName}/colors/${color}/accessories`
    );
  };

  return (
    <div>
      <h1>Select a Color for {modelName}</h1>
      <div className="color-grid">
        {colors.map((color: Color) => (
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
