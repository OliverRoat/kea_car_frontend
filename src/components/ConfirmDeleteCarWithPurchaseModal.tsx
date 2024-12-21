import React, { useEffect } from "react";
import { Modal, Box, Typography, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { Car } from "../hooks/useCar";
import usePurchase from "../hooks/usePurchase";

interface ConfirmDeleteCarWithPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  carToBeDeleted: Car;
}

const ConfirmDeleteCarWithPurchaseModal: React.FC<ConfirmDeleteCarWithPurchaseModalProps> = ({ 
  open, 
  onClose, 
  onConfirm, 
  carToBeDeleted 
}) => {
  const { purchase, fetchPurchaseByCarId, loading, error } = usePurchase();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (open && carToBeDeleted) {
      fetchPurchaseByCarId(carToBeDeleted.id);
    }
  }, [open, carToBeDeleted, fetchPurchaseByCarId]);

  return (
    <Modal open={open} onClose={onClose} data-testid="confirm-delete-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isMobile ? 2 : 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          The Car You Are About To Delete Is Already Purchased!
        </Typography>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Typography sx={{ mt: 2 }}>
            Date of Purchase: {purchase?.date_of_purchase ? new Date(purchase.date_of_purchase).toLocaleDateString() : "Unknown"}
          </Typography>
        )}
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete this purchased car?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            No
          </Button>
          <Button variant="contained" color="secondary" onClick={onConfirm} data-testid="confirm-delete-button">
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteCarWithPurchaseModal;