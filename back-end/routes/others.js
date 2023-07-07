const express = require("express");
const router = express.Router();
const Controller = require("../controller/others");
const userController = require("../controller/userController");
const verifyJWT = require("../middleware/verifyJWT");
router.get("/aboutus", Controller.getAboutUs);
router.put("/sendFeedBack", Controller.sendContact);
router.get("/userData", verifyJWT, userController.getUserData);

module.exports = router;
