import { Button, Typography, Grid, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100", textAlign: "center" }}
    >
      <Grid>
        <Box>
          <Typography variant="h2" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            Oops! Page not found.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Button
            component={RouterLink}
            to="/home"
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotFound;
