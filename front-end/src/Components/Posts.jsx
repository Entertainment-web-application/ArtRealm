import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../actions/postActions";
import Comments from "./Comments";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UpdateContext } from "../App";

const Posts = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editedPostId, setEditedPostId] = useState(null);
  const { update, setUpdate } = useContext(UpdateContext);
  const { deleted, setDeleted } = useContext(UpdateContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = (postId) => {
    setFormData(posts.find((post) => post.id === postId)); // Set the form data to the current post being edited
    setEditedPostId(postId);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, update, deleted]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    setUpdate(!update);
  };

  const handleEdit = (postId) => {
    dispatch(editPost(postId, formData));
    setOpen(false);
    setUpdate(!update);
  };

  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="my-4">
      {posts &&
        posts.map((post, index) => (
          <div key={index} className="mb-4 p-4 border rounded border-gray-300">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="mb-4">{post.description}</p>
            <button
              onClick={() => handleDelete(post.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
            <>
              <Button onClick={() => handleOpen(post.id)} variant="gradient">
                Edit
              </Button>
              <Dialog
                open={open && editedPostId === post.id}
                handler={() => setOpen(false)}
              >
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody divider>
                  <label htmlFor="">Title</label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    type="text"
                  />
                  <label htmlFor="">Description</label>
                  <input
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    type="text"
                  />
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => setOpen(false)}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={() => handleEdit(post.id)}
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

export default Posts;
