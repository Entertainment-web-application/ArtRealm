const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard");
const userController = require("../controller/userController");
const verifyJWT = require("../middleware/verifyJWT");
router.get("/aboutus", dashboardController.getAboutUs);
router.put("/contactus", verifyJWT, dashboardController.sendContact);
router.get("/userData", verifyJWT, userController.getUserData);

module.exports = router;
