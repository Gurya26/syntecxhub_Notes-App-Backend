const Note = require("../models/Note");


// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Note Created",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE NOTE
const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Note Updated",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ARCHIVE + UNARCHIVE
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // TOGGLE TRUE FALSE
    note.archived = !note.archived;

    await note.save();

    res.status(200).json({
      message: note.archived
        ? "Note Archived"
        : "Note Unarchived",
      note,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
};