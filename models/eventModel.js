const mongoose = require("mongoose");
const User = require("./userModel");

const eventSchema = new mongoose.Schema({
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Event = mongoose.model("event", eventSchema);
