const express = require("express");
const app = express();
const blogPostsRouter = require("./routes/blogPostsRouter");
app.use(express.json());

app.use("/api/posts", blogPostsRouter);

module.exports = app;
