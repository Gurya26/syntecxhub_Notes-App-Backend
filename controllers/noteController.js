const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Create Note Failed" });
  }
};

// GET ALL NOTES WITH POPULATE
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Get Notes Failed" });
  }
};

// GET SINGLE NOTE
exports.getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("user", "name email");

    if (!note) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Get Single Note Failed",
    });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      message: "Note Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete Failed",
    });
  }
};

// ARCHIVE / UNARCHIVE
exports.archiveNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    note.archived = !note.archived;

    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Archive Failed",
    });
  }
};