const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
