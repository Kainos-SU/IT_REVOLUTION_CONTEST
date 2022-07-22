const express = require("express");
const controller = require("../controllers/auth");
const router = express.Router();
const pasport = require("passport");

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post(
  "/logout",
  pasport.authenticate("jwt", { session: false }),
  controller.logout
); // Delete in DB token

module.exports = router;
