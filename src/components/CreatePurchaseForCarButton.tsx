import React, { useState } from "react";
import { Button } from "@mui/material";
import usePurchase from "../hooks/usePurchase";
import { PurchaseData } from "../hooks/usePurchase";
import { Car } from "../hooks/useCar";
import { commonButtonStyles } from "../styles/commonButtonStyles";
import ErrorModal from "./ErrorModal";

interface CreatePurchaseForCarButtonProps {
  car: Car;
  onPurchaseCreated?: (updatedCar: Car) => void;
}

const CreatePurchaseForCarButton: React.FC<CreatePurchaseForCarButtonProps> = ({
  car,
  onPurchaseCreated,
}) => {
  const { createPurchase, loading, error } = usePurchase();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleCreatePurchase = async () => {
    try {
      const purchaseData: PurchaseData = {
        date_of_purchase: null,
        cars_id: car.id,
      };
      await createPurchase(purchaseData);
      console.log("Purchase created successfully");
      const updatedCar = { ...car, is_purchased: true };
      onPurchaseCreated && onPurchaseCreated(updatedCar);
    } catch (err) {
      console.error(error, err);
      setErrorModalOpen(true);
    }
  };

  const isPurchased = car.is_purchased;
  const isPastDeadline =
    car.purchase_deadline && new Date(car.purchase_deadline) < new Date();

  const buttonText = isPurchased
    ? "Car is already purchased"
    : isPastDeadline
    ? "Purchase deadline passed"
    : "Register car as purchased";

  const buttonStyle = isPurchased
    ? { backgroundColor: "grey", color: "white" }
    : isPastDeadline
    ? { backgroundColor: "red", color: "white" }
    : { backgroundColor: "green", color: "white" };

  const isActive = !isPurchased && !isPastDeadline && !loading;

  return (
    <>
      <Button
        variant="contained"
        onClick={isActive ? handleCreatePurchase : undefined}
        sx={{
          ...commonButtonStyles,
          backgroundColor: buttonStyle.backgroundColor,
          color: buttonStyle.color,
          cursor: isActive ? "pointer" : "not-allowed",
          opacity: isActive ? 1 : 0.6, // Adjust opacity to give a disabled look
          "&:hover": {
            backgroundColor: isActive
              ? "lightgreen"
              : buttonStyle.backgroundColor,
            color: isActive ? "black" : buttonStyle.color,
            transform: "scale(1.05)",
          },
        }}
      >
        {loading ? "Creating..." : buttonText}
      </Button>
      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={"An error occurred while trying to purchase the car, and was therefor unable to make the purchase."}
      />
    </>
  );
};

export default CreatePurchaseForCarButton;
