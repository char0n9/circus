const mongoose = require("mongoose");
const Event = require("./eventModel");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
});

module.exports = User = mongoose.model("user", userSchema);
