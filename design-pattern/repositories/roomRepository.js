const Model = require("../../database/models");
const { UserGameRoom } = Model;

class RoomRepository {
  async create(options) {
    let err = null;
    try {
      let created = await UserGameRoom.create(options);
      return [err, created];
    } catch (error) {
      err = "The room is already exist!";
      return [err, null];
    }
  }
  async findAll(options) {
    let err = null;
    try {
      let data = await UserGameRoom.findAll(options);
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
      let data = await UserGameRoom.findOne(options);
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
  async findByPk(options) {
    let err = null;
    try {
      let data = await UserGameRoom.findByPk(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findAndCountAll(options) {
    let err = null;
    try {
      const data = await UserGameRoom.findAndCountAll(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
}

module.exports = RoomRepository;
