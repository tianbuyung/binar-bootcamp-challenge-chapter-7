const UserService = require("../services/userService");
const userService = new UserService();

class UserController {
  async getAllUsers(req, res) {
    const query = req.query;
    const [users, limit, page] = await userService.usersFindAndCountAll(query);
    let error = users[0];
    if (error) {
      res.status(500).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: "Successfully read all users data",
        currentPage: page,
        totalPages: Math.ceil(users[1].count / limit),
        data: users[1].rows,
      });
    }
  }
}

module.exports = UserController;
