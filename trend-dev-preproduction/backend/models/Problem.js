const { Schema, model } = require("mongoose");

const Problem = new Schema({
  name: { type: String, required: true },
  time: { type: Date, required: true },
  message: { type: String, required: true },
  email: { type: String },
});

module.exports = model("Problem", Problem);
