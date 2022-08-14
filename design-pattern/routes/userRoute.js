const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const userController = new UserController();
const restrict = require("../middlewares/restrict");
const checkUserRole = require("../middlewares/userRole");

router.get("/", restrict, checkUserRole, userController.getAllUsers);
router.get("/:username", restrict, userController.getDetailUser);

module.exports = router;
