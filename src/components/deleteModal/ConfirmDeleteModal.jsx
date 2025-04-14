import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import css from "./ConfirmDeleteModal.module.css";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  contactName,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.modal}>
        <Box>
          <h3 className={css.title}>Remove contact?</h3>
          <p className={css.text}>
            Do you really want to remove the <strong>{contactName}</strong>?
          </p>
          <Button
            className={css.btn}
            onClick={onConfirm}
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Remove
          </Button>
          <Button className={css.btn} onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
}
