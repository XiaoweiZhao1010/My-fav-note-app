const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const pool = require("./db"); // Import the database connection pool
const authRoutes = require("./authRoutes"); // Import your auth routes
const noteRoutes = require("./noteRoutes"); // Import your note routes

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));
app.use(cors());
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.path}`);
  next();
});
app.use(express.json()); // Allows JSON in requests

app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/notes", noteRoutes); // Use the note routes

app.get("/", (req, res) => {
  res.send("Hello from your Note App backend!");
});
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("App started");
