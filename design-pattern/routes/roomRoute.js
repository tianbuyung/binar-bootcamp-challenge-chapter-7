const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/roomController");
const roomController = new RoomController();
const restrict = require("../middlewares/restrict");

router.post("/create", restrict, roomController.createRoom);
router.post("/join", restrict, roomController.joinRoom);
router.post("/fight/:roomId", restrict, roomController.fightRoom);

module.exports = router;
