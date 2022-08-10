const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();

const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";

class UserService {
  async userFindOrCreate(payload) {
    return await userRepository.findOrCreate(payload);
  }
  async userFindByPK(payload) {
    return await userRepository.findByPk(payload);
  }
  async userFindOne(payload) {
    return await userRepository.findOne(payload);
  }
  async usersFindAndCountAll(query) {
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    const options = {
      order: ["id"],
      limit,
      offset,
      attributes: [
        "userId",
        "username",
        "email",
        "role",
        "createdAt",
        "updatedAt",
      ],
    };
    const users = await userRepository.findAndCountAll(options);
    return [users, limit, page];
  }
}

module.exports = UserService;
