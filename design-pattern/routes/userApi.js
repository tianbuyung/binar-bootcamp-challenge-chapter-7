const express = require("express");
const router = express.Router();
const UserApiController = require("../controllers/userApiController");
const userApiController = new UserApiController();
const passport = require("../lib/passport");

/* Register new user. */
router.post("/register", userApiController.userRegister);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
