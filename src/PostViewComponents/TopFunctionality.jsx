import ArrowBack from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
const TopFunctionality = ({
  handleEdit,
  deletePost,
  editView,
  id,
  handleView,
}) => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      >
        <Grid>
          <Button
            component={Link}
            onClick={editView && handleView}
            to={!editView && "/home"}
            size="large"
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            {editView ? (
              <CancelIcon fontSize="large" />
            ) : (
              <ArrowBack fontSize="large" />
            )}
          </Button>
        </Grid>
        <Grid>
          <Grid container spacing={1}>
            {!editView && (
              <Grid>
                <Button
                  component={Link}
                  onClick={handleEdit}
                  size="large"
                  sx={{
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <EditIcon fontSize="large" />
                </Button>
              </Grid>
            )}
            <Grid>
              <Button
                component={Link}
                onClick={deletePost}
                size="large"
                sx={{
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <DeleteIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopFunctionality;
