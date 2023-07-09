const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validInfo = require("../utils/UservalidInfo");

router.post("/signup", validInfo, userController.signup);
router.post("/login", validInfo, userController.login);
router.put("/users/:id",  userController.editUser);

module.exports = router;
