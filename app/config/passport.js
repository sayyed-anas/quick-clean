const localStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "No User with This Email" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user, { message: "Logged in Successfully" });
          } else {
            return done(null, false, { message: "Wrong Username or Password" });
          }
        } catch (err) {
          return done(err); // Pass the error to done
        }
      }
    )
  );

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user); // User object attached to req.user
    } catch (err) {
      return done(err); // Pass the error to done
    }
  });
}

module.exports = init;
