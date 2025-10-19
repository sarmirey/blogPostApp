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
    const blogPosts = await Blog.find();
    res.status(201).json({
      status: "success",
      results: blogPosts.length,
      data: {
        blogPost: blogPosts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        blogPost: blogPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatePost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        blogPost: updatePost,
      },
    });
  } catch (error) {
    res.status(400).json({
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
