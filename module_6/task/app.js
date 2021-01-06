// project with express
// / - form and user can input name
// /users - output entered names/error text

const express = require("express");
const appData = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "custom_views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(appData.router);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found!" });
});

app.listen(3000);
