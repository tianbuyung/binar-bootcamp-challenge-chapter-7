const Model = require("../../database/models");
const { UserGame, UserGameBiodata, UserGameRoom, UserGameHistory } = Model;

class UserRepository {
  async findOrCreate(options) {
    let err = null;
    try {
      let data;
      let created;
      [data, created] = await UserGame.findOrCreate(options);
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
  async findOne(options) {
    let err = null;
    try {
      let data = await UserGame.findOne(options);
      if (data) {
        return [err, data];
      } else {
        err = "The user is not found";
        return [err, null];
      }
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findByPk(options) {
    let err = null;
    try {
      let data = await UserGame.findByPk(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findAndCountAll(options) {
    let err = null;
    try {
      const data = await UserGame.findAndCountAll(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
}

module.exports = UserRepository;
