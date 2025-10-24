import { Grid, Pagination } from "@mui/material";
const PaginationComp = ({ totalPages, currentPage, onChange }) => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Pagination
        count={totalPages}
        size="large"
        color="primary"
        siblingCount={2}
        boundaryCount={1}
        page={currentPage}
        onChange={onChange}
      />
    </Grid>
  );
};

export default PaginationComp;
