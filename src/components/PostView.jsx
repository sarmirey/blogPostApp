import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ViewCard from "../PostViewComponents/ViewCard";
import EditCard from "../PostViewComponents/EditCard";
import BackDrop from "../sideEffects/BackDrop";
import SnackBar from "../sideEffects/SnackBar";
import TopFunctionality from "../PostViewComponents/TopFunctionality";

const PostView = (props) => {
  const id = useParams().id;
  const [post, setPost] = useState([]);
  const [editedBlogPost, setEditedBlogPost] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [editView, setEditView] = useState(false);
  const navigate = useNavigate();

  const fetchBlogPost = async () => {
    setLoadingState(true);
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data.data.blogPost);
      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
    }
  };

  const deletePost = async () => {
    setLoadingState(true);
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.status === 204) {
        navigate("/home", { state: true });
      }
    } catch (error) {
      setErrorState(true);
      setLoadingState(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorState(false);
    setEditedBlogPost(false);
  };

  const handleEdit = () => {
    setEditView(true);
  };

  const handleView = () => {
    setEditView(false);
  };

  useEffect(() => {
    fetchBlogPost();
  }, []);

  return (
    <>
      {loadingState ? (
        <BackDrop loadingState={loadingState} />
      ) : (
        <>
          <TopFunctionality
            id={id}
            handleView={handleView}
            editView={editView}
            handleEdit={handleEdit}
            deletePost={deletePost}
          />
          <br />
          {!editView ? (
            <ViewCard post={post} />
          ) : (
            <EditCard
              setEditedBlogPost={setEditedBlogPost}
              post={post}
              id={id}
              triggerEditView={setEditView}
              currentEditView={editView}
              refresh={fetchBlogPost}
            />
          )}
          <SnackBar
            type="error"
            errorState={errorState}
            handleClose={handleClose}
            message="Deletion failed. Please try again."
          />
          <SnackBar
            type="success"
            errorState={editedBlogPost}
            handleClose={handleClose}
            message="Blog Post Edited Successfully!"
          />
        </>
      )}
    </>
  );
};

export default PostView;
