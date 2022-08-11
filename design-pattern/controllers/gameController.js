const GameService = require("../services/gameService");
const gameService = new GameService();

class GameController {
  async createRoom(req, res) {
    const { userId } = req.user[1];
    const { roomName } = req.body;
    const payload = {
      userId,
      roomName,
    };
    const [err, room] = await gameService.createRoom(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully created room",
        roomId: room.roomId,
      });
    }
  }
  async joinRoom(req, res) {
    const { userId } = req.user[1];
    const { roomId } = req.body;
    const payload = {
      userId,
      roomId,
    };
    const [err, room] = await gameService.joinRoom(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully join room",
        roomId: room.roomId,
      });
    }
  }
  async fightRoom() {}
}

module.exports = GameController;
