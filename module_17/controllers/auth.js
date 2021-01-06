const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const sendGridKey = require("../sensitive").sendGridKey;
const sendGridFromMail = require("../sensitive").sendGridFromMail;
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: sendGridKey,
    },
  })
);

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    errorMessage,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.redirect("/");
            });
          } else {
            req.flash("error", "Invalid email or password.");
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Mistake during authorization. please try again");
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    docTitle: "Signup",
    errorMessage,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email exists already. Please, pick another one");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: sendGridFromMail,
            subject: "Successful signup",
            html: "<h1>You successfully signed up!</h1>",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    docTitle: "Reset Password",
    errorMessage,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No accout found, try another one or sign up");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        return transporter.sendMail({
          to: req.body.email,
          from: sendGridFromMail,
          subject: "Password reset",
          html: `
      <p>Password reset on your account is requested</p>
        <p>Click <a href="http://localhost:3000/reset/${token}">this link</a> to set a new password</p>
<p>The link will expire in 1 hour</p>`,
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (user) {
        let errorMessage = req.flash("error");
        if (errorMessage.length) {
          errorMessage = errorMessage[0];
        } else {
          errorMessage = null;
        }
        return res.render("auth/new-password", {
          path: "/new-password",
          docTitle: "Set New Password",
          passwordToken: token,
          userId: user._id.toString(),
          errorMessage,
        });
      }
      return res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetTokenExpiration = undefined;
      resetUser.resetToken = undefined;
      return resetUser.save();
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
