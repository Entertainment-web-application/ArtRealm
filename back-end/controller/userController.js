const pool = require("../db");
const { jwtGenerator } = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists. Please log in.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const token = jwtGenerator(newUser.rows[0]);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or password is incorrect");
    }

    const user_info = user.rows[0];

    const token = jwtGenerator(user_info);
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
const getUserData = async (req, res) => {
  const userId = req.user_id;
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM users WHERE id = $1 ";
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      // User data found
      res.status(200).json(result.rows[0]);
    } else {
      // User not found
      res.status(404).json({ error: "User not found" });
    }

    client.release();
  } catch (error) {
    // Error occurred while querying the database
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    
    const client = await pool.connect();
    const query = "SELECT * FROM users";
  
    const result = await client.query(query);

    if (result.rows.length > 0) {
      // Users found
      res.status(200).json(result.rows);
    } else {
      // No users found
      res.status(404).json({ error: "No users found" });
    }

    client.release();
  } catch (error) {
    // Error occurred while querying the database
    res.status(500).json({ error: "Internal server error" });
  }
};



const editUser = async (req, res) => {
  const userId = req.params.id;
  const { user_name, user_email } = req.body;

  try {
    // Update the user's name and email in the database
    
    const query = 'UPDATE public.users SET user_name = $1, user_email = $2 WHERE id = $3';
    await pool.query(query, [user_name, user_email, userId]);

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Error updating user details:', err);
    res.status(500).json({ error: 'An error occurred while updating user details' });
  }
};



module.exports = {
  login,
  signup,
  getUserData,
  getAllUsers,
  editUser,
};
