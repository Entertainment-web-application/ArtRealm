import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
  fetchComments,
} from "../actions/postActions";
import { UpdateContext } from "../App";

const Comments = ({ postId }) => {
  const comments = useSelector((state) => state.posts.comments || []);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const { update, setUpdate } = useContext(UpdateContext);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId, update]);

  const handleAddComment = () => {
    if (comment) {
      dispatch(addComment(postId, { comment: comment }));
      setUpdate(!update);
      setComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(postId, commentId));
    setUpdate(!update);
  };

  const handleEditComment = (commentId, comment) => {
    setEditCommentId(commentId);
    setEditCommentText(comment);
  };

  const handleSaveComment = () => {
    if (editCommentId && editCommentText) {
      dispatch(
        editComment(postId, editCommentId, { comment: editCommentText })
      );
      setEditCommentId(null);
      setUpdate(!update);

      setEditCommentText("");
    }
  };

  // Filter comments based on postId
  const filteredComments = comments.filter(
    (comment) => comment.post_id === postId
  );
  console.log(filteredComments);

  return (
    <div className="my-4">
      <h4 className="text-lg font-bold mb-2">Comments</h4>
      {filteredComments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src={comment.avatar}
              alt="Profile Avatar"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="mr-2">{comment.name}</span>
            <span>{comment.time}</span>
          </div>
          {editCommentId === comment.id ? (
            <div className="mb-2">
              <input
                type="text"
                value={editCommentText}
                name="comment"
                onChange={(e) => setEditCommentText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleSaveComment}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center mb-2">
              <p className="mr-2">{comment.comment}</p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="px-2 py-1 bg-red-500 text-white rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditComment(comment.id, comment.text)}
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
