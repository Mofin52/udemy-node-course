// use express
// app two middleware, both logging, last returns one respone
// handle / and handle /users
const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  res.send("<h1>List of users</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Any other page</h1>");
});

app.listen(3000);
