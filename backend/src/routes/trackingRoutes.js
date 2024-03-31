const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/trackingController");
const { auth } = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");
const { createValidation } = require("../validators/trackingValidation");

router.get("/", auth, trackingController.get);
router.post(
  "/create",
  auth,
  validate(createValidation),
  trackingController.create
);
router.delete("/delete", auth, trackingController.delete);

module.exports = router;
