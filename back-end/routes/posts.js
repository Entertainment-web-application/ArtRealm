const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");
const verifyJWT = require("../middleware/verifyJWT");
router.post("/CreatePost", verifyJWT, postsController.addNewPost);
router.get("/getAllPosts", postsController.getAllPosts);
router.delete("/deletePost/:postId", verifyJWT, postsController.deletePost);
router.put("/editPost/:postId", verifyJWT, postsController.editPost);
router.post(
  "/addComment/:postId/comments",
  verifyJWT,
  postsController.addNewComment
);
router.get("/getAllComments", postsController.getAllComments);
router.delete(
  "/deleteComment/:postId/comments/:commentId",
  verifyJWT,
  postsController.deleteComment
);
router.put(
  "/:postId/comments/:commentId",
  verifyJWT,
  postsController.editComment
);
router.get("/getUserPosts", verifyJWT, postsController.getUserPosts);
module.exports = router;
