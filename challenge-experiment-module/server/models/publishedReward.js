const mongoose = require("mongoose");

const publishedRewardSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PublishedCampaign",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PublishedReward", publishedRewardSchema);

/**
Published Campaigns will reference these.
Rewards: [{}]
  Name
  Price
  Description
  ExpectedDeliveryDate
 */
