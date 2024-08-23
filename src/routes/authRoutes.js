const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/register", userController.addUser);

module.exports = router;
