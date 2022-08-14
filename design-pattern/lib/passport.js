const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();
const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("authorization"),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userRepository.findOne({
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
