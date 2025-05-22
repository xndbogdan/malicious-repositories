const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
  ],
  unpublishedCampaignsOwned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnpublishedCampaign",
      required: true,
    },
  ],
  publishedCampaignsOwned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PublishedCampaign",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

/**
ID
First Name
Last Name
Username
Password
Donations: [{}]
  Campaign ID
  Date Purchased
  Donation Amount
Rewards: [{}]
  Name
  Price
  Description
  ExpectedDeliveryDate
Campaigns Owned: []
  Campaign ID
    Should be appended by date, so the first should be the oldest campaign...
 */
