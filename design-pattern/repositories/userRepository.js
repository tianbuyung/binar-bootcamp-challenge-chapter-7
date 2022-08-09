const Model = require("../../database/models");
const { UserGame, UserGameBiodata, UserGameRoom, UserGameHistory } = Model;

class UserRepository {
  async findOrCreate(payload) {
    let err = null;
    try {
      let data;
      let created;
      [data, created] = await UserGame.findOrCreate({
        where: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          role: payload.role,
        },
      });
      if (created) {
        await UserGameBiodata.create({
          userId: data.userId,
        });
        created = "Your account has been created!";
        return [err, created];
      }
    } catch (error) {
      err = "The username/email is already exist!";
      return [err, null];
    }
  }
}

module.exports = UserRepository;
