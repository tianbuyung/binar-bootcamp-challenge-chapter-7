const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";
const UserService = require("../services/userService");
const userService = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("authorization"),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userService.userFindOne({
        attributes: ["userId", "username", "role"],
        where: { userId: payload.userId },
      });
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);

module.exports = passport;
