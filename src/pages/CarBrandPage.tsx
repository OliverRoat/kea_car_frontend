import { useNavigate } from "react-router-dom";
import "../styles/CarBrandPage.css";
import useBrands from "../hooks/useBrands";
import logo from "../../public/Audi-logo.png" // dette skal hentes fra databasen som en url

// Disse skal være i en database og have links til dem fra backenden, når et brand hentes
//const brands: { name: string; logo: string }[] = [
//  { name: "BMW", logo: "/BMW-LOGO.png" },
//  { name: "Mercedes", logo: "/Mercedes-logo.png" },
//  { name: "Audi", logo: "/Audi-logo.png" },
//  { name: "Skoda", logo: "/Skoda-logo.png" },
//  { name: "Ford", logo: "/Ford-logo.png" },
//];

function CarBrandPage() {
  const { brands, error } = useBrands();

  const navigate = useNavigate();
  if (error) {
    return <div>Error Message: {error}</div>
  }
  return (
    <div>
      <h1>Choose a Car Brand</h1>
      <div className="containerCarbrand">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/brands/${brand.name.toLowerCase()}`)}
          >
            <img
              className="logoCarbrand"
              src={logo}
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
