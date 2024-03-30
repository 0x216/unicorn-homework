const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");
const { isSuperuser } = require("../middleware/isSuperUserMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/update/:id", auth, isSuperuser, userController.update);
router.delete("/delete/:id", auth, isSuperuser, userController.delete);

router.get("/me", auth, userController.getMe);

module.exports = router;
