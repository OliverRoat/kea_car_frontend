import { useParams } from "react-router-dom";

const carModels: { [key: string]: string[] } = {
  bmw: ["Series 1", "Series 3", "Series 5", "X5", "i8"],
  mercedes: ["A-Class", "C-Class", "E-Class", "S-Class", "GLE"],
  audi: ["A3", "A4", "A6", "Q5", "Q7"],
  skoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Scala"],
  ford: ["Fiesta", "Focus", "Mustang", "Explorer", "Ranger"],
};

function ModelPage() {
  const { brand } = useParams<{ brand: string }>();
  const models = carModels[brand?.toLowerCase() || ""] || [];

  return (
    <div>
      <h1>
        {brand
          ? `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`
          : "Unknown"}{" "}
        Models
      </h1>

      <ul>
        {models.map((model) => (
          <li key={model}>{model}</li>
        ))}
      </ul>
    </div>
  );
}

export default ModelPage;
