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

const protect = require("../middleware/authMiddleware");


// CREATE + GET
router
  .route("/")
  .post(protect, createNote)
  .get(protect, getNotes);


// SINGLE NOTE
router
  .route("/:id")
  .get(protect, getSingleNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote);


// ARCHIVE / UNARCHIVE
router.put(
  "/archive/:id",
  protect,
  archiveNote
);

module.exports = router;