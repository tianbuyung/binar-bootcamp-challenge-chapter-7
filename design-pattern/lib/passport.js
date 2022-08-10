const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserService = require("../services/userService");
const userService = new UserService();

async function authenticate(username, password, done) {
  try {
    const user = await userService.userLogin({ username, password });
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    authenticate
  )
);

passport.serializeUser(([err, user], done) => done(null, user.userId));

passport.deserializeUser(async (userId, done) =>
  done(null, await userService.userFindByPK(userId))
);

module.exports = passport;
