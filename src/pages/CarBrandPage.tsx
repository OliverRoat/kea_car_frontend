import { useNavigate } from "react-router-dom";
import "../styles/CarBrandPage.css";

const brands: { name: string; logo: string }[] = [
  { name: "BMW", logo: "/BMW-LOGO.png" },
  { name: "Mercedes", logo: "/Mercedes-logo.png" },
  { name: "Audi", logo: "/Audi-logo.png" },
  { name: "Skoda", logo: "/Skoda-logo.png" },
  { name: "Ford", logo: "/Ford-logo.png" },
];

function CarBrandPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Choose a Car Brand</h1>
      <div className="containerCarbrand">
        {brands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => navigate(`/brands/${brand.name.toLowerCase()}`)}
          >
            <img
              className="logoCarbrand"
              src={brand.logo}
              alt={`${brand.name} logo`}
            />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarBrandPage;
