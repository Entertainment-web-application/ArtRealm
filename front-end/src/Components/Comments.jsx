import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment, deleteComment, editComment } from "../actions/postActions";

const Comments = ({
  postId,
  comments,
  addComment,
  deleteComment,
  editComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText) {
      addComment(postId, { text: commentText });
      setCommentText("");
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(postId, commentId);
  };

  const handleEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleSaveComment = () => {
    if (editCommentId && editCommentText) {
      editComment(postId, editCommentId, { text: editCommentText });
      setEditCommentId(null);
      setEditCommentText("");
    }
  };

  return (
    <div className="my-4">
      <h4 className="text-lg font-bold mb-2">Comments</h4>
      {comments?.map((comment) => (
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
              <p className="mr-2">{comment.text}</p>
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
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

export default connect(null, { addComment, deleteComment, editComment })(
  Comments
);
