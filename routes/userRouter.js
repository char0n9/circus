const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

const User = require("../models/userModel");
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck } = req.body;
    let { displayName } = req.body;

    //validation

    if (!email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered" });
    if (password.length < 5)
      return res.status(400).json({
        message: "The password needs to be at least 5 characters long.",
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ message: "Password confirmation does not match" });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: "Email not valid" });

    if (!displayName) displayName = email;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        message:
          "There is no user associated with this email address. Did you mean to sign-up?",
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/events", auth, async (req, res) => {
  User.find({})
    .populate("events")
    .exec(function (err, users) {
      if (err) console.log(err);
      //this will log all of the users with each of their posts
      else console.log(users);
    });
});
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ displayName: user.displayName, id: user._id });
});

module.exports = router;
