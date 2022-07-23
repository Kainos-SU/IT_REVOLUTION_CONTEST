const express = require("express");
const router = express.Router();
const controller = require("../controllers/tree");
const pasport = require("passport"); // pasport jwt auth
const upload = require("../middleware/upload"); // handler img

router.get("/location", controller.location);

router.get("/:paramID", controller.infotree);

router.post(
  "/",
  // pasport.authenticate("jwt", { session: false }),
  upload.single("imgSrc"),
  controller.create
);

router.patch(
  "/",
  // pasport.authenticate("jwt", { session: false }),
  upload.single("imgSrc"),
  controller.updating
);

router.delete(
  "/",
  // pasport.authenticate("jwt", { session: false }),
  controller.delete
);

module.exports = router;
