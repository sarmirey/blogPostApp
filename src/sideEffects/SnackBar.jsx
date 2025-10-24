import { Snackbar, Alert } from "@mui/material";
const SnackBar = ({ errorState, handleClose, message, type }) => {
  return (
    <>
      <Snackbar open={errorState} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBar;
