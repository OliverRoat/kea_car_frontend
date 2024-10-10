import { useParams, useNavigate } from "react-router-dom";
import '../styles/CarColorPage.css'; // Import the CSS file

const carColors = ["Red", "Blue", "Black", "White", "Silver"];

function CarColorPage() {
  const { brand, model } = useParams<{ brand: string; model: string }>();
  const navigate = useNavigate();

  const handleColorSelect = (color: string) => {
    // Navigate to the accessories page for the selected car color
    navigate(`/brands/${brand}/models/${model}/colors/${color}/accessories`);
  };

  return (
    <div>
      <h1>Select a Color for {model}</h1>
      <div className="color-grid">
        {carColors.map((color) => (
          <div
            key={color}
            className="color-item"
            onClick={() => handleColorSelect(color)}
          >
            <div className="color-swatch" style={{ backgroundColor: color.toLowerCase() }}></div>
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarColorPage;
  