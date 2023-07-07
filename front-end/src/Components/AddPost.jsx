import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
import {Link} from 'react-router-dom'

const AddPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addPost({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=600")',
          height: "400px",
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>

            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" style={{ color: "#219D80" }}>
                    Home
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li>About Us</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="w-[30rem]">
          <div className="my-4 ">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">
              Add Post
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Body:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addPost })(AddPost);
