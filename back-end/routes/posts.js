const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");
const verifyJWT = require("../middleware/verifyJWT");
router.post("/CreatePost", verifyJWT, postsController.addNewPost);
router.get("/getAllPosts", postsController.getAllPosts);

module.exports = router;
