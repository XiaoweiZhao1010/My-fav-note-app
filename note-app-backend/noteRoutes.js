const express = require("express");
const router = express.Router();
const pool = require("./db");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token from Authorization header
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Match the field from your token payload
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// GET all notes for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
      [req.userId]
    );
    res.json(notes.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
});
console.log("✅ notesRoutes file is loaded");
// POST create a new note
router.post("/", verifyToken, async (req, res) => {
  console.log("Post /api.notes route hit");
  const { title, content } = req.body;

  try {
    const newNote = await pool.query(
      "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, req.userId]
    );
    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update a note
router.put("/:id", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;

  try {
    const updated = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, noteId, req.userId]
    );

    if (updated.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a note
router.delete("/:id", verifyToken, async (req, res) => {
  const noteId = req.params.id;

  try {
    const deleted = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [noteId, req.userId]
    );

    if (deleted.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
