import {
  Typography,
  Grid,
  Modal,
  Card,
  CardContent,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import availableHashTags from "../data/availableHashTags";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Form = (props) => {
  const [currentTagSelected, setCurrentTagSelected] = useState("");
  const [inputData, setInputData] = useState({
    title: "",
    subtitle: "",
    content: "",
    tags: [],
  });
  const [inputErrorState, setInputErrorState] = useState({
    titleError: false,
    subtitleError: false,
    contentError: false,
  });

  const errorValidation = () => {
    if (!inputData.title) {
      setInputErrorState((prevState) => ({
        ...prevState,
        titleError: true,
      }));
    }
    if (!inputData.subtitle) {
      setInputErrorState((prevState) => ({
        ...prevState,
        subtitleError: true,
      }));
    }
    if (!inputData.content) {
      setInputErrorState((prevState) => ({
        ...prevState,
        contentError: true,
      }));
    }
  };

  const submitData = async () => {
    try {
      const body = {
        title: inputData.title,
        subtitle: inputData.subtitle,
        content: inputData.content,
        tags: inputData.tags,
        dateCreated: Date.now(),
        author: "Reynerio Sarmiento Jr",
      };
      await axios.post("/api/posts", body);
      props.setDataSubmitted(true);
      props.handleClose();
      props.getAllBlogPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    errorValidation();
    if (inputData.title && inputData.subtitle && inputData.content) {
      submitData();
    }
  };

  const inputChange = (event, inputField) => {
    const input = event.target.value;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [inputField]: input,
    }));
  };

  const handleSelectChange = (event) => {
    const newTag = event.target.value;
    if (!inputData.tags.includes(newTag)) {
      setInputData((prevInputData) => ({
        ...prevInputData,
        tags: [...prevInputData.tags, newTag],
      }));
    }
    setCurrentTagSelected(newTag);
  };

  useEffect(() => {
    Object.keys(inputData).forEach((key) => {
      if (inputData[key]) {
        setInputErrorState((prevState) => ({
          ...prevState,
          [`${key}Error`]: false,
        }));
      }
    });
  }, [inputData]);

  const handleChipDelete = (chipToDelete) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      tags: prevInputData.tags.filter((tag) => tag != chipToDelete),
    }));
  };
  return (
    <>
      <Modal
        open={props.openModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form onSubmit={onSubmitHandler}>
          <Card sx={style}>
            <Stack spacing={2}>
              <Grid container alignItems="center">
                <Grid item size={11}>
                  <Typography variant="h4">Create Blog Post</Typography>
                </Grid>
                <Grid item size={1}>
                  <Button
                    onClick={props.handleClose}
                    sx={{
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </Button>
                </Grid>
              </Grid>
              <TextField
                error={inputErrorState.titleError}
                onChange={(event) => inputChange(event, "title")}
                fullWidth
                placeholder="Give your post a title..."
                id="outlined-basic"
                label="Blog Title"
                variant="outlined"
                helperText={inputErrorState.titleError && "Blog Title required"}
              />
              <TextField
                error={inputErrorState.subtitleError}
                onChange={(event) => inputChange(event, "subtitle")}
                fullWidth
                placeholder="Add a subtitle (optional)"
                id="outlined-basic"
                label="Blog SubTitle"
                variant="outlined"
                helperText={
                  inputErrorState.subtitleError && "SubTitle Required"
                }
              />
              <TextField
                error={inputErrorState.contentError}
                onChange={(event) => inputChange(event, "content")}
                fullWidth
                placeholder="“Start writing your post... (max 10 rows)”"
                id="standard-multiline-flexible"
                label="Blog Content"
                multiline
                minRows={5}
                maxRows={7}
                helperText={inputErrorState.contentError && "Content equired"}
              />
              <Grid
                container
                direction="row"
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={8}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Grid size={2}>
                    <Typography> HashTags: </Typography>
                  </Grid>
                  <Grid size={4}>
                    <FormControl sx={{ m: 2, minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Tags
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={currentTagSelected}
                        onChange={handleSelectChange}
                        autoWidth
                        label="Age"
                      >
                        {availableHashTags.map((el) => (
                          <MenuItem key={el.id} value={el.hashTag}>
                            {el.hashTag}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid container size={6} spacing={1}>
                    {inputData.tags &&
                      inputData.tags.map((tag) => (
                        <Chip
                          label={tag}
                          variant="outlined"
                          onDelete={() => handleChipDelete(tag)}
                        />
                      ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button type="submit" variant="contained" size="medium">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </form>
      </Modal>
    </>
  );
};

export default Form;
