const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db"); // Adjust the path if needed
const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
  console.log("Received registration request");
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password before saving it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Insert new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Set token expiration time to 7 days
    );

    // Return the token to the user
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token to the client
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router; // Export the routes
