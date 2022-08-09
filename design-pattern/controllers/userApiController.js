const UserService = require("../services/userService");
const userService = new UserService();

class UserApiController {
  async createUserGame(req, res) {
    const payload = req.body;
    const [err, user] = await userService.userFindOrCreate(payload);
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
}

module.exports = UserApiController;
