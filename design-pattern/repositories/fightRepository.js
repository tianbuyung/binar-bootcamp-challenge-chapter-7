const Model = require("../../database/models");
const { UserGameHistory } = Model;

class FightRepository {
  async create(options) {
    let err = null;
    try {
      let created = await UserGameHistory.create(options);
      return [err, created];
    } catch (error) {
      console.log(error);
      err = error.message;
      return [err, null];
    }
  }
  async findAll(options) {
    let err = null;
    console.log(options);
    try {
      let data = await UserGameHistory.findAll(options);
      if (data) {
        return [err, data];
      } else {
        err = "The room is not found";
        return [err, null];
      }
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findOne(options) {
    let err = null;
    try {
      let data = await UserGameHistory.findOne(options);
      if (data) {
        return [err, data];
      } else {
        err = "The room history is not found";
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
      let data = await UserGameHistory.findByPk(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findAndCountAll(options) {
    let err = null;
    try {
      const data = await UserGameHistory.findAndCountAll(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async countHistory(options) {
    let err = null;
    try {
      const data = await UserGameHistory.count(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
}

module.exports = FightRepository;
