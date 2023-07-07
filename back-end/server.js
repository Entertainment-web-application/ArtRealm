require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const PaintingsRoutes = require("./routes/paintingsRoutes");
const adminRoutes = require("./routes/adminRoutes"); // --FA

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
app.use("/post", require("./routes/posts"));
app.use("/users", userRoutes);
app.use("/Paintings", PaintingsRoutes);
app.use("/api", require("./routes/others"));
app.use("/admin", adminRoutes); // Added -- FA

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
