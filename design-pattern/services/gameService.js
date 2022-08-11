const GameRepository = require("../repositories/gameRepository");
const gameRepository = new GameRepository();
const { Op } = require("sequelize");

class GameService {
  async #generateString(digit) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < digit; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async #doesPlayerHaveRoom(userId) {
    const options = {
      where: {
        [Op.and]: [
          { gameStatus: true },
          { [Op.or]: [{ userIdOwner: userId }, { userIdChallenger: userId }] },
        ],
      },
    };
    let [err, doesPlayerHaveRoom] = await gameRepository.findOne(options);
    if (doesPlayerHaveRoom) {
      err = `You already have a room with name=${doesPlayerHaveRoom.roomName} and id=${doesPlayerHaveRoom.roomId}`;
      return [err, null];
    } else {
      return false;
    }
  }
  async createRoom(payload) {
    const { userId } = payload;
    const doesPlayerHaveRoom = await this.#doesPlayerHaveRoom(userId);
    if (!doesPlayerHaveRoom) {
      return doesPlayerHaveRoom;
    } else {
      const userIdOwner = userId;
      const roomId = await this.#generateString(5);
      const newPayload = { ...payload, userIdOwner, roomId };
      return await gameRepository.create(newPayload);
    }
  }
  async joinRoom(payload) {
    const { userId, roomId } = payload;
    const doesPlayerHaveRoom = await this.#doesPlayerHaveRoom(userId);
    if (doesPlayerHaveRoom) {
      return doesPlayerHaveRoom;
    } else {
      const options = { where: { roomId } };
      let [err, isRoomExist] = await gameRepository.findOne(options);
      const { userIdChallenger, gameStatus } = isRoomExist;
      if (userIdChallenger || !gameStatus) {
        err = "Room is full";
        return [err, null];
      }
      isRoomExist.userIdChallenger = userId;
      await isRoomExist.save();
      return [err, payload];
    }
  }
  async fightRoom() {}
}

module.exports = GameService;
