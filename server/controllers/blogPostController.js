const mongoose = require("mongoose");
const Blog = require("../models/blogPostModel");

exports.createPost = async (req, res) => {
  try {
    const newBlogPost = await Blog.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        blogPost: newBlogPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const isNotEmpty = queryObj.search;

    // BUILDING SEARCH QUERY
    let search = isNotEmpty
      ? { title: { $regex: queryObj.search, $options: "i" } }
      : {};
    const totalNumOfPages =
      queryObj.search != ""
        ? await Blog.countDocuments(search)
        : await Blog.countDocuments({});

    //BUILDING PAGINATION PARAMATERS
    const page = Number(queryObj.page);
    const limit = Number(queryObj.limit);
    const skipData = (page - 1) * limit;

    //EXECUTE QUERY
    const blogPosts = await Blog.find(search)
      .sort({ dateCreated: -1 })
      .skip(skipData)
      .limit(limit);
    const results = blogPosts.length;
    res.status(200).json({
      status: "success",
      results: results,
      totalPages: Math.ceil(totalNumOfPages / limit),
      data: {
        blogPost: blogPosts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        blogPost: blogPost,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "No blog post found with that ID",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatePost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, //TO ENSURE A PROPER PUT REQUEST
    });
    res.status(200).json({
      status: "success",
      data: {
        blogPost: updatePost,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};
