const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/roomController");
const roomController = new RoomController();
const restrict = require("../middlewares/restrict");
const checkUserRole = require("../middlewares/userRole");

router.post("/create", restrict, roomController.createRoom);
router.get("/view", restrict, checkUserRole, roomController.viewRoom);
router.post("/join", restrict, roomController.joinRoom);
router.post("/fight/:roomId", restrict, roomController.fightRoom);

module.exports = router;
