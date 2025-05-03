const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");
const sendError = require("../utils/sendError");
const Joi = require("joi");
router.use(verifyToken);

// Validation schema for note creation and update
const noteSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  tag: Joi.string().optional().allow(""),
});

// GET all notes for logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
      [req.userId]
    );
    res.json(notes.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    return sendError(res);
  }
});
// POST create a new note
router.post("/", async (req, res) => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    return sendError(res, 400, error.details[0].message);
  }
  const { title, content, tag } = req.body;

  try {
    const newNote = await pool.query(
      "INSERT INTO notes (title, content, tag, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, tag, req.userId]
    );
    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error("Error creating note:", err);
    return sendError(res);
  }
});

// PUT update a note
router.put("/:id", async (req, res) => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    return sendError(res, 400, error.details[0].message);
  }
  const { title, content, tag } = req.body;
  const noteId = req.params.id;

  try {
    const updated = await pool.query(
      "UPDATE notes SET title = $1, content = $2, tag = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, content, tag, noteId, req.userId]
    );

    if (updated.rows.length === 0) {
      return sendError(res, 404, "Note not found or not authorized to update");
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Error updating note:", err);
    return sendError(res);
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    const deleted = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [noteId, req.userId]
    );

    if (deleted.rows.length === 0) {
      return sendError(res, 404, "Note not found or not authorized to update");
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting note:", err);
    return sendError(res);
  }
});

module.exports = router;
