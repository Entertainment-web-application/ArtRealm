import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../actions/postActions";
import Comments from "./Comments";
import { FaTrash, FaEdit, FaHeart, FaRegHeart, FaClock } from "react-icons/fa";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UpdateContext } from "../App";
import jwtDecode from "jwt-decode";

const Posts = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editedPostId, setEditedPostId] = useState(null);
  const { update, setUpdate } = useContext(UpdateContext);
  const { deleted, setDeleted } = useContext(UpdateContext);
  const [userId, setUserId] = useState();
  const [likes, setLikes] = useState([]);
  const [username, setUserName] = useState();
  const [totalLikes, setTotalLikes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to extract user information
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserId(decodedToken.user_id);
        setUserName(decodedToken.user_name);
      }
    }
  }, []);
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

  const handleLike = async (postId, userId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (likes.includes(postId)) {
        // User has already liked the post, so remove the like
        await axios.delete(
          `http://localhost:3500/post/${postId}/removelike`,
          config
        );
        setRefresh(!refresh);
        setLikes(likes.filter((id) => id !== postId));
      } else {
        // User has not liked the post, so add the like
        await axios.post(
          `http://localhost:3500/post/${postId}/addlike`,
          null,
          config
        );
        setRefresh(!refresh);

        setLikes([...likes, postId]);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error condition if necessary
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:3500/post/getLikes`,
          config
        );

        const likesData = response.data;

        // Check if the user has liked each post and update the state accordingly
        const likedPosts = likesData.map((like) => like.post_id);
        setLikes(likedPosts);
      } catch (error) {
        console.error("Error retrieving likes:", error);
      }
    };

    fetchLikes();
  }, []); // Empty dependency array to run the effect only once
  useEffect(() => {
    const fetchAllLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/post/getalllikes`
        );

        const likesData = response.data;
        setTotalLikes(likesData);
      } catch (error) {
        console.error("Error retrieving likes:", error);
      }
    };

    fetchAllLikes();
  }, [refresh]); // Empty dependency array to run the effect only once
  const posts = useSelector((state) => state.posts.posts);

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
                      {post.username}
                    </h3>
                  </div>
                  {post.user_id === userId && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:bg-red-600 focus:outline-none"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleOpen(post.id)}
                        className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FaClock className="mr-1" />
                  <span>{formatDate(post.timestamp)}</span>
                </div>
                <div className="p-4">
                  <h5 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h5>
                  <p className="text-base text-gray-700 leading-snug mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500 focus:text-red-500 focus:outline-none"
                    >
                      {likes.includes(post.id) ? (
                        <FaHeart className="w-4 h-4" />
                      ) : (
                        <FaRegHeart className="w-4 h-4" />
                      )}
                      <span>{likes.includes(post.id) ? "Liked" : "Like"}</span>
                    </button>

                    <small className="text-gray-500">
                      (
                      {totalLikes.find((like) => like.post_id === post.id)
                        ?.total_likes || 0}
                      )
                    </small>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300 my-4" />
              <style>
                {`
    .scrollbar-container::-webkit-scrollbar {
      width: 8px;
    }
    .scrollbar-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 8px;
    }
    .scrollbar-container::-webkit-scrollbar-thumb {
      background: #a0aec0;
      border-radius: 8px;
    }
    .scrollbar-container::-webkit-scrollbar-thumb:hover {
      background: #718096;
    }
  `}
              </style>

              <div
                className="max-h-20 overflow-y-auto scrollbar-container"
                style={{ maxHeight: "20rem", scrollbarWidth: "thin" }}
              >
                <Comments postId={post.id} userId={userId} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;





