const passport = require("passport");
const User = require("../../app/models/userModel");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.render("auth/login");
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }

      return res.redirect("/");
    });
  })(req, res, next);
};

const register = (req, res) => {
  res.render("auth/register");
};

const postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  // User.exists({ email: email }, (err, result) => {
  //   if (result) {
  //     req.flash("error", "Email Already Exist");
  //     res.redirect("/register");
  //   }
  // });

  const hashPassword = await bcrypt.hash(password, 10);

  const UserModel = new User({
    name: name,
    email: email,
    password: hashPassword,
  });

  UserModel.save()
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      req.flash("error", "Something Went Wrong");
      res.redirect("/register");
    });
};

const postLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    return res.redirect("/login");
  });
};

module.exports = { login, register, postRegister, postLogin, postLogout };
