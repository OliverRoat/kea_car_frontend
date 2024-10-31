import { useParams, useNavigate } from "react-router-dom";
import "../styles/CarColorPage.css";

class Color {
  name: string;
  red_value: number;
  green_value: number;
  blue_value: number;

  constructor(
    name: string,
    red_value: number,
    green_value: number,
    blue_value: number
  ) {
    this.name = name;
    this.red_value = red_value;
    this.green_value = green_value;
    this.blue_value = blue_value;
  }
}

const carColors = [
  new Color("Red", 255, 0, 0),
  new Color("Green", 0, 255, 0),
  new Color("Blue", 0, 0, 255),
  new Color("Black", 0, 0, 0),
  new Color("White", 255, 255, 255),
];

function CarColorPage() {
  const { brand, model } = useParams<{ brand: string; model: string }>();
  const navigate = useNavigate();

  const handleColorSelect = (color: string) => {
    navigate(`/brands/${brand}/models/${model}/colors/${color}/accessories`);
  };

  return (
    <div>
      <h1>Select a Color for {model}</h1>
      <div className="color-grid">
        {carColors.map((color) => (
          <div
            key={color.name}
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
