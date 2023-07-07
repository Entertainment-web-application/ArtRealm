import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../actions/postActions";
import Comments from "./Comments";
import { FaTrash, FaEdit, FaClock } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// import { post } from "../../../back-end/routes/posts";

const Posts = ({ posts, fetchPosts, deletePost, editPost }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = (postId) => {
    deletePost(postId);
  };
  const handleEdit = (postId) => {
    editPost(postId, formData);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1165/1165821.png"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.author}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:bg-red-600 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={handleOpen}
                      className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FaClock className="mr-1" />
                  <span>{formatDate(post.timestamp)}</span>
                </div>
                <div className="p-4">
                  <h5
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={{ overflowWrap: "break-word", maxHeight: "none" }}
                  >
                    {post.title}
                  </h5>
                  <p
                    className="text-base text-gray-700 leading-snug mb-4 "
                    style={{ overflowWrap: "break-word", maxHeight: "none" }}
                  >
                    {post.description}
                  </p>
                </div>
              </div>
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Edit your post</DialogHeader>
                <DialogBody divider>
                  <label htmlFor="title" className="text-gray-800">
                    Title
                  </label>
                  <input
                    name="title"
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="description" className="text-gray-800">
                    Description
                  </label>
                  <input
                    name="description"
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    color="green"
                    onClick={() => {
                      handleEdit(post.id);
                      handleOpen();
                    }}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              <Comments postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPosts, deletePost, editPost })(
  Posts
);
