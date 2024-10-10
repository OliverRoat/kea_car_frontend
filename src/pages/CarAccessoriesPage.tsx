import React, { useState } from "react";

const accessoriesList: string[] = [
  "Air Conditioning",
  "Leather Seats",
  "Sunroof",
  "Heated Seats",
  "GPS Navigation",
  "Bluetooth Connectivity",
  "Backup Camera",
  "Alloy Wheels",
  "Parking Sensors",
  "Cruise Control",
  "Tinted Windows",
  "Roof Rack",
  "Sport Package",
  "Premium Sound System",
  "Fog Lights",
  "Electric Seats",
  "Keyless Entry",
  "Adaptive Headlights",
  "Rear Spoiler",
  "Tow Hitch",
];

function CarAccessoriesPage() {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const handleAccessoryChange = (accessory: string) => {
    if (selectedAccessories.includes(accessory)) {
      setSelectedAccessories(
        selectedAccessories.filter((item) => item !== accessory)
      );
    } else {
      if (selectedAccessories.length < 10) {
        setSelectedAccessories([...selectedAccessories, accessory]);
      } else {
        alert("You can only select up to 10 accessories!");
      }
    }
  };

  return (
    <div>
      <h1>Select Car Accessories (Up to 10)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {accessoriesList.map((accessory) => (
          <div key={accessory}>
            <label>
              <input
                type="checkbox"
                checked={selectedAccessories.includes(accessory)}
                onChange={() => handleAccessoryChange(accessory)}
              />
              {accessory}
            </label>
          </div>
        ))}
      </div>
      <h2>Selected Accessories</h2>
      <ul>
        {selectedAccessories.map((accessory) => (
          <li key={accessory}>{accessory}</li>
        ))}
      </ul>
    </div>
  );
}

export default CarAccessoriesPage;
