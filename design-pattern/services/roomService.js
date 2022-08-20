const RoomRepository = require("../repositories/roomRepository");
const roomRepository = new RoomRepository();
const FightRepository = require("../repositories/fightRepository");
const fightRepository = new FightRepository();
const { Op } = require("sequelize");

class RoomService {
  async #generateString(digit) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
    let [err, doesPlayerHaveRoom] = await roomRepository.findOne(options);
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
  async #getPlayerStep(count) {
    if (count > 3) {
      return 3;
    }
    if (count > 1) {
      return 2;
    }
    return 1;
  }
  async #randomNumber() {
    const randomNumber = Math.floor(Math.random() * 2.9);
    return randomNumber;
  }
  async #checkChoice(number) {
    switch (number) {
      case 0:
        return "rock";
      case 1:
        return "paper";
      default:
        return "scissors";
    }
  }
  async #autoChoice(roomId, userId, playerChoice) {
    // jumlah datanya ganjil atau genap
    const options = { where: { roomId } };
    let [errorCountHistoryGame, countHistoryGame] =
      await fightRepository.countHistory(options);
    let [errorIsRoomExist, isRoomExist] = await roomRepository.findOne(options);
    const { userIdOwner, userIdChallenger } = isRoomExist;
    console.log(errorCountHistoryGame);
    console.log(errorIsRoomExist);
    if (countHistoryGame % 2 !== 0) {
      let randomUserId = null;
      if (userId === userIdOwner) {
        randomUserId = userIdChallenger;
      } else {
        randomUserId = userIdOwner;
      }
      const number = await this.#randomNumber();
      const randomChoice = await this.#checkChoice(number);
      const playerStep = await this.#getPlayerStep(countHistoryGame);
      const result = await this.#fightResult(randomChoice, playerChoice);
      console.log(playerChoice, randomChoice, result);
      const playerScore = await this.#playerScore(result);
      const newPayload = {
        roomId,
        user_id: randomUserId,
        playerChoice: randomChoice,
        playerStep,
        result,
        playerScore,
      };
      console.log(newPayload);
      const newOptions = { where: { roomId }, order: [["id", "DESC"]] };
      let [err, isHistoryExist] = await fightRepository.findOne(newOptions);
      console.log(err);
      isHistoryExist.result = await this.#getReverseResult(result);
      isHistoryExist.playerScore = await this.#playerScore(
        isHistoryExist.result
      );
      await isHistoryExist.save();
      if (countHistoryGame >= 5) {
        isRoomExist.gameStatus = false;
      }
      await isRoomExist.save();
      return await fightRepository.create(newPayload);
    } else {
      console.log("sudah dipilih");
    }
  }
  async viewRoom() {
    return await roomRepository.findAll();
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
      return await roomRepository.create(newPayload);
    }
  }
  async joinRoom(payload) {
    const { userId, roomId } = payload;
    const doesPlayerHaveRoom = await this.#doesPlayerHaveRoom(userId);
    if (doesPlayerHaveRoom) {
      return doesPlayerHaveRoom;
    } else {
      const options = { where: { roomId } };
      let [err, isRoomExist] = await roomRepository.findOne(options);
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
    let err = null;
    const { userId, roomId, playerChoice } = payload;
    const options = { where: { roomId } };
    let [errorIsRoomExist, isRoomExist] = await roomRepository.findOne(options);
    if (errorIsRoomExist) {
      return [errorIsRoomExist, null];
    }
    const { userIdOwner, userIdChallenger, gameStatus } = isRoomExist;
    let [errorCountHistoryGame, countHistoryGame] =
      await fightRepository.countHistory(options);
    if (countHistoryGame >= 6) {
      errorCountHistoryGame = "The game is over.";
      return [errorCountHistoryGame, null];
    }
    if (!gameStatus) {
      err = "The game is over.";
      return [err, null];
    } else if (!userIdChallenger) {
      err = "Please invite your friend in this room";
      return [err, null];
    } else if (userIdOwner !== userId && userIdChallenger !== userId) {
      err = "It's not your fight room.";
      return [err, null];
    } else {
      const newOptions = { where: { roomId }, order: [["id", "DESC"]] };
      let [err, isHistoryExist] = await fightRepository.findOne(newOptions);
      const playerStep = await this.#getPlayerStep(countHistoryGame);
      if (isHistoryExist) {
        if (
          isHistoryExist.userId === userId &&
          isHistoryExist.playerStep === (playerStep || null)
        ) {
          err = "You can't moved again, please wait your opponent!";
          return [err, null];
        } else {
          let result;
          let playerScore;
          if (isHistoryExist.playerStep !== playerStep) {
            result = null;
            playerScore = null;
          } else {
            result = await this.#fightResult(
              playerChoice,
              isHistoryExist.playerChoice
            );
            playerScore = await this.#playerScore(result);
            isHistoryExist.result = await this.#getReverseResult(result);
            isHistoryExist.playerScore = await this.#playerScore(
              isHistoryExist.result
            );
            await isHistoryExist.save();
          }
          const newPayload = { ...payload, playerStep, result, playerScore };
          if (countHistoryGame >= 5) {
            isRoomExist.gameStatus = false;
          }
          await isRoomExist.save();
          const callAutoChoice = async () => {
            let result = await this.#autoChoice(roomId, userId, playerChoice);
            return result;
          };
          setTimeout(callAutoChoice, 60000);
          return await fightRepository.create(newPayload);
        }
      } else {
        const newPayload = { ...payload, playerStep: 1 };
        const callAutoChoice = async () => {
          let result = await this.#autoChoice(roomId, userId, playerChoice);
          return result;
        };
        setTimeout(callAutoChoice, 60000);
        return await fightRepository.create(newPayload);
      }
    }
  }
}

module.exports = RoomService;
