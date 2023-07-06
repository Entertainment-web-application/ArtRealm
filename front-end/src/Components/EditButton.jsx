import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
const EditButton = ({ onEdit }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleEditClick = () => {
    setShowForm(true);
    setName(""); // Set initial values for name and email
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
        console.log(response.data.user.email);
        let id = response.data.user.id;
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${id}`
          );
          console.log(response.data);
          console.log(
            "tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"
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
    } finally {
      console.log(false);
    }
  };

  useEffect(() => {
    if (localStorage.auth != null) {
      fetchProtectedData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, userId);
    axios
      .put(`http://localhost:5000/api/users/${userId}`, {
        firstName: name,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        // navigate("/ProfilePage")
        window.location.href = "http://localhost:3000/ProfilePage";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (showForm) {
    return ReactDOM.createPortal(
      <div className="edit-form">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
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
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleFormCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>,
      document.getElementById("edit-portal") // Add a div with this ID in your root HTML file
    );
  }

  return <button onClick={handleEditClick}>Edit</button>;
};

export default EditButton;
