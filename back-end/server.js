require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const pool = require("./db");
pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
