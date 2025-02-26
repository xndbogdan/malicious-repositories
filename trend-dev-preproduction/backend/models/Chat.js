const { Schema, model } = require("mongoose");

const Chat = new Schema({
  name: { type: String, required: true },
  time: { type: Date, required: true },
  message: { type: String, required: true },
});

module.exports = model("Chat", Chat);
