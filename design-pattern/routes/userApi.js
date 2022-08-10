const express = require("express");
const router = express.Router();
const UserApiController = require("../controllers/userApiController");
const userApiController = new UserApiController();
const restrict = require("../middlewares/restrict");
const checkUserRole = require("../middlewares/userRole");

router.post("/register", userApiController.userRegister);
router.post("/login", /*userApiController.login,*/ userApiController.userLogin);
router.post("/logout", userApiController.userLogout);
router.get("/", restrict, checkUserRole, userApiController.getAllUsers);

module.exports = router;
