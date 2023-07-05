import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FETCH_POSTS,
} from "./types";

// Fetch all posts from the server
export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3500/post/getAllPosts"); // Replace with your API endpoint
    console.log(res.data);

    dispatch({
      type: FETCH_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Add a new post
export const addPost = (post) => async (dispatch) => {
  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:3500/post/CreatePost",
      post,
      config
    ); // Replace with your API endpoint
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Delete a post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`); // Replace with your API endpoint
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Edit a post
export const editPost = (postId, updatedPost) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postId}`, updatedPost); // Replace with your API endpoint
    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Add a comment to a post
export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${postId}/comments`, comment); // Replace with your API endpoint
    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comment: res.data },
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Delete a comment from a post
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`); // Replace with your API endpoint
    dispatch({
      type: DELETE_COMMENT,
      payload: { postId, commentId },
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Edit a comment on a post
export const editComment =
  (postId, commentId, updatedComment) => async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/posts/${postId}/comments/${commentId}`,
        updatedComment
      ); // Replace with your API endpoint
      dispatch({
        type: EDIT_COMMENT,
        payload: { postId, comment: res.data },
      });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };
