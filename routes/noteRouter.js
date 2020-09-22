const router = require("express").Router();
const auth = require("./../middleware/auth");

const Note = require("../models/noteModel");

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({});
    const { user } = req;
    res.status(200).json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/mynotes", auth, async (req, res) => {
  try {
    const { user } = req;
    const notes = await Note.find({ host: user });
    res.status(200).json({ notes, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", auth, async (req, res) => {
  try {
    const { venue, date, title, name } = req.body;
    const host = req.user;
    console.log(req.user);

    const newNote = new Note({
      date,
      text,
      host,
      name,
    });
    const savedNote = await newNote.save();
    Note.findOne({ host: host })
      .populate("host")
      .exec((err, eve) => {
        if (err) return res.status(500).json(eve);
        res.json({ savedNote, displayName: eve.host.displayName });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/delete", auth, async (req, res) => {
  try {
    console.log(req.body);
    const deletedNote = await Note.findByIdAndDelete(req.body.noteId);
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
