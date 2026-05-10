const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
} = require("../controllers/noteController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.get("/:id", authMiddleware, getSingleNote);

router.put("/:id", authMiddleware, updateNote);

router.delete("/:id", authMiddleware, deleteNote);

router.put("/archive/:id", authMiddleware, archiveNote);

module.exports = router;