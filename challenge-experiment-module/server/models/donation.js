const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PublishedCampaign",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  charityAmount: Number,
  sum: Number,
  rewards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PublishedReward",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Donation", donationSchema);
