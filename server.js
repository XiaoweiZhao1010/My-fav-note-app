const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const pool = require("./note-app-backend/db"); // Import the database connection pool
const authRoutes = require("./note-app-backend/routes/authRoutes"); // Import your auth routes
const noteRoutes = require("./note-app-backend/routes/noteRoutes"); // Import your note routes

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
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/notes", noteRoutes); // Use the note routes

app.get("/", (req, res) => {
  res.send("Hello from your Note App backend!");
});
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("App started");
