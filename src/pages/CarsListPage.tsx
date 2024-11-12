// src/pages/CarsListPage.tsx
import { useEffect } from "react";
import useCar from "../hooks/useCar";
import "../styles/CarsListPage.css";

function CarsListPage() {
  const { allCars, fetchAllCars, loading, error } = useCar();

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Cars</h1>
      <ul className="cars-list">
        {allCars.map((car) => (
          <li key={car.id} className="car-item">
            <div className="car-model">
              <h2>{car.model.name}</h2>
              <img src={car.model.image_url} alt={car.model.name} />
              <p>Price: ${car.model.price}</p>
              <p>
                Color: {car.color.name} - ${car.color.price}
              </p>
            </div>

            <div className="car-accessories">
              <h3>Accessories</h3>
              <ul>
                {car.accessories.map((acc) => (
                  <li key={acc.id}>
                    {acc.name} - ${acc.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="car-insurances">
              <h3>Insurances</h3>
              <ul>
                {car.insurances.map((ins) => (
                  <li key={ins.id}>
                    {ins.name} - ${ins.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="car-customer">
              <h3>Customer</h3>
              <p>
                {car.customer.first_name} {car.customer.last_name}
              </p>
              <p>Email: {car.customer.email}</p>
              <p>Phone: {car.customer.phone_number}</p>
              <p>Address: {car.customer.address}</p>
            </div>

            <div className="car-salesperson">
              <h3>Salesperson</h3>
              <p>
                {car.sales_person.first_name} {car.sales_person.last_name}
              </p>
              <p>Email: {car.sales_person.email}</p>
            </div>

            <p>
              Purchase Deadline:{" "}
              {new Date(car.purchase_deadline).toLocaleDateString()}
            </p>

            <p>Total Price: ${car.total_price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarsListPage;
