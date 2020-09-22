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
    const { venue, date, title } = req.body;
    const host = req.user;

    const newEvent = new Event({
      venue,
      date,
      title,
      host,
    });
    const savedEvent = await newEvent.save();
    Event.findOne({ host: host })
      .populate("host")
      .exec((err, eve) => {
        if (err) return res.status(500).json(eve);
        console.log("The host is %s", eve.host.email);
      });
    res.json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
