import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Form from "../HomeComponents/Form";
import BlogCard from "../HomeComponents/BlogCard";
import BackDrop from "../sideEffects/BackDrop";
import PaginationComp from "../HomeComponents/PaginationComp";
import { Stack, Grid, Fab, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SnackBar from "../sideEffects/SnackBar";

const Home = (props) => {
  const location = useLocation();
  const receivedData = location.state;
  const [deleteState, setDeleteState] = useState(false);
  const [createdPost, setCreatedPost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: Number(searchParams.get("page")) || 1,
    limit: 4,
    totalPages: "",
  });
  const [searchBar, setSearchBar] = useState(searchParams.get("search") || "");
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSnackClose = (event, reason, setSnack) => {
    if (reason === "clickaway") return;
    setSnack(false);
  };

  const handlePagination = (event, value) => {
    setPaginationInfo((prevInfo) => ({
      ...prevInfo,
      currentPage: value,
    }));
    setSearchParams({
      search: searchBar,
      page: value,
      limit: paginationInfo.limit,
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchBar(value);
    setSearchParams({
      search: value,
      page: 1,
      limit: paginationInfo.limit,
    });
    setPaginationInfo((prev) => ({ ...prev, currentPage: 1 }));
  };
  const getAllBlogPosts = async (showLoader) => {
    if (showLoader) setLoadingState(true);
    const limit = paginationInfo.limit;
    try {
      const response = await axios.get(
        `api/posts?search=${searchBar}&page=${paginationInfo.currentPage}&limit=${limit}`
      );
      response.data.data.blogPost && setBlogPosts(response.data.data.blogPost);
      setPaginationInfo((prevInfo) => ({
        ...prevInfo,
        totalPages: response.data.totalPages,
      }));
      if (showLoader) setLoadingState(false);
    } catch (error) {
      if (showLoader) setLoadingState(false);
    }
  };

  //WHEN PAGINATION CHANGES OR SEARCH PARAM CHANGES
  useEffect(() => {
    getAllBlogPosts(false);
  }, [paginationInfo.currentPage, searchBar]);

  // ON FIRST RENDER
  useEffect(() => {
    if (receivedData) {
      setDeleteState(receivedData);
    }
    setSearchParams({
      search: "",
      page: 1,
      limit: paginationInfo.limit,
    });
    setLoadingState(true);
    getAllBlogPosts(true);
  }, []);

  return (
    <>
      {loadingState ? (
        <BackDrop loadingState={loadingState} />
      ) : (
        <>
          <Grid alignItems="center" container spacing={2}>
            <Grid size={11}>
              <h1> Welcome to your Blog Rey </h1>
            </Grid>
            <Grid size={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: 50 }}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Stack spacing={3}>
            <Grid container justifyContent="center">
              <TextField
                value={searchBar}
                id="input-with-icon-textfield"
                label="Search By Blog Title"
                onChange={handleSearch}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: 500 }}
                variant="outlined"
              />
            </Grid>
            {blogPosts &&
              blogPosts.map((item) => {
                return (
                  <BlogCard
                    key={item._id}
                    id={item._id}
                    dateCreated={item.dateCreated}
                    author={item.author}
                    title={item.title}
                    content={item.content}
                  />
                );
              })}
            <Grid
              container
              direction="row"
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <PaginationComp
                totalPages={paginationInfo.totalPages}
                currentPage={paginationInfo.currentPage}
                onChange={handlePagination}
              />
            </Grid>
          </Stack>
          <Form
            setDataSubmitted={setCreatedPost}
            openModal={openModal}
            handleClose={handleClose}
            getAllBlogPosts={getAllBlogPosts}
          />
          <SnackBar
            handleClose={(event, reason) =>
              handleSnackClose(event, reason, setDeleteState)
            }
            errorState={deleteState}
            type="success"
            message="Blog Post succesfully deleted"
          />
          <SnackBar
            handleClose={(event, reason) =>
              handleSnackClose(event, reason, setCreatedPost)
            }
            errorState={createdPost}
            type="success"
            message="Blog Post succesfully created"
          />
        </>
      )}
    </>
  );
};

export default Home;
