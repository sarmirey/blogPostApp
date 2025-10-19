const app = require("./app");
const mongoose = require("mongoose");
const port = 5000;

console.log("FOUND", process.env.DATABASE_CONNECTION);

const DB = process.env.DATABASE_CONNECTION.replace(
  "<db_password>",
  process.env.DATABASE_PASS
);

mongoose
  .connect(DB, {
    useNewUrlParse: true,
    useCreateIndex: true,
    useFindandModify: false,
  })
  .then((conn) => {
    console.log(conn.connections);
    console.log("Connected to DataBase successfully");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
