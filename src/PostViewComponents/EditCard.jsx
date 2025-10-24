import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Grid,
  MenuItem,
  Chip,
} from "@mui/material";
import availableHashTags from "../data/availableHashTags";

const EditCard = (props) => {
  const post = props.post;
  const id = props.id;
  const setEditView = props.triggerEditView;
  const editView = props.currentEditView;
  const refresh = props.refresh;
  const setEditedBlogPost = props.setEditedBlogPost;
  const [inputData, setInputData] = useState({
    title: post.title,
    subtitle: post.subtitle,
    content: post.content,
    tags: post.tags,
  });
  const [currentTagSelected, setCurrentTagSelected] = useState("");
  const [inputErrorState, setInputErrorState] = useState({
    titleError: false,
    subtitleError: false,
    contentError: false,
  });

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
      await axios.put(`/api/posts/${id}`, body);
      setEditView(!editView);
      refresh();
      setEditedBlogPost(true);
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

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Card
          sx={{
            width: 1200,
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4" justifyContent="center">
              Editing Blog Post
            </Typography>
            <TextField
              error={inputErrorState.titleError}
              onChange={(event) => inputChange(event, "title")}
              id="outlined-basic"
              label="Blog Title"
              variant="outlined"
              helperText={inputErrorState.titleError && "Blog Title required"}
              defaultValue={inputData.title}
              sx={{ width: "50rem" }}
              margin="normal"
            />
            <TextField
              error={inputErrorState.subtitleError}
              onChange={(event) => inputChange(event, "subtitle")}
              id="outlined-basic"
              label="Blog SubTitle"
              variant="outlined"
              helperText={
                inputErrorState.subtitleError && "Blog SubTitle required"
              }
              defaultValue={inputData.subtitle}
              sx={{ width: "50rem" }}
              margin="normal"
            />
            <TextField
              error={inputErrorState.contentError}
              onChange={(event) => inputChange(event, "content")}
              id="outlined-basic"
              label="Blog Content"
              variant="outlined"
              multiline
              helperText={
                inputErrorState.contentError && "Blog Content required"
              }
              defaultValue={inputData.content}
              sx={{ width: "50rem" }}
              minRows={5}
              maxRows={7}
              margin="normal"
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
              ></Grid>
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
              <Grid container size={6} spacing={2}>
                {inputData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    onDelete={() => handleChipDelete(tag)}
                  />
                ))}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              margin="normal"
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default EditCard;
