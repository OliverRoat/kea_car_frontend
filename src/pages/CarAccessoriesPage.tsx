import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CarAccessoriesPage.css";
import ToggleButton from "../components/ToggleButton";
import useAccessories from "../hooks/useAccessories";
import useInsurances from "../hooks/useInsurances";

function CarAccessoriesPage() {
  const {
    accessories,
    error: accessoriesError,
    loading: accessoriesLoading,
  } = useAccessories();
  const {
    insurances,
    error: insurancesError,
    loading: insurancesLoading,
  } = useInsurances();

  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [showInsurances, setShowInsurances] = useState(false);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve car details from the previous page
  const { brand, model, color } = location.state || {};

  useEffect(() => {
    // Log the initial car data to check if it’s correctly passed from previous pages
    console.log("Car Details:", { brand, model, color });
    if (!brand || !model || !color) {
      console.warn("Missing required car configuration data.");
    }
  }, [brand, model, color]);

  const handleAccessoryChange = (accessoryId: string) => {
    setSelectedAccessories((prevSelected) =>
      prevSelected.includes(accessoryId)
        ? prevSelected.filter((id) => id !== accessoryId)
        : [...prevSelected, accessoryId]
    );
  };

  const handleInsuranceChange = (insuranceId: string) => {
    setSelectedInsurances((prevSelected) =>
      prevSelected.includes(insuranceId)
        ? prevSelected.filter((id) => id !== insuranceId)
        : [...prevSelected, insuranceId]
    );
  };

  const toggleInsuranceVisibility = () => {
    setShowInsurances(!showInsurances);
  };

  const saveCarConfiguration = () => {
    const savedCar = {
      brand,
      model,
      color,
      accessories: selectedAccessories
        .map((id) => {
          const accessory = accessories.find((acc) => acc.id === id);
          return accessory
            ? { id: accessory.id, name: accessory.name, price: accessory.price }
            : null;
        })
        .filter(Boolean),
      insurances: selectedInsurances
        .map((id) => {
          const insurance = insurances.find((ins) => ins.id === id);
          return insurance
            ? { id: insurance.id, name: insurance.name, price: insurance.price }
            : null;
        })
        .filter(Boolean),
    };

    // Log the saved configuration before storing it
    console.log("Saving Car Configuration:", savedCar);

    sessionStorage.setItem("savedCar", JSON.stringify(savedCar));
    navigate("/customers");
  };

  return (
    <div>
      <h1>Select Car Accessories (Up to 10)</h1>
      {accessoriesLoading ? (
        <p>Loading accessories...</p>
      ) : accessoriesError ? (
        <p>Error loading accessories: {accessoriesError}</p>
      ) : (
        <div className="accessories-container">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="accessory-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedAccessories.includes(accessory.id)}
                  onChange={() => handleAccessoryChange(accessory.id)}
                />
                {accessory.name} - ${accessory.price}
              </label>
            </div>
          ))}
        </div>
      )}

      <h2>Want insurance?</h2>
      <ToggleButton
        isToggled={showInsurances}
        onToggle={toggleInsuranceVisibility}
      />

      {showInsurances && (
        <div>
          <h2>Select Insurances</h2>
          {insurancesLoading ? (
            <p>Loading insurances...</p>
          ) : insurancesError ? (
            <p>Error loading insurances: {insurancesError}</p>
          ) : (
            <div className="insurances-container">
              {insurances.map((insurance) => (
                <div key={insurance.id} className="insurance-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedInsurances.includes(insurance.id)}
                      onChange={() => handleInsuranceChange(insurance.id)}
                    />
                    {insurance.name} - ${insurance.price}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <h2>Selected Accessories</h2>
      <ul className="selected-accessories">
        {selectedAccessories.map((id) => {
          const accessory = accessories.find((acc) => acc.id === id);
          return accessory ? (
            <li key={id}>
              {accessory.name} - ${accessory.price}
            </li>
          ) : null;
        })}
      </ul>

      {showInsurances && selectedInsurances.length > 0 && (
        <div>
          <h2>Selected Insurances</h2>
          <ul className="selected-insurances">
            {selectedInsurances.map((id) => {
              const insurance = insurances.find((ins) => ins.id === id);
              return insurance ? (
                <li key={id}>
                  {insurance.name} - ${insurance.price}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}

      <button onClick={saveCarConfiguration} className="save-car-button">
        Save Car
      </button>
    </div>
  );
}

export default CarAccessoriesPage;
