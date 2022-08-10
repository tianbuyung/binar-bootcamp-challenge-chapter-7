const UserService = require("../services/userService");
const userService = new UserService();
const passport = require("../lib/passport");

class UserApiController {
  async userRegister(req, res) {
    const payload = req.body;
    const [err, user] = await userService.userRegister(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: user,
      });
    }
  }
  login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  });
}

module.exports = UserApiController;
