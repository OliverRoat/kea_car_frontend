import React, { useState } from "react";
import { Button } from "@mui/material";
import useCar, { Car } from "../hooks/useCar";
import { commonButtonStyles } from "../styles/commonButtonStyles";
import ConfirmDeleteCarWithPurchaseModal from "./ConfirmDeleteCarWithPurchaseModal";
import ErrorModal from "./ErrorModal";

interface DeleteCarButtonProps {
  car: Car;
  onDeleteCar?: (carId: string) => void;
}

const DeleteCarButton: React.FC<DeleteCarButtonProps> = ({
  car,
  onDeleteCar,
}) => {
  const { loading, error, deleteCar } = useCar();
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleDeleteCar = async (deletePurchaseToo: boolean = false) => {
    try {
      await deleteCar(car.id, deletePurchaseToo);
      console.log("Car deleted successfully:", car);
      onDeleteCar && onDeleteCar(car.id); // Notify parent component
    } catch (err: any) {
      console.error("Failed to delete car:", err);
      setErrorModalOpen(true);
    }
  };

  const handleDeleteClick = () => {
    if (car.is_purchased) {
      setModalOpen(true);
    } else {
      handleDeleteCar();
    }
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    handleDeleteCar(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        data-testid="delete-car-button"
        onClick={handleDeleteClick}
        disabled={loading}
        sx={{
          ...commonButtonStyles,
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            backgroundColor: "lightcoral",
            color: "black",
            transform: "scale(1.05)",
          },
        }}
      >
        {loading ? "Deleting..." : "Delete Car"}
      </Button>
      <ConfirmDeleteCarWithPurchaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        carToBeDeleted={car}
      />
      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={"An error occurred while trying to delete the car and was therefore unable to delete the car."}
      />
    </>
  );
};

export default DeleteCarButton;
