import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
  fetchComments,
} from "../actions/postActions";

const Comments = ({
  comments,
  postId,
  addComment,
  editComment,
  fetchComments,
  deleteComment,
}) => {
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  const handleAddComment = () => {
    if (comment) {
      addComment(postId, { comment: comment });
      setComment("");
    }
  };
  console.log(comment);
  const handleDeleteComment = (commentId) => {
    deleteComment(postId, commentId);
  };

  const handleEditComment = (commentId, comment) => {
    setEditCommentId(commentId);
    setEditCommentText(comment);
  };

  const handleSaveComment = () => {
    if (editCommentId && editCommentText) {
      editComment(postId, editCommentId, { comment: editCommentText });
      setEditCommentId(null);
      setEditCommentText("");
    }
  };
  console.log(comments);
  return (
    <div className="my-4">
      <h4 className="text-lg font-bold mb-2">Comments</h4>
      {comments.map((comment) => (
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

const mapStateToProps = (state) => ({
  comments: state.posts.comments || [], // Access the comments property correctly
});
(state) => state.bank;
export default connect(mapStateToProps, {
  fetchComments,
  addComment,
  deleteComment,
  editComment,
})(Comments);
