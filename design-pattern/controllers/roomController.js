const RoomService = require("../services/roomService");
const roomService = new RoomService();

class RoomController {
  async createRoom(req, res) {
    const { userId } = req.user[1];
    const { roomName } = req.body;
    const payload = {
      userId,
      roomName,
    };
    const [err, room] = await roomService.createRoom(payload);
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
  async viewRoom(req, res) {
    const [err, room] = await roomService.viewRoom();
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully join room and move to fight room, please!",
        roomId: room,
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
    const [err, room] = await roomService.joinRoom(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully join room and move to fight room, please!",
        roomId: room.roomId,
      });
    }
  }
  async fightRoom(req, res) {
    const { userId } = req.user[1];
    const { roomId } = req.params;
    const { playerChoice } = req.body;
    const payload = {
      userId,
      roomId,
      playerChoice,
    };
    const [err, result] = await roomService.fightRoom(payload);
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully add your choice.",
        roomId: result,
      });
    }
  }
}

module.exports = RoomController;
