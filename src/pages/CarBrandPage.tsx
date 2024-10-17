import { useNavigate } from "react-router-dom";
import "../styles/CarBrandPage.css";
import useBrands from "../hooks/useBrands";
import logo from "../../public/Audi-logo.png"; // Assuming logo from database or public folder

function CarBrandPage() {
  const { brands, error } = useBrands();
  const navigate = useNavigate();

  if (error) {
    return <div>Error Message: {error}</div>;
  }

  return (
    <div>
      <h1>Choose a Car Brand</h1>

      {/* Add new buttons here */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/newcustomers")}>
          Create New Customer
        </button>
        <button onClick={() => navigate("/customers")}>
          View Customers
        </button>
      </div>

      {/* Existing car brand selection */}
      <div className="containerCarbrand">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/brands/${brand.name.toLowerCase()}`)}
            className="car-brand-item"
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
