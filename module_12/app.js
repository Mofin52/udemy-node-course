const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/db").mongoConnect;
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5fe366c30fe63f9c6085c2a5")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
  // if (){}
  app.listen(3000);
});
app.use(errorController.get404);
