const pool = require("../db");

const addNewPost = async (req, res) => {
  const { user_id, body } = req;
  const { title, description } = body;

  try {
    const query =
      "INSERT INTO post (user_id, title, description) VALUES ($1, $2, $3) RETURNING *";
    const values = [user_id, title, description];

    const result = await pool.query(query, values);
    const newPost = result.rows[0];

    res.status(200).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getAllPosts = async (req, res) => {
  try {
    const query = "SELECT * FROM post";
    const result = await pool.query(query);
    const allPosts = result.rows;
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user_id;

  try {
    // Delete the comments associated with the post
    await pool.query("DELETE FROM comments WHERE post_id = $1", [postId]);

    // Delete the post based on postId and userId
    await pool.query("DELETE FROM post WHERE id = $1 AND user_id = $2", [
      postId,
      userId,
    ]);

    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

const editPost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user_id;

  const { title, description } = req.body;
  try {
    // Update the post based on postId and userId
    const result = await pool.query(
      "UPDATE post SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, postId, userId]
    );

    // Check if any rows were affected by the update
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    const updatedPost = result.rows[0];

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

const addNewComment = async (req, res) => {
  const userId = req.user_id;
  const postId = req.params.postId;
  const { comment } = req.body;

  try {
    const query =
      "INSERT INTO comments (post_id, comment, user_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [postId, comment, userId];

    const result = await pool.query(query, values);
    const addedComment = result.rows[0];

    res
      .status(200)
      .json({ message: "Comment added successfully", comment: addedComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllComments = async (req, res) => {
  try {
    const query = "SELECT * FROM comments";
    const result = await pool.query(query);
    const allComments = result.rows;
    res.status(200).json(allComments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.user_id;

  try {
    await pool.query(
      "DELETE FROM comments WHERE post_id = $1 AND id = $2 AND user_id = $3",
      [postId, commentId, userId]
    );

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

const editComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.user_id;

  const { comment } = req.body;
  try {
    // Update the comment based on postId, commentId, and userId
    const result = await pool.query(
      "UPDATE comments SET comment = $1 WHERE post_id = $2 AND id = $3 AND user_id = $4",
      [comment, postId, commentId, userId]
    );
    const updatedComment = result.rows[0];

    res
      .status(200)
      .json({
        message: "Comment updated successfully",
        comment: updatedComment,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update comment" });
  }
};
const getUserPosts = async (req, res) => {
  const userId = req.user_id;
  try {
    const query = "SELECT * FROM post WHERE user_id = $1";
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      // User posts found
      res.status(200).json(result.rows);
    } else {
      // User has no posts
      res.status(404).json({ error: "User has no posts" });
    }
  } catch (error) {
    // Error occurred while querying the database
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addNewPost,
  getAllPosts,
  deletePost,
  editPost,
  addNewComment,
  getAllComments,
  deleteComment,
  editComment,
  getUserPosts,
};
