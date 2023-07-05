import {
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    FETCH_POSTS
  } from '../actions/types';
  
  const initialState = {
    posts: []
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return {
          ...state,
          posts: action.payload
        };
      case ADD_POST:
        return {
          ...state,
          posts: [...state.posts, action.payload]
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post.id !== action.payload)
        };
      case EDIT_POST:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          )
        };
      case ADD_COMMENT:
      case DELETE_COMMENT:
      case EDIT_COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                comments: commentReducer(post.comments, action)
              };
            }
            return post;
          })
        };
      default:
        return state;
    }
  };
  
  const commentReducer = (state = [], action) => {
    switch (action.type) {
      case ADD_COMMENT:
        return [...state, action.payload.comment];
      case DELETE_COMMENT:
        return state.filter((comment) => comment.id !== action.payload.commentId);
      case EDIT_COMMENT:
        return state.map((comment) =>
          comment.id === action.payload.comment.id ? action.payload.comment : comment
        );
      default:
        return state;
    }
  };
  
  export default postReducer;
  