const express = require("express");
const router = express.Router();
const UserApiController = require("../controllers/userApiController");
const userApiController = new UserApiController();
const restrict = require("../middlewares/restrict");
const checkUserRole = require("../middlewares/userRole");

router.get("/", restrict, checkUserRole, userApiController.getAllUsers);

module.exports = router;
