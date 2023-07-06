const pool = require("../db");

const addNewPost = async (req, res) => {
  const userId = req.user_id;
  const { title, description } = req.body;

  try {
    const client = await pool.connect();

    const query =
      "INSERT INTO post (user_id, title, description) VALUES ($1, $2, $3)";
    const values = [userId, title, description];

    await client.query(query, values);

    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const client = await pool.connect();

    const query = "SELECT * FROM post";

    const result = await client.query(query);
    const allPosts = result.rows;

    res.status(200).json(allPosts);
    console.log(allPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user_id;

  try {
    const client = await pool.connect();

    // Delete the comments associated with the post
    await client.query("DELETE FROM comments WHERE post_id = $1", [postId]);

    // Delete the post based on postId and userId
    await client.query("DELETE FROM post WHERE id = $1 AND user_id = $2", [
      postId,
      userId,
    ]);

    res.status(200).json({ message: "Post deleted successfully" });
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
    const client = await pool.connect();

    // Update the post based on postId and userId
    await client.query(
      "UPDATE post SET title = $1, description = $2 WHERE id = $3 AND user_id = $4",
      [title, description, postId, userId]
    );

    res.status(200).json({ message: "Post updated successfully" });
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
    const client = await pool.connect();

    const query =
      "INSERT INTO comments (post_id, comment, user_id) VALUES ($1, $2, $3)";
    const values = [postId, comment, userId];

    await client.query(query, values);

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllComments = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  // Check if postId is not undefined
  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const client = await pool.connect();

    const query = "SELECT * FROM comments WHERE post_id = $1";
    const values = [postId];

    const result = await client.query(query, values);
    const allComments = result.rows;

    client.release();

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
    const client = await pool.connect();

    // Delete the comment based on postId, commentId, and userId
    await client.query(
      "DELETE FROM comments WHERE post_id = $1 AND id = $2 AND user_id = $3",
      [postId, commentId, userId]
    );

    res.status(200).json({ message: "Comment deleted successfully" });
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
    const client = await pool.connect();

    // Update the comment based on postId, commentId, and userId
    await client.query(
      "UPDATE comments SET comment = $1 WHERE post_id = $2 AND id = $3 AND user_id = $4",
      [comment, postId, commentId, userId]
    );

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update comment" });
  }
};
const getUserPosts = async (req, res) => {
  const userId = req.user_id;
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM post WHERE user_id = $1";
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      // User posts found
      res.status(200).json(result.rows);
    } else {
      // User has no posts
      res.status(404).json({ error: "User has no posts" });
    }

    client.release();
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
