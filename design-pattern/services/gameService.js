const GameRepository = require("../repositories/gameRepository");
const gameRepository = new GameRepository();
const FightRepository = require("../repositories/fightRepository");
const fightRepository = new FightRepository();
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
  async #fightResult(playerOneChoice, playerTwoChoice) {
    let result = "";
    if (playerOneChoice === playerTwoChoice) {
      result = "draw";
      return result;
    } else if (
      (playerOneChoice === "rock" && playerTwoChoice === "scissors") ||
      (playerOneChoice === "scissors" && playerTwoChoice === "paper") ||
      (playerOneChoice === "paper" && playerTwoChoice === "rock")
    ) {
      result = "win";
      return result;
    } else {
      result = "lose";
      return result;
    }
  }
  async #playerScore(result) {
    if (result === "win") {
      return 1;
    } else {
      return 0;
    }
  }
  async #getReverseResult(result) {
    if (result == "win") return "lose";
    if (result == "lose") return "win";
    return "draw";
  }
  async createRoom(payload) {
    const { userId } = payload;
    const doesPlayerHaveRoom = await this.#doesPlayerHaveRoom(userId);
    if (doesPlayerHaveRoom) {
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
        err = "Room is full/done.";
        return [err, null];
      }
      isRoomExist.userIdChallenger = userId;
      await isRoomExist.save();
      return [err, payload];
    }
  }
  async fightRoom(payload) {
    const { userId, roomId, playerChoice } = payload;
    const options = { where: { roomId } };
    let [err, isRoomExist] = await gameRepository.findOne(options);
    const { userIdOwner, userIdChallenger, gameStatus } = isRoomExist;
    if (!userIdChallenger) {
      err = "Please invite your friend in this room";
      return [err, null];
    } else if (!gameStatus) {
      err = "Fight room is done.";
      return [err, null];
    } else if (userIdOwner !== userId && userIdChallenger !== userId) {
      err = "It's not your fight room.";
      return [err, null];
    } else {
      let [err, firstHistoryExist] = await fightRepository.findOne({ options });
      if (firstHistoryExist) {
        if (firstHistoryExist.userId === userId) {
          err = "You can't moved again.";
          return [err, null];
        } else {
          let [err, secondHistoryExist] = await fightRepository.findOne({
            where: {
              userId,
            },
          });
          if (secondHistoryExist.userId === userId) {
            err = "You can't moved again.";
            return [err, null];
          }
          const result = await this.#fightResult(
            playerChoice,
            firstHistoryExist.playerChoice
          );
          const playerScore = await this.#playerScore(result);
          const newPayload = { ...payload, playerStep: 1, result, playerScore };
          firstHistoryExist.result = await this.#getReverseResult(result);
          firstHistoryExist.playerScore = await this.#playerScore(
            firstHistoryExist.result
          );
          await firstHistoryExist.save();
          return await fightRepository.create(newPayload);
        }
      } else {
        const newPayload = { ...payload, playerStep: 1 };
        return await fightRepository.create(newPayload);
      }
    }
  }
}

module.exports = GameService;
