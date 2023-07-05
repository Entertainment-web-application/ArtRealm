import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../actions/postActions";
import Comments from "./Comments";
// import { post } from "../../../back-end/routes/posts";

const Posts = ({ posts, fetchPosts, deletePost }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = (postId) => {
    deletePost(postId);
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
          <Comments postId={post.id} comments={post.comments} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(Posts);
