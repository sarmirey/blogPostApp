const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");

router
  .route("/")
  .post(blogPostController.createPost)
  .get(blogPostController.getAllPosts);

router
  .route("/:id")
  .get(blogPostController.getPost)
  .put(blogPostController.updatePost)
  .delete(blogPostController.deletePost);

module.exports = router;
