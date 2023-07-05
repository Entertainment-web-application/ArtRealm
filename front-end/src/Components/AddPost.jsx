import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

const AddPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      addPost({ title, body });
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold">Add Post</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { addPost })(AddPost);
