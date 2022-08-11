const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authController = new AuthController();

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.post("/logout", authController.userLogout);

module.exports = router;
