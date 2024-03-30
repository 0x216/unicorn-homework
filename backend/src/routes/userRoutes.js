const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middleware/validateMiddleware");
const { auth } = require("../middleware/authMiddleware");
const { isSuperuser } = require("../middleware/isSuperUserMiddleware");
const {
  registerValidation,
  loginValidation,
  updateValidation,
} = require("../validators/userValidation");

router.post("/login", validate(loginValidation), userController.login);
router.post("/register", validate(registerValidation), userController.register);
router.put("/update", validate(updateValidation), auth, userController.update);
router.delete("/delete/:id", auth, isSuperuser, userController.delete);

router.get("/me", auth, userController.getMe);

module.exports = router;
