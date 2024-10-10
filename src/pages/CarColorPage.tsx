import { useParams, useNavigate } from "react-router-dom";

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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {carColors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorSelect(color)}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarColorPage;
