exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    docTitle: "Page Not Found!",
    path: null,
    isAuth: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    docTitle: "Error",
    path: null,
    isAuth: req.session.isLoggedIn,
  });
};
