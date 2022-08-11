const express = require("express");
const router = express.Router();
const GameController = require("../controllers/gameController");
const gameController = new GameController();
const restrict = require("../middlewares/restrict");

router.post("/create", restrict, gameController.createRoom);
router.post("/join", restrict, gameController.joinRoom);
router.post("/fight", restrict, gameController.fightRoom);

module.exports = router;
