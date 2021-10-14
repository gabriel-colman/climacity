
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", routes.router);

app.listen(port, function () {
  console.log("The server is runing on: http://localhost:3000/");
});