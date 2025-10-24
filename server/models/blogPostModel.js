const mongoose = require("mongoose");

const blogPostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Request must have a Title"],
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    required: [true, "Request must have content attribute"],
    default: "",
  },
  author: {
    type: String,
    required: [true, "Request must have author attribute"],
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  dateCreated: {
    type: Date,
    required: [true, "A Date Obj must be provided"],
    default: Date.now(),
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostsSchema);

module.exports = BlogPost;
