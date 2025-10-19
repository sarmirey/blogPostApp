const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = 8000;

console.log("FOUND", process.env.DATABASE_CONNECTION);

const DB = process.env.DATABASE_CONNECTION.replace(
  "<db_password>",
  process.env.DATABASE_PASS
);

const connection = mongoose.connect(DB);

connection
  .then(() => {
    console.log("CONNECTION SUCCESSFUL");
  })
  .catch((error) => {
    console.log("CONNECTION ERROR", error);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
