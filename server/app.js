const express = require("express");
const app = express();
const blogPostsRouter = require("./routes/blogPostsRouter");
app.use(express.json());

//MAIN ROUTE SOURCE
app.use("/api/posts", blogPostsRouter);

//UNHANDLED ROUTES
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
