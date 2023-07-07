const pool = require("../db");
require("dotenv").config();

const getAboutUs = async (req, res) => {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute the SQL query to retrieve data from the "aboutus" table
    const query = "SELECT * FROM aboutus";
    const result = await client.query(query);

    // Retrieve the rows from the result
    const aboutUsData = result.rows;

    // Release the database connection
    client.release();

    // Send the retrieved data as a response
    res.status(200).json(aboutUsData);
  } catch (error) {
    console.error("Error retrieving about us data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const sendContact = async (req, res) => {
  const { name, email, message, phone } = req.body;
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute the SQL query to insert the contact data into the "contactus" table
    const query =
      "INSERT INTO users_feedback ( user_name , user_email , message, user_phone ) VALUES ($1, $2, $3, $4)";
    const values = [name, email, message, phone];
    await client.query(query, values);

    // Release the database connection
    client.release();

    res.status(200).json({ message: "Contact data sent successfully" });
  } catch (error) {
    console.error("Error sending contact data:", error);
    res.status(500).json({ message: "Failed to send contact data" });
  }
};
module.exports = { getAboutUs, sendContact };
