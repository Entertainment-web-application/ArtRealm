import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EditButton from "../Components/EditButton";
export default function ProfilePage() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [user, setUser] = useState([]);
  const [userAllDonatedPosts, setUserAllDonatedPosts] = useState([]);
  const [userAllDonatedPostsF, setUserAllDonatedPostsF] = useState([]);
  const fetchData = async () => {
    try {
      // const token = localStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
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
      // const token = localStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.k0-WFGcVaQZdbpYvBepM_44tMqHmqzXPWO6f7QFdmXk";
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
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://img.freepik.com/free-photo/multi-colored-abstract-painting-with-bright-blue-yellow-generative-ai_188544-9474.jpg?size=626&ext=jpg&ga=GA1.2.1283963378.1677416044&semt=ais")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mt-5">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {userName}{" "}
                    </h3>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-inbox mr-2 text-lg text-blueGray-400" />
                    {email}
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <EditButton />
                  </div>

                  <div className="w-full max-w-md mx-auto mt-8">
                    <>
                      <h2 className="text-2xl font-bold text-gray-800">
                        My Posts
                      </h2>

                      {userAllDonatedPosts?.map((Post) => {
                        return (
                          <div className="flex flex-row flex-wrap   rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start ">
                            <div className="sm:ml-4 sm:flex sm:w-full mt-5 ">
                              <div className="flex flex-wrap gap-5 flex-column items-center">
                                <div className="justify-start">
                                  <p className="text-lg my-5">
                                    <span className="font-bold">
                                      beneficiary :{" "}
                                    </span>{" "}
                                    {Post.Name}{" "}
                                  </p>
                                  <p className="text-lg my-5">
                                    <span className="font-bold">
                                      {" "}
                                      The amount needed :{" "}
                                    </span>
                                    {Post.price}
                                  </p>
                                  <p className="text-lg my-5">
                                    {" "}
                                    <span className="text-md font-bold">
                                      {" "}
                                      My Donation :{" "}
                                    </span>
                                    {Post.currentDonation}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                              <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    <span
                                      className="font-bold"
                                      style={{ color: "#219d80" }}
                                    >
                                      GIVE LIFE
                                    </span>{" "}
                                    THANK YOU FOR YOUR DONATION
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          id="edit-portal"
          className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50   rounded-lg p-6"
        ></div>
      </main>
    </>
  );
}
