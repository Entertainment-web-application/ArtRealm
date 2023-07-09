import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";


const EditButton = ({ onEdit }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  
  const [userData, setUserData] = useState(null);

  const handleEditClick = () => {
    setShowForm(true);
    setName("");
    setEmail("");
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (token) {
        const response = await axios.get("http://localhost:5000/protected", {
          headers: {
            Authorization: token,
          },
        });

        setUserId(response.data.user.id);
        let id = response.data.user.id;
        try {
          const response = await axios.get(
            `http://localhost:3500/api/users/${userId}`
          );
          
          setUserData(response.data[0]);
          setName(response.data[0].firstName);
          setEmail(response.data[0].email);
        } catch (error) {
          console.error("Error retrieving data:", error);
        }
      }


     


   
    } catch (error) {
      console.error(error);
      
      localStorage.removeItem("auth");
      window.location.href = "http://localhost:3000/Login";
    }
  };

  useEffect(() => {
    if (localStorage.auth != null) {
      fetchProtectedData();
    }
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to extract user information
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserId(decodedToken.user_id);
        console.log(userId)
      
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, userId);
    axios
      .put(`http://localhost:3500/users/${userId}`, {
        user_name: name,
        user_email: email,
      })
      .then(function (response) {
        console.log(response);
        
        window.location.href = "http://localhost:3000/ProfilePage";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (showForm) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div
          className="bg-white max-w-md mx-auto rounded shadow-lg"
          style={{ width: "30rem", height: "20rem" }}
        >
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-[3rem]">
              <label htmlFor="name" className="block text-gray-700">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleFormCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("edit-portal")
    );
  }

  return (
    <button
      onClick={handleEditClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Edit
    </button>
  );
};

export default EditButton;
