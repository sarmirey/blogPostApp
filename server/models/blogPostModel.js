const mongoose = require("mongoose");
const blogPostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Blog Post must have a Title"],
  },
  content: {
    type: String,
    required: [true, "A Blog Post must have content"],
  },
  author: String,
  tags: [String],
});

const BlogPost = mongoose.model("BlogPost", blogPostsSchema);

module.exports = BlogPost;
