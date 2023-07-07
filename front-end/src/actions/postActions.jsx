import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FETCH_POSTS,
  FETCH_COMMENTS,
} from "./types";

// Fetch all posts from the server
export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3500/post/getAllPosts"); // Replace with your API endpoint
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
      payload: res.data.post,
    });
  } catch (err) {
    console.error(err);
    // Handle error
  }
};

// Delete a post
export const deletePost = (postId) => async (dispatch) => {
  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(
      `http://localhost:3500/post/deletePost/${postId}`,
      config
    ); // Replace with your API endpoint
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
export const editPost = (postId, formData) => async (dispatch) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(
      `http://localhost:3500/post/editPost/${postId}`,
      formData,
      config
    );
    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Add a comment to a post
export const addComment = (postId, comment) => async (dispatch) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(
      `http://localhost:3500/post/addComment/${postId}/comments`,
      comment,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.comment,
    });
    // dispatch({
    //   type: ADD_COMMENT,
    //   payload: { postId, comment: res.data },
    // });
  } catch (err) {
    console.error(err);
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3500/post/getAllComments`);
    const comments = res.data;
    dispatch({
      type: FETCH_COMMENTS,
      payload: comments,
    });
  } catch (err) {
    console.error(err);
  }
};

// Delete a comment from a post
export const deleteComment = (postId, commentId) => async (dispatch) => {
  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(
      `http://localhost:3500/post/deleteComment/${postId}/comments/${commentId}`,
      config
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    console.error(err);
  }
};

// Edit a comment on a post
export const editComment =
  (postId, commentId, updatedComment) => async (dispatch) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:3500/post/${postId}/comments/${commentId}`,
        updatedComment,
        config
      ); // Replace with your API endpoint
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data.comment,
      });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };
