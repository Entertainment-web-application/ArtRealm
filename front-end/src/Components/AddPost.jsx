import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
import { UpdateContext } from "../App";

const AddPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { update, setUpdate } = useContext(UpdateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addPost({ title, description });

      setUpdate(!update);

      setTitle("");
      setDescription("");
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
