const AuthService = require("../services/authService");
const authService = new AuthService();

class AuthController {
  async userRegister(req, res) {
    const payload = req.body;
    const [err, user] = await authService.userRegister(payload);
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
  async userLogin(req, res) {
    const payload = req.body;
    const [err, token] = await authService.userLogin(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully login",
        token,
      });
    }
  }
  async userLogout(req, res) {
    await req.logout(function (err) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        res.status(200).json({
          message: "Successfully logout",
        });
      }
    });
  }
}

module.exports = AuthController;
