const express = require("express");
const router = express.Router();
const UserApiController = require("../controllers/userApiController");
const userApiController = new UserApiController();

/* Register new user. */
router.post("/register", userApiController.createUserGame);

module.exports = router;
