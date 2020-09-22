const mongoose = require("mongoose");
const User = require("./userModel");

const noteSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
});
module.exports = Note = mongoose.model("note", eventSchema);
