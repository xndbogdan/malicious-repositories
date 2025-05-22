const mongoose = require("mongoose");

const publishedCampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true, // will be true, must upload default image though
    default: "638ae54cd4f54a8e23b56c4e",
  },
  owner: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  publishDate: {
    type: Date,
    required: false,
  },
  views: [
    {
      type: Date,
      required: true,
    },
  ],
  content: [
    {
      type: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  rewards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PublishedReward",
      required: true,
    },
  ],
});

module.exports = mongoose.model("PublishedCampaign", publishedCampaignSchema);

/**
ID
Title
Subtitle
Description
Main Image
IsPublished
Owner
Goal
Duration
Publish Date
ViewsByDate: [{}]
  Date
  ViewCount
Content: [{}]
  Type: string
  Content: string
    If the string is an image, it contains the object id of the image
Rewards: [{}]
  Name
  Price
  Description
  ExpectedDeliveryDate
 */
