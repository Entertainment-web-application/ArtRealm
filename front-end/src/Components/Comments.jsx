import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
  fetchComments,
} from "../actions/postActions";
import { UpdateContext } from "../App";
import { FaTrash, FaEdit, FaClock } from "react-icons/fa";

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
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${year}-${month}-${day}`;
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

  return (
    <div className="my-4">
      <h4 className="text-lg font-bold mb-2 pl-4">Comments</h4>
      {filteredComments.map((comment) => (
        <div
          key={comment.id}
          className="mb-4 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1165/1165821.png"
              alt="Profile Avatar"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="mr-2">{comment.name}</span>
            <div className="flex items-center text-sm text-gray-600">
              <FaClock className="mr-1" />
              <span>{formatDate(comment.timestamp)}</span>
            </div>
          </div>
          {editCommentId === comment.id ? (
            <div className="flex items-center mb-2 p-5">
              <input
                type="text"
                value={editCommentText}
                name="comment"
                onChange={(e) => setEditCommentText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full mr-2"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => handleEditComment(comment.id, comment.text)}
                className="flex items-center justify-center w-6 h-6 bg-gray-500 text-white rounded-full"
              >
                <FaEdit />
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="mt-4 flex p-5">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your comment"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:bg-green-600 focus:outline-none"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
