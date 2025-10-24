import { Backdrop, CircularProgress } from "@mui/material";

const BackDrop = ({ loadingState }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "black", zIndex: theme.zIndex.drawer + 1 })}
      open={loadingState}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
