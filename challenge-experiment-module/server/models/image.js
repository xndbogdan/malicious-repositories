const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  content: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);

/**
ID
Image
 */
