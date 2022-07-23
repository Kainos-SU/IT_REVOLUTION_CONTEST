const express = require("express");
const router = express.Router();
const controller = require("../controllers/tree");
const pasport = require("passport"); // pasport jwt auth
const upload = require("../middleware/upload"); // handler img

router.get("/location", controller.location);

router.get("/:paramID", controller.infotree);

router.post(
  "/create",
  pasport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.create
);

router.patch(
  "/updating",
  pasport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.updating
);

router.delete(
  "/delete",
  pasport.authenticate("jwt", { session: false }),
  controller.delete
);

module.exports = router;
