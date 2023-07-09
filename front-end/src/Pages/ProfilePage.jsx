import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EditButton from "../Components/EditButton";
export default function ProfilePage() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [userAllPosts, setuserAllPosts] = useState([]);
 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:3500/api/userData",
        config
      );
      console.log(response.data);
      setUserName(response.data.user_name);
      setEmail(response.data.user_email);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:3500/post/getUserPosts",
        config
      );
      console.log(response.data);
      setuserAllPosts(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPosts();
  }, []);
  return (
    <>
      <div id="edit-portal"></div>
      <div className="h-screen bg-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 ms:1/3">
            {/* Left side content */}
            <div className="h-screen bg-gray-200 pt-8">
              <div>
                <div className="w-full ms-8 mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                      <img
                        className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                        src="https://cdn-icons-png.flaticon.com/512/1165/1165821.png"
                        alt=""
                      />
                      <div className="py-2">
                        <h3 className="font-bold text-2xl mb-1">{userName}</h3>
                      </div>
                    </div>
                    <div className="flex gap-2 px-2 justify-center">
                      <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
                        <EditButton className="text-white py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-4 w-full">
                    <div className="flex gap-2 items-center text-gray-800r mb-4">
                      <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
                        <div className="border-t border-gray-200">
                          <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Full name
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userName}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Email address
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {email}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            {/* Right side content */}
            <div className="w-full max-w-md mx-auto mt-8">
              <div className="flex border-b border-gray-300"></div>
              <div id="tab1" className="tabcontent p-4">
                <h2 className="text-lg font-bold text-gray-800">User Post</h2>
                <div
                  className="mt-2 text-gray-700 overflow-y-auto"
                  style={{ height: "31rem" }}
                >
                  {userAllPosts.length > 0 ? (
                    userAllPosts.map((post, index) => (
                      <div className="mt-2 text-gray-700" key={index}>
                        <div className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex">
                          <div>
                            <p className="font-bold">{post.title}</p>
                            <p className="mt-2 text-gray-600 text-sm">
                              {post.description}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:ml-4">
                            <p className="font-bold text-gray-600">
                              Likes: {post.likes}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Post for {userName}.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
