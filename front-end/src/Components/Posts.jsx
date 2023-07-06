import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../actions/postActions";
import Comments from "./Comments";
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
  return (
    <div className="my-4">
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded border-gray-300">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="mb-4">{post.description}</p>
          <button
            onClick={() => handleDelete(post.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <>
            <Button onClick={handleOpen} variant="gradient">
              Edit
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Its a simple dialog.</DialogHeader>
              <DialogBody divider>
                <label htmlFor="">Title</label>
                <input name="title" onChange={handleChange} type="text" />
                <label htmlFor="">Description</label>
                <input name="description" onChange={handleChange} type="text" />
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
                  variant="gradient"
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
          </>
          <Comments postId={post.id} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPosts, deletePost, editPost })(
  Posts
);
