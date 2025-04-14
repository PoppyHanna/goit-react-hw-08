import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Стилі модального вікна
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  contactName,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h3>Remove contact?</h3>
        <p>
          Do you really want to remove the <strong>{contactName}</strong>?
        </p>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{ mr: 1 }}
        >
          Remove
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
