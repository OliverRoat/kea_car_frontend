import { useNavigate } from "react-router-dom";
import "../styles/CarBrandPage.css";
import useBrands from "../hooks/useBrands";

function CarBrandPage() {
  const { brands, error } = useBrands();

  const navigate = useNavigate();

  if (error) {
    return <div>Error Message: {error}</div>;
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
              src={brand.logo_url}
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
