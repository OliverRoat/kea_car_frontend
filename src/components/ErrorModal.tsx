import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose, errorMessage }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          An Error Occurred
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorModal;