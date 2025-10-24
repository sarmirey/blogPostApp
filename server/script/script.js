const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../config.env" });
const Blog = require("../models/blogPostModel");

const DB = process.env.DATABASE_CONNECTION.replace(
  "<db_password>",
  process.env.DATABASE_PASS
);

const connection = mongoose.connect(DB);

connection
  .then(() => {
    console.log("MONGODB CONNECTION SUCCESSFUL");
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR", error);
  });

// READ JSON FILE
const blogs = JSON.parse(
  fs.readFileSync("../script/data/inputData.json", "utf-8")
);

//IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Blog.create(blogs);
    console.log("Data successfully loaded!");
  } catch (error) {
    console.log(error);
  }
};

//DELETE ALL DATA
const deleteData = async () => {
  try {
    await Blog.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error);
  }
};

//RUN ONE AFTER THE OTHER
const runScript = async () => {
  await deleteData();
  await importData();
  process.exit();
};

runScript();
