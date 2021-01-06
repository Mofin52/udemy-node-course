const express = require("express");

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
  res.render("main", { title: "User App", users: users });
});

router.get("/users", (req, res, next) => {
  res.render("userlist", { title: "The list of users", users: users });
});

router.post("/users", (req, res, next) => {
  users.push(req.body.name);
  res.status(302).redirect("/users");
});

exports.router = router;
exports.users = users;
