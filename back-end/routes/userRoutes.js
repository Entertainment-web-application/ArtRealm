const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validInfo = require("../utils/UservalidInfo");

router.post("/signup", validInfo, userController.signup);
router.post("/login", validInfo, userController.login);

module.exports = router;
