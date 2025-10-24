import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import nodeLogo from "../assets/nodeLogo.svg";
import "../App.css";
import { Grid, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a target="_blank">
          <img src={nodeLogo} className="logo nodereact" alt="React logo" />
        </a>
      </div>
      <h1> Blog Posts App </h1>
      <Box>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Button component={Link} to="/home" variant="outlined">
              Login In
            </Button>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
