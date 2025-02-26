const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  lang: { type: String, required: true },
  role: { type: String },
  location: { type: String },
  hp: { type: Number },
  money: { type: Number },
  exp: { type: Number },
  lvl: { type: Number },
  quest: { type: Number },
  mobs: { type: Number },
  sword: { type: Number },
  fire: { type: Number },
  healing: { type: Number },
  water: { type: Number },
  earth: { type: Number },
  air: { type: Number },
  __v: { type: Number, select: false },
});

module.exports = model("User", User);
