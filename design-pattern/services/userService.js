const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();

const Model = require("../../database/models");
const { UserGame, UserGameBiodata, UserGameRoom, UserGameHistory } = Model;

class UserService {
  async userFindByPK(payload) {
    return await userRepository.findByPk(payload);
  }
  async userFindOne(payload) {
    const checkUsername = payload.params.username;
    const { userId, username } = payload.user[1];
    if (username !== checkUsername) {
      let error = "Unauthorized";
      return [error, null];
    }
    const options = {
      where: {
        userId,
      },
      attributes: [
        "userId",
        "username",
        "email",
        "role",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "bio",
          ],
        },
        {
          model: UserGameHistory,
          as: "history",
          attributes: [
            "id",
            "roomId",
            "userId",
            "playerChoice",
            "playerStep",
            "playerScore",
            "result",
          ],
        },
        {
          model: UserGameRoom,
          as: "ownerRoom",
          attributes: [
            "id",
            "roomId",
            "roomName",
            "userIdOwner",
            "userIdChallenger",
            "gameStatus",
            "createdAt",
            "updatedAt",
          ],
        },
        {
          model: UserGameRoom,
          as: "challengerRoom",
          attributes: [
            "id",
            "roomId",
            "roomName",
            "userIdOwner",
            "userIdChallenger",
            "gameStatus",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    };
    return await userRepository.findOne(options);
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
