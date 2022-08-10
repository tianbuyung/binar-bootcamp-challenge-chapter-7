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
  // login = passport.authenticate("local", {
  //   successRedirect: "/",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  //   session: false,
  // });
  async userLogin(req, res) {
    const payload = req.body;
    const [err, token] = await userService.userLogin(payload);
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

module.exports = UserApiController;
