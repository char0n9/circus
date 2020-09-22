const router = require("express").Router();
const auth = require("./../middleware/auth");

const Event = require("../models/eventModel");

router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({});
    const { user } = req;
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/myevents", auth, async (req, res) => {
  try {
    const { user } = req;
    const events = await Event.find({ host: user });
    res.status(200).json({ events, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", auth, async (req, res) => {
  try {
    const { venue, date, title, name } = req.body;
    const host = req.user;
    console.log(req.user);

    const newEvent = new Event({
      venue,
      date,
      title,
      host,
      name,
    });
    const savedEvent = await newEvent.save();
    Event.findOne({ host: host })
      .populate("host")
      .exec((err, eve) => {
        if (err) return res.status(500).json(eve);
        res.json({ savedEvent, displayName: eve.host.displayName });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/delete", auth, async (req, res) => {
  try {
    console.log(req.body);
    const deletedEvent = await Event.findByIdAndDelete(req.body.eventId);
    res.json(deletedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
