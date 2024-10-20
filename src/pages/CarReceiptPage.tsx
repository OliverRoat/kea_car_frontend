import React from "react";
import { useNavigate } from "react-router-dom";

const CarReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const totalAmount = 1000; // Set a constant total amount

  return (
    <div>
      <h1>Car Receipt</h1>
      <p>Total Amount: ${totalAmount}</p>
      <button onClick={() => navigate("/customers")}>Go back to customers</button>
      <button onClick={() => alert("Purchase completed!")}>Complete Purchase</button>
    </div>
  );
};

export default CarReceiptPage;
