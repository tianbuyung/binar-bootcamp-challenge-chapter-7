const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";
const UserService = require("../services/userService");
const userService = new UserService();

// async function authenticate(username, password, done) {
//   try {
//     const user = await userService.userLogin({ username, password });
//     return done(null, user);
//   } catch (error) {
//     return done(null, false, { message: error.message });
//   }
// }

// passport.use(
//   new LocalStrategy(
//     { usernameField: "username", passwordField: "password" },
//     authenticate
//   )
// );

// passport.serializeUser(([err, user], done) => done(null, user.userId));

// passport.deserializeUser(async (userId, done) =>
//   done(null, await userService.userFindByPK(userId))
// );

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userService.userFindByPK(payload.userId);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);

module.exports = passport;
