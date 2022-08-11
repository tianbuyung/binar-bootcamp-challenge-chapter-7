const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();

class UserService {
  async userFindOrCreate(payload) {
    const { username, email, password, role } = payload;
    const options = {
      where: {
        username,
        email,
        password,
        role,
      },
    };
    return await userRepository.findOrCreate(options);
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
