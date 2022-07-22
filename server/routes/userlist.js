const express = require("express");
const pasport = require("passport");
const controller = require("../controllers/userlist");
const router = express.Router();

router.get(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.getByUserList
);

router.get(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.getByUserId
);

router.delete(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.userDelete
);

module.exports = router;
